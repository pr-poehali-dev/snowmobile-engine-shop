'''
Business: Определяет город пользователя по IP-адресу
Args: event - dict с httpMethod и headers (включая sourceIp)
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с городом пользователя
'''

import json
import urllib.request
import urllib.error
from typing import Dict, Any


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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    request_context = event.get('requestContext', {})
    identity = request_context.get('identity', {})
    client_ip = identity.get('sourceIp', '')
    
    if not client_ip or client_ip == '127.0.0.1' or client_ip.startswith('192.168.'):
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'city': 'Москва',
                'country': 'RU',
                'ip': client_ip or 'unknown'
            }),
            'isBase64Encoded': False
        }
    
    try:
        req = urllib.request.Request(
            f'http://ip-api.com/json/{client_ip}?fields=status,country,countryCode,city,query,lat,lon',
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        
        with urllib.request.urlopen(req, timeout=3) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        if data.get('status') == 'success':
            city = data.get('city', 'Москва')
            country_code = data.get('countryCode', 'RU')
            
            city_mapping = {
                'Moscow': 'Москва',
                'Saint Petersburg': 'Санкт-Петербург',
                'Novosibirsk': 'Новосибирск',
                'Yekaterinburg': 'Екатеринбург',
                'Kazan': 'Казань',
                'Nizhny Novgorod': 'Нижний Новгород',
                'Chelyabinsk': 'Челябинск',
                'Samara': 'Самара',
                'Omsk': 'Омск',
                'Rostov-on-Don': 'Ростов-на-Дону',
                'Ufa': 'Уфа',
                'Krasnoyarsk': 'Красноярск',
                'Voronezh': 'Воронеж',
                'Perm': 'Пермь',
                'Volgograd': 'Волгоград',
                'Krasnodar': 'Краснодар',
                'Saratov': 'Саратов',
                'Tyumen': 'Тюмень',
                'Tolyatti': 'Тольятти',
                'Izhevsk': 'Ижевск',
            }
            
            city_ru = city_mapping.get(city, city)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'city': city_ru,
                    'country': country_code,
                    'ip': client_ip,
                    'lat': data.get('lat'),
                    'lon': data.get('lon')
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'city': 'Москва',
                'country': 'RU',
                'ip': client_ip
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'city': 'Москва',
                'country': 'RU',
                'ip': client_ip,
                'error': str(e)
            }),
            'isBase64Encoded': False
        }
