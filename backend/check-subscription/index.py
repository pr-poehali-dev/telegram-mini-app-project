import json
import os
import requests

def handler(event: dict, context) -> dict:
    """
    Проверяет подписку пользователя на Telegram-канал и начисляет бонус.
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
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
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        telegram_id = body.get('telegram_id')
        task_id = body.get('task_id')
        
        if not telegram_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'telegram_id is required'}),
                'isBase64Encoded': False
            }
        
        bot_token = os.environ.get('BOT_TOKEN')
        if not bot_token:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Bot token not configured'}),
                'isBase64Encoded': False
            }
        
        # ID канала для проверки (замените на ваш реальный)
        channel_username = '@pasivInvst'
        
        # Проверяем подписку через Telegram Bot API
        api_url = f'https://api.telegram.org/bot{bot_token}/getChatMember'
        params = {
            'chat_id': channel_username,
            'user_id': telegram_id
        }
        
        response = requests.get(api_url, params=params, timeout=10)
        data = response.json()
        
        if not data.get('ok'):
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'subscribed': False,
                    'message': 'Подписка не найдена'
                }),
                'isBase64Encoded': False
            }
        
        member_status = data.get('result', {}).get('status')
        is_subscribed = member_status in ['member', 'administrator', 'creator']
        
        if is_subscribed:
            # Начисляем бонус (это будет обрабатываться в другой функции)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'subscribed': True,
                    'reward': 100,
                    'message': 'Бонус 100₽ начислен!'
                }),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'subscribed': False,
                    'message': 'Вы не подписаны на канал'
                }),
                'isBase64Encoded': False
            }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
