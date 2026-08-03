// Feature: Creator selects Resource type Artistic Result and subtype Film

import { userUnitFilm } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { filmAnnouncements, filmTypes } from '../../../../../support/data_testid_constants';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Film"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.login(userUnitFilm);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select Resource Subtype "Film"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('MovingPicture')).click();
});
Then('they see fields:', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticDescriptionField);
});
//   | More information |
Then('they see field for Type Work with options:', (dataTable: DataTable) => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticTypeField).click();
  dataTable.raw().forEach((value: string[]) => {
    cy.get(`[data-value=${filmTypes[value[0]]}]`);
  });
  cy.get(`[data-value=${filmTypes[dataTable.raw()[0][0]]}]`).click();
});
//   | Film             |
//   | Short film       |
//   | Serial film      |
//   | Interactive film |
//   | AR/VR film       |
//   | Other            |
Then('they can add Exhibitions of type:', (dataTable: DataTable) => {
  dataTable.raw().forEach((value) => {
    cy.getDataTestId(filmAnnouncements[value[0]]);
  });
});
//   | Broadcast         |
//   | Cinematic release |
//   | Other release     |
Then('they can edit existing Exhibitions', () => {
  cy.getDataTestId(filmAnnouncements['Broadcast']).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.broadcastPublisher).type('Broadcast publisher');
  cy.chooseDatePicker(
    `[data-testid=${dataTestId.registrationWizard.resourceType.outputInstantDateField}]`,
    '11.11.2021'
  );
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).click();
  cy.get('[aria-label=Edit]');
});
Then('they can delete existing Exhibitions', () => {
  cy.get('[aria-label=Delete]');
});

//   Scenario: Creator adds a Broadcast to a Film
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Film"', () => {
  cy.login(userUnitFilm);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('MovingPicture')).click();
});
When('they add a Broadcast with details for:', () => {
  cy.getDataTestId(filmAnnouncements['Broadcast']).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.broadcastPublisher).type('Test Broadcast Publisher');
  cy.chooseDatePicker(
    `[data-testid=${dataTestId.registrationWizard.resourceType.outputInstantDateField}]`,
    '11.11.2021'
  );
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).click();
});
//   | Publisher |
//   | Date      |
Then('the Broadcast is listed under Exhibitions', () => {
  cy.contains('Test Broadcast Publisher');
});

//   Scenario: Creator adds an Cinematic release to a Film
When('they add a Cinematic release with details for:', () => {
  cy.getDataTestId(filmAnnouncements['Cinematic release']).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.placeField).type('Test Cinematic release Place');
  cy.chooseDatePicker(
    `[data-testid=${dataTestId.registrationWizard.resourceType.outputInstantDateField}]`,
    '11.11.2021'
  );
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).click();
});
//   | Place |
//   | Date  |
Then('the Cinematic release is listed under Exhibitions', () => {
  cy.contains('Test Cinematic release Place');
});

//   Scenario: Creator adds an Other release to a Film
When('they add a Other release with details for:', () => {
  cy.getDataTestId(filmAnnouncements['Other release']).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.outputDescriptionField).type('Test Other release type');
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.placeField).type('Test Other release place');
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.otherReleasePublisher).type(
    'Test Other release publisher'
  );
  cy.chooseDatePicker(
    `[data-testid=${dataTestId.registrationWizard.resourceType.outputInstantDateField}]`,
    '11.11.2021'
  );
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.artisticOutputSaveButton).click();
});
//   | Type of release     |
//   | Place               |
//   | Publisher/Organizer |
//   | Date                |
Then('the Other release is listed under Exhibitions', () => {
  cy.contains('Test Other release publisher');
});
