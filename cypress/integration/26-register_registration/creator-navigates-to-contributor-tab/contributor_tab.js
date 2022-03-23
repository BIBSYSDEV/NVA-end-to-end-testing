import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { contributorCreateFields, resourceTypes } from '../../../support/data_testid_constants';

// Feature: Creator navigates to Contributors tab
// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
});
When('they navigate to the Contributors tab', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').click({ force: true });
});

And('they see the "Add Author" Button', () => {
  cy.get('[data-testid=add-Creator]').should('be.visible');
});
And('they click "Add Author"', () => {
  cy.mockPersonSearch(userWithAuthor);
  cy.get('[data-testid=add-Creator]').click({ force: true });
});
// End common steps

//   @417
//   Scenario: Creator navigates to Contributors tab
Then('they see "Add Contributor" Button is enabled', () => {
  cy.get('[data-testid=add-Creator]').should('be.enabled');
});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.enabled');
});
And('they see the tab Resource Type is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).should('be.enabled');
});
And('they see the tab Contributors is selected', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}][tabindex=0]`);
});
And('they see the tab Files and License is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).should('be.enabled');
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
  cy.get('[data-testid=Creator]').within((authors) => {
    cy.wrap(authors).contains('Withauthor TestUser');
  });
});
And('their current Affiliations are listed', () => {});
//   @419
//   Scenario: Creator adds an Author to the list of Authors
And('they search for Author in the Author Search Dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.searchField}]`).type('TestUser, Withauthor');
});
And('they select an Author identity', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`).first().click({ force: true });
});
And('they click "Add"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click({ force: true });
});
Then('the selected Author identity is added to the list of Authors', () => {
  cy.get('[data-testid=Creator]').within((authors) => {
    cy.wrap(authors).contains('Withauthor TestUser');
  });
});

//   Scenario: Creator adds an Author to the list of Authors for Resource Type Book, Monograph
And('they navigate to the Resources tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
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
And('they select the Resource Type', (dataTable) => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${resourceTypes[dataTable.rawTable[0]]}]`).click({ force: true });
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
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton('Editor')}]`).should(
    'be.visible'
  );
});
And('they click "Add Editor"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton('Editor')}]`).click({
    force: true,
  });
});
And('they search for Editor in the Author Search Dialog', () => {
  cy.get('[data-testid=search-field]').type('TestUser Withauthor');
});
Then('the selected Author identity is added to the list of Editors', () => {
  cy.get('[data-testid=Editor]').within((editors) => {
    cy.wrap(editors).contains('Withauthor TestUser');
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
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton('Supervisor')}]`).should(
    'be.visible'
  );
});
And('they click "Add Supervisor"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton('Supervisor')}]`).click({
    force: true,
  });
});
And('they search for Supervisor in the Author Search Dialog', () => {
  cy.get('[data-testid=search-field]').type('TestUser Withauthor');
});
Then('the selected Author identity is added to the list of Supervisors', () => {
  cy.get('[data-testid=Supervisor]').within((editors) => {
    cy.wrap(editors).contains('Withauthor TestUser');
  });
});

//   @788
//   Scenario: Creator creates a new Author in the Author dialog
And('they see the "Create new Author" Button', () => {
  cy.get('[data-testid=button-create-new-author]').should('be.visible');
});
When('they click "Create new Author"', () => {
  cy.get('[data-testid=button-create-new-author]').click({ force: true });
});
Then('they see fields:', (dataTable) => {
  cy.get('[data-testid=contributor-modal]').within((contributerModal) => {
    dataTable.rawTable.forEach((field) => {
      cy.wrap(contributerModal).get(`[data-testid=${contributorCreateFields[field[0]]}]`);
    });
  });
});
//       | First name |
//       | Last name  |
And('they see the "Create new Author" Button in the Create new Author Dialog', () => {
  cy.get('[data-testid=button-create-authority]').should('be.visible');
});
