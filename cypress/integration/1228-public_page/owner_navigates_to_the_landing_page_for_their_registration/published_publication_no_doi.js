import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

// Feature: Owner navigates to the Landing Page for their Registration

// Common steps
Given('that the Creator navigates to the Landing Page for a Registration', () => {
  cy.login(USER_WITH_AUTHOR);
});
And('they are the Owner of the Registration', () => {
  cy.get('[data-testid=my-registrations]').click({ force: true });
});
// End common steps

// @1231
// Scenario: Owner navigates to the Landing Page for their Published Registration without DOI

And('the Registration has no DOI', () => {
  cy.get('[data-testid=published-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
     .filter(':contains("Published registration without DOI")') // need to use text search to find correct registration
    .parent()
    .within((publicationLine) => {
      cy.wrap(publicationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
  cy.get('[data-testid=doi-presentation]').should('not.exist');
});
When('they see the Status Bar', () => {
  cy.get('[data-testid=public-registration-status]');
});
Then('they see buttons for "Request a DOI" and "Edit Registration"', () => {
  cy.get('[data-testid=button-toggle-request-doi]').should('be.visible');
  cy.get('[data-testid=button-edit-registration]').should('be.visible');
});

// Scenario: Owner navigates to the Landing Page for their Registration with Validation Errors
And('the Registration has Validation Errors', () => {
  cy.get('[data-testid^=registration-title]')
     .filter(':contains("Registration with validation error")') // need to use text search to find correct registration
    .parent()
    .within((publicationLine) => {
      cy.wrap(publicationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
});
When('they see the Landing Page for the Registration', () => {
  cy.location('pathname').should('contain', '/public');
});
Then('they see a List of all Validation Errors for the Registration', () => {
  cy.get('[data-testid=error-list-div]').should('be.visible');
});
And('they see a "Go back to schema" button', () => {
  cy.get('[data-testid=back-to-wizard-button]').should('be.visible');
});
