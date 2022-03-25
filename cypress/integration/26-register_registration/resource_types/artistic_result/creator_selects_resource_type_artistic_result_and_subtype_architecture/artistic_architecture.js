import { userWithAuthor } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { architectureTypes, exhibitionTypes } from '../../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Artistic Result And('subtype Architecture

// Common steps:
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Architecture"', () => {
  cy.setLocalStorage('beta', true);
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get(`[data-testid=publication-context-type]`).click();
  cy.get('[data-testid=publication-context-type-Artistic]').click();
});
// end common steps

//   Scenario: Creator navigates to the Resource Type tab And('selects Resource subtype "Architecture"
Given('the creator wants to add an Artistic Result - Architecture', () => {
  cy.setLocalStorage('beta', true);
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get(`[data-testid=publication-context-type]`).click();
  cy.get('[data-testid=publication-context-type-Artistic]').click();
  cy.get(`[data-testid=publication-instance-type]`).click();
  cy.get('[data-testid=publication-instance-type-Architecture]').click();
});
Then('they can add information about:', (dataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-value=${architectureTypes[value]}]`).should('be.visible');
  });
  cy.get(`[data-value=${architectureTypes['Construction']}]`).click();
});
//   | Construction           |
//   | Plan proposal          |
//   | Landscape architecture |
//   | Interior               |
//   | Other                  |
And('they can add Exhibitions of type:', (dataTable) => {
  cy.testDataTestidList(dataTable, exhibitionTypes);
});
//   | Competition            |
//   | Publication or Mention |
//   | Prize or Award         |
//   | Exhibition             |
And('they can edit existing Exhibitions', () => {
  cy.get(`[data-testid=${exhibitionTypes['Exhibition']}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionName}]`).type('Exhibition name');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionPlace}]`).type('Exhibition place');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionOrganizer}]`).type(
    'Exhibition organizer'
  );
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionOther}]`).type('Exhibition other');
  //   cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionName}]`).type('Exhibition name');
  //   cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionName}]`).type('Exhibition name');
});
And('they can delete existing Exhibitions', () => {});

//   Scenario: Creator adds an Competition
When('they add a Competition with details for:', () => {});
//   | Name        |
//   | Description |
//   | Date        |
Then('the Competition is listed under Exhibitions', () => {});

//   Scenario: Creator adds an Publication or Mention
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Architecture"', () => {});
When('they add a Publication or Mention with details for:', () => {});
//   | Name        |
//   | Issue       |
//   | Page from   |
//   | Page to     |
//   | Date        |
//   | Description |
Then('the Publication or Mention is listed under Exhibitions', () => {});

//   Scenario: Creator adds an Prize or Award
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Architecture"', () => {});
When('they add a Prize or Award with details for:', () => {});
//   | Name        |
//   | Organizer   |
//   | Year        |
//   | Ranking     |
//   | Description |
Then('the Prize or Award is listed under Exhibitions', () => {});

//   Scenario: Creator adds an Exhibition
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Architecture"', () => {});
When('they add an Exhibition with details for:', () => {});
//   | Name        |
//   | Place       |
//   | Organizer   |
//   | Date from   |
//   | Date to     |
//   | Description |
Then('the Exhibition is listed under Exhibitions', () => {});
