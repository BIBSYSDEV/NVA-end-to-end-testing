// Feature: User navigates to Landing Page for Registration and can see Files

import { dataTestId } from '../../../support/dataTestIds';
import { today } from '../../../support/commands'

const fileTypes = {
  'PDF': 'test_file.pdf',
  'Image': 'sikt.png',
  'Microsoft Office': 'example.docx',
};

// Common steps
Given('Anonymous User views Landing Page for Registration', () => {
  cy.setLocalStorage('i18nextLng', 'eng');
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
});

// End common steps

// Scenario: User sees the option to claim Ownership of a Resource
When('the User views the Landing Page', () => { });
Then('the User sees a option to claim Ownership of current Resource', () => { });

// Scenario: User uses the option to claim Ownership of current Resource
When('the User uses the option to claim Ownership of current Resource', () => { });
Then('the User must write a claim', () => { });
And('a Ownership Request is sent to the Owners Curator', () => { });
And('the User is notified that progress on this claim can be viewed in My Messages', () => { });

// @1530
// Scenario: Files that are Administrative Agreements are hidden
And('the Registration contains a File, which is an Administrative Agreement', () => {

  cy.getDataTestId(dataTestId.startPage.searchField).type(`File with Administrative agreement ${today}{enter}`);
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(`:contains("File with Administrative agreement ${today}")`)
    .first()
    .click();
});
When('they view the Files section', () => {
});
Then('they do not see the File that is an Administrative Agreement', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).should('not.exist');
});

// Scenario: Files that are part of Registration are listed
And('the Registration contains Files', () => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`No administrative agreement ${today}{enter}`);
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(`:contains("No administrative agreement ${today}") `)
    .first()
    .click();
});
When('they view the Files section', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).as('files').should('be.visible');
});
Then('they can see Files that are not Administrative Agreements are listed', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.file).should('have.length', 1);
});
And('for each File they can see:', () => {
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
And('they can see a download button for Files that are not Embargoed', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.openFileButton).should('have.length', 1);
});

// @2158
// Scenario Outline: Files can be previewed
And('the Registration contains Files that are not Embargoed of type {string}', (fileType) => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`Not Embargoed ${fileType} file ${today}{enter}`);
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(`:contains("Not Embargoed ${fileType} file ${today}")`)
    .first()
    .click();
});
And('every File has an expandable Preview panel', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).should('have.length', 1);
});
When('the user expands the Preview panel', () => { });
Then('the selected File is downloaded', () => { });
And('they see the downloaded File is of type {string}', (type) => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).contains(fileTypes[type]);
});
And('they see the preview of the downloaded File', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filePreview).should('be.visible');
});
// Examples:
//     | FileType         |
//     | PDF              |
//     | Image            |
//     | Microsoft Office |

// Scenario: Automatically preview first File
And('the Registration contains Files', () => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`Not Embargoed Image file ${today}{enter}`);
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(`:contains("Not Embargoed Image file ${today}")`)
    .first()
    .click();
});
When('the first File is not Embargoed', () => { });
And("the File's size is less than 10 MB", () => { });
Then("the File's Preview panel is expanded by default", () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.file).within(() => {
    cy.get(`[data-testid=${dataTestId.registrationLandingPage.fileName}]`).should('be.visible');
  });
});
And('the File is automatically downloaded', () => { });
And('the downloaded File is displayed', (file) => {
  cy.getDataTestId(dataTestId.registrationLandingPage.filePreview).should('be.visible');
});

// Scenario: Lock Embargoed Files
And('the Registration contains a File that is Embargoed', () => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`Check Embargoed PDF file ${today}{enter}`);
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(`:contains("Embargoed PDF file ${today}")`)
    .first()
    .click();
});
Then('the Embargoed File does not have an expandable Preview panel', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.file).should('not.exist');
});
And('the Embargoed File does not have a download button', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.openFileButton).should('not.exist');
});
And('the user can see the date when the File will no longer be Embargoed', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.fileEmbargoDate).should('be.visible');
});
