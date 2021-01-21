import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { MY_REGISTRATION_FIELDS, MY_REGISTRATION_BUTTONS } from '../../../support/data_testid_constants';

Given('Creator opens the page My Publications', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations').click({ force: true });
});
When('they click Published registrations in the navigation bar', () => {
  cy.get('[data-testid=published-button]').click({ force: true });
});
Then('they see a list of all published registrations with the fields', (dataTable) => {
  cy.testDataTestidList(dataTable, MY_REGISTRATION_FIELDS);
});
// | Title      |
// | Status     |
// | Created    |
And('they see list items with Status', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get('[data-testid^=registration-status]').contains(value[0]);
  });
});
// | Deleted   |
// | Published |
And('they see each list item has buttons', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid^=${MY_REGISTRATION_BUTTONS[value[0]]}]`).should('have.length', 2);
  });
});
// | Show   |
// | Edit   |
// | Delete |
And('the they see the Edit button is enabled', () => {
  cy.get('[data-testid^=registration-title]').each((registrationLine) => {
    cy.get(registrationLine)
      .parent()
      .within(() => {
        cy.get('[data-testid^=edit-registration]').first().should('be.enabled');
      });
  });
});
And('the Delete button is enabled for registrations not marked as Deleted', () => {});
And('they see the navigation bar for unpublished registrations is enabled', () => {
  cy.get('[data-testid=unpublished-button]');
});
And('they see the navigation bar for published registrations is selected', () => {
  cy.get('[data-testid=published-button][tabindex=0]');
});
