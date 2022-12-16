import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userContributor, userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

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
  cy.get('[data-testid=resource-type-chip-BookMonograph]').click();
});

// Feature: Creator navigates to Contributors tab
// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {});
When('they navigate to the Contributors tab', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').click();
});

When('they see the "Add Creator" Button', () => {
  cy.get('[data-testid=add-contributor]').should('be.visible');
});
When('they click "Add Creator"', () => {
  cy.get('[data-testid=add-contributor]').click();
});

When('they see the "Add Creator" Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton}]`).should('be.visible');
});
When('they click "Add Creator"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton}]`).click();
});

// End common steps

//   @417
//   Scenario: Creator navigates to Contributors tab
Then('they see "Add Contributor" Button is enabled', () => {
  cy.get('[data-testid=add-contributor]').should('be.enabled');
});
Then('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.enabled');
});
Then('they see the tab Resource Type is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).should('be.enabled');
});
Then('they see the tab Contributors is selected', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}][tabindex=0]`);
});
Then('they see the tab Files and License is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).should('be.enabled');
});
Then('they see Previous is enabled', () => {
  cy.get('[data-testid=button-previous-tab]').should('be.enabled');
});
Then('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
Then('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});

//   @1837
//   Scenario: Creator adds themselves to the list of Creators
When('they see the Creator Search Dialog', () => {
  cy.get('[data-testid=contributor-modal]').should('be.visible');
});
When('they click "Add me as Creator"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectContributorType}]`);
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addSelfButton}]`).click();
});
Then('their Creator identity is added to the list of Creators', () => {
  cy.contains('Contributor TestUser');
});
Then('their current Affiliations are listed', () => {
  cy.contains('Unit');
});

// Scenario Outline: Creator see buttons to add Contributors
Given('Creator navigates to Contributors tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
Then('the Registration has Registration Subtype {string}', (subtype) => {
  cy.wrap(subtype).as('registrationType');
  if (subtype !== 'BookMonograph') {
    cy.get(`[data-testid=resource-type-chip-BookMonograph]`).click();
    cy.get(`[data-testid=resource-type-chip-${subtype}]`).click();
    cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
  }
});
Then('they see buttons {string}', (contributorTypes: string) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectContributorType}]`).click();
  const types = contributorTypes.split(', ');
  types.forEach((contributorType) => {
    cy.get(`[data-value=${contributorType}]`).should('be.visible');
  });
  cy.get(`[data-value=Other]`).should('be.visible');
});
// Examples:
//   | RegistrationType | RegistrationSubtype       | AddContributorButtons                       |
//   | Book             | BookAnthology             | Editor                 |
//   | Book             | BookMonograph             | Creator                 |
//   | Chapter          | ChapterArticle            | Creator                 |
//   | Chapter          | ChapterConferenceAbstract | Creator                 |
//   | Degree           | DegreeBachelor            | Creator, Supervisor |
//   | Degree           | DegreeMaster              | Creator, Supervisor |
//   | Degree           | DegreePhd                 | Creator, Supervisor |
//   | Degree           | DegreeLicentiate          | Creator, Supervisor |
//   | Degree           | OtherStudentWork          | Creator, Supervisor |
//   | Journal          | FeatureArticle            | Creator, ContactPerson                 |
//   | Journal          | JournalArticle            | Creator                 |
//   | Journal          | JournalCorrigendum        | Creator                 |
//   | Journal          | JournalLeader             | Creator                 |
//   | Journal          | JournalLetter             | Creator                 |
//   | Journal          | JournalReview             | Creator                 |
//   | Journal          | JournalBooklet            | Creator                 |
//   | Journal          | JournalConferenceAbstract | Creator                 |
//   | Report           | ReportBasic               | Creator                 |
//   | Report           | ReportPolicy              | Creator                 |
//   | Report           | ReportResearch            | Creator                 |
//   | Report           | ReportAbstractCollection  | Creator                 |
//   | Report           | ReportWorkingPaper        | Creator                 |
//   | Presentation     | ConferenceLecture         | Creator                 |
//   | Presentation     | ConferencePoster          | Creator                 |
//   | Presentation     | Lecture                   | Creator                 |
//   | Presentation     | OtherPresentation         | Creator                 |
//   | Artistic         | ArtisticDesign            | Contributor                             |
//   | Media            | Interview                 | Creator                 |
//   | Media            | Blog                      | Creator                 |
//   | Media            | Podcast                   | Contributor                             |
//   | Media            | ProgrammeManagement       | Contributor                             |
//   | Media            | ProgrammeParticipation    | Contributor                             |

//   @419
//   Scenario: Creator adds an Creator to the list of Creators
When('they search for Creator in the Creator Search Dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.searchField}]`).type('TestUser, Contributor');
});
When('they select an Creator identity', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`).first().click();
});
When('they click "Add"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click();
});
Then('the selected Creator identity is added to the list of Creators', () => {
  cy.contains('Contributor TestUser');
});

//   Scenario: Creator adds an Creator to the list of Creators for Resource Type Book, Monograph
When('they navigate to the Resources tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select Resource Type "Book"', () => {});
When('they select Registration Subtype "Monograph"', () => {});

//   Scenario: Creator adds an Creator to the list of Creators for Resource Type Chapter
When('they select the Resource Type', (dataTable) => {});
When('they select the Registration Subtype "Chapter in anthology"', () => {
  cy.get(`[data-testid=resource-type-chip-BookMonograph]`).click();
  cy.get('[data-testid=resource-type-chip-ChapterArticle]').click();
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
});

//   @2203
//   Scenario: Creator adds an Editor to the list of Editors for Resource Type Book, Anthology
Given('they select Registration Subtype "Anthology"', () => {
  cy.get(`[data-testid=resource-type-chip-BookMonograph]`).click();
  cy.get('[data-testid=resource-type-chip-BookAnthology]').click();
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
});
When('they see the "Add Editor" Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectContributorType}]`).click();
  cy.get(`[data-value=Editor]`).should('be.visible');
});
When('they click "Add Editor"', () => {
  cy.get(`[data-value=Editor]`).click();
});
When('they search for Editor in the Creator Search Dialog', () => {
  cy.get('[data-testid=search-field]').type('TestUser Contributor');
});
Then('the selected Creator identity is added to the list of Editors', () => {
  cy.contains('Contributor TestUser');
});

//   @2204
//   Scenario: Creator adds a Supervisor to the list of Supervisors for Resource Type Student Thesis
Given('they select Resource Type "Student Thesis"', () => {});
Given('they select any Registration Subtype', () => {
  cy.get(`[data-testid=resource-type-chip-BookMonograph]`).click();
  cy.get('[data-testid=resource-type-chip-DegreeMaster]').click();
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
});
When('they see the "Add Supervisor" Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectContributorType}]`).click();
  cy.get(`[data-value=Supervisor]`).should('be.visible');
});
When('they click "Add Supervisor"', () => {
  cy.get(`[data-value=Supervisor]`).click();
});
When('they search for Supervisor in the Creator Search Dialog', () => {
  cy.get('[data-testid=search-field]').type('TestUser Contributor');
});
Then('the selected Creator identity is added to the list of Supervisors', () => {
  cy.contains('Contributor TestUser');
});

//   @788
//   Scenario: Creator creates a new Creator in the Creator dialog
Given('they see a button for creating a new Creator', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).should(
    'be.visible'
  );
});
When('they click the button for creating a new Creator', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).click();
});
Then('they see field for Creator name', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.unverifiedContributorName}]`).should('be.visible');
});
Then('they see the a button for adding a new Creator in the Create new Creator Dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).should('be.visible');
});

// Scenario: Creator sees Button to Verify Contributor
When('the Registration has an Unverified Contributor', () => {
  cy.mockPersonSearch(userWithAuthor);
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  cy.get('[data-testid=add-contributor]').click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.unverifiedContributorName}]`).type(
    'Unverified Creator'
  );
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click();
});
Then('they see a Button to Verify the Contributor', () => {
  cy.get(`[data-testid^=button-set-unverified-contributor-]`).should('be.visible');
});

// Scenario: Creator opens Dialog to Verify Contributor
Given('Creator sees Button to Verify Contributor', () => {
  cy.mockPersonSearch(userWithAuthor);
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  cy.get('[data-testid=add-contributor]').click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.unverifiedContributorName}]`).type(
    'Unverified Creator'
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
Then("they see a search field prefilled with the selected Contributor's name", () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.searchField}]`).should('be.visible');
});
Then('they see a list of Persons matching the search', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`).should('be.visible');
});

// Scenario: Creator verifies Contributor
Given('Creator opens Dialog to Verify Contributor', () => {
  cy.mockPersonSearch(userWithAuthor);
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click();
  cy.get('[data-testid=add-contributor]').click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addUnverifiedContributorButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.unverifiedContributorName}]`).type(
    'Unverified Creator'
  );
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click();
  cy.get(`[data-testid^=button-set-unverified-contributor-]`).first().click();
});
When('they select a Person from the Search Results', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`).first().click();
});
When('they click the Button to Verify Contributor', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click();
});
Then('the Dialog is closed', () => {
  cy.get(`[data-testid=contributor-modal]`).should('not.exist');
});
Then('they see the Contributor is now verified', () => {
  cy.get('[data-testid=CheckCircleSharpIcon]').should('be.visible');
});
Then('all current Affiliations are listed for the Contributor', () => {
  cy.contains('Unit');
});
