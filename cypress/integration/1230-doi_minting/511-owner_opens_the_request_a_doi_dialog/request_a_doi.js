import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('that a Creator navigates to the Landing page for published Registration without DOI', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click({ force: true });
  cy.get('[data-testid=published-button]').click({ force: true });
  cy.get('[data-testid^=registration-title]')
    .filter(':contains("Published publication without DOI")')
    .parent()
    .within((presentationLine) => {
      cy.wrap(presentationLine).get('[data-testid^=open-registration]').click({ force: true });
    });
});
And('they are the Owner of this Registration', () => {});
And('they click the "Request a DOI" button', () => {
  cy.get('[data-testid=button-toggle-request-doi]').click({ force: true });
});
Then('the "Request a DOI dialog" is opened', () => {
  cy.get('[data-testid=request-doi-modal]').should('be.visible');
});
And('they see fields for Message', () => {
  cy.get('[data-testid=request-doi-message]').should('be.visible');
});
And('they see a "Send Request" button', () => {
  cy.get('[data-testid=button-send-doi-request]').should('be.visible');
});
