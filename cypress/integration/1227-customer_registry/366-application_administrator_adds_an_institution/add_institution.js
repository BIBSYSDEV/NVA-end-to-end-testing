import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { ADMIN_USER } from '../../../support/constants';
import { INSTITUTION_FIELDS } from '../../../support/data_testid_constants';

// Feature: Application Administrator adds an Institution

//   @366
//   Scenario: Application Administrator adds an Institution
Given('that the user is logged in as Application Administrator', () => {
  cy.login(ADMIN_USER);
});
And('they click the menu item Institutions', () => {
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=admin-institutions-link]').click({ force: true });
});
When('they click Add Institution', () => {
  cy.get('[data-testid=add-institution-button]').click({ force: true });
});
Then('they see the Add Institution page', () => {
  cy.location('pathname').should('equal', '/admin-institutions');
  cy.location('search').should('equal', '?id=new');
});
And('they see fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${INSTITUTION_FIELDS[field[0]]}]`).should('be.visible');
  });
});
//   | Name in organization registry |
//   | Display name                  |
//   | Short display name            |
//   | Archive name                  |
//   | Feide Organization ID         |
And('a button Create that is enabled', () => {
  cy.get('[data-testid=save-button]').should('be.enabled');
});
