import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userContributor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import {
  contributorButtons,
  resourceTypes,
} from '../../../support/data_testid_constants';

Before({ tags: '@TEST_NP-4008' }, () => {
  cy.wrap('button-set-unverified-contributor-').as('button');
});
Before({ tags: '@TEST_NP-4009' }, () => {
  cy.wrap(dataTestId.registrationWizard.contributors.selectUserButton).as('button');
});

Before(() => {
  cy.login(userContributor);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click();
});

// Feature: Creator navigates to Contributors tab
// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {
});
When('they navigate to the Contributors tab', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').click({ force: true });
});

And('they see the "Add Author" Button', () => {
  cy.get('[data-testid=add-Creator]').should('be.visible');
});
And('they click "Add Author"', () => {
  // cy.mockPersonSearch(userWithAuthor);
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
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addSelfButton}]`).click();
});
Then('their Author identity is added to the list of Authors', () => {
  cy.get('[data-testid=Creator]').within((authors) => {
    cy.wrap(authors).contains('Contributor TestUser');
  });
});
And('their current Affiliations are listed', () => {
  cy.contains('Unit');
});

// Scenario Outline: Creator see buttons to add Contributors
Given('Creator navigates to Contributors tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('the Registration has Registration Type {string}', (type) => {
  cy.get('[data-testid=publication-context-type]').click();
  cy.get(`[data-testid=${resourceTypes[type]}]`).click();
  cy.wrap(true).as('book');
  if (type !== 'Book') {
    cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
    cy.wrap(false).as('book');
  }
});
And('the Registration has Registration Subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click();
  cy.get(`[data-testid=publication-instance-type-${subtype}]`).click();
  cy.get('@book').then((isBook) => {
    if (isBook && subtype !== 'BookMonograph') {
      cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
    }
  })
});
Then('they see buttons {string}', (button) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  const buttons = button.split(', ');
  buttons.forEach((contributorButton) => {
    cy.get(`[data-testid=${contributorButtons[contributorButton]}]`).should('be.visible');
  });
});
// Examples:
//   | RegistrationType | RegistrationSubtype       | AddContributorButtons                       |
//   | Book             | BookAnthology             | Add Editor, Add Contributor                 |
//   | Book             | BookMonograph             | Add Author, Add Contributor                 |
//   | Chapter          | ChapterArticle            | Add Author, Add Contributor                 |
//   | Chapter          | ChapterConferenceAbstract | Add Author, Add Contributor                 |
//   | Degree           | DegreeBachelor            | Add Author, Add Supervisor, Add Contributor |
//   | Degree           | DegreeMaster              | Add Author, Add Supervisor, Add Contributor |
//   | Degree           | DegreePhd                 | Add Author, Add Supervisor, Add Contributor |
//   | Degree           | DegreeLicentiate          | Add Author, Add Supervisor, Add Contributor |
//   | Degree           | OtherStudentWork          | Add Author, Add Supervisor, Add Contributor |
//   | Journal          | FeatureArticle            | Add Author, Add Contributor                 |
//   | Journal          | JournalArticle            | Add Author, Add Contributor                 |
//   | Journal          | JournalCorrigendum        | Add Author, Add Contributor                 |
//   | Journal          | JournalLeader             | Add Author, Add Contributor                 |
//   | Journal          | JournalLetter             | Add Author, Add Contributor                 |
//   | Journal          | JournalReview             | Add Author, Add Contributor                 |
//   | Journal          | JournalBooklet            | Add Author, Add Contributor                 |
//   | Journal          | JournalConferenceAbstract | Add Author, Add Contributor                 |
//   | Report           | ReportBasic               | Add Author, Add Contributor                 |
//   | Report           | ReportPolicy              | Add Author, Add Contributor                 |
//   | Report           | ReportResearch            | Add Author, Add Contributor                 |
//   | Report           | ReportAbstractCollection  | Add Author, Add Contributor                 |
//   | Report           | ReportWorkingPaper        | Add Author, Add Contributor                 |
//   | Presentation     | ConferenceLecture         | Add Author, Add Contributor                 |
//   | Presentation     | ConferencePoster          | Add Author, Add Contributor                 |
//   | Presentation     | Lecture                   | Add Author, Add Contributor                 |
//   | Presentation     | OtherPresentation         | Add Author, Add Contributor                 |
//   | Artistic         | ArtisticDesign            | Add Contributor                             |
//   | Media            | Interview                 | Add Author, Add Contributor                 |
//   | Media            | Blog                      | Add Author, Add Contributor                 |
//   | Media            | Podcast                   | Add Contributor                             |
//   | Media            | ProgrammeManagement       | Add Contributor                             |
//   | Media            | ProgrammeParticipation    | Add Contributor                             |

//   @419
//   Scenario: Creator adds an Author to the list of Authors
And('they search for Author in the Author Search Dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.searchField}]`).type('TestUser, Contributor');
});
And('they select an Author identity', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`)
    .first()
    .click({ force: true });
});
And('they click "Add"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click({ force: true });
});
Then('the selected Author identity is added to the list of Authors', () => {
  cy.get('[data-testid=Creator]').within((authors) => {
    cy.wrap(authors).contains('Contributor TestUser');
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
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
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
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
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
  cy.get('[data-testid=search-field]').type('TestUser Contributor');
});
Then('the selected Author identity is added to the list of Editors', () => {
  cy.get('[data-testid=Editor]').within((editors) => {
    cy.wrap(editors).contains('Contributor TestUser');
  });
});

//   @2204
//   Scenario: Creator adds a Supervisor to the list of Supervisors for Resource Type Student Thesis
And('they select Resource Type "Student Thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
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
  cy.get('[data-testid=search-field]').type('TestUser Contributor');
});
Then('the selected Author identity is added to the list of Supervisors', () => {
  cy.get('[data-testid=Supervisor]').within((editors) => {
    cy.wrap(editors).contains('Contributor TestUser');
  });
});

//   @788
//   Scenario: Creator creates a new Author in the Author dialog
And('they see a button for creating a new Author', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).should(
    'be.visible'
  );
});
When('they click the button for creating a new Author', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).click();
});
Then('they see field for Author name', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.unverifiedContributorName}]`).should('be.visible');
});
And('they see the a button for adding a new Author in the Create new Author Dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).should('be.visible');
});

// Scenario: Creator sees Button to Verify Contributor
When('the Registration has an Unverified Contributor', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  cy.get('[data-testid=add-Creator]').click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.unverifiedContributorName}]`).type(
    'Unverified Author'
  );
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click();
});
Then('they see a Button to Verify the Contributor', () => {
  cy.get(`[data-testid^=button-set-unverified-contributor-]`).should('be.visible');
});

// Scenario: Creator opens Dialog to Verify Contributor
Given('Creator sees Button to Verify Contributor', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  cy.get('[data-testid=add-Creator]').click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.unverifiedContributorName}]`).type(
    'Unverified Author'
  );
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click();
  cy.get(`[data-testid^=button-set-unverified-contributor-]`).should('be.visible');
});
When('they click the Button to Verify Contributor', () => {
  cy.get('@button').then((button) => {
    cy.get(`[data-testid^=${button}]`).first().click();
  });
});
Then('they see the Verify Contributor Dialog', () => {
  cy.get(`[data-testid=contributor-modal]`).should('be.visible');
});
And("they see a search field prefilled with the selected Contributor's name", () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.searchField}]`).should('be.visible');
});
And('they see a list of Persons matching the search', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`).should('be.visible');
});

// Scenario: Creator verifies Contributor
Given('Creator opens Dialog to Verify Contributor', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  cy.get('[data-testid=add-Creator]').click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.unverifiedContributorName}]`).type(
    'Unverified Author'
  );
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click();
  cy.get(`[data-testid^=button-set-unverified-contributor-]`).first().click();
});
When('they select a Person from the Search Results', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`).first().click();
});
And('they click the Button to Verify Contributor', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click();
});
Then('the Dialog is closed', () => {
  cy.get(`[data-testid=contributor-modal]`).should('not.exist');
});
And('they see the Contributor is now verified', () => {
  cy.get('[data-testid=CheckCircleSharpIcon]').should('be.visible');
});
And('all current Affiliations are listed for the Contributor', () => {
  cy.contains('Unit');
});
