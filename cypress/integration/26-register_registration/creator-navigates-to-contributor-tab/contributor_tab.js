import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { CONTRIBUTOR_CREATE_FIELDS } from '../../../support/data_testid_constants';

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

And('they see the "Add Author" Button', () => {
  cy.get('[data-testid=add-contributor-Creator]').should('be.visible');
});
And('they click "Add Author"', () => {
  cy.get('[data-testid=add-contributor-Creator]').click({ force: true });
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
And('they see the Author Search Dialog', () => {
  cy.get('[data-testid=contributor-modal]').should('be.visible');
});
And('they click "Add me as Author"', () => {
  cy.get('[data-testid=button-add-self-author]').click({ force: true });
});
Then('their Author identity is added to the list of Authors', () => {
  cy.get('[data-testid=contributors-Creator]')
    .within((authors) => {
      cy.wrap(authors).contains('TestUser, Withauthor');
    });
});

//   @419
//   Scenario: Creator adds an Author to the list of Authors
And('they search for Author in the Author Search Dialog', () => {
  cy.get('[data-testid=search-input]').type('TestUser Kari');
});
And('they select an Author identity', () => {
  cy.get('[data-testid=author-radio-button]').first().click({ force: true });
});
And('they click "Add"', () => {
  cy.get('[data-testid=connect-author-button]').click({ force: true });
});
Then('the selected Author identity is added to the list of Authors', () => {
  cy.get('[data-testid=contributors-Creator]')
    .within((authors) => {
      cy.wrap(authors).contains('TestUser, Kari');
    });
});

//   Scenario: Creator adds an Author to the list of Authors for Resource Type Book, Monograph
And('they navigate to the Resources tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type]').click({ force: true });
});
And('they select Resource Type "Book"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
});
And('they select Registration Subtype "Monograph"', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });
});

//   Scenario: Creator adds an Author to the list of Authors for Resource Type Chapter
And('they select the Resource Type "Part of book / report"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Chapter]').click({ force: true });
});
And('they select the Registration Subtype "Chapter in anthology"', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-ChapterArticle]').click({ force: true });
});

//   @2203
//   Scenario: Creator adds an Editor to the list of Editors for Resource Type Book, Anthology
And('they select Registration Subtype "Anthology"', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookAnthology]').click({ force: true });
});
And('they see the "Add Editor" Button', () => {
  cy.get('[data-testid=add-contributor-Editor]').should('be.visible');
});
And('they click "Add Editor"', () => {
  cy.get('[data-testid=add-contributor-Editor]').click({ force: true });
});
And('they search for Editor in the Author Search Dialog', () => {
  cy.get('[data-testid=search-input]').type('TestUser Kari');
});
Then('the selected Author identity is added to the list of Editors', () => {
  cy.get('[data-testid=contributors-Editor]')
    .within((editors) => {
      cy.wrap(editors).contains('TestUser, Kari');
    });
});

//   @2204
//   Scenario: Creator adds a Supervisor to the list of Supervisors for Resource Type Student Thesis
And('they select Resource Type "Student Thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
});
And('they select any Registration Subtype', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-DegreeMaster]').click({ force: true });
});
And('they see the "Add Supervisor" Button', () => {
  cy.get('[data-testid=add-contributor-Supervisor]').should('be.visible');
});
And('they click "Add Supervisor"', () => {
  cy.get('[data-testid=add-contributor-Supervisor]').click({ force: true });
});
And('they search for Supervisor in the Author Search Dialog', () => {
  cy.get('[data-testid=search-input]').type('TestUser Kari');
});
Then('the selected Author identity is added to the list of Supervisors', () => {
  cy.get('[data-testid=contributors-Supervisor]')
    .within((editors) => {
      cy.wrap(editors).contains('TestUser, Kari');
    });
});

//   @788
//   Scenario: Creator creates a new Author in the Author dialog
//     Given Creator begins registering a Registration in the Wizard
//     And they navigate to the Contributors tab
//     And they see the "Add Author" Button
//     And they click "Add Author"
And('they see the "Create new Author" Button', () => {
  cy.log(window.testState.currentScenario);
  // if(window.testState.currentScenario.step)
  cy.get('[data-testid=button-create-new-author]').should('be.visible');
});
When('they click "Create new Author"', () => {
  cy.get('[data-testid=button-create-new-author]').click({ force: true });
});
Then('they see fields:', (dataTable) => {
  cy.get('[data-testid=contributor-modal]').within((contributerModal) => {
    dataTable.rawTable.forEach((field) => {
      cy.wrap(contributerModal).get(`[data-testid=${CONTRIBUTOR_CREATE_FIELDS[field[0]]}]`);
    });
  });
});
//       | First name |
//       | Last name  |
And('they see the "Create new Author" Button in the Create new author Dialog', () => {
  cy.get('[data-testid=button-create-authority]').should('be.visible');
});
