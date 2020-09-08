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

const AUTH_FLOW = 'ADMIN_USER_PASSWORD_AUTH';

Cypress.Commands.add('connectAuthor', () => {
  cy.get('[data-testid=create-author-button]').click();
  cy.get('[data-testid=modal_next]').click();
});

Cypress.Commands.add('skipOrcid', () => {
  cy.get('[data-testid=skip-connect-to-orcid]').click();
});

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

Cypress.Commands.add('loginCognito', (userId) => {
  return new Cypress.Promise((resolve, reject) => {
    const RANDOM_PASSWORD = `P%${uuidv4()}`;

    const authorizeUser = {
      AuthFlow: AUTH_FLOW,
      ClientId: CLIENT_ID,
      UserPoolId: USER_POOL_ID,
      AuthParameters: {
        USERNAME: userId,
        PASSWORD: RANDOM_PASSWORD,
      },
    };

    const passwordParams = {
      Password: RANDOM_PASSWORD,
      UserPoolId: USER_POOL_ID,
      Username: userId,
      Permanent: true,
    };

    identityServiceProvider.adminSetUserPassword(passwordParams, (err, data) => {
      if (data) {
        identityServiceProvider.adminInitiateAuth(authorizeUser, (err, data) => {
          if (data) {
            if (!data.ChallengeName) {
              Auth.signIn(userId, RANDOM_PASSWORD);
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
