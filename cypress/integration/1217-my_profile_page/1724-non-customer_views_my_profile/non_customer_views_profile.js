import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_NON_CUSTOMER } from '../../../support/constants';

Given('that a User is logged in with Feide', () => {
  cy.login(USER_NON_CUSTOMER);
});
And('their Institution is not a Customer of NVA', () => {});
When('they navigate to My Profile', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
});
Then('they see that they have no roles', () => {
  cy.get('[data-testid^=user-role]').should('not.exist');
});
And('they see an information text explaining why they have no roles', () => {
  cy.get('[data-testid=not-customer-text]').should('be.visible');
});
And('they see their Institution name', () => {
  cy.get('[data-testid=not-customer-text]')
    .parent()
    .within(($presentation) => {
      cy.wrap($presentation).contains('Name: TestOrg').should('be.visible');
    });
});
And('they see their Feide Organization ID', () => {
  cy.get('[data-testid=not-customer-text]')
    .parent()
    .within(($presentation) => {
      cy.wrap($presentation).contains('Organization number: 0987654321').should('be.visible');
    });
});
