import { userCurator, userDraftDoi, userPublishNoRights } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';

const fileName = 'example.txt';
const title = `Publication - ${uuid()}`;

// Feature: Owner navigates to the Landing Page for their Registration

// Scenario: Owner Requests a DOI
Given('the owner opens the Landing Page of their Registration', () => {
  cy.login(userDraftDoi);
  cy.startWizardWithEmptyRegistration();
});
Given('the Registration has no DOI', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type('Test request DOI');
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId('button-save-registration').click();
});
When('they request a DOI', () => {
  cy.getDataTestId('doi-request-accordion', { timeOut: 30000 }).click();
  cy.getDataTestId('button-toggle-reserve-doi').click();
});
Then('they can see a reserved DOI', () => {
  cy.getDataTestId('refresh-doi-button', { timeOut: 30000 }).should('be.visible');
  cy.wait(20000);
  cy.getDataTestId('refresh-doi-button', { timeOut: 30000 }).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.doiLink).should('be.visible');
});

// Scenario: Owner wants to publish Resource
When("the Owner previews the Resource's Landing Page", () => {
  cy.login(userDraftDoi);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type('Test request DOI');
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId('button-save-registration').click();
});
And('the Registraion has "Draft" Status', () => {});
Then('they see a "Publish" option', () => {
  cy.getDataTestId('button-publish-registration').should('be.visible');
});

// Scenario: Owner wants to publish their Resource, pending Approval
// When("the Owner previews the Resource's Landing Page", () => {});
And('the Registration has "Draft" Status', () => {});
And('there is a pending Approval Request on the Resource', () => {
  cy.getDataTestId('doi-request-accordion', { timeOut: 30000 }).click();
  cy.getDataTestId('button-toggle-reserve-doi').click();
  cy.wait(20000);
  cy.getDataTestId('refresh-doi-button', { timeOut: 30000 }).click();
});
Then('they see a "Publishing pending" notice', () => {
  cy.getDataTestId('doi-request-accordion', { timeOut: 30000 }).click();
  cy.getDataTestId('doi-request-accordion').within(() => {
    cy.contains('Registration has a reserved DOI');
  });
});
And('the user is informed that progress can be viewed in My Messages', () => {});

// Scenario: Owner wants to publish Resource, all restrictions
Given('Institutions publications policy is "Only Curator can publish"', () => {
  cy.setWorkflowRegistratorRequiresApproval();
  cy.login(userPublishNoRights);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName, title);
  cy.getDataTestId('button-save-registration').click();
});
When('the Owner uses the Publish option', () => {
  cy.getDataTestId('button-publish-registration', { timeOut: 20000 }).click();
});
Then('the Owner see a Landing Page with an Unpublished Resource', () => {
  cy.getDataTestId('tasks-panel').within(() => {
    cy.contains('Publishing request - Draft');
  });
});
And('an Approval Request is sent to his Curator', () => {
  cy.login(userCurator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.contains(title);
});
And(
  'the Owner is notified that an Approval Request is sent to his Curator and progress can be viewed in My Messages',
  () => {}
);

// Scenario: Owner wants to publish Resource, file restrictions
Given('Institutions publications policy is "Registrator can only publish metadata"', () => {
  cy.setWorkflowRegistratorPublishesMetadata();
  cy.login(userPublishNoRights);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName, title);
  cy.getDataTestId('button-save-registration').click();
});
When('the Owner uses the Publish option', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton, { timeOut: 30000 }).click();
});
Then('the Owner sees a Landing Page with a Published Resource', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
});
And("the Resource's status is Published", () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
    cy.contains('Publication - published', { timeOut: 20000 });
  });
});
And("the Resource's files, license and embargo date are locked with a pending approval notification", () => {});
And('the number of files is visible', () => {});
And('an Approval Request is sent to the Curator', () => {
  cy.login(userCurator);
  cy.wait(20000);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.contains(title);
});
And(
  'the Owner is notified that an Approval Request is sent to the Curator and progress can be viewed in My Messages',
  () => {}
);

// Scenario: Owner uses the Publish option on Landing Page
Given('Institutions publications policy is "Registrator has full publishing rights"', () => {
  cy.login(userDraftDoi);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName);
  cy.getDataTestId('button-save-registration').click();
});
Then('the Resource\'s status is "Published"', () => {
  cy.wait(10000);
  cy.getDataTestId('refresh-publishing-request-button', { timeOut: 30000 }).click();
});
And('the Owner sees a Landing Page with a Published Resource', () => {
  cy.getDataTestId('tasks-panel').within(() => {
    cy.contains('Publishing request - Published');
  });
});

// Scenario: Owner navigates to the Landing Page for their draft Resource with Validation Errors
When('the Creator navigates to the Landing Page', () => {
  cy.login(userDraftDoi);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type('Test draft publication');
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId('button-save-registration').click();
});
And('the Resource has Validation Errors', () => {
  cy.getDataTestId('tasks-panel').within(() => {
    cy.getDataTestId('WarningIcon');
  });
});
And('the Resource is a draft', () => {
  cy.getDataTestId('tasks-panel').within(() => {
    cy.contains('Publishing request - Draft');
  });
});
Then('they see a List of all Validation Errors for the Resource', () => {
  cy.getDataTestId('error-list-div').should('be.visible');
});
And('they see a "Edit registration" button', () => {
  cy.getDataTestId('back-to-wizard-button').should('be.visible');
});
