"""Creates the external API clients the test suites need and stores their credentials as secrets.

Which clients to create is defined in a json file, so a new integration needs an entry there
rather than a code change. Each entry names the secret its credentials are stored under, which is
what the tests read to authenticate.

External clients cannot be deleted through the API, so if the credentials secret already exists the client is assumed to exist and is left alone rather
than replaced.

Usage: uv run --frozen create_external_clients.py [--dry-run]
"""

import json
import sys

import boto3
import requests

import common

secretsmanager = boto3.client('secretsmanager')

DEFAULT_CLIENTS_FILE = './clients/external_clients.json'


def secret_is_usable(secret_name: str) -> bool:
    try:
        description = secretsmanager.describe_secret(SecretId=secret_name)
    except secretsmanager.exceptions.ResourceNotFoundException:
        return False
    # A secret deleted without force still answers describe_secret for the whole recovery window.
    return 'DeletedDate' not in description


def store_secret(secret_name: str, credentials: dict) -> None:
    secret_string = json.dumps(credentials)
    try:
        secretsmanager.create_secret(Name=secret_name, SecretString=secret_string)
    except secretsmanager.exceptions.InvalidRequestException:
        # Scheduled for deletion, and cannot be recreated under the same name until restored.
        secretsmanager.restore_secret(SecretId=secret_name)
        secretsmanager.put_secret_value(SecretId=secret_name, SecretString=secret_string)


def create_external_client(client: dict, customer_uri: str, access_token: str) -> dict:
    payload = {
        'clientName': client['clientName'],
        'customerUri': customer_uri,
        'cristinOrgUri': common.cristin_organization_uri(client['cristinOrganization']),
        'actingUser': client['actingUser'],
        'scopes': client['scopes']
    }
    response = requests.post(
        f'{common.API_URL}/users-roles/external-clients',
        json=payload,
        headers={
            'Authorization': f'Bearer {access_token}',
            'Content-type': 'application/json'
        },
        timeout=30)
    response.raise_for_status()
    return response.json()


def seed_client(client: dict, customers: dict, access_token: str, dry_run: bool) -> None:
    client_name = client['clientName']
    if secret_is_usable(client['secretName']):
        print(f'{client_name} already exists, leaving the client alone')
        return

    customer_uri = common.require_customer_uri(customers, client['cristinOrganization'])
    if dry_run:
        print(f'Would create {client_name} for {customer_uri}')
        return

    credentials = create_external_client(client, customer_uri, access_token)
    store_secret(client['secretName'], credentials)
    print(f'Created {client_name} for {customer_uri}')


def run(clients_file: str = DEFAULT_CLIENTS_FILE, dry_run: bool = False) -> None:
    print('Creating external API clients...')
    if dry_run:
        print('Dry run: nothing is written')

    with open(clients_file) as file:
        clients = json.load(file)['clients']

    access_token = common.getBackendAccessToken()
    customers = common.customer_uri_by_cristin_organization()

    for client in clients:
        seed_client(client, customers, access_token, dry_run)


if __name__ == '__main__':
    run(dry_run='--dry-run' in sys.argv)
