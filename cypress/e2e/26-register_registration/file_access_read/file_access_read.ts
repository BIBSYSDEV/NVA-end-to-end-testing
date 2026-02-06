// Feature: File metadata read and file download permissions
//     As a system user
//     I want file metadata read and file download permissions to be enforced based on file state and user role
//     So that only authorized users can read the metadata

import { v4 as uuid } from 'uuid';
import {
  userSintefPublicationCuratorMessages,
  userSintefPublicationMessages,
  userUnitWithAuthor,
  userUnitCuratorInstitution,
  userBIBSYSPublishNoRights,
  userSintefDOIMessages,
  FileVersions,
  CategoryTypes,
  userName,
  ContributorTypes,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import {
  createPublicationUsingAPI,
  FileType,
  FileTypes,
  findContributorByName,
  NviLevels,
  publishFile,
  RegistrationData,
  uploadFileToRegistration,
} from '../../../support/create_registration';

const UPLOADED_FILE = 'UploadedFile';
const PENDING_OPEN_FILE = 'PendingOpenFile';
const PENDING_INTERNAL_FILE = 'PendingInternalFile';
const OPEN_FILE = 'OpenFile';
const INTERNAL_FILE = 'InternalFile';
const HIDDEN_FILE = 'HiddenFile';

const NONE = 'None';
const OPEN = 'Open file';
const INTERNAL = 'Internal file';
const HIDDEN = 'Hidden file';

const addContributor = (builder: RegistrationData) => {
  findContributorByName('Withauthor TestUser', ContributorTypes.CREATOR).then((contributor) => {
    builder.addContributor(contributor);
    findContributorByName('Doi Messages TestUser', ContributorTypes.CREATOR).then((doiContributor) => {
      builder.addContributor(doiContributor);
      builder.update().then(() => {});
    });
  });
  // cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  // cy.reload();
  // cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  // cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton);
  // cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  // cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  // cy.getDataTestId(dataTestId.startPage.searchField).type('Withauthor TestUser{enter}');
  // cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
  // cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  // cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  // cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  // cy.getDataTestId(dataTestId.startPage.searchField).type('Doi Messages TestUser{enter}');
  // cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
  //   .parent()
  //   .parent()
  //   .parent()
  //   .filter(':contains("Doi Messages TestUser")')
  //   .filter(':contains("SINTEF")')
  //   .within(() => {
  //     cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
  //   });
  // cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  // cy.wait(3000);
  // cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  // cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click({ force: true });
  // cy.getSuccess();
};

const titles = {
  [UPLOADED_FILE]: `${UPLOADED_FILE} ${uuid()}`,
  [PENDING_OPEN_FILE]: `${PENDING_OPEN_FILE} ${uuid()}`,
  [PENDING_INTERNAL_FILE]: `${PENDING_INTERNAL_FILE} ${uuid()}`,
  [INTERNAL_FILE]: `${INTERNAL_FILE} ${uuid()}`,
  [OPEN_FILE]: `${OPEN_FILE} ${uuid()}`,
  [HIDDEN_FILE]: `${HIDDEN_FILE} ${uuid()}`,
};

const initData = () => {
  const ACADEMIC_ARTICLE = 'AcademicArticle';
  const fileName = 'lorem_ipsum.txt';
  const user = userName[userSintefPublicationMessages];

  cy.login(userSintefPublicationMessages).then(() => {
    createPublicationUsingAPI(titles[PENDING_OPEN_FILE], CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
      (builder) => {
        addContributor(builder);
        uploadFileToRegistration(builder.identifier, fileName).then((file) => {
          file.publisherVersion = 'PublishedVersion';
          builder
            .addFile(file)
            .update()
            .then(() => {});
        });
      }
    );

    createPublicationUsingAPI(
      titles[PENDING_INTERNAL_FILE],
      CategoryTypes.ACADEMIC_ARTICLE,
      user,
      NviLevels.LEVEL_0
    ).then((builder) => {
      addContributor(builder);
      uploadFileToRegistration(builder.identifier, fileName, FileTypes.PENDING_INTERNAL).then((file) => {
        builder
          .addFile(file)
          .update()
          .then(() => {});
      });
    });

    createPublicationUsingAPI(titles[OPEN_FILE], CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
      (builder) => {
        addContributor(builder);
        cy.wrap(builder).as('openFileBuilder');
        uploadFileToRegistration(builder.identifier, fileName).then((file) => {
          cy.wrap(file).as('openFile');
          builder
            .addFile(file)
            .update()
            .then(() => {});
        });
      }
    );

    createPublicationUsingAPI(titles[INTERNAL_FILE], CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
      (builder) => {
        addContributor(builder);
        cy.wrap(builder).as('internalFileBuilder');
        uploadFileToRegistration(builder.identifier, fileName, FileTypes.PENDING_INTERNAL).then((file) => {
          cy.wrap(file).as('internalFile');
          builder
            .addFile(file)
            .update()
            .then(() => {});
        });
      }
    );

    createPublicationUsingAPI(titles[HIDDEN_FILE], CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
      (builder) => {
        addContributor(builder);
        uploadFileToRegistration(builder.identifier, fileName, FileTypes.HIDDEN).then((file) => {
          builder
            .addFile(file)
            .update()
            .then(() => {});
        });
      }
    );
  });

  cy.login(userSintefPublicationCuratorMessages).then(() => {
    cy.get('@openFileBuilder').then((openFileBuilder: unknown) => {
      const builder = openFileBuilder as RegistrationData;
      cy.get('@openFile').then((openFile: unknown) => {
        const file = openFile as FileType;
        publishFile(builder.identifier, file).then(() => {});
      });
    });
    cy.get('@internalFileBuilder').then((openFileBuilder: unknown) => {
      const builder = openFileBuilder as RegistrationData;
      cy.get('@internalFile').then((openFile: unknown) => {
        const file = openFile as FileType;
        publishFile(builder.identifier, file).then(() => {});
      });
    });
  });
};

const users = {
  'Uploader at X': userSintefPublicationMessages,
  'Contributor at X': userSintefDOIMessages,
  'Other contributors': userUnitWithAuthor,
  'File curator at X': userSintefPublicationCuratorMessages,
  'File curators for other contributors': userUnitCuratorInstitution,
  'Everyone else': userBIBSYSPublishNoRights,
};

BeforeAll(() => initData());

//   Scenario Outline: Verify file metadata read permissions
Given('a file of type {string}', (fileType) => {
  cy.wrap(fileType).as('fileType');
});
When('the user have the role {string}', (userRole: string) => {
  cy.wrap(userRole).as('userRole');
  if (userRole !== 'Everyone else') {
    cy.login(users[userRole]);
  } else {
    cy.visit('/filter', {
      auth: {
        username: Cypress.env('DEVUSER'),
        password: Cypress.env('DEVPASSWORD'),
      },
    });
  }
});
When('the user attempts to "read-metadata"', () => {
  cy.get('@fileType').then((fileType) => {
    const title = titles[fileType.toString()];
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchResultItem)
      .filter(`:contains(${title})`)
      .within(() => {
        cy.get('a').first().click();
      });
    cy.getDataTestId(dataTestId.registrationLandingPage.contributors).should('exist');
  });
});
Then('the action outcome is {string}', (outcome) => {
  if (outcome === 'Allowed') {
    cy.get('@userRole').then((userRole) => {
      if (userRole.toString() !== 'Everyone else') {
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
        cy.reload();
        cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
        cy.get('[aria-label="Open file"]').should('exist');
      } else {
        cy.getDataTestId(dataTestId.registrationLandingPage.openFileButton).should('exist');
      }
    });
  } else {
    cy.get('@userRole').then((userRole) => {
      if (userRole.toString() !== 'Everyone else') {
        cy.getDataTestId(dataTestId.registrationWizard.files.deleteFile).should('not.exist');
      } else {
        cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).should('not.exist');
      }
    });
  }
});

// Examples:
//   | FileType            | UserRole                             | Outcome     |
//   | UploadedFile        | Uploader at X                        | Allowed     |
//   | UploadedFile        | Contributor at X                     | Not Allowed |
//   | UploadedFile        | Other contributors                   | Not Allowed |
//   | UploadedFile        | File curator at X                    | Allowed     |
//   | UploadedFile        | File curators for other contributors | Not Allowed |
//   | UploadedFile        | Everyone else                        | Not Allowed |
//   | UploadedFile        | External client                      | Not Allowed |
//   | PendingOpenFile     | Uploader at X                        | Allowed     |
//   | PendingOpenFile     | Contributor at X                     | Allowed     |
//   | PendingOpenFile     | Other contributors                   | Allowed     |
//   | PendingOpenFile     | File curator at X                    | Allowed     |
//   | PendingOpenFile     | File curators for other contributors | Allowed     |
//   | PendingOpenFile     | Everyone else                        | Not Allowed |
//   | PendingOpenFile     | External client                      | Not Allowed |
//   | PendingInternalFile | Uploader at X                        | Allowed     |
//   | PendingInternalFile | Contributor at X                     | Allowed     |
//   | PendingInternalFile | Other contributors                   | Allowed     |
//   | PendingInternalFile | File curator at X                    | Allowed     |
//   | PendingInternalFile | File curators for other contributors | Allowed     |
//   | PendingInternalFile | Everyone else                        | Not Allowed |
//   | PendingInternalFile | External client                      | Not Allowed |
//   | OpenFile            | Uploader at X                        | Allowed     |
//   | OpenFile            | Contributor at X                     | Allowed     |
//   | OpenFile            | Other contributors                   | Allowed     |
//   | OpenFile            | File curator at X                    | Allowed     |
//   | OpenFile            | File curators for other contributors | Allowed     |
//   | OpenFile            | Everyone else                        | Allowed     |
//   | OpenFile            | External client                      | Allowed     |
//   | InternalFile        | Uploader at X                        | Allowed     |
//   | InternalFile        | Contributor at X                     | Allowed     |
//   | InternalFile        | Other contributors                   | Allowed     |
//   | InternalFile        | File curator at X                    | Allowed     |
//   | InternalFile        | File curators for other contributors | Allowed     |
//   | InternalFile        | Everyone else                        | Not Allowed |
//   | InternalFile        | External client                      | Allowed     |
//   | HiddenFile          | Uploader at X                        | Not Allowed |
//   | HiddenFile          | Contributor at X                     | Not Allowed |
//   | HiddenFile          | Other contributors                   | Not Allowed |
//   | HiddenFile          | File curator at X                    | Allowed     |
//   | HiddenFile          | File curators for other contributors | Not Allowed |
//   | HiddenFile          | Everyone else                        | Not Allowed |
//   | HiddenFile          | External client                      | Not Allowed |
