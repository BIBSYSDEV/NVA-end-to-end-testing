#!/usr/bin/env bash
#
# Runs Cypress specs against an NVA environment, fetching AWS credentials,
# Cognito configuration, and the dev basic-auth login from AWS.
#
# Usage:
#   ./run-tests.sh [options] [spec-pattern...]
#
# Examples:
#   ./run-tests.sh                                            # run all specs
#   ./run-tests.sh cypress/e2e/nvi/nvi-points.feature         # single spec
#   ./run-tests.sh "cypress/e2e/nvi/*.feature"                # all specs for a service
#   ./run-tests.sh -p nva-e2e cypress/e2e/nvi/*.feature       # explicit AWS profile
#   ./run-tests.sh -o                                         # open interactive runner
#
# Options:
#   -p PROFILE   AWS CLI profile (default: ambient credentials / $AWS_PROFILE)
#   -b BROWSER   Browser to run in (default: electron)
#   -u BASE_URL  Base URL of the environment under test (default: from cypress.config.ts)
#   -o           Open the interactive Cypress runner instead of a headless run
#   -h           Show this help
#
# Configuration values are only fetched from AWS when the corresponding
# CYPRESS_* variable is not already set in the environment, so any of them
# can be overridden by exporting it before running the script.

set -euo pipefail

usage() {
  grep '^#' "$0" | tail -n +2 | cut -c 3-
}

browser=electron
base_url=""
cypress_command=run

while getopts ':p:b:u:oh' option; do
  case $option in
    p) export AWS_PROFILE=$OPTARG ;;
    b) browser=$OPTARG ;;
    u) base_url=$OPTARG ;;
    o) cypress_command=open ;;
    h) usage; exit 0 ;;
    :) echo "Option -$OPTARG requires a value" >&2; exit 1 ;;
    *) echo "Unknown option: -$OPTARG" >&2; exit 1 ;;
  esac
done
shift $((OPTIND - 1))

cd "$(dirname "$0")"

if ! aws_credentials=$(aws configure export-credentials --format env-no-export); then
  echo "Could not export AWS credentials. Log in first, e.g.: aws sso login${AWS_PROFILE:+ --profile $AWS_PROFILE}" >&2
  exit 1
fi
while IFS= read -r credential_line; do
  export "CYPRESS_$credential_line"
done <<< "$aws_credentials"
export CYPRESS_AWS_REGION=${CYPRESS_AWS_REGION:-eu-west-1}

fetch_ssm_parameter() {
  aws ssm get-parameter --name "$1" --query Parameter.Value --output text
}

export CYPRESS_COGNITO_URI=${CYPRESS_COGNITO_URI:-$(fetch_ssm_parameter /NVA/CognitoUri)}
export CYPRESS_AWS_CLIENT_ID=${CYPRESS_AWS_CLIENT_ID:-$(fetch_ssm_parameter /CognitoUserPoolAppClientId)}

if [[ -z ${CYPRESS_DEVUSER:-} || -z ${CYPRESS_DEVPASSWORD:-} ]]; then
  dev_login_secret=$(aws secretsmanager get-secret-value --secret-id E2ETesting --query SecretString --output text)
  export CYPRESS_DEVUSER=${CYPRESS_DEVUSER:-$(jq -r .DevUser <<< "$dev_login_secret")}
  export CYPRESS_DEVPASSWORD=${CYPRESS_DEVPASSWORD:-$(jq -r .DevPassword <<< "$dev_login_secret")}
fi

cypress_args=("$cypress_command" --browser "$browser")
if [[ -n $base_url ]]; then
  cypress_args+=(--config "baseUrl=$base_url")
fi
if (($# > 0)); then
  cypress_args+=(--spec "$(IFS=,; echo "$*")")
fi

npx cypress "${cypress_args[@]}"
