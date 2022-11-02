// Feature: User navigates to Landing Page for Registration and can see Files

import { dataTestId } from '../../../support/dataTestIds';

const fileTypes = {
  'PDF': 'test_file.pdf',
  'Image': 'sikt.png',
  'Microsoft Office': 'example.docx',
};

// Common steps
Given('Anonymous User views Landing Page for Registration', () => {
  cy.setLocalStorage('i18nextLng', 'eng');
  cy.visit('/');
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
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type('File with Administrative agreement{enter}');
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(':contains("File with Administrative agreement")')
    .first()
    .click();
});
When('they view the Files section', () => {
});
Then('they do not see the File that is an Administrative Agreement', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.filesAccordion}]`).should('not.exist');
});

// Scenario: Files that are part of Registration are listed
And('the Registration contains Files', () => {
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type('No administrative agreement');
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(':contains("No administrative agreement")')
    .first()
    .click();
});
When('they view the Files section', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.filesAccordion}]`).as('files').should('be.visible');
});
Then('they can see Files that are not Administrative Agreements are listed', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.file}]`).should('have.length', 1);
});
And('for each File they can see:', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.file}]`).each((file) => {
    cy.wrap(file).within(() => {
      cy.get(`[data-testid=${dataTestId.registrationLandingPage.fileName}]`).should('be.visible');
      cy.get(`[data-testid=${dataTestId.registrationLandingPage.fileSize}]`).should('be.visible');
      cy.get(`[data-testid=${dataTestId.registrationLandingPage.fileVersion}]`).should('be.visible');
    });
  });
});
// | Name    |
// | Size    |
// | Version |
// | License |
And('they can see a download button for Files that are not Embargoed', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.openFileButton}]`).should('have.length', 1);
});

// @2158
// Scenario Outline: Files can be previewed
And('the Registration contains Files that are not Embargoed of type {string}', (fileType) => {
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type(`Not Embargoed ${fileType} file`);
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(`:contains("Not Embargoed ${fileType} file")`)
    .first()
    .click();
});
And('every File has an expandable Preview panel', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.filesAccordion}]`).should('have.length', 1);
});
When('the user expands the Preview panel', () => { });
Then('the selected File is downloaded', () => { });
And('they see the downloaded File is of type {string}', (type) => {
  cy.get('[data-testid=file-name]').contains(fileTypes[type]);
});
And('they see the preview of the downloaded File', () => {
  cy.get(`[data-testid=file-preview]`).should('be.visible');
});
// Examples:
//     | FileType         |
//     | PDF              |
//     | Image            |
//     | Microsoft Office |

// Scenario: Automatically preview first File
And('the Registration contains Files', () => {
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type('Not Embargoed Image file');
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(':contains("Not Embargoed Image file")')
    .first()
    .click();
});
When('the first File is not Embargoed', () => { });
And("the File's size is less than 10 MB", () => { });
Then("the File's Preview panel is expanded by default", () => {
  cy.get('[data-testid=file]').within(() => {
    cy.get(`[data-testid=${dataTestId.registrationLandingPage.filePreviewHeader}]`).should('be.visible');
  });
});
And('the File is automatically downloaded', () => { });
And('the downloaded File is displayed', (file) => {
  cy.get(`[data-testid=file-preview]`).should('be.visible');
});

// Scenario: Lock Embargoed Files
And('the Registration contains a File that is Embargoed', () => {
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type('Embargoed PDF file');
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(':contains("Embargoed PDF file")')
    .first()
    .click();
});
Then('the Embargoed File does not have an expandable Preview panel', () => {
  cy.get('[data-testid=file]').should('not.exist');
});
And('the Embargoed File does not have a download button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.openFileButton}]`).should('not.exist');
});
And('the user can see the date when the File will no longer be Embargoed', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.fileEmbargoDate}]`).should('be.visible');
});
