import { today } from '../../../support/commands';
import { userCurator, userDraftDoi, userPublishNoRights } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const fileName = 'example.txt'

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
And('the Registraion has "Draft" Status', () => { });
Then('they see a "Publish" option', () => {
  cy.getDataTestId('button-publish-registration').should('be.visible');
});

// Scenario: Owner wants to publish their Resource, pending Approval
// When("the Owner previews the Resource's Landing Page", () => {});
And('the Registration has "Draft" Status', () => { });
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
And('the user is informed that progress can be viewed in My Messages', () => { });

// Scenario: Owner wants to publish Resource, all restrictions
Given('Institutions publications policy is "Only Curator can publish"', () => {
  cy.login(userPublishNoRights);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName);
  cy.getDataTestId('button-save-registration').click();
});
When('the Owner uses the Publish option', () => {
  cy.getDataTestId('button-publish-registration', { timeOut: 15000 }).click();
});
Then('the Owner see a Landing Page with an Unpublished Resource', () => {
  cy.getDataTestId('tasks-panel').within(() => {
    cy.contains('Publishing request - Draft');
  })
});
And('an Approval Request is sent to his Curator', () => {
  cy.login(userCurator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
});
And(
  'the Owner is notified that an Approval Request is sent to his Curator and progress can be viewed in My Messages',
  () => { }
);

