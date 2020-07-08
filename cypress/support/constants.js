export const ORCID_BASE_URL = Cypress.env('REACT_APP_ORCID_BASE_URL');
export const ORCID_USER_INFO_URL = `${ORCID_BASE_URL}/oauth/userinfo`;
const ORCID_CLIENT_ID = Cypress.env('REACT_APP_ORCID_CLIENT_ID');
export const ORCID_SIGN_IN_URL = `${ORCID_BASE_URL}/signin?oauth&client_id=${ORCID_CLIENT_ID}&response_type=token&scope=openid&redirect_uri=${process.env.REACT_APP_ORCID_REDIRECT_URI}`;
export const FEIDE_IDENTITY_PROVIDER = 'FeideIdentityProvider';

export const FEIDE_ID_QUALIFIER = 'feideid';

export const API_URL = Cypress.env('REACT_APP_API_URL');

export const StatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
};

export const AuthorityPaths = {
  PERSON: '/person',
};

export const USER = 'test-user-end-to-end@test.no';
export const NAME = 'End-to-end TestUser';

export const USER_WITH_AUTHOR = 'test-user-author@test.no';
export const NAME_WITH_AUTHOR = 'Author TestUser';

export const ADMIN_USER = 'test-user-admin@unit.no';
export const ADMIN_NAME = 'Admin TestUser';