"""Writes the identifier policies the approval API authorizes third-party clients against.

A client may only write the identifier names its own customer is registered for, and only point
an approval at a source matching one of the customer's source configs. A source config's baseUri
is given relative to this environment's API, so it follows the environment the data is seeded in.
There is no API for registering them, so the policies are written straight to the approvals table,
and the table name is published as /test/ApprovalsTable for the tests to find.

The policies are rewritten on every run, so drift is corrected.

Usage: uv run --frozen create_approval_policies.py [--dry-run]
"""

import json
import sys
from typing import Optional
from urllib.parse import urljoin

import boto3
from boto3.dynamodb.types import TypeSerializer

import common

ssm = boto3.client('ssm')
dynamodb = boto3.client('dynamodb')
serializer = TypeSerializer()

APPROVALS_TABLE_PARAMETER = '/test/ApprovalsTable'
APPROVALS_TABLE_PREFIX = 'nva-approvals-'
IDENTIFIER_POLICY_SORT_KEY = 'IdentifierPolicy'

DEFAULT_POLICIES_FILE = './approvals/identifier_policies.json'


def find_approvals_table() -> Optional[str]:
    tables = [name
              for page in dynamodb.get_paginator('list_tables').paginate()
              for name in page['TableNames']
              if name.startswith(APPROVALS_TABLE_PREFIX)]
    if len(tables) > 1:
        raise RuntimeError(
            f'Expected at most one table named {APPROVALS_TABLE_PREFIX}*, found {tables}')
    return tables[0] if tables else None


def put_identifier_policy(table_name: str, customer_identifier: str,
                          allowed_identifier_names: list, source_configs: list) -> None:
    dynamodb.put_item(
        TableName=table_name,
        Item={
            'PK0': {'S': f'Customer:{customer_identifier}'},
            'SK0': {'S': IDENTIFIER_POLICY_SORT_KEY},
            'type': {'S': IDENTIFIER_POLICY_SORT_KEY},
            'customerIdentifier': {'S': customer_identifier},
            'allowedIdentifierNames': {'L': [{'S': name}
                                             for name in allowed_identifier_names]},
            'sourceConfigs': serializer.serialize(source_configs)
        })


def to_source_config(source_config: dict) -> dict:
    return {
        'baseUri': urljoin(common.API_URL, source_config['baseUri']),
        'authentication': source_config['authentication']
    }


def seed_policy(policy: dict, customers: dict, table_name: str, dry_run: bool) -> None:
    customer_uri = common.require_customer_uri(customers, policy['cristinOrganization'])
    customer_identifier = customer_uri.rsplit('/', 1)[-1]
    allowed_identifier_names = policy['allowedIdentifierNames']
    source_configs = [to_source_config(source_config)
                      for source_config in policy['sourceConfigs']]
    base_uris = [source_config['baseUri'] for source_config in source_configs]

    if dry_run:
        print(f'Would let {customer_identifier} write {allowed_identifier_names} '
              f'with sources under {base_uris}')
        return

    put_identifier_policy(table_name, customer_identifier, allowed_identifier_names,
                          source_configs)
    print(f'{customer_identifier} may write {allowed_identifier_names} '
          f'with sources under {base_uris}')


def run(policies_file: str = DEFAULT_POLICIES_FILE, dry_run: bool = False) -> None:
    print('Writing approval identifier policies...')
    if dry_run:
        print('Dry run: nothing is written')

    table_name = find_approvals_table()
    if table_name is None:
        print(f'Found no {APPROVALS_TABLE_PREFIX}* table, skipping the identifier policies')
        return

    with open(policies_file) as file:
        policies = json.load(file)['policies']

    customers = common.customer_uri_by_cristin_organization()
    print(f'Approvals table: {table_name}')

    for policy in policies:
        seed_policy(policy, customers, table_name, dry_run)

    if dry_run:
        print(f'Would set {APPROVALS_TABLE_PARAMETER} to {table_name}')
    else:
        ssm.put_parameter(Name=APPROVALS_TABLE_PARAMETER, Value=table_name,
                          Type='String', Overwrite=True)
        print(f'Set {APPROVALS_TABLE_PARAMETER} to {table_name}')


if __name__ == '__main__':
    run(dry_run='--dry-run' in sys.argv)
