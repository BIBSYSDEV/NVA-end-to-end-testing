import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('that the user is logged in as Creator', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.setLocalStorage('amplify-signin-with-hostedUI', 'true');
    cy.visit('/');
  });
});
And('is on the page My Publications', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-my-publications-button]').click({ force: true });
});
When('they click Edit on an item', () => {});
Then('they see the item is opened in the Wizard', () => {});
And('they see the Description tab', () => {});
And('they see fields:', () => {});
// | Title                        |
// | Alternative title(s)         |
// | Abstract                     |
// | Alternative abstract(s)      |
// | Description                  |
// | Date published               |
// | Primary language for content |
