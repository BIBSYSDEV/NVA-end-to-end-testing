// Feature: Creator selects Resource type Artistic Result and subtype Film

import { userFilm } from "../../../../../support/constants";
import { dataTestId } from "../../../../../support/dataTestIds";
import { filmAnnouncements, filmTypes } from "../../../../../support/data_testid_constants";

//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Film"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
    cy.login(userFilm);
    cy.startWizardWithEmptyRegistration();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
})
When('they select Resource Subtype "Film"', () => {
    cy.get('[data-testid=publication-resource-type-chip-MovingPicture]').click();
});
Then('they see fields:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticDescriptionField}]`);
})
//   | More information |
And('they see field for Type Work with options:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
    dataTable.rawTable.forEach(value => {
        cy.get(`[data-value=${filmTypes[value[0]]}]`);
    });
    cy.get(`[data-value=${filmTypes[dataTable.rawTable[0][0]]}]`).click();
})
//   | Film             |
//   | Short film       |
//   | Serial film      |
//   | Interactive film |
//   | AR/VR film       |
//   | Other            |
And('they can add Exhibitions of type:', (dataTable) => {
    dataTable.rawTable.forEach(value => {
        cy.get(`[data-testid=${filmAnnouncements[value[0]]}]`);
    })
})
//   | Broadcast         |
//   | Cinematic release |
//   | Other release     |
And('they can edit existing Exhibitions', () => {
    cy.get(`[data-testid=${filmAnnouncements['Broadcast']}]`).click();
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.broadcastPublisher}]`).type('Broadcast publisher');
    cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputDate}]`, '11.11.2011');
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
    cy.contains('Show/Edit');
})
And('they can delete existing Exhibitions', () => {
    cy.contains('Remove');
})


//   Scenario: Creator adds a Broadcast to a Film
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Film"', () => {
    cy.login(userFilm);
    cy.startWizardWithEmptyRegistration();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    cy.get('[data-testid=publication-resource-type-chip-MovingPicture]').click();
})
When('they add a Broadcast with details for:', () => {
    cy.get(`[data-testid=${filmAnnouncements['Broadcast']}]`).click();
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.broadcastPublisher}]`).type('Test Broadcast Publisher');
    cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputDate}]`, '11.11.2011')
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
})
//   | Publisher |
//   | Date      |
Then('the Broadcast is listed under Exhibitions', () => {
    cy.contains('Test Broadcast Publisher');
})

//   Scenario: Creator adds an Cinematic release to a Film
When('they add a Cinematic release with details for:', () => {
    cy.get(`[data-testid=${filmAnnouncements['Cinematic release']}]`).click();
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.cinemaPlace}]`).type('Test Cinematic release Place');
    cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputDate}]`, '11.11.2011')
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
})
//   | Place |
//   | Date  |
Then('the Cinematic release is listed under Exhibitions', () => {
    cy.contains('Test Cinematic release Place');
})

//   Scenario: Creator adds an Other release to a Film
When('they add a Other release with details for:', () => {
    cy.get(`[data-testid=${filmAnnouncements['Other release']}]`).click();
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.otherReleaseType}]`).type('Test Other release type');
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.otherReleasePlace}]`).type('Test Other release place');
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.otherReleasePublisher}]`).type('Test Other release publisher');
    cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputDate}]`, '11.11.2011')
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
})
//   | Type of release     |
//   | Place               |
//   | Publisher/Organizer |
//   | Date                |
Then('the Other release is listed under Exhibitions', () => {
    cy.contains('Test Other release type');
})

