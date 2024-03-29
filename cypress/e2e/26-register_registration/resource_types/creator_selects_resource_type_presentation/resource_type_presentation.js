import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userResourceTypePresentation } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { persentationFields, presentationSubtypes } from '../../../../support/data_testid_constants';

// Feature: Creator selects Resource type Presentation

Before(() => {
    cy.login(userResourceTypePresentation);
    cy.startWizardWithEmptyRegistration();
});

// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Presentation"
Given('Creator navigates to Resource Type tab', () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select the Resource type "Presentation"', () => {
});
Then('they see a list of subtypes:', (dataTable) => {
    cy.testDataTestidList(dataTable, presentationSubtypes);
});
// | Conference lecture |
// | Conference poster  |
// | Lecture            |
// | Other presentation |

// Scenario: Creator navigates to the Resource Type tab and selects a Resource subtype for Presentation
Given('Creator navigates to the Resource Type tab and selects Resource type "Presentation"', () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select a Resource Subtype', () => {
    cy.get('[data-testid=resource-type-chip-ConferenceLecture]').click();
});
Then('they see fields:', (dataTable) => {
    cy.testDataTestidList(dataTable, persentationFields);
});
            // | Title of event |
            // | Place of event |
            // | Date from      |
            // | Date to        |
            // | Organizer      |
            // | Country        |