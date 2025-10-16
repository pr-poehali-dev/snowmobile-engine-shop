'''
Business: Создание нового администратора с уникальным email
Args: event с POST методом, body содержит email, password, full_name
Returns: HTTP response с данными созданного пользователя
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
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            
            email = body_data.get('email', 'newadmin')
            password = body_data.get('password', 'NewAdmin2024!')
            full_name = body_data.get('full_name', 'Новый Администратор')
            
            # Generate bcrypt hash
            salt = bcrypt.gensalt()
            password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
            
            # Connect to database
            conn = get_db_connection()
            cur = conn.cursor()
            
            # Check if email already exists
            cur.execute("SELECT id FROM users WHERE email = %s", (email,))
            existing = cur.fetchone()
            
            if existing:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': False,
                        'error': f'Пользователь с email {email} уже существует'
                    }),
                    'isBase64Encoded': False
                }
            
            # Insert new admin user
            cur.execute(
                """
                INSERT INTO users (email, password_hash, full_name, role, is_active, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, NOW(), NOW())
                RETURNING id, email, full_name, role, is_active
                """,
                (email, password_hash, full_name, 'admin', True)
            )
            
            new_user = cur.fetchone()
            conn.commit()
            
            cur.close()
            conn.close()
            
            # Test password verification
            test_verify = bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Новый администратор создан',
                    'user': {
                        'id': new_user[0],
                        'email': new_user[1],
                        'full_name': new_user[2],
                        'role': new_user[3],
                        'is_active': new_user[4]
                    },
                    'credentials': {
                        'login': email,
                        'password': password
                    },
                    'hash_verified': test_verify
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
