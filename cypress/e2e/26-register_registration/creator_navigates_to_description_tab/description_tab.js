import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userWithAuthor4 } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

import { descriptionFields } from '../../../support/data_testid_constants';

const projectName = 'Test project 16617fb0-3c7a-470e-83bf-e5a55e005d74';
const institutionName = 'Sikt - Norwegian Agency for Shared Services in Education and Research';

Before(() => {
  cy.login(userWithAuthor4);
});

// Feature: Creator navigates to Description tab
// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.startWizardWithEmptyRegistration();
});
When('they navigate to the Description tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click({ force: true });
});
Given('Creator begins Wizard registration and navigates to Description tab', () => {
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click({ force: true });
});
// End common steps

// Scenario: Creator begins Wizard registration and navigates to Description tab
Then('they see the Description tab is selected', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`);
});
And('they see fields:', (fields) => {
  cy.testDataTestidList(fields, descriptionFields);
});
// | Title                        |
// | Abstract                     |
// | Description                  |
// | Date published               |
// | Keywords                     |
// | Vocabularies                 |
// | Primary language for content |
// | Project association          |
And('they see the tab Resource Type is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).should('be.enabled');
});
And('they see the tab Contributors is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).should('be.enabled');
});
And('they see the tab Files and License is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).should('be.enabled');
});
And('they see a Button for creating a new Project is enabled', () => { });
And('they see Next is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.nextTabButton).should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});

// Scenario: Creator sees that fields are validated on Description tab
And('they click the Save button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click({ force: true });
  cy.get('.MuiAlert-message');
  cy.get('.MuiAlert-message').should('not.exist');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${descriptionFields[field]}]`).parent().parent().within(() => {
      cy.contains('is mandatory');
    });
  });
});
// | Title          |
// | Date published |

// Scenario: Creator searches for Project
And('they see a Search box for Projects', () => {
  cy.get('[data-testid=project-search-field] > div > div > input').should('be.visible');
});
And('they enter search term in the Search box', () => {
  // cy.mockProjectSearch(projectName);
  cy.get('[data-testid=project-search-field] > div > div > input').type(projectName);
});
Then('they see list of Projects matching the search term', () => {
  cy.get('[data-testid^=project-option]').should('have.length.above', 0);
});
And('they see title and associated Institutions for each Project', () => {
  cy.get('[data-testid^=project-option]').filter(`:contains(${projectName})`);
  cy.get('[data-testid^=project-option]').filter(`:contains(${projectName})`).first().contains(institutionName);
});

// Scenario: Creator adds a Project
Given('Creator searches for Project', () => {
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click({ force: true });
});
When('they select a Project from the Search results', () => {
  // cy.mockProjectSearch(projectName);
  cy.get('[data-testid=project-search-field] > div > div > input').type(projectName);
  cy.get('[data-testid^=project-option]').filter(`:contains(${projectName})`).first().click({ force: true });
});
Then('the selected Project is added to the list of selected Projects', () => {
  cy.get('[data-testid^=project-link]').should('have.length', 1);
  cy.get('[data-testid^=project-link]').contains(projectName);
});

// Scenario: Creator removes a Project
Given('Creator adds a Project', () => {
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click({ force: true });
  // cy.mockProjectSearch(projectName);
  cy.get('[data-testid=project-search-field] > div > div > input').type(projectName);
  cy.get('[data-testid^=project-option]').filter(`:contains(${projectName})`).first().click({ force: true });
});
When('they click the Remove Project icon', () => {
  cy.get('[data-testid^=project-link]')
    .filter(`:contains(${projectName})`)
    .parent()
    .parent()
    .parent()
    .within((project) => {
      cy.wrap(project).getDataTestId('CancelIcon').click({ force: true });
    });
});
Then('they see the Project is removed from the list of selected Projects', () => {
  cy.get('[data-testid^=project-link]').should('not.exist');
});

// Scenario: Creator opens dropdown with Allowed Vocabularies
And('their Institution has a Vocabulary set as "Allowed"', () => { });
When('they click "Add Vocabulary"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.addVocabularyButton}]`).click();
});
Then('they can see a dropdown with Allowed Vocabularies', () => {
  cy.get(`[data-testid^=${dataTestId.registrationWizard.description.vocabularyMenuItem('')}]`).should(
    'have.length.above',
    0
  );
});

// @2446
// Scenario: Creator sees input field for an Allowed Vocabulary
Given('Creator opens dropdown with Allowed Vocabularies', () => {
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.addVocabularyButton}]`).click();
});
When('they select an Allowed Vocabulary', () => {
  cy.get('#hrcs-activities').click({ force: true });
});
Then('they see an input field for the selected Vocabulary', () => {
  cy.get('[data-testid^=vocabulary-row]').should('exist').and('be.visible');
});

// @2448
// Scenario: Creator sees input field for a Default Vocabulary
Given('Creator begins Wizard registration', () => {
  cy.startWizardWithEmptyRegistration();
});
And('their Institution has a Vocabulary set as "Default"', () => { });
When('the User navigates to Description tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click();
});
Then('they can see an input field for the Default Vocabulary', () => {
  cy.get(`[data-testid^=${dataTestId.registrationWizard.description.vocabularyRow('')}]`).should(
    'have.length.above',
    0
  );
});

const projectFields = {
  'Project Title': dataTestId.registrationWizard.description.projectForm.titleField,
  'Coordinating Institution': dataTestId.registrationWizard.description.projectForm.coordinatingInstitutionField,
  'Project Manager': dataTestId.registrationWizard.description.projectForm.addParticipantButton,
  'Start Date': dataTestId.registrationWizard.description.projectForm.startDateField,
};

// Scenario: Creator opens Dialog for creating a new Project
When('they click Button for creating a new Project', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.createProjectButton).invoke('removeAttr', 'target').click();
  cy.getDataTestId(dataTestId.newProjectPage.createEmptyProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.titleInput).type('New test project');
  cy.getDataTestId(dataTestId.newProjectPage.startEmptyProjectButton).click();
});
Then('they see the Project wizard', () => {
  cy.location('pathname').should('contain', '/projects/new');
});

// Scenario: Creator creates a new Project
Given('Creator opens Dialog for creating a new Project', () => {
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.description.createProjectButton).invoke('removeAttr', 'target').click();
  cy.getDataTestId(dataTestId.newProjectPage.createEmptyProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.titleInput).type('New test project');
  cy.getDataTestId(dataTestId.newProjectPage.startEmptyProjectButton).click();
});
When('they enter a Project Title', () => {
});
And('they select a Coordinating Institution', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDetailsStepButton).click()
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.coordinatingInstitutionField).type('sikt');
  cy.contains('Sikt - Norwegian Agency for Shared Services in Education and Research').click();
});
And('​they select a Project Manager', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectContributorsStepButton).click()
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.addProjectManagerButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('withauthor testuser');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
  cy.getDataTestId(dataTestId.projectForm.addProjectManagerButton).last().click();
});
And('they set a Start Date', () => {
  cy.chooseDatePicker(
    `[data-testid=${dataTestId.registrationWizard.description.projectForm.startDateField}]`,
    '11.11.2020'
  );
});
And('they set a End Date', () => {
  cy.chooseDatePicker(
    `[data-testid=${dataTestId.registrationWizard.description.projectForm.endDateField}]`,
    '12.12.2020'
  );
});
And('they click Save', () => {
  cy.getDataTestId(dataTestId.common.doubleNextButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.saveProjectButton).click();
});
Then('the landing page for the Project is presented', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.saveProjectButton, { timeOut: 20000 }).should(
    'not.exist'
  );
  cy.location('pathname').should('contain', 'projects');
  cy.location('search').should('contain', '?id=');
});

// Scenario: Creator adds funding
And('they add funding', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.addFundingButton).click();
});
Then('they can select a funding source', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).should('be.visible');
});
And('they see an option to cancel the funding source', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingRemoveButton).should('be.visible');
});

// Scenario: Creator adds funding from NFR
When('they select NFR as a funding source', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).should('be.visible');
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).within(() => {
    cy.get('button').click();
  });
  cy.contains('Research Council of Norway').click();
});
Then('they can search for NFR Project', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.nfrProjectSearchField).should('be.visible');
});

// Scenario: Creator adds funding from a NFR Project
When('they select a NFR Project', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.nfrProjectSearchField).type('test');
  cy.contains('test').click();
});
Then('they can see the NFR identifier', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingIdField);
});

const fundingFields = {
  'Project name': dataTestId.registrationWizard.description.fundingProjectField,
  'ID': dataTestId.registrationWizard.description.fundingIdField,
  'Sum': dataTestId.registrationWizard.description.fundingSumField,
};

// Scenario: Creator adds funding from a non-NFR funding source
When('they select a non-NFR funding source', () => {
  cy.wait(5000);
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).click();
  cy.contains('Agder Research Foundation').click();
});
Then('they can register:', (dataTable) => {
  cy.testDataTestidList(dataTable, fundingFields);
});
// | Project name |
// | ID           |
// | Sum          |
