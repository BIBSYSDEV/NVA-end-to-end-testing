// Feature: Request/Draft DOI button is disabled for Publications with existing DOI

import { userDraftDoi } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { myRegistrationsTabs, landingPageButtons } from '../../../support/data_testid_constants';

const registrationTitles = {
  'Draft': 'Draft registration with DOI',
  'Published': 'Published registration with DOI',
};

// @1242
// Scenario Outline: Request/Draft DOI button is disabled for Registrations with existing DOI
Given('that a Creator views the Landing Page for a Registration', () => {
  cy.login(userDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get('[data-testid=my-registrations-link]').click();
});
And('they are the Owner of this Registration', () => {});
And('the Registration has status {string}', (status) => {
  cy.get(`[data-testid=${myRegistrationsTabs[status]}]`).click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${registrationTitles[status]})`)
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
  cy.get(`[data-testid=${landingPageButtons[button]}]`).should('not.exist');
});
// Examples:
// | Status    | Button      |
// | Draft     | Reserve a DOI |
// | Published | Request a DOI |
