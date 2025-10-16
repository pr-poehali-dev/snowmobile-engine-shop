'''
Business: Сброс всех пользователей и создание нового админа
Args: event с GET методом для сброса всех учетных записей
Returns: HTTP response с новыми учетными данными
'''

import json
import os
import psycopg2
import bcrypt
from typing import Dict, Any

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        try:
            # New admin credentials
            admin_password = "Admin2024!"
            
            # Generate bcrypt hash
            salt = bcrypt.gensalt()
            admin_hash = bcrypt.hashpw(admin_password.encode('utf-8'), salt).decode('utf-8')
            
            # Connect to database
            conn = get_db_connection()
            cur = conn.cursor()
            
            # Deactivate all sessions
            cur.execute("UPDATE sessions SET expires_at = NOW()")
            sessions_cleared = cur.rowcount
            
            # Deactivate all non-admin users
            cur.execute("UPDATE users SET is_active = false WHERE role != 'admin'")
            users_deactivated = cur.rowcount
            
            # Update admin user credentials
            cur.execute(
                "UPDATE users SET email = %s, password_hash = %s, full_name = %s, is_active = true, updated_at = NOW() WHERE role = %s",
                ('admin', admin_hash, 'Администратор', 'admin')
            )
            admin_updated = cur.rowcount
            
            conn.commit()
            
            # Verify the update
            cur.execute("SELECT id, email, full_name, role, is_active FROM users WHERE role = 'admin'")
            admin_user = cur.fetchone()
            
            cur.execute("SELECT COUNT(*) FROM users WHERE is_active = true")
            active_count = cur.fetchone()[0]
            
            cur.close()
            conn.close()
            
            if admin_user and admin_updated > 0:
                # Test password verification
                test_verify = bcrypt.checkpw(admin_password.encode('utf-8'), admin_hash.encode('utf-8'))
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'message': 'Все пользователи сброшены, новый админ создан',
                        'admin': {
                            'id': admin_user[0],
                            'email': admin_user[1],
                            'full_name': admin_user[2],
                            'role': admin_user[3],
                            'is_active': admin_user[4]
                        },
                        'new_credentials': {
                            'login': 'admin',
                            'password': admin_password
                        },
                        'stats': {
                            'sessions_cleared': sessions_cleared,
                            'users_deactivated': users_deactivated,
                            'active_users': active_count,
                            'hash_verified': test_verify
                        }
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': False,
                        'error': 'Admin user not found or not updated'
                    }),
                    'isBase64Encoded': False
                }
                
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': str(e)
                }),
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