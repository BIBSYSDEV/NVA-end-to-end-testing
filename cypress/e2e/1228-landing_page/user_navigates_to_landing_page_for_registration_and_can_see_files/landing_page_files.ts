// Feature: User navigates to Landing Page for Registration and can see Files

import { dataTestId } from '../../../support/dataTestIds';
import { today } from '../../../support/commands';
import { CategoryTypes, userName, userUnitWithAuthor, userUnitWithAuthor2 } from '../../../support/constants';
import { v4 as uuid } from 'uuid';
import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  createPublicationUsingAPI,
  FileTypes,
  NviLevels,
  uploadFileToRegistration,
} from '../../../support/create_registration';

const fileTypes = {
  'PDF': {
    type: 'PDF',
    name: 'test_file.pdf',
    mimeType: 'application/pdf',
  },
  'Image': {
    type: 'Image',
    name: 'sikt.png',
    mimeType: 'image/png',
  },
  'Microsoft Office': {
    type: 'Microsoft Office',
    name: 'example.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
};

const OPEN_FILE = 'Open file';
const INTERNAL_FILE = 'Internal file';
const EMBARGOED_FILE = 'Embargoed file';

let preview = false;

// Common steps
Given('Anonymous User views Landing Page for Registration', () => {
  cy.login(userUnitWithAuthor2);
});

// End common steps

Before({ 'tags': '@init' }, () => {
  const textFileName = 'lorem_ipsum.txt';

  cy.login(userUnitWithAuthor).then(() => {
    const user = userName[userUnitWithAuthor];
    const internalFileTitle = `File with Administrative agreement ${uuid()}`;
    createPublicationUsingAPI(internalFileTitle, CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
      (builder) => {
        uploadFileToRegistration(builder.identifier, textFileName, FileTypes.PENDING_INTERNAL).then((file) => {
          builder
            .addFile(file)
            .update()
            .then(() => {});
        });
      }
    );

    const publicFileTitle = `No administrative agreement ${uuid()}`;
    createPublicationUsingAPI(publicFileTitle, CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
      (builder) => {
        uploadFileToRegistration(builder.identifier, textFileName).then((file) => {
          builder
            .addFile(file)
            .update()
            .then(() => {});
        });
      }
    );

    Object.keys(fileTypes).forEach((fileType) => {
      console.log(fileType)
      const fileTypeTitle = `Not Embargoed ${fileTypes[fileType]['type']} file ${uuid()}`;
      createPublicationUsingAPI(fileTypeTitle, CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
        (builder) => {
          uploadFileToRegistration(
            builder.identifier,
            fileTypes[fileType]['name'],
            FileTypes.PENDING_OPEN,
            fileTypes[fileType]['mimeType']
          ).then((file) => {
            builder
              .addFile(file)
              .update()
              .then(() => {});
          });
        }
      );
    });

    const embargoedFileTitle = `Check Embargoed PDF file ${uuid()}`;
    createPublicationUsingAPI(embargoedFileTitle, CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
      (builder) => {
        uploadFileToRegistration(
          builder.identifier,
          'test_file.pdf',
          FileTypes.PENDING_OPEN,
          'application/pdf',
          '2100-01-01T23:00:00.000Z'
        ).then((file) => {
          builder
            .addFile(file)
            .update()
            .then(() => {});
        });
      }
    );
  });
});

// Scenario: User sees the option to claim Ownership of a Resource
When('the User views the Landing Page', () => {});
Then('the User sees a option to claim Ownership of current Resource', () => {});

// Scenario: User uses the option to claim Ownership of current Resource
When('the User uses the option to claim Ownership of current Resource', () => {});
Then('the User must write a claim', () => {});
Then('a Ownership Request is sent to the Owners Curator', () => {});
Then('the User is notified that progress on this claim can be viewed in My Messages', () => {});

// @1530
// Scenario: Files that are Administrative Agreements are hidden
Given('the Registration contains a File, which is an Administrative Agreement', () => {
  const title = `File with Administrative agreement`;
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.searchFor(title);
});
Then('they do not see the File that is an Administrative Agreement', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).should('not.exist');
});

// Scenario: Files that are part of Registration are listed
Given('the Registration contains Files', () => {
  const searchTitle = preview ? 'Not Embargoed Image file' : 'No administrative agreement';
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.searchFor(searchTitle);

});
When('they view the Files section', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).as('files').should('be.visible');
});
Then('they can see Files that are not Administrative Agreements are listed', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.file).should('have.length', 1);
});
Then('for each File they can see:', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.file).each((file) => {
    cy.wrap(file).within(() => {
      cy.getDataTestId(dataTestId.registrationLandingPage.fileName).should('be.visible');
      cy.getDataTestId(dataTestId.registrationLandingPage.fileSize).should('be.visible');
      cy.getDataTestId(dataTestId.registrationLandingPage.fileVersion).should('be.visible');
    });
  });
});
// | Name    |
// | Size    |
// | Version |
// | License |
Then('they can see a download button for Files that are not Embargoed', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.openFileButton).should('have.length', 1);
});

// @2158
// Scenario Outline: Files can be previewed
Given('the Registration contains Files that are not Embargoed of type {string}', (fileType) => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.searchFor(`Not Embargoed ${fileType} file`);
});
Given('every File has an expandable Preview panel', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).should('have.length', 1);
});
When('the user expands the Preview panel', () => {});
Then('the selected File is downloaded', () => {});
Then('they see the downloaded File is of type {string}', (type: string) => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).contains(fileTypes[type]['name']);
});
Then('they see the preview of the downloaded File', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filePreview).should('be.visible');
});
// Examples:
//     | FileType         |
//     | PDF              |
//     | Image            |
//     | Microsoft Office |

// Scenario: Automatically preview first File
When('the first File is not Embargoed', () => {});
When("the File's size is less than 10 MB", () => {});
Then("the File's Preview panel is expanded by default", () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.file).within(() => {
    cy.get(`[data-testid=${dataTestId.registrationLandingPage.fileName}]`).should('be.visible');
  });
});
Then('the File is automatically downloaded', () => {});
Then('the downloaded File is displayed', (file) => {
  cy.contains('Preview of lorem_ipsum.txt');
});

// Scenario: Lock Embargoed Files
Given('the Registration contains a File that is Embargoed', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.searchFor('Check Embargoed PDF file');
});
Then('the Embargoed File does not have an expandable Preview panel', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.file).should('not.exist');
});
Then('the Embargoed File does not have a download button', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.openFileButton).should('not.exist');
});
Then('the user can see the date when the File will no longer be Embargoed', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.fileEmbargoDate).should('be.visible');
});
