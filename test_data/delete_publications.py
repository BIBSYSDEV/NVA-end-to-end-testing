import boto3
import json
import common
import time
from datetime import datetime
import uuid

dynamodb_client = boto3.resource('dynamodb')
s3_client = boto3.client('s3')
ssm = boto3.client('ssm')
cognito_client = boto3.client('cognito-idp')
lambda_client = boto3.client('lambda')

publications_tablename = ssm.get_parameter(Name='/test/ResourceTable',
                                           WithDecryption=False)['Parameter']['Value']
nvi_tablename = ssm.get_parameter(Name='/test/NviTable',
                                   WithDecryption=False)['Parameter']['Value']
s3_bucket_name = ssm.get_parameter(Name='/test/ResourceS3Bucket',
                                   WithDecryption=False)['Parameter']['Value']
STAGE = ssm.get_parameter(Name='/test/Stage',
                          WithDecryption=False)['Parameter']['Value']
USER_POOL_ID = ssm.get_parameter(Name='/CognitoUserPoolId',
                                 WithDecryption=False)['Parameter']['Value']
CLIENT_ID = ssm.get_parameter(Name='/CognitoUserPoolAppClientId',
                              WithDecryption=False)['Parameter']['Value']
deleteSearchIndexLambda = 'master-pipelines-NvaSearchApi-DeleteIndicesHandler-EKKiXwO7Iu8y'
searchInitHandlerLambda = 'master-pipelines-NvaSearchApiClientPip-InitHandler-LEwtReql7EUp'
deleteNviIndexLambda = 'master-pipelines-NvaNvi-1-DeleteNviCandidateIndexH-zfxYODFdVnjs'
nviInitHandlerLambda = 'master-pipelines-NvaNvi-1V33HP5I7F42I--InitHandler-IX8ystUbVaIG'

STRING = 'S'
MAP = 'M'

def delete_indices():
    print("Deleting OpenSearch indices...")
    delete_handlers = [deleteNviIndexLambda, deleteSearchIndexLambda]
    for handler in delete_handlers:
        response = lambda_client.invoke(FunctionName=handler, Payload=json.dumps({"indices": ["resources", "tickets", "import-candidates"]}))
        if response['StatusCode'] != 200:
            print(response)
    time.sleep(30)
    print("Finished deleting OpenSearch indices")

def create_indices():
    print("Creating OpenSearch indices...")
    create_handlers = [nviInitHandlerLambda, searchInitHandlerLambda]
    for handler in create_handlers:
        response = lambda_client.invoke(FunctionName=handler)
        if response['StatusCode'] != 200:
            print(response)
    time.sleep(30)
    print("Finished creating OpenSearch indices")



def scan_resources():
    print('scanning resources')
    paginator = dynamodb_client.get_paginator('scan')
    operation_parameters = {
        'TableName': publications_tablename
    }
    publications = []
    for response in paginator.paginate(**operation_parameters):
        publications.append(response['Items'])

    scanned_publications = []
    for publicationlist in publications:
        for item in publicationlist:
            scanned_publications.append(item)

    return scanned_publications

def scan_candidates():
    print('scanning NVI candidates')
    paginator = dynamodb_client.get_paginator('scan')
    operation_parameters = {
        'TableName': nvi_tablename
    }
    candidates = []
    for response in paginator.paginate(**operation_parameters):
        candidates.append(response['Items'])

    scanned_candidates = []
    for candidatelist in candidates:
        for item in candidatelist:
            scanned_candidates.append(item)

    return scanned_candidates

def delete_items(items, table):
  with table.batch_writer() as batch:
    for item in items:
      print('deleting', 'registration', item['PK0'])
      batch.delete_item(Key={'PK0': item['PK0'], 'SK0': item['SK0']})

def delete_nvi_items(items, table):
  with table.batch_writer() as batch:
    for item in items:
      print(f"Deleting {item['PrimaryKeyHashKey']} : {item['PrimaryKeyRangeKey']}")
      batch.delete_item(Key={'PrimaryKeyHashKey': item['PrimaryKeyHashKey'], 'PrimaryKeyRangeKey': item['PrimaryKeyRangeKey']})

def create_nvi_periods():
  current_year = datetime.now().year
  next_year = current_year + 1
  last_year = current_year - 1

  create_period(last_year)
  create_period(current_year)
  create_period(next_year)

def create_period(year):
  print(f'Creating NVI period for {year}')
  currentStartDate = f'{year}-01-01T01:00:00Z'
  currentReportingDate = f'{year}-12-31T23:59:00Z'
  period_template_file = './publications/files/nvi_period_template.json'
  with open(period_template_file) as period_template:
    period = json.load(period_template)
    period['PrimaryKeyRangeKey'] = f'PERIOD#{year}'
    period['data']['id'] = f'https://api.e2e.nva.aws.unit.no/scientific-index/period/{year}'
    period['data']['publishingYear'] = str(year)
    period['data']['startDate'] = currentStartDate
    period['data']['reportingDate'] = currentReportingDate
    period['publishingYear'] = str(year)
    period['startDate'] = currentStartDate
    period['reportingDate'] = currentReportingDate
    period['identifier'] = str(year)
    period['version'] = str(uuid.uuid4())
    period['lastWrittenAt'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')

    table = dynamodb_client.Table(nvi_tablename)
    table.put_item(Item=period)

def delete_all_in_dynamoDb():
  table = dynamodb_client.Table(publications_tablename)
  response = table.scan()
  delete_items(response['Items'], table)
  while 'LastEvaluatedKey' in response:
    response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
    delete_items(response['Items'], table)

def delete_all_nvi_in_dynamoDb():
  table = dynamodb_client.Table(nvi_tablename)
  response = table.scan()
  delete_nvi_items(response['Items'], table)
  while 'LastEvaluatedKey' in response:
    response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
    delete_nvi_items(response['Items'], table)


def delete_publications():
    delete_all_in_dynamoDb()
    delete_all_nvi_in_dynamoDb()

    return


def run():
    print('publications...')
    delete_indices()
    create_indices()
    delete_publications()
    create_nvi_periods()

if __name__ == '__main__':
    run()
