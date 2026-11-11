"""
Creates the bucket that serves clinical trial documents to the approval API.
Usage: uv run --frozen create_fixture_bucket.py [--dry-run]
"""

import json
import sys

import boto3

s3 = boto3.client('s3')
sts = boto3.client('sts')

BUCKET_PREFIX = 'approval-source-fixtures-'
PUBLIC_READ_STATEMENT_ID = 'PublicReadOfFixtures'
PUBLIC_ACCESS_BLOCK = {
    'BlockPublicAcls': True,
    'IgnorePublicAcls': True,
    'BlockPublicPolicy': False,
    'RestrictPublicBuckets': False
}


def fixture_bucket_name() -> str:
    return BUCKET_PREFIX + sts.get_caller_identity()['Account']


def fixture_bucket_url() -> str:
    return f'https://{fixture_bucket_name()}.s3.{s3.meta.region_name}.amazonaws.com/'


def create_bucket(bucket_name: str, region: str) -> None:
    try:
        s3.create_bucket(Bucket=bucket_name,
                         CreateBucketConfiguration={'LocationConstraint': region})
        print(f'Created {bucket_name} in {region}')
    except s3.exceptions.BucketAlreadyOwnedByYou:
        print(f'{bucket_name} already exists, rewriting its configuration')


def allow_public_policy(bucket_name: str) -> None:
    s3.put_public_access_block(Bucket=bucket_name,
                               PublicAccessBlockConfiguration=PUBLIC_ACCESS_BLOCK)


def grant_anonymous_read(bucket_name: str) -> None:
    policy = {
        'Version': '2012-10-17',
        'Statement': [{
            'Sid': PUBLIC_READ_STATEMENT_ID,
            'Effect': 'Allow',
            'Principal': '*',
            'Action': 's3:GetObject',
            'Resource': f'arn:aws:s3:::{bucket_name}/*'
        }]
    }
    s3.put_bucket_policy(Bucket=bucket_name, Policy=json.dumps(policy))


def run(dry_run: bool = False) -> None:
    print('Creating the approval source fixture bucket...')
    if dry_run:
        print('Dry run: nothing is written')

    bucket_name = fixture_bucket_name()
    region = s3.meta.region_name

    if dry_run:
        print(f'Would create {bucket_name} in {region} and let anyone read its objects')
        return

    create_bucket(bucket_name, region)
    allow_public_policy(bucket_name)
    grant_anonymous_read(bucket_name)
    print(f'Anyone may read objects under {fixture_bucket_url()}')


if __name__ == '__main__':
    run(dry_run='--dry-run' in sys.argv)
