import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('Creator opens My Registrations', () => {
  cy.login(userWithAuthor);
  cy.openMyRegistrations();
});
When('they click Delete on an item', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .contains('Delete registration')
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
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .contains('Delete registration')
    .should('not.exist');
});
