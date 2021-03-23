import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

const filename = 'example.txt';

// Feature: Creator navigates to Contributors tab
// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});
When('they navigate to the Contributors tab', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').click({ force: true });
});
// End common steps

//   @417
//   Scenario: Creator navigates to Contributors tab
Then('they see "Add Author" Button is enabled', () => {
  cy.get('[data-testid=add-contributor-Creator]').should('be.enabled');
});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.enabled');
});
And('they see the tab Resource Type is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').should('be.enabled');
});
And('they see the tab Contributors is selected', () => {
  cy.get('[data-testid=nav-tabpanel-contributors][tabindex=0]');
});
And('they see the tab Files and License is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').should('be.enabled');
});
And('they see Previous is enabled', () => {
  cy.get('[data-testid=button-previous-tab]').should('be.enabled');
});
And('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});

//   @1837
//   Scenario: Creator adds themselves to the list of Authors
// Given Creator begins registering a Registration in the Wizard
// When they navigate to the Contributors tab
And('they see the "Add Author" Button', () => {});
And('they click "Add Author"', () => {});
And('they see the Author Search Dialog', () => {});
And('they click "Add me as Author"', () => {});
Then('their Author identity is added to the list of Authors', () => {});

// //   @419
// //   Scenario: Creator adds an Author to the list of Authors
//     Given Creator begins registering a Registration in the Wizard
//     When they navigate to the Contributors tab
//     And they see the "Add Author" Button
//     And they click "Add Author"
//     And they search for Author in the Author Search Dialog
//     And they select an Author identity
//     And they click "Add"
//     Then the selected Author identity is added to the list of Authors

// //   Scenario: Creator adds an Author to the list of Authors for Resource Type Book, Monograph
//     Given Creator begins registering a Registration in the Wizard
//     And they navigate to the Resources tab
//     And they select Resource Type "Book"
//     And they select Registration Subtype "Monograph"
//     When they navigate to the Contributors tab
//     And they see the "Add Author" Button
//     And they click "Add Author"
//     And they search for Author in the Author Search Dialog
//     And they select an Author identity
//     And they click "Add"
//     Then the selected Author identity is added to the list of Authors

// //   Scenario: Creator adds an Author to the list of Authors for Resource Type Chapter
//     Given Creator begins registering a Registration in the Wizard
//     And they navigate to the Resources tab
//     And they select the Resource Type "Part of book/report"
//     And they select the Registration Subtype "Chapter in anthology"
//     When they navigate to the Contributors tab
//     And they see the "Add Author" Button
//     And they click "Add Author"
//     And they search for Author in the Author Search Dialog
//     And they select an Author identity
//     And they click "Add"
//     Then the selected Author identity is added to the list of Authors

// //   @2203
// //   Scenario: Creator adds an Editor to the list of Editors for Resource Type Book, Anthology
//     Given Creator begins registering a Registration in the Wizard
//     And they navigate to the Resources tab
//     And they select Resource Type "Book"
//     And they select Registration Subtype "Anthology"
//     When they navigate to the Contributors tab
//     And they see the "Add Editor" Button
//     And they click "Add Editor"
//     And they search for Editor in the Author Search Dialog
//     And they select an Author identity
//     And they click "Add"
//     Then the selected Author identity is added to the list of Editors

// //   @2204
// //   Scenario: Creator adds a Supervisor to the list of Supervisors for Resource Type Student Thesis
//     Given Creator begins registering a Registration in the Wizard
//     And they navigate to the Resources tab
//     And they select Resource Type "Student Thesis"
//     And they select any Registration Subtype
//     When they navigate to the Contributors tab
//     And they see the "Add Author" Button
//     And they see the "Add Supervisor" Button
//     And they click "Add Supervisor"
//     And they search for Supervisor in the Author Search Dialog
//     And they select an Author identity
//     And they click "Add"
//     Then the selected Author identity is added to the list of Supervisors

// //   @788
// //   Scenario: Creator creates a new Author in the Author dialog
//     Given Creator begins registering a Registration in the Wizard
//     And they navigate to the Contributors tab
//     And they see the "Add Author" Button
//     And they click "Add Author"
//     And they see the "Create new Author" Button
//     When they click "Create new Author"
//     Then they see fields:
//       | First name |
//       | Last name  |
//     And they see the "Create new Author" Button
