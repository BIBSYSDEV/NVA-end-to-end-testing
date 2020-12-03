import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('Creator opens the page My Publications', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
When('they click Published registrations in the navigation bar', () => {
  cy.get('[data-testid=published-button]').click({ force: true });
});
Then('they see a list of all published registrations with the fields', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    console.log(value[0]);
  });
});
// | Title      |
// | "<Status>" |
// | Created    |
And('they see each list item has buttons Delete and Edit', () => {
  cy.get('[data-testid^=edit-registration]').should('exist');
  cy.get('[data-testid^=delete-registration]').should('exist');
});
And('the they see the Edit button is enabled', () => {
  cy.get('[data-testid^=edit-registration]').should('be.enabled');
});
And('the Delete button is enabled for registrations not marked as Deleted', () => {});
And('they see the navigation bar for unpublished registrations is enabled', () => {
  cy.get('[data-testid=unpublished-button]').should('be.enabled');
});
And('they see the navigation bar for published registrations is selected', () => {});

// Examples:
//     | Status    |
//     | Deleted   |
//     | Published |
