'''
Business: Получение статистики продаж для админ-панели
Args: event с httpMethod GET, queryStringParameters с period (today, week, month, year, all)
Returns: HTTP response со статистикой: продажи, популярные товары, география
'''

import json
import os
import psycopg2
from typing import Dict, Any, Optional
from datetime import datetime, timedelta

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
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
        period = query_params.get('period', 'all')
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        date_filter = ""
        if period == 'today':
            date_filter = "AND DATE(created_at) = CURRENT_DATE"
        elif period == 'week':
            date_filter = "AND created_at >= NOW() - INTERVAL '7 days'"
        elif period == 'month':
            date_filter = "AND created_at >= NOW() - INTERVAL '30 days'"
        elif period == 'year':
            date_filter = "AND created_at >= NOW() - INTERVAL '365 days'"
        
        cur.execute(f"""
            SELECT 
                COUNT(*) as total_orders,
                COALESCE(SUM(CASE WHEN status = 'completed' THEN total_price ELSE 0 END), 0) as total_revenue,
                COALESCE(SUM(total_items), 0) as total_items,
                COALESCE(AVG(CASE WHEN status = 'completed' THEN total_price ELSE NULL END), 0) as avg_order_value
            FROM orders
            WHERE 1=1 {date_filter}
        """)
        
        stats_row = cur.fetchone()
        total_orders = stats_row[0]
        total_revenue = float(stats_row[1])
        total_items = stats_row[2]
        avg_order_value = float(stats_row[3])
        
        cur.execute(f"""
            SELECT status, COUNT(*) as count
            FROM orders
            WHERE 1=1 {date_filter}
            GROUP BY status
            ORDER BY count DESC
        """)
        
        status_breakdown = []
        for row in cur.fetchall():
            status_breakdown.append({
                'status': row[0],
                'count': row[1]
            })
        
        cur.execute(f"""
            SELECT city, COUNT(*) as count, SUM(total_price) as revenue
            FROM orders
            WHERE 1=1 {date_filter}
            GROUP BY city
            ORDER BY count DESC
            LIMIT 10
        """)
        
        cities = []
        for row in cur.fetchall():
            cities.append({
                'city': row[0],
                'orders': row[1],
                'revenue': float(row[2])
            })
        
        cur.execute(f"""
            SELECT order_items, status
            FROM orders
            WHERE 1=1 {date_filter}
        """)
        
        product_stats = {}
        for row in cur.fetchall():
            items = row[0]
            status = row[1]
            is_completed = status == 'completed'
            
            if items:
                for item in items:
                    name = item.get('name', 'Неизвестный товар')
                    quantity = item.get('quantity', 0)
                    price = item.get('price', 0)
                    
                    if name not in product_stats:
                        product_stats[name] = {
                            'orderedQty': 0,
                            'soldQty': 0,
                            'revenue': 0
                        }
                    
                    product_stats[name]['orderedQty'] += quantity
                    
                    if is_completed:
                        product_stats[name]['soldQty'] += quantity
                        product_stats[name]['revenue'] += quantity * price
        
        top_products = []
        for name, data in sorted(product_stats.items(), key=lambda x: x[1]['orderedQty'], reverse=True)[:10]:
            top_products.append({
                'name': name,
                'orderedQty': data['orderedQty'],
                'soldQty': data['soldQty'],
                'revenue': float(data['revenue'])
            })
        
        cur.execute(f"""
            SELECT 
                DATE(created_at) as date, 
                COUNT(*) as orders, 
                SUM(CASE WHEN status = 'completed' THEN total_price ELSE 0 END) as revenue
            FROM orders
            WHERE created_at >= NOW() - INTERVAL '30 days'
            GROUP BY DATE(created_at)
            ORDER BY date ASC
        """)
        
        daily_stats = []
        for row in cur.fetchall():
            daily_stats.append({
                'date': row[0].isoformat() if row[0] else None,
                'orders': row[1],
                'revenue': float(row[2])
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
                'period': period,
                'overview': {
                    'totalOrders': total_orders,
                    'totalRevenue': total_revenue,
                    'totalItems': total_items,
                    'avgOrderValue': avg_order_value
                },
                'statusBreakdown': status_breakdown,
                'topCities': cities,
                'topProducts': top_products,
                'dailyStats': daily_stats
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