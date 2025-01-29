// Feature: Creator selects Resource type Artistic Result and subtype Performing arts

import { userPerformingArts } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { performingArtsFields, performingArtsWorkTypes } from '../../../../../support/data_testid_constants';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Performing arts"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.login(userPerformingArts);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select Resource Subtype "Performing arts"', () => {
  cy.get('[data-testid=resource-type-chip-PerformingArts]').click();
});
Then('they see fields:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, performingArtsFields);
});
//   | More information |
Then('they see field for Type Work with options:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
  dataTable.raw().forEach((value) => {
    cy.get(`[data-value=${performingArtsWorkTypes[value[0]]}]`);
  });
  cy.get(`[data-value=${performingArtsWorkTypes[dataTable.raw()[0][0]]}]`).click();
});
//   | Theater/show  |
//   | TV/film/radio |
//   | Other         |
Then('they see a list of Exhibition Places with fields:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`).click();
  cy.testDataTestidList(dataTable, performingArtsFields);
});
//   | Name       |
//   | Date start |
//   | Date end   |
//   | Order      |
Then('they see that each Exhibition Place has a Delete Button', () => {
  Object.keys(performingArtsFields).forEach((value) => {
    if (value !== 'More information') {
      if (value === 'Date start' || value === 'Date end') {
        cy.chooseDatePicker(`[data-testid=${performingArtsFields[value]}]`, '11.11.2011');
      } else {
        cy.get(`[data-testid=${performingArtsFields[value]}]`).type(`Test ${value}`);
      }
    }
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
  cy.contains('Remove');
});
Then('they see that each Exhibition Place has an Edit Button', () => {
  cy.contains('Show/Edit');
});
Then('they see an Add Exhibition Place Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`);
});

//   Scenario: Creator adds an Exhibition Place to Performing arts
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Performing arts"', () => {
  cy.login(userPerformingArts);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get('[data-testid=resource-type-chip-PerformingArts]').click();
});
When('they click the Add Exhibition Place Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`).click();
});
Then('they see the Add Exhibition Place Dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.venueNameField}]`);
});
// And they see fields:
//   | Exhibition place |
//   | Date from        |
//   | Date to          |
Then('they see an Add Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`);
});
When('they fill the fields with input data', () => {
  Object.keys(performingArtsFields).forEach((value) => {
    if (value !== 'More information') {
      if (value === 'Date start' || value === 'Date end') {
        cy.chooseDatePicker(`[data-testid=${performingArtsFields[value]}]`, '11.11.2011');
      } else {
        cy.get(`[data-testid=${performingArtsFields[value]}]`).type(`Test ${value}`);
      }
    }
  });
});
When('they click the Add Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
Then('the new Exhibition Place is listed under Exhibition places', () => {
  cy.contains(`Test Name`);
});
