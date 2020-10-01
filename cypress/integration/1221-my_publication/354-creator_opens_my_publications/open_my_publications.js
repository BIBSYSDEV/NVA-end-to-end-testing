import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('the user is logged in as Creator', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
  });
});
When('they click the button My Publications', () => {
  cy.get('[data-testid=my-publications').click({ force: true });
});
Then('they see My Publications', () => {
  cy.get('h1').contains('My publications');
});
And('they see a list of all unpublished registrations with the fields', (dataTable) => {});
// | Publication name |
// | <Status>         |
// | Date             |
And('they see each list item has a button Delete and Edit that is enabled', () => {});
And('they see the navigation bar for unpublished registrations is selected', () => {
  cy.get('[data-testid=unpublished-button][tabindex=0]');
});
And('they see the navigation bar for published registrations is enabled', () => {
  cy.get('[data-testid=published-button]');
});

//   Examples:
//     | Status   |
//     | Draft    |
//     | Rejected |
