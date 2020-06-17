import AWS from 'aws-sdk';

AWS.config = new AWS.Config({
  accessKeyId: Cypress.env('AWS_ACCESS_KEY_ID'),
  secretAccessKey: Cypress.env('AWS_SECRET_ACCESS_KEY'),
  sessionToken: Cypress.env('AWS_SESSION_TOKEN'),
  region: 'eu-west-1',
});

const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const USER_POOL_ID = 'eu-west-1_Fto5AuFGa';
const CLIENT_ID = '55h2kkdaljjq693fsp1h05tbbj';

const TEMP_PASSWORD = 'Abcdefghijkl%9';
const NEW_PASSWORD = 'NewPassword%0';

const AUTH_FLOW = 'ADMIN_USER_PASSWORD_AUTH';
const NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED';

const CUSTOM_IDENTIFIERS = 'custom:identifiers';
const CUSTOM_ORG_LEGAL_NAME = 'custom:orgLegalName';
const CUSTOM_ORGN_UMBER = 'custom:orgNumber';
const CUSTOM_APPLICATION = 'custom:application';
const CUSTOM_APPLICATION_ROLES = 'custom:applicationRoles';
const CUSTOM_COMMON_NAME = 'custom:commonName';
const CUSTOM_FEIDE_ID = 'custom:feideId';
const CUSTOM_AFFILIATION = 'custom:affiliation';


Cypress.Commands.add('addUser', (userName) => {

  const testUser = {
    UserPoolId: USER_POOL_ID,
    Username: userName,
  }

  const createUser = {
  TemporaryPassword: TEMP_PASSWORD,
      UserAttributes: [
        { Name: CUSTOM_IDENTIFIERS, Value: 'feide:test@unit.no'},
        { Name: CUSTOM_ORG_LEGAL_NAME, Value: 'Unit'},
        { Name: CUSTOM_ORGN_UMBER, Value: 'NO818477822'},
        { Name: CUSTOM_APPLICATION, Value: 'NVA'},
        { Name: CUSTOM_APPLICATION_ROLES, Value: 'Publisher'},
        { Name: CUSTOM_COMMON_NAME, Value: 'Test User'},
        { Name: CUSTOM_FEIDE_ID, Value: 'test@unit.no'},
        { Name: CUSTOM_AFFILIATION, Value: '[member, employee, staff]'},
      ]
  }

  identityServiceProvider.adminGetUser(testUser, (err, data) => {
    if(data) {
      identityServiceProvider.adminDeleteUser(testUser, () => {});
    }
  });

  identityServiceProvider.adminCreateUser({...testUser, ...createUser}, (err, data) => {
    if (data) {

      const userId = data.User.Username;

      const authorizeUser = {
        AuthFlow: AUTH_FLOW,
        ClientId: CLIENT_ID,
        UserPoolId: USER_POOL_ID,
        AuthParameters: {
          'USERNAME': userId,
          'PASSWORD': TEMP_PASSWORD,
        }
      }
      
      identityServiceProvider.adminInitiateAuth(authorizeUser, (err, data) => {
        if(data) {
          if(data.ChallengeName === NEW_PASSWORD_REQUIRED) {

            const challenge = {
              ChallengeName: NEW_PASSWORD_REQUIRED,
              UserPoolId: USER_POOL_ID,
              ClientId: CLIENT_ID,
              Session: data.Session,
              ChallengeResponses: {
                'USERNAME': userId,
                'NEW_PASSWORD': NEW_PASSWORD,
              }
            }
            identityServiceProvider.adminRespondToAuthChallenge(challenge, (err, data) => {
              if(data) {
                return data.AuthenticationResult;
              }
            });
          }
        }
      });
    }
  });
})