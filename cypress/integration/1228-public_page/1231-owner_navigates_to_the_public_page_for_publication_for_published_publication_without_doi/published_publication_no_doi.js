import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('that the Creator navigates to the Public Page for Publication', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid=published-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .filter(':contains("Published publication without DOI")') // need to use text search to find correct registration
    .parent()
    .within((publicationLine) => {
      cy.wrap(publicationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
});
And('they are the Owner of this Publication', () => {});
And('the Publication has no DOI', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
});
When('they see the Status Bar', () => {
  cy.get('[data-testid=public-registration-status]');
});
Then('they see buttons for "Request a DOI" and "Edit Publication"', () => {
  cy.get('[data-testid=button-toggle-request-doi]').should('be.visible');
  cy.get('[data-testid=button-edit-registration]').should('be.visible');
});
