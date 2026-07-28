import { userUnitVisualArts } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

// Feature: Creator selects Resource type Artistic Result and subtype Visual Arts

//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Visual Arts"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.login(userUnitVisualArts);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select Resource Subtype "Visual Arts"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('VisualArts')).click();
});
Then('they see fields:', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticDescriptionField).should('be.visible');
});
//   | More information |
Then('they see field for Type Work with options:', (dataTable: DataTable) => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticTypeField).click();
  dataTable.raw().forEach((type) => {
    const visualArtsType = type[0] == 'Other' ? 'VisualArtsOther' : type[0];
    cy.get(`[data-value=${visualArtsType}]`);
  });
});
//   | IndividualExhibition |
//   | CollectiveExhibition |
//   | Installation         |
//   | ArtInPublicSpace     |
//   | Performance          |
//   | AudioArt             |
//   | ArtistBook           |
//   | Other                |
Then('they can add an Exhibition', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.addVenueButton).should('be.visible');
});

//   Scenario: Creator adds an Exhibition
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Visual Arts"', () => {
  cy.login(userUnitVisualArts);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('VisualArts')).click();
});
When('they add an Exhibition with details for:', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.addVenueButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.venueNameField).type('Test venue');
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateFromField}]`, '11.11.2020');
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.dateToField}]`, '11.11.2020');
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).click();
});
//   | Exhibition place |
//   | Date from        |
//   | Date to          |
Then('the new Exhibition is listed under Exhibitions', () => {
  cy.contains('Test venue');
});
Then('they can edit the Exhibition', () => {
  cy.get('[aria-label=Edit]');
});
Then('they can remove the Exhibition', () => {
  cy.get('[aria-label=Delete]');
});
