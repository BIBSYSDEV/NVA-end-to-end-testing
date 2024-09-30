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

run Cypress tests:
npx cypress open --config baseUrl=https://e2e.nva.aws.unit.no/

