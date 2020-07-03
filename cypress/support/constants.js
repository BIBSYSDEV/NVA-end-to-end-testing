export const ORCID_BASE_URL = process.env.REACT_APP_ORCID_BASE_URL;
export const ORCID_USER_INFO_URL = `${ORCID_BASE_URL}/oauth/userinfo`;
export const ORCID_SIGN_IN_URL = `${ORCID_BASE_URL}/signin?oauth&client_id=${process.env.REACT_APP_ORCID_CLIENT_ID}&response_type=token&scope=openid&redirect_uri=${process.env.REACT_APP_ORCID_REDIRECT_URI}`;
export const FEIDE_IDENTITY_PROVIDER = 'FeideIdentityProvider';

export const FEIDE_ID_QUALIFIER = 'feideid';

export const API_URL = process.env.REACT_APP_API_URL;

export const StatusCode = {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
}

export const AuthorityPaths = {
    PERSON = '/person',
}