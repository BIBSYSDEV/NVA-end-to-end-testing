import {
  userBIBSYSCurator,
  userUnitDraftDoi,
  userBIBSYSPublishNoRights,
  CategoryTypes,
  userName,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  createDraftPublicationUsingAPI,
  createPublicationUsingAPI,
  FileType,
  NviLevels,
  RegistrationData,
  uploadFileToRegistration,
} from '../../../support/create_registration';

const fileName = 'example.txt';
const title = `Publication - `;

// Feature: Owner navigates to the Landing Page for their Registration

// Scenario: Owner Requests a DOI
Given('the owner opens the Landing Page of their Registration', () => {
  cy.login(userUnitDraftDoi);
  cy.startWizardWithEmptyRegistration();
});
Given('the Registration has no DOI', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type('Test request DOI');
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
});
When('they request a DOI', () => {
  cy.getDataTestId('doi-request-accordion', { timeOut: 30000 }).click();
  cy.getDataTestId('button-toggle-reserve-doi').click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
Then('they can see a reserved DOI', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.doiLink).should('be.visible');
});

// Scenario: Owner wants to publish Resource
When("the Owner previews the Resource's Landing Page", () => {
  cy.login(userBIBSYSPublishNoRights).then(() => {
    const registrationTitle = `${title}${uuid()}`;
    createDraftPublicationUsingAPI(
      registrationTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userBIBSYSPublishNoRights],
      NviLevels.LEVEL_0
    ).then(() => {
      cy.wait(3000);
    });
    cy.getDataTestId(dataTestId.header.myPageLink).click();
    cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
    cy.searchFor(registrationTitle);
  });
});
When('the Registraion has "Draft" Status', () => {
  cy.contains('file and selected license are waiting to be verified');
});
Then('they see a "Publish" option', () => {
  cy.getDataTestId('button-publish-registration').should('be.visible');
});

// Scenario: Owner wants to publish their Resource, pending Approval
// When("the Owner previews the Resource's Landing Page", () => {});
Given('the Registration has "Draft" Status', () => {});
Given('there is a pending Approval Request on the Resource', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getSuccessDone();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
  cy.wait(5000);
  cy.reload();
});
Then('they see a "Publishing pending" notice', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).click();
  cy.contains('Result published');
  cy.contains('1 file published').should('not.exist');
});
Then('the user is informed that progress can be viewed in My Messages', () => {});

// Scenario: Owner wants to publish Resource, file restrictions
Given('Institutions publications policy is "Registrator can only publish metadata"', () => {
  cy.login(userBIBSYSPublishNoRights);
  const registrationTitle = `${title}${uuid()}`;
  cy.wrap(registrationTitle).as('registrationTitle');
  createDraftPublicationUsingAPI(
    registrationTitle,
    CategoryTypes.ACADEMIC_ARTICLE,
    userName[userBIBSYSPublishNoRights],
    NviLevels.LEVEL_0
  ).then((builder: unknown) => {
    const registrationBuilder = builder as RegistrationData;
    cy.wrap(uploadFileToRegistration(registrationBuilder.identifier, fileName)).then((file) => {
      const uploadedFile = file as FileType;
      registrationBuilder.associatedArtifacsts.push({
        identifier: uploadedFile.identifier,
        type: 'PendingOpenFile',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        publisherVersion: 'AcceptedVersion',
        mimeType: 'text/plain',
        size: '448',
      });
      cy.wrap(registrationBuilder.update()).then(() => {});
    });
    cy.wait(3000);
  });
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
  cy.searchFor(registrationTitle);
});
When('the Owner uses the Publish option', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getSuccessDone();
});
Then('the Owner sees a Landing Page with a Published Resource', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
});
Then("the Resource's status is Published", () => {
  cy.wait(5000);
  cy.reload();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
    cy.contains('Published metadata', { timeout: 20000 });
  });
});
Then("the Resource's files, license and embargo date are locked with a pending approval notification", () => {});
Then('the number of files is visible', () => {});
Then('an Approval Request is sent to the Curator', () => {
  cy.get('@registrationTitle').then((title: unknown) => {
    cy.login(userBIBSYSCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.get('[value=BIBSYS]');
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title as string}{enter}`);
    cy.get('a').filter(`:contains(${title})`).should('be.visible');
  });
});
Then(
  'the Owner is notified that an Approval Request is sent to the Curator and progress can be viewed in My Messages',
  () => {}
);

// Scenario: Owner uses the Publish option on Landing Page
Given('Institutions publications policy is "Registrator has full publishing rights"', () => {
  cy.login(userUnitDraftDoi);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName, `${title} ${uuid()}`);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
});
Then('the Resource\'s status is "Published"', () => {});

// Scenario: Owner navigates to the Landing Page for their draft Resource with Validation Errors
When('the Creator navigates to the Landing Page', () => {
  cy.login(userUnitDraftDoi);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type('Test draft publication');
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
});
When('the Resource has Validation Errors', () => {
  cy.getDataTestId('tasks-panel').within(() => {
    cy.contains('The following errors must be corrected before publishing the result:');
  });
});
When('the Resource is a draft', () => {
  cy.getDataTestId('tasks-panel').within(() => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('be.disabled');
  });
});
Then('they see a List of all Validation Errors for the Resource', () => {
  cy.getDataTestId('tasks-panel').within(() => {
    cy.contains('Description:');
    cy.contains('Category:');
    cy.contains('Contributors:');
  });
});
Then('they see a "Edit registration" button', () => {
  cy.getDataTestId('back-to-wizard-button').should('be.visible');
});
