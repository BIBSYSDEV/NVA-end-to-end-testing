import { adminUser } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { institutionFields } from '../../../support/data_testid_constants';

// Feature: Application Administrator opens a Customer Institution

// @574
// Scenario: Application Administrator opens a Customer Institution
Given('that the user is logged in as Application Administrator', () => {
  cy.login(adminUser);
});
When('they open a Customer Institution', () => {
  cy.get(`[data-testid=${dataTestId.header.basicDataLink}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.basicData.adminInstitutionsLink}]`).click({ force: true });
  cy.get('[data-testid="edit-institution-button-test-institution"]').first().click({ force: true });
});
Then('they see fields:', (dataTable) => {
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${institutionFields[field[0]]}]`).should('be.visible');
  });
});
// | Name in organization registry |
// | Display name                  |
// | Short display name            |
// | Archive name                  |
// | Feide Organization ID         |
And('they see the Save button', () => {
  cy.get('[data-testid=save-button]').should('be.visible');
});
And('they see the list of current Institution Administrators', () => {
  cy.get('[data-testid^=button-remove-role-]').should('have.length.above', 0);
});
And('every Institution Administrator has a Remove button', () => {
  cy.get('[data-testid^=button-remove-role-]').should('have.length', 5);
});
And('they see button to add a new Institution Administrator', () => {
  cy.get('[data-testid=button-open-add-admin]').should('be.visible');
});
