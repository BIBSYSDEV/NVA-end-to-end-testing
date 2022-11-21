// Feature: Creator selects Resource type Artistic Result and subtype Performing arts

import { userPerformingArts } from "../../../../../support/constants"
import { dataTestId } from "../../../../../support/dataTestIds";
import { performingArtsFields, performingArtsWorkTypes } from "../../../../../support/data_testid_constants";

//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Performing arts"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
    cy.login(userPerformingArts);
    cy.startWizardWithEmptyRegistration();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select Resource Subtype "Performing arts"', () => {
    cy.get('[data-testid=publication-resource-type-chip-PerformingArts]').click();
});
Then('they see fields:', (dataTable) => {
    cy.testDataTestidList(dataTable, performingArtsFields);
});
//   | More information |
And('they see field for Type Work with options:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
    console.log(dataTable)
    dataTable.rawTable.forEach((value) => {
        cy.get(`[data-value=${performingArtsWorkTypes[value[0]]}]`);
    })
    cy.get(`[data-value=${performingArtsWorkTypes[dataTable.rawTable[0][0]]}]`).click()
});
//   | Theater/show  |
//   | TV/film/radio |
//   | Other         |
And('they see a list of Exhibition Places with fields:', (dataTable) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`).click();
    cy.testDataTestidList(dataTable, performingArtsFields);
});
//   | Name       |
//   | Date start |
//   | Date end   |
//   | Order      |
And('they see that each Exhibition Place has a Delete Button', () => {
    Object.keys(performingArtsFields).forEach((value) => {
        if (value !== 'More information') {
            if (value === 'Date start' || value === 'Date end') {
                cy.chooseDatePicker(`[data-testid=${performingArtsFields[value]}]`, '11.11.2011');
            } else {
                cy.get(`[data-testid=${performingArtsFields[value]}]`).type(`Test ${value}`);
            }
        }
    })
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
    cy.contains('Remove');
});
And('they see that each Exhibition Place has an Edit Button', () => {
    cy.contains('Show/Edit')
});
And('they see an Add Exhibition Place Button', () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addVenueButton}]`);
});

//   Scenario: Creator adds an Exhibition Place to Performing arts
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Performing arts"', () => {
    cy.login(userPerformingArts);
    cy.startWizardWithEmptyRegistration();
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    cy.get('[data-testid=publication-resource-type-chip-PerformingArts]').click();
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
And('they see an Add Button', () => {
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
    })
});
And('they click the Add Button', () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
Then('the new Exhibition Place is listed under Exhibition places', () => {
    cy.contains(`Test Name`);
});