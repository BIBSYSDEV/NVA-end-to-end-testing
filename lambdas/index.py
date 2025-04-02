import os
import json
import requests

client_id = os.getenv('CLIENT_ID')
redirect_uri = os.getenv('REDIRECT_URI')
token_url = os.getenv('TOKEN_URL')

if not client_id or not redirect_uri or not token_url:
    raise EnvironmentError('Environment variables CLIENT_ID, REDIRECT_URI, and TOKEN_URL must be set')

def get_auth(authorization_code):
    post_data = {
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'code': authorization_code,
        
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    try:
        response = requests.post(token_url, data=post_data, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as err:
        print(f'Error exchanging authorization code for access token: {err}')
        raise

def handler(event, context):
    # Debugging log to inspect the event object
    print("Received event:", json.dumps(event))

    query_params = event.get('queryStringParameters')
    if query_params is None or 'code' not in query_params:
        return {
            'statusCode': 400,
            'body': 'Authorization code not found',
        }

    authorization_code = query_params['code']

    if not authorization_code:
        return {
            'statusCode': 400,
            'body': 'Authorization code not found',
        }

    try:
        tokens = get_auth(authorization_code)
        return {
            'statusCode': 200,
            'body': json.dumps(tokens),
        }
    except Exception as err:
        print(err)
        return {
            'statusCode': 500,
            'body': 'Error exchanging authorization code for access token',
        }