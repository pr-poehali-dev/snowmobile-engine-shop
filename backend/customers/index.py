'''
Business: Управление базой клиентов (покупателей)
Args: event с httpMethod GET для списка клиентов из заказов
Returns: HTTP response со списком клиентов или результатом операции
'''

import json
import os
import psycopg2
from typing import Dict, Any, Optional

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def escape_sql_string(s: str) -> str:
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
    
    headers = event.get('headers', {})
    session_token = headers.get('X-Session-Token') or headers.get('x-session-token')
    
    if not session_token:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': 'Требуется авторизация'}),
            'isBase64Encoded': False
        }
    
    user = verify_session(session_token)
    
    if not user:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': 'Неверная сессия'}),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        
        query = """
            SELECT 
                full_name,
                phone,
                city,
                COUNT(DISTINCT id) as total_orders,
                COALESCE(SUM(total_price), 0) as total_spent
            FROM orders
            GROUP BY full_name, phone, city
            ORDER BY total_spent DESC
        """
        
        cur.execute(query)
        
        customers = []
        customer_id = 1
        for row in cur.fetchall():
            customers.append({
                'id': customer_id,
                'name': row[0],
                'phone': row[1],
                'email': '',
                'city': row[2] or '',
                'total_orders': row[3],
                'total_spent': float(row[4]),
                'status': 'active',
                'created_at': ''
            })
            customer_id += 1
        
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
                'customers': customers
            }),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        if action == 'add_customer':
            name = body_data.get('name', '').strip()
            phone = body_data.get('phone', '').strip()
            
            if not name or not phone:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': False, 'error': 'Имя и телефон обязательны'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Клиент будет создан автоматически при первом заказе'
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
