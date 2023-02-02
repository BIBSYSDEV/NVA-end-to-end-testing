// Feature: Curator navigates to the Landing Page for Registration

import { userCurator, userPublishNoRights, userPublishRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';
import { Before } from 'cypress-cucumber-preprocessor/steps';

const fileName = 'example.txt';
const title = `Curator published registration ${uuidv4()}`;
const curatorPublishesWorkflow = 'curator approves publishing';
const registratorPublishesWorkflow = 'registrator publishes';

// Common steps

Then('the Registration is Published', () => {
  cy.get('@workflow').then(workflow => {
    if (workflow === curatorPublishesWorkflow) {
      cy.wait(10000);
      cy.reload();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
        cy.contains('Publishing request - Published');
      });
    } else if (workflow === registratorPublishesWorkflow) {
      cy.login(userCurator);
      cy.setWorkflowRegistratorPublishesAll();
      cy.login(userPublishNoRights);
      cy.startWizardWithEmptyRegistration();
      cy.createValidRegistration(fileName, title);
      cy.getDataTestId('button-save-registration').click();
      cy.location('pathname').as('path');
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton, { timeOut: 30000 }).click();
    }
  });
});

Before(() => {
  cy.wrap(registratorPublishesWorkflow).as('workflow');
})

// end common steps

Before

//   Scenario: Curator Approves a Publishing Request
Given('a Curator opens the Landing Page of a Registration', () => {
});
And('the Registration has a Publishing Request', () => {
  cy.wrap(curatorPublishesWorkflow).as('workflow');
  cy.setWorkflowRegistratorRequiresApproval();
  cy.login(userCurator);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName, title);
  cy.getDataTestId('button-save-registration').click();
  cy.getDataTestId('button-publish-registration', { timeout: 20000 }).click();
  cy.location('pathname').as('path');
  cy.get('@path').then((path) => {
    cy.login(userCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).should('be.visible');
    cy.visit(path, {
      auth: {
        username: Cypress.env('DEVUSER'),
        password: Cypress.env('DEVPASSWORD'),
      },
    });
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('exist');
});
When('they approve the Publishing Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
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
  cy.login(userCurator);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName, title);
  cy.getDataTestId('button-save-registration').click();
  cy.location('pathname').as('path');
});
Given('a Curator opens the Landing Page of a Registration', () => {
  cy.get('@path').then((path) => {
    cy.login(userCurator);
    cy.visit(path, {
      auth: {
        username: Cypress.env('DEVUSER'),
        password: Cypress.env('DEVPASSWORD'),
      },
    });
  });
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
});
And('the Registration is Published', () => {
});
And('the Registration has a DOI Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
});
When('they approve the DOI Request', () => {
  cy.login(userCurator);
  cy.get('@path').then((path) => {
    cy.login(userCurator);
    cy.visit(path, {
      auth: {
        username: Cypress.env('DEVUSER'),
        password: Cypress.env('DEVPASSWORD'),
      },
    });
  });
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
  cy.get('@path').then((path) => {
    cy.login(userCurator);
    cy.visit(path, {
      auth: {
        username: Cypress.env('DEVUSER'),
        password: Cypress.env('DEVPASSWORD'),
      },
    });
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.rejectDoiButton).click();
});
Then('the reserved DOI is removed from the Registration', () => {
  cy.wait(10000);
  cy.contains('(in progress').should('not.exist');
});
