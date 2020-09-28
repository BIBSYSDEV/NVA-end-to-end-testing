import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';
import Amplify, { Auth } from 'aws-amplify';

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

Amplify.configure(amplifyConfig);

Given('that the user is logged in as Creator', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
  });
});
And('is on the page My Publications', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-my-publications-button]').click({ force: true });
});
When('they click Edit on an item', () => {
  cy.get('[data-testid^=edit-publication]').click({ force: true });
});
Then('they see the item is opened in the Wizard', () => {});
And('they see the Description tab', () => {
  cy.get('[data-testid=nav-tabpanel-description');
});
And('they see fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`form`).within(($input) => {
      cy.get('span').contains(value[0]);
    });
  });
});

After(() => {
  cy.logoutCognito();
});
// | Title                        |
// | Alternative title(s)         |
// | Abstract                     |
// | Alternative abstract(s)      |
// | Description                  |
// | Date published               |
// | Primary language for content |
