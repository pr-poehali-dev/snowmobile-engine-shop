'''
Business: Сохраняет заказ в базу данных PostgreSQL и отправляет уведомление в Telegram
Args: event с httpMethod POST, body содержит fullName, phone, city, items, totalPrice, totalItems
Returns: HTTP response с orderNumber или ошибкой
'''

import json
import os
import psycopg2
from psycopg2.extras import Json
from datetime import datetime
from typing import Dict, Any
import urllib.request
import urllib.parse

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
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        full_name = body_data.get('fullName', '')
        phone = body_data.get('phone', '')
        city = body_data.get('city', '')
        items = body_data.get('items', [])
        total_price = float(body_data.get('totalPrice', 0))
        total_items = int(body_data.get('totalItems', 0))
        
        if not all([full_name, phone, city, items]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        order_number = f"ORD-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
        
        database_url = os.environ.get('DATABASE_URL')
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        insert_query = """
            INSERT INTO orders (order_number, full_name, phone, city, total_price, total_items, order_items)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """
        
        cur.execute(insert_query, (
            order_number,
            full_name,
            phone,
            city,
            total_price,
            total_items,
            Json(items)
        ))
        
        order_id = cur.fetchone()[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if telegram_token and telegram_chat_id:
            items_text = '\n'.join([
                f"• {item['name']} - {item['quantity']} шт. × {item['price']} ₽ = {item['quantity'] * item['price']} ₽"
                for item in items
            ])
            
            message = f"""
🆕 Новый заказ #{order_number}

👤 Клиент: {full_name}
📱 Телефон: {phone}
🏙 Город: {city}

📦 Товары:
{items_text}

💰 Итого: {total_price} ₽
📊 Количество: {total_items} шт.

🆔 ID в БД: {order_id}
            """.strip()
            
            telegram_url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
            data = urllib.parse.urlencode({
                'chat_id': telegram_chat_id,
                'text': message,
                'parse_mode': 'HTML'
            }).encode()
            
            req = urllib.request.Request(telegram_url, data=data)
            urllib.request.urlopen(req)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'orderNumber': order_number,
                'orderId': order_id
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
            'body': json.dumps({'success': False, 'error': str(e)}),
            'isBase64Encoded': False
        }
