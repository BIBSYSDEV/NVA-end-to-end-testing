// Feature: Curator navigates to the Landing Page for Registration

import { userCurator, userPublishRegistration } from "../../../support/constants";
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
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.get(`[data-testid^=message-title]`).filter(`:contains(${title})`).click();
    cy.get('[data-testid=go-to-registration').filter(':visible').click();
})
And('the Registration has a Publishing Request', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('exist');
})
When('they approve the Publishing Request', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
})
Then('the Registration is Published', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
        cy.contains('Publishing request - Published')
    });
})
And('all files are Published', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.fileVersion).within(() => {
        cy.contains('Published version');
    })
})

//   Scenario: Curator Rejects a Publishing Request
Given('a Curator from a customer with Workflow "{string}"', () => {
    cy.login
})
Given('a Curator opens the Landing Page of a Registration', () => { })
And('the Registration has a Publishing Request', () => { })
When('they reject the Publishing Request', () => { })
Then('the Registration is "{string}"', () => { })
And('all files are "{string}"', () => { })
// Examples:
//   | Workflow                              | RegistrationStatus | FileStatus  |
//   | Registrator can only publish metadata | Published          | Unpublished |
//   | Only Curator can publish              | Draft              | Unpublished |

//   Scenario: Curator Approves a DOI Request
Given('a Curator opens the Landing Page of a Registration', () => { })
And('the Registration is Published', () => { })
And('the Registration has a DOI Request', () => { })
When('they approve the DOI Request', () => { })
Then('the DOI is findable', () => { })

//   Scenario: Curator Rejects a DOI Request
Given('a Curator opens the Landing Page of a Registration', () => { })
And('the Registration is Published', () => { })
And('the Registration has a DOI Request', () => { })
When('they reject the DOI Request', () => { })
Then('the reserved DOI is removed from the Registration', () => { })