# NVA-end-to-end-testing

Install python3

Install samlauth
(https://gitlab.sikt.no/platon/aws-cli-tools)

Set environment variables:
CYPRESS_AWS_USER_POOL_ID (from AWS)
CYPRESS_AWS_CLIENT_ID (from AWS)
CYPRESS_DEVPASSWORD
CYPRESS_DEVUSER

login to AWS:
(e2e)
python3 .\aws-cli-tools\samlauth\samlauth.py -f -a NVAE2ETesting
(dev)
python3 .\aws-cli-tools\samlauth\samlauth.py -f -a NVAdev

Install Cypress:
`npm install cypress`

Cypress docs:
https://docs.cypress.io/guides/overview/why-cypress

clone https://github.com/BIBSYSDEV/NVA-end-to-end-testing
checkout test-deploy

To start creating tests create a directory with the same name as the feature file under the subdirectory with the feature file. Cypress will look in `.js` files in that subdirectory for cucumber tags.

Example: for `./cypress/integration/1221-my_publication/354-creator_opens_my_publications.feature` create the subdirectory `./cypress/integration/1221-my_publication/354-creator_opens_my_publications`

Before running tests, create testdata:

    python3 create_test_data.py

create publications:
cd ./test_data
python3 ./import_publications.py <optional_filename>

create testusers:
python3 ./import_users_new.py <optional_filename>

## Running tests locally

This assumes you have configured AWS CLI with an SSO session named `sikt` and an account profile named `nva-e2e`.

`run-tests.sh` fetches everything Cypress needs from AWS (temporary credentials, Cognito configuration from SSM, and the dev basic-auth login from the `E2ETesting` secret) and then runs the given specs.
It requires an active AWS session for the E2E account (`aws sso login --profile <profile>`).

```bash
aws sso login --sso-session sikt
./run-tests.sh -p nva-e2e                                        # run all specs
./run-tests.sh -p nva-e2e cypress/e2e/nvi/nvi-points.feature     # single spec
./run-tests.sh -p nva-e2e "cypress/e2e/nvi/*.feature"            # all specs for a service
./run-tests.sh -p nva-e2e -o                                     # open the interactive runner
```

`-p` can be omitted if `AWS_PROFILE` is set or the default profile points to the e2e account.
Run `./run-tests.sh -h` for all options.
Every `CYPRESS_*` variable is only fetched when not already set, so any of them can be overridden by exporting it before running the script.

## Deploying the pipeline stack

The pipeline template (`template/e2e_pipeline_template.yml`) has no CI/CD of its own.
It is deployed manually as the CloudFormation stack `combined-test-stack` in the e2e account, using an AWS CLI profile for that account.

1. Create a change set without executing it:

    ```bash
    aws cloudformation deploy \
      --profile nva-e2e \
      --region eu-west-1 \
      --stack-name combined-test-stack \
      --template-file template/e2e_pipeline_template.yml \
      --capabilities CAPABILITY_IAM \
      --no-execute-changeset
    ```

2. Review the changes (the deploy command prints the change set ARN):

    ```bash
    aws cloudformation describe-change-set \
      --profile nva-e2e \
      --region eu-west-1 \
      --change-set-name <arn-printed-by-deploy> \
      --query "Changes[].ResourceChange.[Action,LogicalResourceId,Replacement]" \
      --output table
    ```

3. Execute the change set:

    ```bash
    aws cloudformation execute-change-set \
      --profile nva-e2e \
      --region eu-west-1 \
      --change-set-name <arn-printed-by-deploy>
    ```

