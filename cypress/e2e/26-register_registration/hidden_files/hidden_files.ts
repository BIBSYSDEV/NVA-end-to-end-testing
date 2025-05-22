// Feature: Hidden and internal files

import { userPublishRegistration, userPublishingCurator } from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const fileName = 'example.txt';

// Scenario Outline: Creator adds a non-open file
Given('Creator navigates to Files and License tab', () => {
  cy.login(userPublishingCurator);
  cy.startWizardWithEmptyRegistration();
  const title = `Non-open file ${uuid()}`;
  cy.createValidRegistration(null, title);
});
When('they add a file to the File upload widget', () => {
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
When('they mark the file as {string}', (fileType: string) => {
  cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
  cy.contains(fileType).click();
});
Then('they can see the file in the list of files', () => {
  cy.contains(fileName);
});
Then('the file is marked as {string}', (fileType) => {
  cy.getDataTestId(dataTestId.registrationWizard.files.fileRow).filter(`:contains(${fileType})`);
});
When('they publish the Registration', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
});
Then('they see the file under Internal files', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.internalFilesTab).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.file).filter(`:contains(${fileName})`);
});

// Examples:
//     | File type     |
//     | Hidden file   |
//     | Internal file |

// Scenario Outline: Curator approves non-open file
Given('a registration with a {string}', (fileType: string) => {
  cy.login(userPublishRegistration);
  cy.setWorkflowRegistratorPublishesMetadata();
  cy.startWizardWithEmptyRegistration();
  const title = `Non-open file ${uuid()}`;
  cy.wrap(title).as('title');
  cy.wrap(fileType).as('fileType');
  cy.createValidRegistration(null, title);
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
  cy.contains(fileType).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getSuccess();
  cy.wait(30000);
});
Given('the files need approval from a Curator', () => {});
When('a Curator view the landing page of the registration', () => {
  cy.login(userPublishingCurator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.get('@title').then((title) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
  });
});
Then('they see {string}', (approvalMessage: string) => {
  cy.get('@fileType').then((fileType) => {
    if (fileType.toString() === 'Internal file') {
      cy.getDataTestId(dataTestId.registrationLandingPage.internalFilesTab).contains(
        approvalMessage
      );
    }
  });
});
When('they approve the file', () => {
  cy.get('@fileType').then((fileType) => {
    if (fileType.toString() === 'Internal file') {
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
      cy.refreshPublish();
    }
  });
});
Then('they see the file is approved', () => {
  cy.get('@fileType').then((fileType) => {
    if (fileType.toString() === 'Internal file') {
      cy.get('@title').then((title) => {
        cy.reload();
        cy.contains(title.toString());
        cy.refreshPublish();
        cy.getDataTestId(dataTestId.registrationLandingPage.internalFilesTab).click();
        cy.contains('1 internal file approved');
        cy.contains('1 waiting for approval').should('not.exist');
      });
    }
  });
});

// Examples:
//     | File type     | Approval message                   |
//     | Internal file | internal file waiting for approval |
//     | Hidden file   | hidden file waiting for approval   |

// Scenario Outline: Curator changes open file to non-open file
Given('a published registration with an open file', () => {
  cy.login(userPublishRegistration);
  cy.setWorkflowRegistratorPublishesMetadata();
  cy.startWizardWithEmptyRegistration();
  const title = `Non-open file ${uuid()}`;
  cy.wrap(title).as('title');
  cy.createValidRegistration(fileName, title);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.wait(30000);
});
Given('the file needs approval', () => {});
When('a curator edit the registration and changes the open file to {string}', (fileType: string) => {
  cy.wrap(fileType).as('fileType');
  cy.login(userPublishingCurator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.get('@title').then((title) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
  cy.contains(fileType).click();
});
When('navigates to the landing page', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
});

// Examples:
// | File type     | Approval message                   |
// | Internal file | internal file waiting for approval |
// | Hidden file   | hidden file waiting for approval   |
