// Feature: Creator selects Resource type Artistic Result and subtype Design

import { DataTable, Given } from '@badeball/cypress-cucumber-preprocessor';
import { Then, When } from 'cypress-cucumber-preprocessor/steps/index';
import { userDesign } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { designTypes, designFields } from '../../../../../support/data_testid_constants';

const venueName = 'Test Venue name';
const addVenue = () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.venueNameField}]`).type(venueName);
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateFromField}]`, '11.11.2011')
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateToField}]`, '11.11.2011')
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).should('not.exist');
};

// Common steps:
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Design"', () => {
  cy.setLocalStorage('beta', 'true');
  cy.login(userDesign);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get('[data-testid=resource-type-chip-ArtisticDesign]').click();
});

// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Design"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.setLocalStorage('beta', 'true');
  cy.login(userDesign);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select Resource Subtype "Artistic result - Design"', () => {
  cy.get('[data-testid=resource-type-chip-ArtisticDesign]').click();
});
Then('they see fields:', (dataTable: DataTable) => {
  dataTable.raw().forEach((field) => {
    cy.get(`[data-testid=${designFields[field[0]]}]`).should('be.visible');
  });
});
// | More information |
Then('they see field for Type Work with options:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
  dataTable.raw().forEach((value) => {
    cy.get(`[data-value=${designTypes[value[0]]}]`).should('be.visible');
  });
  cy.get(`[data-value=${designTypes[Object.keys(designTypes)[0]]}]`).click();
});
// | Product               |
// | Interior Architecture |
// | Clothing Design       |
// | Lighting Design       |
// | Exhibition            |
// | Graphical Design      |
// | Illustration          |
// | Interaction Design    |
// | Web Design            |
// | Service Design        |
// | Other                 |
Then('they see a list of Exhibition Places with fields:', (dataTable) => {
  addVenue();
});
// | Name       |
// | Date start |
// | Date end   |
// | Order      |
Then('they see that each Exhibition Place has a Delete Button', () => {
  cy.get('[data-testid=CancelIcon]').should('be.visible');
});
Then('they see that each Exhibition Place has an Edit Button', () => {
  cy.get('[data-testid=EditIcon]').should('be.visible');
});
Then('they see an Add Exhibition Place Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`).should('be.visible');
});

// Scenario: Creator adds an Exhibition Place
When('they click the Add Exhibition Place Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`).click({ force: true });
});
Then('they see the Add Exhibition Place Dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).should('be.visible');
});
Then('they see fields:', (dataTable) => { });
// | Exhibition place |
// | Date from        |
// | Date to          |
Then('they see an Add Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`).should('be.visible');
});
When('they fill the fields with input data', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.venueNameField}]`).type('Test Add Venue name');
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateFromField}]`, '11.11.2011')
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateToField}]`, '11.11.2011')
});
Then('they click the Add Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
Then('the new Exhibition Place is listed under Exhibition places', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).should('not.exist');
  cy.contains('Test Add Venue name');
});

// Scenario: Creator Deletes an Exhibition Place
Then('they see an item in the list of Exhibition Places', () => {
  addVenue();
  cy.contains(venueName);
});
When('they click the Delete Exhibition Place Button', () => {
  cy.get('[data-testid=CancelIcon]').click();
  cy.get(`[data-testid=accept-button]`).click();
});
Then('the row is removed from list of Exhibition Places', () => {
  cy.contains(venueName).should('not.exist');
});
