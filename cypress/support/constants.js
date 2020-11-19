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

export const USER_WITH_AUTHOR = 'test-user-with-author@test.no';
export const NAME_WITH_AUTHOR = 'Withauthor TestUser';

export const USER_ADD_INSTITUTION = 'test-user-add-institution@test.no';
export const NAME_ADD_INSTITUTION = 'Add institution TestUser';

export const USER_WITH_INSTITUTION_REMOVE_INSTITUTION = 'test-user-with-institution-remove-institution@test.no';
export const NAME_WITH_INSTITUTION_REMOVE_INSTITUTION = 'Remove institution TestUser';

export const USER_CURATOR_WITH_AUTHOR = 'test-user-curator@test.no';
export const NAME_CURATOR_WITH_AUTHOR = 'Curator TestUser';

export const USER_INST_ADMIN_WITH_AUTHOR = 'test-user-inst-admin@test.no';
export const NAME_INST_ADMIN_WITH_AUTHOR = 'Institution-admin TestUser';

export const ADMIN_USER = 'test-user-app-admin@test.no';
export const ADMIN_NAME = 'App-admin TestUser';

export const TEST_USER = 'test-user-login@test.no';
export const TEST_USER_NAME = 'Login TestUser';

export const USER_NO_ROLE = 'test-user-with-no-role@test.no';
export const USER_NO_ROLE_NAME = 'Login TestUser';
