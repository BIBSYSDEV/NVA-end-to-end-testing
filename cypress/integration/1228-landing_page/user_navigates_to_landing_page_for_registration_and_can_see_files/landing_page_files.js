// Feature: User navigates to Landing Page for Registration and can see Files

import { dataTestId } from '../../../support/dataTestIds';

// Scenario: User sees the option to claim Ownership of a Resource
When('the User views the Landing Page', () => {});
Then('the User sees a option to claim Ownership of current Resource', () => {});

// Scenario: User uses the option to claim Ownership of current Resource
When('the User uses the option to claim Ownership of current Resource', () => {});
Then('the User must write a claim', () => {});
And('a Ownership Request is sent to the Owners Curator', () => {});
And('the User is notified that progress on this claim can be viewed in My Messages', () => {});

// @1530
// Scenario: Files that are Administrative Agreements are hidden
Given('Anonymous User views Landing Page for Registration', () => {
  cy.visit('/');
});
And('the Registration contains a File, which is an Administrative Agreement', () => {
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type('Administrative agreement');
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`)
    .filter(':contains("Administrative agreement")')
    .first()
    .click();
});
When('they view the Files section', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.filesAccordion}]`).as('files');
});
Then('they do not see the File that is an Administrative Agreement', () => {
  cy.get('@files').within(() => {
    cy.contains('Preview').should('not.exist');
  });
});

// Scenario: Files that are part of Registration are listed
And('the Registration contains Files', () => {
  cy.get(`[data-testid=${dataTestId.startPage.searchField}]`).type('No dministrative agreement');
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
Given('Anonymous User views Landing Page for Registration', () => {});
And('the Registration contains Files that are not Embargoed', () => {});
And('every File has an expandable Preview panel', () => {});
When('the user expands the Preview panel', () => {});
Then('the selected File is downloaded', () => {});
And('they see the downloaded File is of type {string}', () => {});
And('they see the preview of the downloaded File', () => {});
// Examples:
//     | FileType         |
//     | PDF              |
//     | Image            |
//     | Microsoft Office |

// Scenario: Automatically preview first File
Given('Anonymous User views Landing Page for Registration', () => {});
And('the Registration contains Files', () => {});
When('the first File is not Embargoed', () => {});
And("the File's size is less than 10 MB", () => {});
Then("the File's Preview panel is expanded by default", () => {});
And('the File is automatically downloaded', () => {});
And('the downloaded File is displayed', () => {});

// Scenario: Lock Embargoed Files
Given('Anonymous User views Landing Page for Registration', () => {});
And('the Registration contains a File that is Embargoed', () => {});
Then('the Embargoed File does not have an expandable Preview panel', () => {});
And('the Embargoed File does not have a download button', () => {});
And('the user can see the date when the File will no longer be Embargoed', () => {});
