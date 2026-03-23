import { adminUserUnit } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('that an App Admin or Institution Admin opens User Administration', () => {
  cy.login(adminUserUnit);
  cy.getDataTestId(dataTestId.header.basicDataLink).click({ force: true });
});
Given('they see only one current Institution Admin', () => {
  cy.getDataTestId(dataTestId.basicData.adminInstitutionsLink).click();
  cy.get('[data-testid=customer-institutions-list] > tbody > tr > td > p', { timeout: 30000 })
    .filter(':contains("UNIT")')
    .first()
    .parent()
    .parent()
    .within(() => {
      cy.get(`[data-testid^=edit-institution-button-]`).first().click();
    });
  cy.get('[data-testid^=button-remove-role-]').should('have.length', 1);
});
Then('they see that the Delete button on its name is disabled', () => {
  cy.get('[data-testid^=button-remove-role-]').first().should('be.disabled');
});
