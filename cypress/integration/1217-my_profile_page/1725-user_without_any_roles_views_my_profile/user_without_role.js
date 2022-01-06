import { userNoRole } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestids';

Given('that a User is logged in with Feide', () => {
  cy.login(userNoRole);
  cy.mockInstitution();
  cy.mockDepartments();
});
And('their Institution is a Customer of NVA', () => {});
And('their Administrator has not assigned any roles to them', () => {});
When('they navigate to My Profile', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.header.myProfileLink}]`).click({ force: true });
});
Then('they see that they have no roles', () => {
  cy.get('[data-testid^=user-role]').should('not.exist');
});
And('they see an Information text explaining why they have no roles', () => {
  cy.get('[data-testid=no-roles-text]').should('exist');
});
