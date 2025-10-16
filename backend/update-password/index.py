'''
Business: Обновление пароля администратора
Args: event с GET методом для обновления пароля admin на Belka1608
Returns: HTTP response с результатом обновления
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
            # Generate bcrypt hash for password "Belka1608"
            password = "Belka1608"
            salt = bcrypt.gensalt()
            password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
            
            # Connect to database
            conn = get_db_connection()
            cur = conn.cursor()
            
            # Update admin password
            cur.execute(
                "UPDATE users SET password_hash = %s, updated_at = NOW() WHERE email = %s",
                (password_hash, 'admin')
            )
            
            rows_updated = cur.rowcount
            conn.commit()
            
            # Verify the update
            cur.execute("SELECT email, role FROM users WHERE email = %s", ('admin',))
            user = cur.fetchone()
            
            cur.close()
            conn.close()
            
            if user and rows_updated > 0:
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
                        'message': 'Password updated successfully',
                        'email': user[0],
                        'role': user[1],
                        'hash_verified': test_verify,
                        'rows_updated': rows_updated
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
