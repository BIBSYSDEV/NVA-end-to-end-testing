import { adminUser } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('that an App Admin or Institution Admin opens User Administration', () => {
  cy.login(adminUser);
  cy.get(`[data-testid=${dataTestId.header.basicDataLink}]`).click({ force: true });
});
And('they see only one current Institution Admin', () => {
  cy.get(`[data-testid=${dataTestId.basicData.adminInstitutionsLink}]`).click();
  cy.get('[data-testid=customer-institutions-list] > tbody > tr > td > p', { timeout: 30000 })
    .filter(':contains("Test Institution")')
    .first()
    .parent()
    .parent()
    .within(() => {
      cy.get(`[data-testid^=edit-institution-button-]`)
        .first()
        .click();
    })
  cy.get('[data-testid^=button-remove-role-Institution-admin]').should('have.length', 1);
});
Then('they see that the Delete button on its name is disabled', () => {
  cy.get('[data-testid^=button-remove-role-Institution-admin]').first().should('be.disabled');
});
