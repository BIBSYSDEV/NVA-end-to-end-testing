// Feature: Tickets are sent to curators at the channel owner

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userEditorSintef, userPublicationCuratorSintef, userRegistratorSintef } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { today } from '../../../support/commands';

const claimedChannel = 'SINTEF akademisk forlag';
const publicationTitle = `Ticket publication ${uuid()}`
const fileName = 'example.txt'

BeforeAll(() => {
  cy.login(userEditorSintef);
  cy.editChannelClaims();
  cy.get('table').then(($body) => {
    if (!$body.text().includes(claimedChannel)) {
      cy.claimChannel(claimedChannel);
    }
  });
});

//   Background:
Given('metadata registered on a claimed channel', () => {
});
Given('the channel claim has an allow-all policy for registering metadata', () => {
});
Given('publication instance type is part of channel scope', () => { });

//   Scenario: Ticket sent to Registrators institution
Given('a Registrator', () => {
  cy.login(userRegistratorSintef);
});
Given('Registrators institution owns the channel', () => { });
When('metadata is registered', () => {
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type(publicationTitle)
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`, today);
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('DegreeMaster')).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type(claimedChannel)
  cy.contains(claimedChannel).last().click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
  cy.getSuccessDone();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
  cy.contains('Open file').click();
  cy.getDataTestId(dataTestId.registrationWizard.files.version, {
    timeout: 30000,
  }).within(() => {
    cy.get('input[type=radio]').last().click();
  });
  cy.get('[data-testid=uploaded-file-select-license]').scrollIntoView().click({ force: true }).type(' ');
  cy.get('[data-testid=license-item]').first().click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccessDone();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getSuccessDone();
});
Then('a ticket is sent to curators at Registrators institution', () => {
  cy.login(userPublicationCuratorSintef);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${publicationTitle})`);
});

//   Scenario: Ticket sent to Channel owner, not Registrators institution
// Given ('a Registrator', () => {});
Given('Registrators institution does not own the channel', () => { });
// When ('metadata is registered', () => {});
Then('a ticket is sent to curators at the channel owner', () => { });
Then('a ticket is not sent to curators at Registrators institution', () => { });

//   Scenario: Ticket sent to Channel owner, not contributors institution
Given('a contributor not from the channel owner', () => { });
// When ('metadata is registered', () => {});
Then('a ticket is not sent to curators at contributors institution', () => { });
// Then ('a ticket is sent to curators at the channel owner', () => {});

// Scenario: Tickets regarding student thesis should only be handled by student thesis curator
Given('a publication with a Degree-category', () => { });
When('a publishing request is sent', () => { });
Then('only student thesis curator can approve ticket', () => { });
