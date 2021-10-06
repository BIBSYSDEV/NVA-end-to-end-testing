// Feature: Request/Draft DOI button is disabled for Publications with existing DOI

import { USER_WITH_AUTHOR } from '../../../support/constants';

// @1242
// Scenario: Request/Draft DOI button is disabled for Publications with existing DOI
Given('that a Creator views the Landing Page for a Publication', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click();
  cy.get('[data-testid=published-button]').click();
  cy.get('[data-testid^=registration-title-]')
    .contains('View Landing Page')
    .parent()
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration-]').click();
    });
});
And('they are the Owner of this Publication', () => {});
And('the Publication has a DOI', () => {});
When('they see the Status Bar', () => {
  cy.get('[data-testid=public-registration-status]').should('be.visible');
});
Then(/they see that the Request\/Draft DOI button is disabled/, () => {
  cy.get('[data-testid=button-toggle-request-doi]').should('not.exist');
});
