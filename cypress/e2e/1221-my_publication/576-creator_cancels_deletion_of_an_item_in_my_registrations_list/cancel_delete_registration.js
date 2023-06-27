import { userCancelDelete } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Creator cancels deletion of an item in My Registrations list

// @576
// Scenario: Creator cancels deletion of an item in My Registrations list
Given('that the user is logged in as Creator', () => {
  cy.login(userCancelDelete);
});
And('is on the My Registrations page', () => {
  cy.openMyRegistrations();
});
When('they click Delete on an item', () => {
  cy.get('[data-testid^=delete-registration]').first().as('registration');
  cy.get('[data-testid^=delete-registration]').first().click({ force: true });
});
And('they click No in the confirmation dialog', () => {
  cy.getDataTestId(dataTestId.confirmDialog.cancelButton).click({ force: true });
});
Then('they see the Registration in My Registrations list', () => {
  cy.get('@registration').should('be.visible');
});
