import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('Creator opens My Publications', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
When('they click Delete on an item', () => {
  cy.get('[data-testid^=registration-title]')
    .contains('Delete publication')
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
Then('they see that the Publication is deleted', () => {
  cy.get('[data-testid^=registration-title]').contains('Delete publication').should('not.exist');
});
