import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('Creator opens My Registrations', () => {
  cy.login(userWithAuthor);
  cy.get(`[data-testid=${dataTestId.header.menuButton}}]`).click();
  cy.get(`[data-testid=${dataTestId.header.myRegistrationsLink}}]`).click({ force: true });
});
When('they click Delete on an item', () => {
  cy.get('[data-testid^=registration-title]')
    .contains('Delete registration')
    .parent()
    .parent()
    .within((presentationLine) => {
      cy.get('[data-testid^=delete-registration]').click({ force: true });
    });
});
And('they see a confirmation pop-up is opened', () => {
  cy.get('[data-testid=confirm-delete-dialog]').should('be.visible');
});
And('they select Yes', () => {
  cy.get('[data-testid=accept-button]').click({ force: true });
});
Then('they see that the Registration is deleted', () => {
  cy.get('[data-testid^=registration-title]').contains('Delete registration').should('not.exist');
});
