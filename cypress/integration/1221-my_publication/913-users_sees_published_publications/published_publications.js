import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('Creator opens the page My Publications', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.setLocalStorage('amplify-signin-with-hostedUI', 'true');
    cy.visit('/');
    cy.get('[data-testid=my-publications').click({ force: true });
  });
});

When('they click Published registrations in the navigation bar', () => {
  cy.get('[data-testid=published-button').click({ force: true });
});
Then('they see a list of all published registrations with the fields', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get('h6').contains(value[0]);
  });
});
// | Title    |
// | Status |
// | Created  |
And('they see each list item has buttons Delete and Edit', () => {
  cy.get('[data-testid^=edit-publication]');
  cy.get('[data-testid^=delete-publication]');
});
And('the they see the Edit button is enabled', () => {});
And('the Delete button is enabled for registrations not marked as Deleted', () => {});
And('they see the navigation bar for unpublished registrations is enabled', () => {});
And('they see the navigation bar for published registrations is selected', () => {});
