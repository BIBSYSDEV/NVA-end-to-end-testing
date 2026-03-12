// Feature: Hidden and internal files

import {
  CategoryTypes,
  TestUsers,
  userBIBSYSPublishRegistration,
  userBIBSYSPublishingCurator,
  userName,
} from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  createPublicationUsingAPI,
  FileTypes,
  NviLevels,
  uploadFileToRegistration,
} from '../../../support/create_registration';

const fileName = 'example.txt';
const fileTypes = {
  ['Open file']: FileTypes.PENDING_OPEN,
  ['Internal file']: FileTypes.PENDING_INTERNAL,
  ['Hidden file']: FileTypes.HIDDEN,
};

// Scenario Outline: Creator adds a non-open file
Given('Creator navigates to Files and License tab', () => {
  cy.login(userBIBSYSPublishingCurator);
  cy.startWizardWithEmptyRegistration();
  const title = `Non-open file ${uuid()}`;
  cy.createValidRegistration(null, title);
});
When('they add a file to the File upload widget', () => {
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
When('they mark the file as {string}', (fileType: string) => {
  cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
  cy.contains(fileType).click();
});
Then('they can see the file in the list of files', () => {
  cy.contains(fileName);
});
Then('the file is marked as {string}', (fileType) => {
  cy.getDataTestId(dataTestId.registrationWizard.files.fileRow).filter(`:contains(${fileType})`);
});
When('they publish the Registration', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
});
Then('they see the file under Internal files', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.internalFilesTab).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.file).filter(`:contains(${fileName})`);
});

// Examples:
//     | File type     |
//     | Hidden file   |
//     | Internal file |

// Scenario Outline: Curator approves non-open file
Given('a registration with a {string}', (type: unknown) => {
  const fileType = type as string;
  const user = userBIBSYSPublishRegistration;
  cy.login(user).then(() => {
    const title = `Non-open file ${uuid()}`;
    cy.wrap(title).as('title');
    cy.wrap(fileType).as('fileType');
    createPublicationUsingAPI(title, CategoryTypes.ACADEMIC_ARTICLE, userName[user], NviLevels.LEVEL_0).then(
      (builder) => {
        uploadFileToRegistration(builder.identifier, fileName, fileTypes[fileType]).then((file) => {
          builder.addFile(file).update();
        });
      }
    );
  });
});
Given('the files need approval from a Curator', () => {});
When('a Curator view the landing page of the registration', () => {
  cy.login(userBIBSYSPublishingCurator);
  cy.wait(5000);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.get('@title').then((title) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.wait(2000);
    cy.searchFor(title.toString());
  });
});
Then('they see {string}', (approvalMessage: string) => {
  cy.get('@fileType').then((fileType) => {
    if (fileType.toString() === 'Internal file') {
      cy.getDataTestId(dataTestId.registrationLandingPage.internalFilesTab).contains(approvalMessage);
    }
  });
});
When('they approve the file', () => {
  cy.get('@fileType').then((fileType) => {
    if (fileType.toString() === 'Internal file') {
      cy.refreshPublish();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
      cy.getSuccessDone();
    }
  });
});
Then('they see the file is approved', () => {
  cy.get('@fileType').then((fileType) => {
    if (fileType.toString() === 'Internal file') {
      cy.get('@title').then((title) => {
        cy.reload();
        cy.contains(title.toString());
        cy.refreshPublish();
        cy.getDataTestId(dataTestId.registrationLandingPage.internalFilesTab).click();
        cy.contains('1 waiting for approval').should('not.exist');
      });
    }
  });
});

// Examples:
//     | File type     | Approval message                   |
//     | Internal file | internal file waiting for approval |
//     | Hidden file   | hidden file waiting for approval   |

// Scenario Outline: Curator changes open file to non-open file
Given('a published registration with an open file', () => {
  cy.login(userBIBSYSPublishRegistration).then(() => {
    const title = `Non-open file ${uuid()}`;
    cy.wrap(title).as('title');
    createPublicationUsingAPI(
      title,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userBIBSYSPublishRegistration],
      NviLevels.LEVEL_0
    ).then((builder) => {
      uploadFileToRegistration(builder.identifier, fileName, FileTypes.PENDING_OPEN).then((file) => {
        builder
          .addFile(file)
          .update()
          .then(() => {});
      });
    });
  });
});
Given('the file needs approval', () => {});
When('a curator edit the registration and changes the open file to {string}', (fileType: string) => {
  cy.wrap(fileType).as('fileType');
  cy.login(userBIBSYSPublishingCurator);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.get('@title').then((title: unknown) => {
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.searchFor(title.toString());
  });
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
  cy.contains(fileType).click();
});
When('navigates to the landing page', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
});

// Examples:
// | File type     | Approval message                   |
// | Internal file | internal file waiting for approval |
// | Hidden file   | hidden file waiting for approval   |
