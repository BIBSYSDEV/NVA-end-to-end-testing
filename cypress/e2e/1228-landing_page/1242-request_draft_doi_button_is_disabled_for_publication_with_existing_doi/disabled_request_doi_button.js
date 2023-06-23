// Feature: Request/Draft DOI button is disabled for Publications with existing DOI

import { today } from '../../../support/commands';
import { userDraftDoi } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { myRegistrationsTabs, landingPageButtons } from '../../../support/data_testid_constants';

const registrationTitles = {
  'Draft': `Draft registration with DOI ${today}`,
  'Published': `Published registration with DOI ${today}`,
};

// @1242
// Scenario Outline: Request/Draft DOI button is disabled for Registrations with existing DOI
Given('that a Creator views the Landing Page for a Registration', () => {
  cy.login(userDraftDoi);
  cy.openMyRegistrations();
});
And('they are the Owner of this Registration', () => {});
And('the Registration has status {string}', (status) => {
  cy.wrap(status).as('status');
  cy.getDataTestId('my-registrations-unpublished-checkbox').then((unPublishedCheckBox) => {
    const unPublished = unPublishedCheckBox.find('.Mui-checked').length > 0;
    cy.log(unPublished);
    ((status === 'Draft' && !unPublished) || (status === 'Published' && unPublished)) &&
      cy.getDataTestId('my-registrations-unpublished-checkbox').click();
  });
  cy.getDataTestId('my-registrations-published-checkbox').then((publishedCheckBox) => {
    const published = publishedCheckBox.find('.Mui-checked').length > 0;
    ((status === 'Draft' && published) || (status === 'Published' && !published)) &&
      cy.getDataTestId('my-registrations-published-checkbox').click();
  });
  cy.get(`[data-testid^=${dataTestId.startPage.searchResultItem}]`)
    .filter(`:contains(${registrationTitles[status]})`)
    .parent()
    .within(() => {
      cy.get('p > a').first().click();
    });
});
And('the Registration has a DOI', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
});
When('they see the Status Bar', () => {
  cy.get('@status').then((status) => {
    if (status === 'Draft') {
      cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
      cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
    }
  });
});
Then('they see that the {string} button is not visible', (button) => {
  cy.get(`[data-testid=${landingPageButtons[button]}]`).should('not.exist');
});
// Examples:
// | Status    | Button      |
// | Draft     | Reserve a DOI |
// | Published | Request a DOI |
