import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import Amplify, { Auth } from 'aws-amplify';
import { createAuthority, getAuthorities } from './authorityApi';

const REGION = Cypress.env('AWS_REGION');
const IDENTITY_POOL_ID = Cypress.env('AWS_IDENTITY_POOL_ID');
const USER_POOL_ID = Cypress.env('AWS_USER_POOL_ID');
const CLIENT_ID = Cypress.env('AWS_CLIENT_ID');

if (Cypress.env('REMOTE') !== 'remote') {
  AWS.config = new AWS.Config({
    accessKeyId: 'AWS_ACCESS_KEY_ID',
    secretAccessKey: Cypress.env('AWS_SECRET_ACCESS_KEY'),
    sessionToken: Cypress.env('AWS_SESSION_TOKEN'),
    region: REGION,
  });
} else {
  AWS.config = new AWS.Config();
  AWS.config.update({ region: REGION });
}

AWS.config.getCredentials((err) => {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log('Access key:', AWS.config.credentials.accessKeyId);
  }
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
};

Cypress.Commands.add('connectAuthor', () => {
  cy.get('[data-testid=create-author-button]').click();
  cy.get('[data-testid=modal_next]').click();
});

Cypress.Commands.add('createAuthority', (newAuthority, IdToken) => {
  return new Cypress.Promise((resolve, reject) => {
    const authority = createAuthority(newAuthority.firstName, newAuthority.lastName, newAuthority.feideid, IdToken);
    if (authority) {
      resolve(authority);
    }
  });
});

Cypress.Commands.add('getAuthorities', (name, idToken) => {
  return new Cypress.Promise((resolve, reject) => {
    const authorities = getAuthorities(name, idToken);
    if (authorities) {
      resolve(authorities);
    } else {
      reject();
    }
  });
});

Cypress.Commands.add('skipOrcid', () => {
  cy.get('[data-testid=skip-connect-to-orcid]').click();
});

Cypress.Commands.add('connectOrcid', (user) => {});

Cypress.Commands.add('setLanguage', () => {
  cy.get('[data-testid=menu]').click();
  cy.get('[data-testid=menu-user-profile-button]').click();
  cy.get('[data-testid=language-selector]').click();
  cy.get('[data-testid=user-language-eng]').click();
});

Cypress.Commands.add('checkMenu', (table) => {
  cy.get('[data-testid=menu]').click();
  table.forEach((row) => {
    const menuItem = row[0];
    cy.log(menuItem);
    cy.get('li').should('contain.text', menuItem);
  });
});

Cypress.Commands.add('createCognitoUser', (userName, name) => {
  const createUser = {
    TemporaryPassword: TEMP_PASSWORD,
    MessageAction: 'SUPPRESS',
    UserAttributes: [
      { Name: NAME, Value: name },
      { Name: CUSTOM_IDENTIFIERS, Value: `feide:${userName}` },
      { Name: CUSTOM_ORG_LEGAL_NAME, Value: 'Unit' },
      { Name: CUSTOM_ORG_NUMBER, Value: 'NO818477822' },
      { Name: CUSTOM_APPLICATION, Value: 'NVA' },
      { Name: CUSTOM_APPLICATION_ROLES, Value: 'Publisher' },
      { Name: CUSTOM_COMMON_NAME, Value: name },
      { Name: CUSTOM_FEIDE_ID, Value: userName },
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
                  resolve(data.AuthenticationResult.IdToken);
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

Cypress.Commands.add('loginCognito', (userId, password) => {
  return new Cypress.Promise((resolve, reject) => {
    const authorizeUser = {
      AuthFlow: AUTH_FLOW,
      ClientId: CLIENT_ID,
      UserPoolId: USER_POOL_ID,
      AuthParameters: {
        USERNAME: userId,
        PASSWORD: password,
      },
    };

    const passwordParams = {
      Password: password,
      UserPoolId: USER_POOL_ID,
      Username: userId,
      Permanent: true,
    };

    identityServiceProvider.adminSetUserPassword(passwordParams, (err, data) => {
      if (data) {
        identityServiceProvider.adminInitiateAuth(authorizeUser, (err, data) => {
          if (data) {
            console.log(data);
            if (!data.ChallengeName) {
              Auth.signIn(userId, password);
              resolve(data.AuthenticationResult.IdToken);
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

Cypress.Commands.add('deleteCognitoUser', (userName) => {
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
