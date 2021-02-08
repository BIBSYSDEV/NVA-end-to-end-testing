import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import Amplify, { Auth } from 'aws-amplify';
import 'cypress-localstorage-commands';
import 'cypress-file-upload';

const AWS_ACCESS_KEY_ID = Cypress.env('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = Cypress.env('AWS_SECRET_ACCESS_KEY');
const AWS_SESSION_TOKEN = Cypress.env('AWS_SESSION_TOKEN');
const REGION = Cypress.env('AWS_REGION');
const IDENTITY_POOL_ID = Cypress.env('AWS_IDENTITY_POOL_ID');
const USER_POOL_ID = Cypress.env('AWS_USER_POOL_ID');
const CLIENT_ID = Cypress.env('AWS_CLIENT_ID');

AWS.config = new AWS.Config({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
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
    Amplify.configure(amplifyConfig);
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
        identityServiceProvider.adminInitiateAuth(authorizeUser, async (err, data) => {
          if (data) {
            if (!data.ChallengeName) {
              await Auth.signIn(userId, RANDOM_PASSWORD);
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

Cypress.Commands.add('login', (userId) => {
  cy.loginCognito(userId).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
  });
});

Cypress.Commands.add('startRegistrationWithFile', (fileName) => {
  cy.get('[data-testid=new-registration]').click({ force: true });
  cy.get('[data-testid=new-registration-file]').click({ force: true });
  cy.get('input[type=file]').attachFile(fileName);
});

Cypress.Commands.add('startRegistrationWithLink', (doiLink) => {
  cy.get('[data-testid=new-registration]').click({ force: true });
  cy.get('[data-testid=new-registration-link]').click({ force: true });
  cy.get('[data-testid=new-registration-link-input]').type(doiLink);
  cy.get('[data-testid=doi-search-button]').click({ force: true });
});

Cypress.Commands.add('logoutCognito', () => {
  Auth.signOut();
});

Cypress.Commands.add('createValidRegistration', () => {
  // Description
  cy.get('[data-testid=nav-tabpanel-description').click({ force: true });
  cy.get('[data-testid=registration-title-input]').type('Title');
  cy.get('[data-testid=date-published-field]').type('01.01.2020');

  // Reference
  cy.get('[data-testid=nav-tabpanel-reference').click({ force: true });

  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });

  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });

  cy.get('[data-testid=publisher-search-input]').click({ force: true }).type('Norges');
  cy.contains('Norges forskningsråd').click({ force: true });

  cy.get('[data-testid=peer_review-true]').click({ force: true });

  // Contributors
  cy.get('[data-testid=nav-tabpanel-contributors').click({ force: true });
  cy.get('[data-testid=add-contributor]').click({ force: true });
  cy.get('[data-testid=search-input]').type('Testuser Withauthor{enter}');
  cy.get('[data-testid=author-radio-button]').click({ force: true });
  cy.get('[data-testid=connect-author-button]').click({ force: true });

  // Files and reference
  cy.get('[data-testid=nav-tabpanel-files-and-license').click({ force: true });
  cy.get('[data-testid=uploaded-file-select-license]').click({ force: true }).type(' ');
  cy.get('[data-testid=license-item]').first().click({ force: true });
});

Cypress.Commands.add('testDataTestidList', (dataTable, values) => {
  dataTable.rawTable.forEach((value) => {
    cy.log(value[0]);
    cy.get(`[data-testid=${values[value[0]]}]`);
  });
});
