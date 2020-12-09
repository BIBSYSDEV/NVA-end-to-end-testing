import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { ADMIN_USER } from '../../../support/constants';

Given('that the user is logged in as Application Administrator', () => {
  cy.login(ADMIN_USER);
});
When('they click the menu item Institutions', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-button]').click({ force: true });
});
Then('they see the page Institutions', () => {
  cy.location('pathname').should('equal', '/admin-institutions');
});
And('they see a table of all Institutions', () => {
  cy.get('[data-testid=customer-institutions-list]').should('be.visible');
});
And('they see the table contains the fields', (tableData) => {
  cy.get('[data-testid=customer-institutions-list]').within(($institutitons) => {
    // cy.get('thead').contains()
  });
});
// | Institution |
// | Created     |
// | Editor      |
And('they see a button Open that is enabled for each Institution', () => {
  cy.get('[data-testid^=edit-institution]').should('have.length.above', 0);
});
And('they see a button Create Institution that is enabled', () => {
  cy.get('[data-testid=add-institution-button]').should('be.visible').and('be.enabled');
});
