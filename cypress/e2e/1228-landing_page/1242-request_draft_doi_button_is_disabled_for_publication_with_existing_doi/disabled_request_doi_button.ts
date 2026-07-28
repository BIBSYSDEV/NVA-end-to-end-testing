// Feature: Request/Draft DOI button is disabled for Publications with existing DOI

import { CategoryTypes, userName, userUnitDraftDoi } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { landingPageButtons } from '../../../support/data_testid_constants';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import {
  createDraftPublicationUsingAPI,
  createPublicationUsingAPI,
  NviLevels,
} from '../../../support/create_registration';

const registrationTitles = {
  'Draft': `Draft registration with DOI ${uuid()}`,
  'Published': `Published registration with DOI ${uuid()}`,
};

const initData = () => {
  cy.login(userUnitDraftDoi).then(() => {
    createPublicationUsingAPI(
      registrationTitles['Published'],
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitDraftDoi],
      NviLevels.LEVEL_1
    ).then();
    createDraftPublicationUsingAPI(
      registrationTitles['Draft'],
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitDraftDoi]
    ).then();
    cy.searchFor(registrationTitles['Published']);
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
    cy.getSuccess();

    cy.getDataTestId(dataTestId.header.myPageLink).click();
    cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
    cy.searchFor(registrationTitles['Draft']);
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.reserveDoiButton).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  });
};

BeforeAll(() => initData());

// @1242
// Scenario Outline: Request/Draft DOI button is disabled for Registrations with existing DOI
Given('that a Creator views the Landing Page for a Registration', () => {
  cy.login(userUnitDraftDoi);
  cy.openMyRegistrations();
  cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).click();
});
Given('they are the Owner of this Registration', () => {});
Given('the Registration has status {string}', (status) => {
  cy.wrap(status).as('status');

  if (status === 'Draft') {
    cy.getDataTestId(dataTestId.myPage.myRegistrationsUnpublishedCheckbox).click();
  } else {
    cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).click();
  }
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
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
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).should('be.visible');
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
    }
  });
});
Then('they see that the {string} button is not visible', (button: string) => {
  cy.getDataTestId(landingPageButtons[button]).should('not.exist');
});
// Examples:
// | Status    | Button      |
// | Draft     | Reserve a DOI |
// | Published | Request a DOI |
