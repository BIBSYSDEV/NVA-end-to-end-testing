// Feature: Request/Draft DOI button is disabled for Publications with existing DOI

import { USER_DRAFT_DOI } from '../../../support/constants';

// @1242
// Scenario: Request/Draft DOI button is disabled for Publications with existing DOI
Given('that a Creator views the Landing Page for a Publication', () => {
  cy.login(USER_DRAFT_DOI);
  cy.get('[data-testid=my-registrations]').click();
  cy.get('[data-testid=published-button]').click();
});
And('they are the Owner of this Publication', () => {
  cy.get('[data-testid^=registration-title]')
    .filter(':contains("Published registration with DOI")')
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').click();
    });
});
And('the Publication has a DOI', () => {
  cy.get('[data-testid=public-registration-doi-link]').should('be.visible');
});
When('they see the Status Bar', () => {
  cy.get('[data-testid=public-registration-status]').should('be.visible');
});
Then('they see that the "Reserve a DOI" button is not visible', () => {
  cy.get('[data-testid=button-toggle-request-doi]').should('not.exist');
});
// data-testid="button-toggle-request-doi"
