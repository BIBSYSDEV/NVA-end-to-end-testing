// Feature: Curator navigates to the Landing Page for Registration

import { userCurator, userPublishRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';

const fileName = 'example.txt';
const title = `Curator published registration ${uuidv4()}`;

//   Scenario: Curator Approves a Publishing Request
Given('a Curator opens the Landing Page of a Registration', () => {
    cy.login(userPublishRegistration);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, title);
    cy.getDataTestId('button-save-registration').click();
    cy.getDataTestId('button-publish-registration', { timeout: 20000 }).click();
    cy.login(userCurator);
    cy.wait(10000);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.get(`[data-testid^=message-title]`).filter(`:contains(${title})`).click();
    cy.get('[data-testid^=go-to-registration]').filter(':visible').click();
});
And('the Registration has a Publishing Request', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('exist');
});
When('they approve the Publishing Request', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
});
Then('the Registration is Published', () => {
    cy.wait(10000);
    cy.reload();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
        cy.contains('Publishing request - Published');
    });
});
And('all files are Published', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.fileVersion).within(() => {
        cy.contains('Published version');
    });
});

//   Scenario: Curator Rejects a Publishing Request
Given('a Curator from a customer with Workflow "{string}"', (workflow) => {
    if (workflow === 'Registrator can only publish metadata') {
        cy.setWorkflowRegistratorPublishesMetadata();
    } else if (workflow === 'Only Curator can publish') {
        cy.setWorkflowRegistratorRequiresApproval();
    }
    cy.login(userPublishNoRights);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, title);
    cy.getDataTestId('button-save-registration').click();
});
Given('a Curator opens the Landing Page of a Registration', () => {
    cy.login(userCurator);
    cy.getDataTestid(dataTestId.header.tasksLink).click();
    cy.contains(title).click();
    cy.get('[data-testid^=go-to-registration]').filter(':visible').click();
});
And('the Registration has a Publishing Request', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('exist');
});
When('they reject the Publishing Request', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestRejectButton).click();
});
Then('the Registration is "{string}"', () => { });
And('all files are "{string}"', () => { });
// Examples:
//   | Workflow                              | RegistrationStatus | FileStatus  |
//   | Registrator can only publish metadata | Published          | Unpublished |
//   | Only Curator can publish              | Draft              | Unpublished |

//   Scenario: Curator Approves a DOI Request
Given('a Curator opens the Landing Page of a Registration', () => {
    cy.login(userCurator);
    cy.setWorkflowRegistratorPublishesAll()
    cy.login(userPublishNoRights);
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, title);
    cy.getDataTestId('button-save-registration').click();
});
And('the Registration is Published', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton, { timeOut: 30000 }).click();
});
And('the Registration has a DOI Request', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
When('they approve the DOI Request', () => {
    cy.login(userCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.contains(title).click();
    cy.get('[data-testid^=go-to-registration]').filter(':visible').click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).click();
});
Then('the DOI is findable', () => {
    cy.getDataTestId(dataTestId.header.aboutLink).click();
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.getDataTestId('result-list-item').filter(`:contains(${title})`).click();
    cy.contains('https:/handle.stage.datacite.org');
});

//   Scenario: Curator Rejects a DOI Request
Given('a Curator opens the Landing Page of a Registration', () => { });
And('the Registration is Published', () => { });
And('the Registration has a DOI Request', () => { });
When('they reject the DOI Request', () => {
    cy.login(userCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.contains(title).click();
    cy.get('[data-testid^=go-to-registration]').filter(':visible').click();
    cy.getDataTestId(dataTestId.registrationLandingPage.rejectDoiButton).click();
});
Then('the reserved DOI is removed from the Registration', () => {
    cy.wait(10000);
    cy.contains('(in progress').should('not.exist');
});
