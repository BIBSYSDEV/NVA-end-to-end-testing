import { userDeleteRegistrations } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('Creator opens My Registrations', () => {
  cy.login(userDeleteRegistrations);
  cy.openMyRegistrations();
});
When('they click Delete on an item', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(':contains("Delete registration")')
    .first()
    .parent()
    .within(() => {
      cy.get('[data-testid^=delete-registration]').click();
    });
});
And('they see a confirmation pop-up is opened', () => {
  cy.get('[data-testid=confirm-delete-dialog]').should('be.visible');
});
And('they select Yes', () => {
  cy.get('[data-testid=accept-button]').click();
});
Then('they see that the Registration is deleted', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 1);
});

// Scenario: Creator deletes all Draft Registrations
Given('Creator opens My Registrations', () => {});
When('they select "Delete all drafts"', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
  cy.get('button').filter(':contains("Delete all drafts")').click();
});
And('they confirm that they want to Delete all drafts', () => {
  cy.get('[data-testid=accept-button]').click();
});
Then('all Draft Registration are deleted', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 0);
});
