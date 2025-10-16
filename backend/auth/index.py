'''
Business: Авторизация сотрудников в админ-панели
Args: event с httpMethod POST для login/logout, GET для проверки сессии
Returns: HTTP response с session_token или статусом
'''

import json
import os
import psycopg2
import bcrypt
import secrets
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def escape_sql_string(s: str) -> str:
    """Экранирует одинарные кавычки для SQL"""
    return s.replace("'", "''")

def verify_session(session_token: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cur = conn.cursor()
    
    session_token_escaped = escape_sql_string(session_token)
    
    query = f"""
        SELECT u.id, u.email, u.full_name, u.role, u.is_active
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.session_token = '{session_token_escaped}' AND s.expires_at > NOW() AND u.is_active = true
    """
    
    cur.execute(query)
    result = cur.fetchone()
    
    cur.close()
    conn.close()
    
    if result:
        return {
            'id': result[0],
            'email': result[1],
            'fullName': result[2],
            'role': result[3],
            'isActive': result[4]
        }
    return None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        headers = event.get('headers', {})
        session_token = headers.get('X-Session-Token') or headers.get('x-session-token')
        
        if not session_token:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'No session token'}),
                'isBase64Encoded': False
            }
        
        user = verify_session(session_token)
        
        if user:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'user': user}),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'Invalid session'}),
                'isBase64Encoded': False
            }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        if action == 'login':
            email = body_data.get('email', '').strip()
            password = body_data.get('password', '')
            
            if not email or not password:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': False, 'error': 'Email и пароль обязательны'}),
                    'isBase64Encoded': False
                }
            
            conn = get_db_connection()
            cur = conn.cursor()
            
            email_escaped = escape_sql_string(email)
            
            select_query = f"SELECT id, password_hash, full_name, role, is_active FROM users WHERE email = '{email_escaped}'"
            cur.execute(select_query)
            result = cur.fetchone()
            
            if not result:
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': False, 'error': 'Неверный email или пароль'}),
                    'isBase64Encoded': False
                }
            
            user_id, password_hash, full_name, role, is_active = result
            
            if not is_active:
                cur.close()
                conn.close()
                return {
                    'statusCode': 403,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': False, 'error': 'Учетная запись деактивирована'}),
                    'isBase64Encoded': False
                }
            
            if not bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': False, 'error': 'Неверный email или пароль'}),
                    'isBase64Encoded': False
                }
            
            session_token = secrets.token_urlsafe(32)
            expires_at = (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d %H:%M:%S')
            session_token_escaped = escape_sql_string(session_token)
            
            insert_session_query = f"INSERT INTO sessions (user_id, session_token, expires_at) VALUES ({user_id}, '{session_token_escaped}', '{expires_at}')"
            cur.execute(insert_session_query)
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'sessionToken': session_token,
                    'user': {
                        'id': user_id,
                        'email': email,
                        'fullName': full_name,
                        'role': role
                    }
                }),
                'isBase64Encoded': False
            }
        
        if action == 'logout':
            headers = event.get('headers', {})
            session_token = headers.get('X-Session-Token') or headers.get('x-session-token')
            
            if session_token:
                conn = get_db_connection()
                cur = conn.cursor()
                session_token_escaped = escape_sql_string(session_token)
                update_query = f"UPDATE sessions SET expires_at = NOW() WHERE session_token = '{session_token_escaped}'"
                cur.execute(update_query)
                conn.commit()
                cur.close()
                conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': False, 'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
