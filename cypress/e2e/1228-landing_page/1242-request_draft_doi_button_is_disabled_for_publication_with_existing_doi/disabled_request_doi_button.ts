// Feature: Request/Draft DOI button is disabled for Publications with existing DOI

import { userDraftDoi } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { landingPageButtons } from '../../../support/data_testid_constants';
import { v4 as uuid } from 'uuid';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const registrationTitles = {
  'Draft': `Draft registration with DOI ${uuid()}`,
  'Published': `Published registration with DOI ${uuid()}`,
};

let init = false;

const initData = () => {
  if (!init) {
    cy.createPublishedRegistration(registrationTitles['Published']);
    cy.wait(50000);
    cy.refreshPublish();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(null, registrationTitles['Draft']);
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.reserveDoiButton).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
    init = true;
  }
};

// @1242
// Scenario Outline: Request/Draft DOI button is disabled for Registrations with existing DOI
Given('that a Creator views the Landing Page for a Registration', () => {
  cy.login(userDraftDoi);
  initData();
  cy.openMyRegistrations();
});
Given('they are the Owner of this Registration', () => { });
Given('the Registration has status {string}', (status) => {
  cy.wrap(status).as('status');
  cy.getDataTestId('my-registrations-unpublished-checkbox').then((unPublishedCheckBox) => {
    const unPublished = unPublishedCheckBox.find('.Mui-checked').length > 0;
    ((status === 'Draft' && !unPublished) || (status === 'Published' && unPublished)) &&
      cy.getDataTestId('my-registrations-unpublished-checkbox').click();
  });
  cy.getDataTestId('my-registrations-published-checkbox').then((publishedCheckBox) => {
    const published = publishedCheckBox.find('.Mui-checked').length > 0;
    ((status === 'Draft' && published) || (status === 'Published' && !published)) &&
      cy.getDataTestId('my-registrations-published-checkbox').click();
  });
  cy.get(`[data-testid^=${dataTestId.startPage.searchResultItem}]`)
    .filter(`:contains(${registrationTitles[status.toString()]})`)
    .parent()
    .within(() => {
      cy.get('p > a').first().click();
    });
});
Given('the Registration has a DOI', () => {
  // cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
});
When('they see the Status Bar', () => {
  cy.get('@status').then((status) => {
    if (status.toString() === 'Draft') {
      cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
      cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
    }
  });
});
Then('they see that the {string} button is not visible', (button: string) => {
  cy.get(`[data-testid=${landingPageButtons[button]}]`).should('not.exist');
});
// Examples:
// | Status    | Button      |
// | Draft     | Reserve a DOI |
// | Published | Request a DOI |
