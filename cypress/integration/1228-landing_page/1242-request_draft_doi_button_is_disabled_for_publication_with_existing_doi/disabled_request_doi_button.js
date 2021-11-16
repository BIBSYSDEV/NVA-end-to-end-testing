// Feature: Request/Draft DOI button is disabled for Publications with existing DOI

import { USER_DRAFT_DOI } from '../../../support/constants';
import { myRegistrationsTabs, landingPageButtons } from '../../../support/data_testid_constants';

const registrationTitles = {

  'Draft': 'Draft registration with DOI',
  'Published': 'Published registration with DOI',
};

// @1242
// Scenario Outline: Request/Draft DOI button is disabled for Registrations with existing DOI
Given('that a Creator views the Landing Page for a Registration', () => {
  cy.login(USER_DRAFT_DOI);
  cy.get('[data-testid=my-registrations]').click();
});
And('they are the Owner of this Registration', () => {});
And('the Registration has status {string}', (status) => {
  cy.get(`[data-testid=${my_registrations_tabs[status]}]`).click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${registration_titles[status]})`)
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').click();
    });
});
And('the Registration has a DOI', () => {
  cy.get('[data-testid=public-registration-doi-link]').should('be.visible');
});
When('they see the Status Bar', () => {
  cy.get('[data-testid=public-registration-status]').should('be.visible');
});
Then('they see that the {string} button is not visible', (button) => {
  cy.get(`[data-testid=${landing_page_buttons[button]}]`).should('not.exist');
});
// Examples:
// | Status    | Button      |
// | Draft     | Reserve a DOI |
// | Published | Request a DOI |
