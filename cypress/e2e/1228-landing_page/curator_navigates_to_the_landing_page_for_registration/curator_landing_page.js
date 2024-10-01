// Feature: Curator navigates to the Landing Page for Registration

import { userCurator, userPublishNoRights, userPublishRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';
import { Before } from 'cypress-cucumber-preprocessor/steps';

const fileName = 'example.txt';
const title = `Curator published registration`;
const doiRequestTitle = `Curator published registration ${uuidv4()}`;
const curatorPublishesWorkflow = 'curator approves publishing';
const registratorPublishesWorkflow = 'registrator publishes';

// Common steps

Then('the Registration is Published', () => {
  cy.get('@workflow').then((workflow) => {
    if (workflow === curatorPublishesWorkflow) {
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
        cy.contains('Publishing request - Published');
      });
    }
  });
});

Before(() => {
  cy.wrap(registratorPublishesWorkflow).as('workflow');
  cy.wrap('').as('doiRequest');
});

Before({ tags: '@no_restriction' }, () => {
  cy.setWorkflowRegistratorPublishesAll();
  cy.wrap(registratorPublishesWorkflow).as('workflow');
});

Before({ tags: '@file_restrictions' }, () => {
  cy.setWorkflowRegistratorPublishesMetadata();
});

Before({ tags: '@all_restrictions' }, () => {
  cy.setWorkflowRegistratorRequiresApproval();
  cy.wrap(curatorPublishesWorkflow).as('workflow');
});

Before({ tags: '@doi_request' }, () => {
  cy.wrap(true).as('doiRequest');
})

// end common steps

//   Scenario: Curator Approves a Publishing Request
Given('a Curator opens the Landing Page of a Registration', () => {
  cy.login(userPublishNoRights);
  cy.startWizardWithEmptyRegistration();
  const registrationTitle = `${title} ${uuidv4()}`;
  cy.wrap(registrationTitle).as('registrationTitle');
  cy.createValidRegistration(fileName, registrationTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
  cy.wait(15000);
  cy.get('@doiRequest').then(doiRequest => {
    if (doiRequest) {
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
    }
    cy.login(userCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).should('be.visible');
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    if (doiRequest) {
      cy.filterMessages('DoiRequests');
    } else {
      cy.filterMessages('Publishing Requests');
    }
    cy.get('[value=BIBSYS]');
    cy.wait(10000);
    cy.getDataTestId(dataTestId.startPage.searchField).type(registrationTitle, { delay: 0 });
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${registrationTitle}")`).first().click();
  })
});
And('the Registration has a Publishing Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('exist');
});
When('they approve the Publishing Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('not.exist');

});
And('all files are Published', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.fileVersion).within(() => {
    cy.contains('Published version');
  });
});

//   Scenario: Curator Rejects a Publishing Request
Given('a Curator from a customer with Workflow {string}', (workflow) => {
  if (workflow === 'Registrator can only publish metadata') {
    cy.setWorkflowRegistratorPublishesMetadata();
  } else if (workflow === 'Only Curator can publish') {
    cy.setWorkflowRegistratorRequiresApproval();
  }
  cy.login(userPublishNoRights);
  cy.startWizardWithEmptyRegistration();
  const registrationTitle = `${title} ${uuidv4()}`;
  cy.wrap(registrationTitle).as('registrationTitle')
  cy.createValidRegistration(fileName, registrationTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.location('pathname').as('path');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.wait(15000);
});
Given('they opens the Landing Page of a Registration', () => {
  cy.get('@path').then((path) => {
    cy.login(userCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).should('be.visible');
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.get('[value=BIBSYS]');
    // cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).click();
    cy.get('@registrationTitle').then(registrationTitle => {
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`, { delay: 0 });
      cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${registrationTitle}")`).first().click();
    })
  });
});
And('the Registration has a Publishing Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('exist');
});
When('they reject the Publishing Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestRejectButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestRejectionMessageTextField).type('Publish rejected');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.rejectionDialogConfirmButton).should('be.enabled');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.rejectionDialogConfirmButton).click();
});
Then('the Registration is {string}', (registrationStatus) => {
  const status = {
    'Published': 'Publication - Rejected',
    'Draft': 'Publishing request - Draft',
  };
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
    cy.contains(status[registrationStatus]);
  })
});
And('all files are {string}', (fileStatus) => { });
// Examples:
//   | Workflow                              | RegistrationStatus | FileStatus  |
//   | Registrator can only publish metadata | Published          | Unpublished |
//   | Only Curator can publish              | Draft              | Unpublished |

// Scenario: Curator opens a Registration from a DOI Request
Given('that a Curator views their Worklist', () => {
  cy.login(userPublishNoRights);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName, doiRequestTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId('button-publish-registration', { timeout: 20000 }).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
  cy.login(userCurator);
  cy.wait(5000)
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.get('[value=BIBSYS]');
  // cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).click();
});
And('they have selected the DOI Requests tab', () => { });
And('they have expanded an Message', () => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${doiRequestTitle}{enter}`, { delay: 0 });
  cy.contains(doiRequestTitle).click();
});
When('they click "Go to registration"', () => {
});
Then("they see the Landing Page for the DOI Request's Registration", () => { });
And('the Create DOI button is enabled', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).should('be.enabled');
});
And('the Decline DOI button is enabled', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).should('be.enabled');
});

//   Scenario: Curator Approves a DOI Request
Given('a Curator opens the Landing Page of a Registration', () => { });
And('the Registration is Published', () => { });
And('the Registration has a DOI Request', () => {
});
When('they approve the DOI Request', () => {
  cy.wait(10000);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.get('[value=BIBSYS]');
  // cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).click();
  cy.get('@registrationTitle').then(searchTitle => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${searchTitle}{enter}`, { delay: 0 });
    cy.contains(searchTitle, { timeout: 30000 }).click();
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).click();
});
Then('the DOI is findable', () => {
  cy.get('[data-testid=logo]').click();
  cy.wait(5000);
  cy.get('@registrationTitle').then(searchTitle => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${searchTitle}{enter}`, { delay: 0 });
    cy.getDataTestId('result-list-item')
      .filter(`:contains(${searchTitle})`)
      .first()
      .within(() => {
        cy.get('a').first().click();
      });
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
  cy.get('[value=BIBSYS]');
  // cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).click();
  cy.get('@registrationTitle').then(searchTitle => {
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${searchTitle}{enter}`, { delay: 0 });
    cy.contains(searchTitle).click();
  })
  cy.getDataTestId(dataTestId.registrationLandingPage.rejectDoiButton).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).parent().parent().within(() => {
    cy.get('textarea').first().type('DOI rejected');
  });
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
Then('the reserved DOI is removed from the Registration', () => {
  cy.contains('https://handle.stage.datacite.org').should('not.exist');
});
