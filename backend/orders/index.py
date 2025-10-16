'''
Business: Получение и управление заказами в админ-панели
Args: event с httpMethod GET для списка заказов, PUT для обновления статуса
Returns: HTTP response со списком заказов или результатом обновления
'''

import json
import os
import psycopg2
from typing import Dict, Any, Optional
from datetime import datetime

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def verify_session(session_token: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cur = conn.cursor()
    
    query = """
        SELECT u.id, u.email, u.full_name, u.role, u.is_active
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.session_token = %s AND s.expires_at > NOW() AND u.is_active = true
    """
    
    cur.execute(query, (session_token,))
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
        query_params = event.get('queryStringParameters') or {}
        status_filter = query_params.get('status')
        search_query = query_params.get('search', '').strip()
        limit = int(query_params.get('limit', '100'))
        offset = int(query_params.get('offset', '0'))
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        where_clauses = []
        params = []
        
        if status_filter and status_filter != 'все':
            where_clauses.append("status = %s")
            params.append(status_filter)
        
        if search_query:
            where_clauses.append("(phone LIKE %s OR full_name LIKE %s OR order_number LIKE %s)")
            search_pattern = f'%{search_query}%'
            params.extend([search_pattern, search_pattern, search_pattern])
        
        where_sql = " AND ".join(where_clauses) if where_clauses else "1=1"
        
        count_query = f"SELECT COUNT(*) FROM orders WHERE {where_sql}"
        cur.execute(count_query, params)
        total_count = cur.fetchone()[0]
        
        query = f"""
            SELECT id, order_number, full_name, phone, city, 
                   total_price, total_items, order_items, 
                   created_at, status
            FROM orders
            WHERE {where_sql}
            ORDER BY created_at DESC
            LIMIT %s OFFSET %s
        """
        
        params.extend([limit, offset])
        cur.execute(query, params)
        
        orders = []
        for row in cur.fetchall():
            orders.append({
                'id': row[0],
                'orderNumber': row[1],
                'fullName': row[2],
                'phone': row[3],
                'city': row[4],
                'totalPrice': float(row[5]),
                'totalItems': row[6],
                'items': row[7],
                'createdAt': row[8].isoformat() if row[8] else None,
                'status': row[9]
            })
        
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
                'orders': orders,
                'total': total_count,
                'limit': limit,
                'offset': offset
            }),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        if action == 'update_order':
            if user['role'] != 'admin':
                return {
                    'statusCode': 403,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': False, 'error': 'Недостаточно прав'}),
                    'isBase64Encoded': False
                }
            
            order_id = body_data.get('order_id')
            status = body_data.get('status')
            payment_status = body_data.get('payment_status')
            shipping_status = body_data.get('shipping_status')
            notes = body_data.get('notes', '')
            
            if not order_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': False, 'error': 'order_id обязателен'}),
                    'isBase64Encoded': False
                }
            
            conn = get_db_connection()
            cur = conn.cursor()
            
            cur.execute(
                "UPDATE orders SET status = %s, payment_status = %s, shipping_status = %s, notes = %s, updated_at = NOW() WHERE id = %s",
                (status, payment_status, shipping_status, notes, order_id)
            )
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Заказ обновлён'}),
                'isBase64Encoded': False
            }
    
    if method == 'PUT':
        if user['role'] != 'admin':
            return {
                'statusCode': 403,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'Недостаточно прав'}),
                'isBase64Encoded': False
            }
        
        body_data = json.loads(event.get('body', '{}'))
        order_id = body_data.get('orderId')
        new_status = body_data.get('status')
        
        if not order_id or not new_status:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'orderId и status обязательны'}),
                'isBase64Encoded': False
            }
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute(
            "UPDATE orders SET status = %s WHERE id = %s",
            (new_status, order_id)
        )
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