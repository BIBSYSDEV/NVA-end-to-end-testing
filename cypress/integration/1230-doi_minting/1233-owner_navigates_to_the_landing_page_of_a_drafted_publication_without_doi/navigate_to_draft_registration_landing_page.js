import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('that an Owner views the Landing Page for their Registration', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=menu-button]').click();
  cy.get('[data-testid=my-registrations-link]').click({ force: true });
});
And('the Registration has status Draft', () => {
  cy.get('[data-testid=unpublished-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .filter(':contains("Draft registration without DOI")')
    .parent()
    .within((presentationLine) => {
      cy.wrap(presentationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
});
And('the Registration has no DOI', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
});
When('they look at the Status Bar', () => {
  cy.get('[data-testid=public-registration-status]').as('status_bar');
});
Then('they see buttons for Reserve a DOI and Edit Registration', () => {
  cy.get('@status_bar').within((statusBar) => {
    cy.get('[data-testid=button-toggle-request-doi]').should('be.visible');
    cy.get('[data-testid=button-edit-registration]').should('be.visible');
  });
});
