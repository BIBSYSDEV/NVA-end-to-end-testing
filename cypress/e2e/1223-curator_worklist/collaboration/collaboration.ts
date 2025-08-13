// Feature: Collaboration between institutions

import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';
import {
  collaborationCuratorBIBSYS,
  collaborationCuratorNMBU,
  collaborationCuratorUSN,
  FileVersions,
  uploaderBIBSYS,
  uploaderNMBU,
  uploaderUSN,
} from '../../../support/constants';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { getBadgeCount } from 'aws-amplify/push-notifications';

const fileName = 'exampleA.txt';

// institution A: Sikt
// institution B: Unit
// institution C: BIBSYS

const collaborators = {
  'Collaborator A': uploaderBIBSYS,
  'Collaborator B': uploaderNMBU,
  'Collaborator C': uploaderUSN,
};

const curators = {
  'Curator A': collaborationCuratorBIBSYS,
  'Curator B': collaborationCuratorNMBU,
  'Curator C': collaborationCuratorUSN,
};

// Scenario Outline: Files are approved by Curators from file uploaders institution
Given('a Publication is created by institution A with contributors from institutions A, B and C', () => {
  cy.setWorkflowRegistratorPublishesMetadata();
  cy.login(uploaderBIBSYS);
  const title = `Collaboration ${uuid()}`;
  cy.log(title);
  cy.wrap(title).as('title');
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(fileName, title, FileVersions.PUBLISHED);
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`colaboration B{enter}`);
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectAffiliationForContributor);
  cy.get('tr')
    .filter(':contains("Colaboration B TestUser)')
    // .filter(':contains("Norwegian University of Life Sciences")')
    .within(() => {
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`colaboration C{enter}`);
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectAffiliationForContributor);
  cy.get('tr')
    .filter(":contains('colaboration C TestUser')")
    // .filter(':contains("University of South-Eastern Norway")')
    .within(() => {
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
  cy.wait(30000);
});
Given('a file is uploaded from:', (dataTable: DataTable) => {
  dataTable.raw().forEach((data) => {
    const collaborator = data[0];
    cy.get('@title').then((title) => {
      cy.login(collaborators[collaborator]);
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.startPage.searchResultItem)
        .filter(`:contains(${title})`)
        .within(() => {
          cy.get('p > a').first().click();
        });
    });
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    const uploadedFileName = `example${collaborator.replace('Collaborator ', '')}.txt`;
    cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${uploadedFileName}`, { force: true });
    cy.getDataTestId(dataTestId.registrationWizard.files.fileRow)
      .filter(`:contains(${uploadedFileName})`)
      .within(() => {
        cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).last().click();
        cy.contains('Open file').click();
        cy.getDataTestId(dataTestId.registrationWizard.files.version, { timeout: 30000 })
          .last()
          .within(() => {
            cy.get('input[type=radio]').first().click();
          });
        cy.getDataTestId(dataTestId.registrationWizard.files.selectLicenseField)
          .last()
          .scrollIntoView()
          .click({ force: true })
          .type(' ');
      });
    cy.getDataTestId(dataTestId.registrationWizard.files.licenseItem).first().click({ force: true });
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
    cy.contains(uploadedFileName);
  });
  cy.wait(5000);
});
Then('the curator for institution A will not get a task to approve a publication request', () => {
  cy.login(curators['Curator A']);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
  cy.get('@title').then((title) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
    // cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
  });
});
Then(
  'the curator for institution B will get a task to approve the file from Uploader B and not from Uploader C',
  () => {
    cy.login(curators['Curator B']);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
    cy.get('@title').then((title) => {
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
      // cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
    });
  }
);
Then('the curator institution C will get a task to approve the file from Uploader C and not from Uploader B', () => {
  cy.login(curators['Curator C']);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
  cy.get('@title').then((title) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
    // cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
  });
});

// Scenario: Users sees messages from their curator
//   | Collaborator B |
//   | Collaborator C |
When('a message for files sent from:', (dataTable: DataTable) => {
  dataTable.raw().forEach((data) => {
    const curator = curators[data[0]];
    cy.login(curator);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
    cy.get('@title').then((title) => {
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).within(() => {
        cy.getDataTestId(dataTestId.tasksPage.messageField).type(`Message from ${data[0]}{enter}`);
      });
      cy.contains('Message sent');
      // cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
      // cy.getSuccess();
      // cy.getSuccessDone();
      // cy.wait(5000);
    });
  });
});
//   | Curator A |
//   | Curator B |
//   | Curator C |
Then('the message is only sent to:', (dataTable: DataTable) => {
  dataTable.raw().forEach((data) => {
    const curator = data[0];
    const collborator = collaborators[data[1]];
    const institution = curator.replace('Curator ', '');
    const ignore = ['A', 'B', 'C'].filter((inst) => inst !== institution);
    cy.login(collborator);
    cy.get('@title').then((title) => {
      cy.getDataTestId(dataTestId.header.myPageLink).click();
      cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).within(() => {
        cy.contains(`Message from ${curator}`);
        ignore.forEach((inst) => {
          cy.contains(`Message from Curator ${inst}`).should('not.exist');
        });
      });
    });
  });
});
//   | Curator A | Collaborator A |
//   | Curator B | Collaborator B |
//   | Curator C | Collaborator C |

// Scenario: DOI requests when collaborating
When('a DOI is requested from:', (dataTable: DataTable) => {
  dataTable.raw().forEach((data) => {
    const collaborator = data[0];
    cy.get('@title').then((title) => {
      cy.login(collaborators[collaborator]);
      cy.getDataTestId(dataTestId.startPage.searchField);
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchResultItem)
        .filter(`:contains(${title})`)
        .within(() => {
          cy.get('p > a').first().click();
        });
    });
    // if (collaborator === 'Collaborator A') {

    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.doiMessageField).type(`DOI request from ${collaborator}`);
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
    // } else {
    //     cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion);
    //     cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).should('not.exist');
    // }
  });
});
// | Collaborator A |
// | Collaborator B |
// | Collaborator C |
Then(
  'the curators from the collaborating institutions will only see DOI request messages from collaborators from their own institution:',
  (dataTable: DataTable) => {
    const institutions = ['A', 'B', 'C'];
    dataTable.raw().forEach((data) => {
      const curator = data[0];
      const institution = curator.replace('Curator ', '');
      const ignore = institutions.filter((inst) => inst !== institution);
      cy.login(curators[curator]);
      cy.getDataTestId(dataTestId.header.tasksLink).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
      cy.get('@title').then((title) => {
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        ignore.forEach((inst) => {
          cy.contains(`DOI request from Collaborator ${inst}`).should('not.exist');
        });
        if (curator === 'Curator A') {
          cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
        }
        cy.contains(`DOI request from Collaborator ${institution}`);
      });
    });
  }
);
// | Curator A |
// | Curator B |
// | Curator C |

// Scenario: Support requests when collaborating
When('a support message is sent from:', (dataTable: DataTable) => {
  dataTable.raw().forEach((data) => {
    const collaborator = data[0];
    cy.get('@title').then((title) => {
      cy.login(collaborators[collaborator]);
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.startPage.searchResultItem)
        .filter(`:contains(${title})`)
        .within(() => {
          cy.get('p > a').first().click();
        });
    });
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.openSupportButton).click();
    cy.getDataTestId(dataTestId.tasksPage.messageField).within(() => {
      cy.get('textarea').should('be.enabled');
    });
    cy.getDataTestId(dataTestId.tasksPage.messageField).type(`Message from ${collaborator}{enter}`);
  });
});
// | Collaborator A |
// | Collaborator B |
// | Collaborator C |

Then(
  'the curators from the collaborating institutions will only see support messages from collaborators from their own institution:',
  (dataTable: DataTable) => {
    const institutions = ['A', 'B', 'C'];
    dataTable.raw().forEach((data) => {
      const curator = data[0];
      const institution = curator.replace('Curator ', '');
      const ignore = institutions.filter((inst) => inst !== institution);
      cy.login(curators[curator]);
      cy.getDataTestId(dataTestId.header.tasksLink).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
      cy.get('@title').then((title) => {
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.startPage.searchResultItem);
        ignore.forEach((inst) => {
          cy.getDataTestId(dataTestId.startPage.searchResultItem)
            .filter(`:contains("Message from Collaborator ${inst}")`)
            .should('not.exist');
        });
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
        cy.contains(`Message from Collaborator ${institution}`);
      });
    });
  }
);
// | Curator A |
// | Curator B |
// | Curator C |

// Scenario: Visibility of requests when collaborating
//   | Collaborator A |
//   | Collaborator B |
//   | Collaborator C |
When('a response is sent from:', (dataTable: DataTable) => {
  const institutions = ['A', 'B', 'C'];
  dataTable.raw().forEach((data) => {
    const curator = data[0];
    const institution = curator.replace('Curator ', '');
    const ignore = institutions.filter((inst) => inst !== institution);
    cy.get('@title').then((title) => {
      cy.login(curators[curator]);
      cy.getDataTestId(dataTestId.header.tasksLink).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).within(() => {
        cy.getDataTestId(dataTestId.tasksPage.messageField).type(`Response from ${curator}{enter}`);
      });
      cy.contains('Message sent');
    });
  });
});
// | Curator A |
// | Curator B |
// | Curator C |

Then('the collaborators will only see messages responding to their own messages:', (dataTable: DataTable) => {
  const institutions = ['A', 'B', 'C'];
  dataTable.raw().forEach((data) => {
    const collaborator = data[0];
    const curator = data[1];
    const institution = curator.replace('Curator ', '');
    const ignore = institutions.filter((inst) => inst !== institution);
    cy.get('@title').then((title) => {
      cy.login(collaborators[collaborator]);
      cy.getDataTestId(dataTestId.header.myPageLink).click();
      cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
      cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
      cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
      cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).within(() => {
        cy.contains(`Response from ${curator}`);
        ignore.forEach((inst) => {
          cy.contains(`Message from Collaborator ${inst}`).should('not.exist');
        });
      });
    });
  });
});
//   | Collaborator A | Curator A |
//   | Collaborator B | Curator B |
//   | Collaborator C | Curator C |
