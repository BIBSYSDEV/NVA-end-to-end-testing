import { today } from '../../../support/commands';
import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Owner navigates to the Landing Page for their Registration

// Common steps
Given('that the Creator navigates to the Landing Page for a Resource', () => {
  cy.login(userWithAuthor);
});
And('they are the Owner of the Resource', () => {
  cy.openMyRegistrations();
});
// End common steps

// @1231
// Scenario: Owner navigates to the Landing Page for their Published Registration without DOI

And('the Resource has no DOI', () => {
  cy.get('[data-testid=published-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains("Published registration no DOI ${today}")`) // need to use text search to find correct registration
    .parent()
    .within((publicationLine) => {
      cy.wrap(publicationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
  cy.get('[data-testid=doi-presentation]').should('not.exist');
});
When('they see the Status Bar', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
});
Then('they see buttons for "Request a DOI" and "Edit Resource"', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.requestDoiButton}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.editButton}]`).should('be.visible');
});

// Scenario: Owner navigates to the Landing Page for their Registration with Validation Errors
When('the Creator navigates to the Landing Page', () => {
  cy.login(userWithAuthor);
  cy.openMyRegistrations();
});
And('the Resource has Validation Errors', () => { });
And('the Resource is a draft', () => {
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains("Registration with validation error ${today}")`) // need to use text search to find correct registration
    .parent()
    .within((publicationLine) => {
      cy.wrap(publicationLine).get('[data-testid^=open-registration]').first().click({ force: true });
    });
});
Then('they see a List of all Validation Errors for the Resource', () => {
  cy.get('[data-testid=error-list-div]').should('be.visible');
});
And('they see a "Edit registration" button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.backToWizard}]`).should('be.visible');
});
