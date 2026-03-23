// Feature: Creator selects Resource type Artistic Result and subtype Design

import { DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userUnitDesign } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { designTypes, designFields, resourceTypes } from '../../../../../support/data_testid_constants';

const venueName = 'Test Venue name';
const addVenue = () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.addVenueButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.venueNameField).type(venueName);
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateFromField}]`, '11.11.2021');
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateToField}]`, '11.11.2021');
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).should('not.exist');
};

// Common steps:
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Design"', () => {
  cy.login(userUnitDesign);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('ArtisticDesign')).click();
});

// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Design"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.login(userUnitDesign);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select Resource Subtype "Artistic result - Design"', () => {
  cy.get('[data-testid=resource-type-chip-ArtisticDesign]').click();
});
Then('they see fields:', (dataTable: DataTable) => {
  dataTable.raw().forEach((field) => {
    cy.getDataTestId(designFields[field[0]]).should('be.visible');
  });
});
// | More information |
Then('they see field for Type Work with options:', (dataTable: DataTable) => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticTypeField).click();
  dataTable.raw().forEach((value: string[]) => {
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
Then('they see a list of Exhibition Places with fields:', (dataTable: DataTable) => {
  addVenue();
});
// | Name       |
// | Date start |
// | Date end   |
// | Order      |
Then('they see that each Exhibition Place has a Delete Button', () => {
  cy.get('[aria-label=Delete]').should('be.visible');
});
Then('they see that each Exhibition Place has an Edit Button', () => {
  cy.get('[aria-label=Edit]').should('be.visible');
});
Then('they see an Add Exhibition Place Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.addVenueButton).should('be.visible');
});

// Scenario: Creator adds an Exhibition Place
When('they click the Add Exhibition Place Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.addVenueButton).click({ force: true });
});
Then('they see the Add Exhibition Place Dialog', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).should('be.visible');
});
Then('they see an Add Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.addVenueButton).should('be.visible');
});
When('they fill the fields with input data', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.addVenueButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.venueNameField).type('Test Add Venue name');
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateFromField}]`, '11.11.2021');
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateToField}]`, '11.11.2021');
});
When('they click the Add Button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).click();
});
Then('the new Exhibition Place is listed under Exhibition places', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).should('not.exist');
  cy.contains('Test Add Venue name');
});

// Scenario: Creator Deletes an Exhibition Place
Given('they see an item in the list of Exhibition Places', () => {
  addVenue();
  cy.contains(venueName);
});
When('they click the Delete Exhibition Place Button', () => {
  cy.get('[aria-label=Delete]').first().click();
  cy.get(`[data-testid=accept-button]`).click();
});
Then('the row is removed from list of Exhibition Places', () => {
  cy.contains(venueName).should('not.exist');
});
