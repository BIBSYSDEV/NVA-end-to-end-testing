#!/usr/bin/env bash
#
# Recreates the E2E test data, like the pipeline's testdata stage
# (template/buildspec.testdata.yml).
#
# WARNING: this deletes all publications and NVI candidates in the target
# account and recreates the OpenSearch indices, before importing test users.
#
# Usage:
#   ./create-test-data.sh [options]
#
# Options:
#   -p PROFILE   AWS CLI profile (default: ambient credentials / $AWS_PROFILE)
#   -y           Skip the confirmation prompt
#   -h           Show this help
#
# Requires uv (https://docs.astral.sh/uv/) and an active AWS session for the
# e2e account, e.g.: aws sso login --profile nva-e2e

set -euo pipefail

usage() {
  grep '^#' "$0" | tail -n +2 | cut -c 3-
}

skip_confirmation=false

while getopts ':p:yh' option; do
  case $option in
    p) export AWS_PROFILE=$OPTARG ;;
    y) skip_confirmation=true ;;
    h) usage; exit 0 ;;
    :) echo "Option -$OPTARG requires a value" >&2; exit 1 ;;
    *) echo "Unknown option: -$OPTARG" >&2; exit 1 ;;
  esac
done
shift $((OPTIND - 1))

cd "$(dirname "$0")/test_data"

export AWS_REGION=${AWS_REGION:-eu-west-1}
export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-$AWS_REGION}

if ! caller_identity=$(aws sts get-caller-identity --output text --query '[Account,Arn]'); then
  echo "Could not resolve AWS credentials. Log in first, e.g.: aws sso login${AWS_PROFILE:+ --profile $AWS_PROFILE}" >&2
  exit 1
fi
read -r account_id caller_arn <<< "$caller_identity"

if [[ $skip_confirmation != true ]]; then
  account_alias=$(aws iam list-account-aliases --query 'AccountAliases[0]' --output text 2>/dev/null) || account_alias=''
  [[ $account_alias == None ]] && account_alias=''
  echo 'This deletes all publications and NVI candidates in this account:'
  echo "  Account: $account_id${account_alias:+ ($account_alias)}"
  echo "  Caller:  $caller_arn"
  read -r -p 'Continue? [y/N] ' answer
  [[ $answer == [yY] ]] || exit 1
fi

exec uv run --frozen create_test_data.py
