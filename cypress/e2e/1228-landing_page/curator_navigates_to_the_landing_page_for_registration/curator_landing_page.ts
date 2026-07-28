// Feature: Curator navigates to the Landing Page for Registration

import {
  CategoryTypes,
  TestUsers,
  userBIBSYSCurator,
  userBIBSYSDoiCurator,
  userBIBSYSPublishingCurator,
  userBIBSYSPublishNoRights,
  userName,
  userUnitEditRegistration,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';
import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  createPublicationUsingAPI,
  NviLevels,
  RegistrationData,
  uploadFileToRegistration,
} from '../../../support/create_registration';
import { Test } from 'mocha';

const fileName = 'example.txt';
const title = `Curator published registration`;
const doiRequestTitle = `Curator published registration ${uuidv4()}`;
const curatorPublishesWorkflow = 'curator approves publishing';
const registratorPublishesWorkflow = 'registrator publishes';

// Common steps

Then('the Registration is Published', () => {
  cy.wait(1000);
  cy.reload();
  cy.get('@workflow').then((workflow) => {
    if (workflow.toString() === curatorPublishesWorkflow) {
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
  cy.wrap(registratorPublishesWorkflow).as('workflow');
  cy.wrap(TestUsers.publishing.registrator).as('user');
});

Before({ tags: '@file_restrictions' }, () => {
  cy.wrap(TestUsers.publishing.noRights).as('user');
});
  
Before({ tags: '@doi_request' }, () => {
  cy.wrap(true).as('doiRequest');
});

// end common steps

//   Scenario: Curator Approves a Publishing Request
Given('a Curator opens the Landing Page of a Registration', () => {
  cy.get('@user').then((user: unknown) => {
    const registrationUser = user as string;
    cy.login(registrationUser).then(() => {
      const registrationTitle = `${title} ${uuidv4()}`;
      cy.wrap(registrationTitle).as('registrationTitle');
      createPublicationUsingAPI(
        registrationTitle,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userBIBSYSPublishNoRights],
        NviLevels.LEVEL_0
      ).then((builder: unknown) => {
        const registrationBuilder = builder as RegistrationData;
        uploadFileToRegistration(registrationBuilder.identifier, fileName).then((file) => {
          registrationBuilder
            .addFile(file)
            .update()
            .then(() => {});
        });
      });
      cy.get('@doiRequest').then((doiRequest) => {
        if (doiRequest) {
          cy.searchFor(registrationTitle);
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
          cy.getSuccess();
          cy.login(TestUsers.curators.sintef.doi);
        } else {
          cy.login(TestUsers.curators.bibsys.publishing);
        }
        cy.getDataTestId(dataTestId.header.tasksLink).should('be.visible');
        cy.wait(1000);
        cy.getDataTestId(dataTestId.header.tasksLink).click();
        cy.getDataTestId(dataTestId.tasksPage.userDialogAccordion).should('exist');
        cy.searchFor(registrationTitle);
      });
    });
  });
});
Given('the Registration has a Publishing Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('exist');
});
When('they approve the Publishing Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).should('not.exist');
});
Then('all files are Published', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.fileVersion).within(() => {
    cy.contains('Accepted version');
  });
});

//   Scenario: Curator Rejects a Publishing Request
Given('a Curator from a customer with Workflow {string}', (workflow) => {
  cy.get('@user').then((user: unknown) => {
    const registrationUser = user as string;
    cy.login(registrationUser).then(() => {
      const registrationTitle = `${title} ${uuidv4()}`;
      cy.wrap(registrationTitle).as('registrationTitle');
      createPublicationUsingAPI(
        registrationTitle,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userBIBSYSPublishNoRights],
        NviLevels.LEVEL_0
      ).then((builder: unknown) => {
        const registrationBuilder = builder as RegistrationData;
        uploadFileToRegistration(registrationBuilder.identifier, fileName).then((file) => {
          registrationBuilder
            .addFile(file)
            .update()
            .then(() => {});
        });
      });
    });
  });
});
Given('they opens the Landing Page of a Registration', () => {
  cy.login(userBIBSYSCurator);
  cy.getDataTestId(dataTestId.header.tasksLink).should('be.visible');
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.userDialogAccordion).should('exist');
  cy.get('@registrationTitle').then((registrationTitle: unknown) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.searchFor(registrationTitle as string);
  });
});
When('they reject the Publishing Request', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestRejectButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestRejectionMessageTextField).type(
    'Publish rejected'
  );
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.rejectionDialogConfirmButton).should('be.enabled');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.rejectionDialogConfirmButton).click();
});
Then('the Registration is {string}', (registrationStatus: string) => {
  const status = {
    'Published': 'file rejected',
    'Draft': 'Publishing request - Draft',
  };
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.panelRoot).within(() => {
    cy.contains(status[registrationStatus]);
  });
});
Then('all files are {string}', (fileStatus) => {});
// Examples:
//   | Workflow                              | RegistrationStatus | FileStatus  |
//   | Registrator can only publish metadata | Published          | Unpublished |
//   | Only Curator can publish              | Draft              | Unpublished |

// Scenario: Curator opens a Registration from a DOI Request
Given('that a Curator views their Worklist', () => {
  cy.get('@user').then((user: unknown) => {
    const registrationUser = user as string;
    cy.login(registrationUser).then(() => {
      createPublicationUsingAPI(
        doiRequestTitle,
        CategoryTypes.ACADEMIC_ARTICLE,
        userName[userBIBSYSPublishNoRights],
        NviLevels.LEVEL_0
      ).then((builder: unknown) => {
        const registrationBuilder = builder as RegistrationData;
        uploadFileToRegistration(registrationBuilder.identifier, fileName).then((file) => {
          registrationBuilder
            .addFile(file)
            .update()
            .then(() => {});
        });
      });
      cy.searchFor(doiRequestTitle);
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
      cy.getSuccessDone();
    });
    cy.login(TestUsers.curators.sintef.doi);
    cy.wait(1000);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.userDialogAccordion).should('exist');
  });
});
Given('they have selected the DOI Requests tab', () => {});
Given('they have expanded an Message', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.searchFor(doiRequestTitle);
});
When('they click "Go to registration"', () => {});
Then("they see the Landing Page for the DOI Request's Registration", () => {});
Then('the Create DOI button is enabled', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).should('be.enabled');
});
Then('the Decline DOI button is enabled', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).should('be.enabled');
});

//   Scenario: Curator Approves a DOI Request
Given('the Registration has a DOI Request', () => {});
When('they approve the DOI Request', () => {
  cy.wait(1000);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.userDialogAccordion).should('exist');
  cy.get('@registrationTitle').then((searchTitle: unknown) => {
    cy.searchFor(searchTitle as string);
  });
  cy.wait(1000);
  cy.reload();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.createDoiButton).click();
  cy.get('body').then((body) => {
    if (body.find(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).length > 0) {
      cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
      cy.getSuccessDone();
    }
  });
});
Then('the DOI is findable', () => {
  cy.get('[data-testid=logo]').click();
  cy.get('@registrationTitle').then((searchTitle: unknown) => {
    cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.searchFor(searchTitle as string);
  });
  cy.contains('https://handle.stage.datacite.org');
});

//   Scenario: Curator Rejects a DOI Request
When('they reject the DOI Request', () => {
  cy.login(TestUsers.curators.sintef.doi);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.userDialogAccordion).should('exist');
  cy.get('@registrationTitle').then((searchTitle: unknown) => {
    cy.searchFor(searchTitle as string);
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.rejectDoiButton).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton)
    .parent()
    .parent()
    .within(() => {
      cy.get('textarea').first().type('DOI rejected');
    });
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
Then('the reserved DOI is removed from the Registration', () => {
  cy.contains('https://handle.stage.datacite.org').should('not.exist');
});
