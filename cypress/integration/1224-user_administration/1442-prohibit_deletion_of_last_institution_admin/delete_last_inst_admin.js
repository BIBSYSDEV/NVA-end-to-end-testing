import { userInstAdminWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('that an App Admin or Institution Admin opens User Administration', () => {
  cy.login(userInstAdminWithAuthor);
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.header.adminUsersLink}]`).click({ force: true });
});
And('they see only one current Institution Admin', () => {
  cy.get('[data-testid^=button-remove-role-Institution-admin]').should('have.length', 1);
});
Then('they see that the Delete button on its name is disabled', () => {
  cy.get('[data-testid^=button-remove-role-Institution-admin]').first().should('be.disabled');
});
