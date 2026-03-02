// Feature: test for metadata and file publishing

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, TestUsers } from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';
import { createPublicationUsingAPI, NviLevels } from '../../../support/create_registration';

BeforeAll(() => {
  cy.login(TestUsers.nvi.bibsys.change).then(() => {
    // Warmup to avoid timing issues in tests
    createPublicationUsingAPI(
      'Warmup publication',
      CategoryTypes.ACADEMIC_ARTICLE,
      TestUsers.nvi.bibsys.change,
      NviLevels.LEVEL_1
    ).then();
    cy.wait(5000);
  });
});

// Scenario: Verify that a publication with files can be published and is listed as NVI candidate
Given('a creator is logged in', () => {});
When('the creator creates and publishes an AcademicArticle with with files', () => {
  cy.login(TestUsers.nvi.bibsys.change).then(() => {
    const title = `File publishing article ${uuid()}`;
    cy.wrap(title).as('registrationTitle');
    cy.createPublishedRegistration(title, 'AcademicArticle', 'example.txt');
    cy.login(TestUsers.curators.bibsys.collaboration);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.searchFor(title);
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
    cy.wait(1000);
    cy.reload();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.tabPanelLog).click();
    cy.wait(1000);
  });
});

Then('the file is shown in the log as published and not retracted', () => {
  cy.contains('Open file published').should('exist');
  cy.contains('File retracted').should('not.exist');
});
