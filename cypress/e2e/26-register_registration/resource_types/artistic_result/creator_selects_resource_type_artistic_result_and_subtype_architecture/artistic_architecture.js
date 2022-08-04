import { userWithAuthor } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import {
  architectureTypes,
  competitionFields,
  exhibitionTypes,
  publicationMentionFields,
  awardFields,
  exhibitionFields,
} from '../../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Artistic Result And('subtype Architecture

// Common steps:
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Architecture"', () => {
  cy.setLocalStorage('beta', true);
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
  cy.get('[data-testid=button-next-tab]').click();
  cy.get(`[data-testid=publication-context-type]`).click();
  cy.get('[data-testid=publication-context-type-Artistic]').click();
  cy.get(`[data-testid=publication-instance-type]`).click();
  cy.get('[data-testid=publication-instance-type-Architecture]').click();
});
// end common steps

//   Scenario: Creator navigates to the Resource Type tab And('selects Resource subtype "Architecture"
Given('the creator wants to add an Artistic Result - Architecture', () => {
  cy.setLocalStorage('beta', true);
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
  cy.get('[data-testid=button-next-tab]').click();
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
  cy.get(`[data-value=${architectureTypes[Object.keys(architectureTypes)[0]]}]`).click();
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
  cy.get(`[data-testid=${exhibitionTypes['Exhibition']}]`).click({ force: true });
  //   cy.get('[role=dialog').within(() => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionName}]`).type('Exhibition name');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionPlace}]`).type('Exhibition place');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionOrganizer}]`).type(
    'Exhibition organizer'
  );
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateFromField}]`, '11.11.2011');
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateToField}]`, '11.11.2011');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionOther}]`).type('Exhibition other');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionSaveButton}]`).click();
  //   });
  cy.get('[data-testid=EditIcon]').should('be.visible');
});
And('they can delete existing Exhibitions', () => {
  cy.get('[data-testid=DeleteIcon]').should('be.visible');
});

//   Scenario: Creator adds an Competition
When('they add a Competition with details for:', (dataTable) => {
  cy.get(`[data-testid=${exhibitionTypes['Competition']}]`).click({ force: true });
  dataTable.rawTable.forEach((field) => {
    field[0] === 'Date'
      ? cy.chooseDatePicker(`[data-testid=${competitionFields[field[0]]}]`, '11.11.2011')
      : // ? cy.get(`[data-testid=${competitionFields[field[0]]}]`).type('11.11.2011')
      cy.get(`[data-testid=${competitionFields[field[0]]}]`).type(`Test Competition ${field[0]}`);
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.competitionSaveButton}]`).click();
});
//   | Name        |
//   | Description |
//   | Date        |
Then('the Competition is listed under Exhibitions', () => {
  cy.contains('Test Competition Name');
});

//   Scenario: Creator adds an Publication or Mention
When('they add a Publication or Mention with details for:', (dataTable) => {
  cy.get(`[data-testid=${exhibitionTypes['Publication or Mention']}]`).click({ force: true });
  dataTable.rawTable.forEach((field) => {
    field[0] === 'Date'
      ? cy.chooseDatePicker(`[data-testid=${publicationMentionFields[field[0]]}]`, '11.11.2011')
      : // ? cy.get(`[data-testid=${publicationMentionFields[field[0]]}]`).type('11.11.2011')
      cy.get(`[data-testid=${publicationMentionFields[field[0]]}]`).type(`Test Publication Mention ${field[0]}`);
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.publicationMentionSaveButton}]`).click();
});
//   | Name        |
//   | Issue       |
//   | Page from   |
//   | Page to     |
//   | Date        |
//   | Description |
Then('the Publication or Mention is listed under Exhibitions', () => {
  cy.contains('Test Publication Mention Name');
});

//   Scenario: Creator adds an Prize or Award
When('they add a Prize or Award with details for:', (dataTable) => {
  cy.get(`[data-testid=${exhibitionTypes['Prize or Award']}]`).click({ force: true });
  dataTable.rawTable.forEach((field) => {
    field[0] === 'Year'
      ? cy.chooseDatePicker(`[data-testid=${awardFields[field[0]]}]`, '2011')
      : // ? cy.get(`[data-testid=${awardFields[field[0]]}]`).type('2011')
      cy.get(`[data-testid=${awardFields[field[0]]}]`).type(`Test Prize Award ${field[0]}`);
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.awardSaveButton}]`).click();
});
//   | Name        |
//   | Organizer   |
//   | Year        |
//   | Ranking     |
//   | Description |
Then('the Prize or Award is listed under Exhibitions', () => {
  cy.contains('Test Prize Award Name');
});

//   Scenario: Creator adds an Exhibition
When('they add an Exhibition with details for:', (dataTable) => {
  cy.get(`[data-testid=${exhibitionTypes['Exhibition']}]`).click({ force: true });
  dataTable.rawTable.forEach((field) => {
    field[0] === 'Date from' || field[0] === 'Date to'
      ? // ? cy.get(`[data-testid=${exhibitionFields[field[0]]}]`).type('11.11.2011')
      cy.chooseDatePicker(`[data-testid=${exhibitionFields[field[0]]}]`, '11.11.2011')
      : cy.get(`[data-testid=${exhibitionFields[field[0]]}]`).type(`Test Exhibition ${field[0]}`);
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.exhibitionSaveButton}]`).click();
});
//   | Name        |
//   | Place       |
//   | Organizer   |
//   | Date from   |
//   | Date to     |
//   | Description |
Then('the Exhibition is listed under Exhibitions', () => {
  cy.contains('Test Exhibition Name');
});
