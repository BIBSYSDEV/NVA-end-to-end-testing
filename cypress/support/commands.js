import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import Amplify, { Auth } from 'aws-amplify';

const REGION = Cypress.env('AWS_REGION');
const IDENTITY_POOL_ID = Cypress.env('AWS_IDENTITY_POOL_ID');
const USER_POOL_ID = Cypress.env('AWS_USER_POOL_ID');
const CLIENT_ID = Cypress.env('AWS_CLIENT_ID');

AWS.config = new AWS.Config({
  accessKeyId: Cypress.env('AWS_ACCESS_KEY_ID'),
  secretAccessKey: Cypress.env('AWS_SECRET_ACCESS_KEY'),
  sessionToken: Cypress.env('AWS_SESSION_TOKEN'),
  region: REGION,
});

const amplifyConfig = {
  Auth: {
    identityPoolId: IDENTITY_POOL_ID,
    region: REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: CLIENT_ID,
  },
};

Amplify.configure(amplifyConfig);

const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const TEMP_PASSWORD = uuidv4() + 'P%9';
const NEW_PASSWORD = uuidv4() + 'P%0';

const AUTH_FLOW = 'ADMIN_USER_PASSWORD_AUTH';
const NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED';

const NAME = 'name';
const CUSTOM_IDENTIFIERS = 'custom:identifiers';
const CUSTOM_ORG_LEGAL_NAME = 'custom:orgLegalName';
const CUSTOM_ORG_NUMBER = 'custom:orgNumber';
const CUSTOM_APPLICATION = 'custom:application';
const CUSTOM_APPLICATION_ROLES = 'custom:applicationRoles';
const CUSTOM_COMMON_NAME = 'custom:commonName';
const CUSTOM_FEIDE_ID = 'custom:feideId';
const CUSTOM_AFFILIATION = 'custom:affiliation';

const testUser = {
  UserPoolId: USER_POOL_ID,
  Username: 'testuser',
};

Cypress.Commands.add('addUser', (userName) => {
  const createUser = {
    TemporaryPassword: TEMP_PASSWORD,
    MessageAction: 'SUPPRESS',
    UserAttributes: [
      { Name: NAME, Value: 'Test User' },
      { Name: CUSTOM_IDENTIFIERS, Value: 'feide:test@unit.no' },
      { Name: CUSTOM_ORG_LEGAL_NAME, Value: 'Unit' },
      { Name: CUSTOM_ORG_NUMBER, Value: 'NO818477822' },
      { Name: CUSTOM_APPLICATION, Value: 'NVA' },
      { Name: CUSTOM_APPLICATION_ROLES, Value: 'Publisher' },
      { Name: CUSTOM_COMMON_NAME, Value: 'Test User' },
      { Name: CUSTOM_FEIDE_ID, Value: 'test@unit.no' },
      { Name: CUSTOM_AFFILIATION, Value: '[member, employee, staff]' },
    ],
  };

  return new Cypress.Promise((resolve, reject) => {
    identityServiceProvider.adminCreateUser({ ...testUser, ...createUser, Username: userName }, (err, data) => {
      if (data) {
        const userId = data.User.Username;

        const authorizeUser = {
          AuthFlow: AUTH_FLOW,
          ClientId: CLIENT_ID,
          UserPoolId: USER_POOL_ID,
          AuthParameters: {
            USERNAME: userId,
            PASSWORD: TEMP_PASSWORD,
          },
        };

        identityServiceProvider.adminInitiateAuth(authorizeUser, (err, data) => {
          if (data) {
            if (data.ChallengeName === NEW_PASSWORD_REQUIRED) {
              const challenge = {
                ChallengeName: NEW_PASSWORD_REQUIRED,
                UserPoolId: USER_POOL_ID,
                ClientId: CLIENT_ID,
                Session: data.Session,
                ChallengeResponses: {
                  USERNAME: userId,
                  NEW_PASSWORD: NEW_PASSWORD,
                },
              };
              identityServiceProvider.adminRespondToAuthChallenge(challenge, (err, data) => {
                if (data) {
                  Auth.signIn(userName, NEW_PASSWORD);
                  resolve(userId);
                } else {
                  reject(err);
                }
              });
            }
          } else {
            reject(err);
          }
        });
      } else {
        reject(err);
      }
    });
  });
});

Cypress.Commands.add('deleteUser', (userName) => {
  return new Cypress.Promise((resolve, reject) => {
    const deleteUser = { ...testUser, Username: userName };
    identityServiceProvider.adminGetUser(deleteUser, (err, data) => {
      if (data) {
        identityServiceProvider.adminDeleteUser(deleteUser, () => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
});
