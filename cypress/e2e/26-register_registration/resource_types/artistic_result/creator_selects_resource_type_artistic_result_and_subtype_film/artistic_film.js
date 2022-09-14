// Feature: Creator selects Resource type Artistic Result and subtype Film

import { userFilm } from "../../../../../support/constants";
import { dataTestId } from "../../../../../support/dataTestIds";

//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Film"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
    cy.login(userFilm);
    cy.startWizardWithEmptyRegistration();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    cy.get(`[data-testid=publication-context-type]`).click();
    cy.get('[data-testid=publication-context-type-Artistic]').click();
})
When('they select Resource Subtype "Film"', () => {
    cy.get(`[data-testid=publication-instance-type]`).click();
    cy.get('[data-testid=publication-instance-type-MovingPicture]').click();
});
Then('they see fields:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticDescriptionField}]`);
})
//   | More information |
And('they see field for Type Work with options:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
    dataTable.values.forEach(value => {
        cy.get(`[data-value=${value[0]}]`);
    });
})
//   | Film             |
//   | Short film       |
//   | Serial film      |
//   | Interactive film |
//   | AR/VR film       |
//   | Other            |
And('they can add Exhibitions of type:', () => { })
//   | Broadcast         |
//   | Cinematic release |
//   | Other release     |
And('they can edit existing Exhibitions', () => { })
And('they can delete existing Exhibitions', () => { })


//   Scenario: Creator adds a Broadcast to a Film
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Film"', () => { })
When('they add a Broadcast with details for:', () => { })
//   | Publisher |
//   | Date      |
Then('the Broadcast is listed under Exhibitions', () => { })

//   Scenario: Creator adds an Cinematic release to a Film
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Film"', () => { })
When('they add a Cinematic release with details for:', () => { })
//   | Place |
//   | Date  |
Then('the Cinematic release is listed under Exhibitions', () => { })

//   Scenario: Creator adds an Other release to a Film
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Film"', () => { })
When('they add a Other release with details for:', () => { })
//   | Type of release     |
//   | Place               |
//   | Publisher/Organizer |
//   | Date                |
Then('the Other release is listed under Exhibitions', () => { })

