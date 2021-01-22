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

export const USER_WITH_AUTHOR = 'test-user-with-author@test.no';

export const USER_ADD_INSTITUTION = 'test-user-add-institution@test.no';

export const USER_CHANGE_INSTITUTION = 'test-user-change-institution@test.no';

export const USER_WITH_INSTITUTION_REMOVE_INSTITUTION = 'test-user-with-institution-remove-institution@test.no';

export const USER_CURATOR_WITH_AUTHOR = 'test-user-curator@test.no';

export const USER_INST_ADMIN_WITH_AUTHOR = 'test-user-inst-admin@test.no';

export const ADMIN_USER = 'test-user-app-admin@test.no';

export const TEST_USER = 'test-user-login@test.no';

export const USER_NO_ROLE = 'test-user-with-no-role@test.no';

export const USER_REMOVE_ORCID = 'test-user-remove-existing-orcid@test.no';

export const USER_NON_CUSTOMER = 'test-user-not-customer@test.no';
