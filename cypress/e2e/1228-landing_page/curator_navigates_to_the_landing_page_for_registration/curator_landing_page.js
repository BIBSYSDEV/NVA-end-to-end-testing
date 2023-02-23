// Feature: Curator navigates to the Landing Page for Registration

import { userCurator, userPublishNoRights, userPublishRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';
import { Before } from 'cypress-cucumber-preprocessor/steps';

const fileName = 'example.txt';
const title = `Curator published registration ${uuidv4()}`;
const doiRequestTitle = `Curator published registration ${uuidv4()}`;
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
      cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
      cy.location('pathname').as('path');
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton, { timeOut: 30000 }).click();
      cy.wait(10000);
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
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
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
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
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
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

// Scenario: Curator opens a Registration from a DOI Request
Given('that a Curator views their Worklist', () => {
  cy.login(userCurator);
  cy.setWorkflowRegistratorPublishesAll();
  cy.login(userPublishNoRights);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName, doiRequestTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId('button-publish-registration', { timeout: 20000 }).click();
  cy.wait(10000);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
  cy.login(userCurator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
})
And('they have selected the DOI Requests tab', () => { })
And('they have expanded an Message', () => {
  cy.contains(doiRequestTitle).click();
})
When('they click "Go to registration"', () => {
  cy.get('[data-testid^=go-to-registration]').filter(':visible').first().click()
})
Then("they see the Landing Page for the DOI Request's Registration", () => { })
And('the Create DOI button is enabled', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).should('be.enabled');
})
And('the Decline DOI button is enabled', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).should('be.enabled');
})


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
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.contains(title).click();
  cy.get('[data-testid^=go-to-registration]').filter(':visible').first().click()
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).click();
});
Then('the DOI is findable', () => {
  cy.get('[data-testid=logo]').click();
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`, { delay: 0 });
  cy.getDataTestId('result-list-item').filter(`:contains(${title})`).within(() => {
    cy.get('a').first().click();
  })
  cy.contains('https://handle.stage.datacite.org');
});

//   Scenario: Curator Rejects a DOI Request
Given('a Curator opens the Landing Page of a Registration', () => { });
And('the Registration is Published', () => { });
And('the Registration has a DOI Request', () => { });
When('they reject the DOI Request', () => {
  cy.login(userCurator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.contains(title).click();
  cy.get('[data-testid^=go-to-registration]').filter(':visible').first().click()
  cy.getDataTestId(dataTestId.registrationLandingPage.rejectDoiButton).click();
});
Then('the reserved DOI is removed from the Registration', () => {
  cy.wait(10000);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshDoiRequestButton).click();
  cy.contains('In progress').should('not.exist');
});

