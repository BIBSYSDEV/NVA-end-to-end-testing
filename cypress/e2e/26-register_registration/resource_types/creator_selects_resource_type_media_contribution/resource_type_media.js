import { Before } from "cypress-cucumber-preprocessor/steps";
import { userResourceTypeMedia } from "../../../../support/constants";
import { dataTestId } from "../../../../support/dataTestIds";
import { mediaSubtypes } from "../../../../support/data_testid_constants";

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';

// Feature: Creator selects Resource type Media Contribution

Before(() => {
    cy.login(userResourceTypeMedia);
    cy.startWizardWithEmptyRegistration();
});

//   Scenario: Creator navigates to the Resource Type tab and selects Resource type "Media Contribution"
Given('Creator navigates to Resource Type tab', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select the Resource type "Media Contribution"', () => { });
Then('they see a list of subtypes:', (dataTable) => {
    cy.testDataTestidList(dataTable, mediaSubtypes);
});
//   | Feature Article              |
//   | Reader Opinion               |
//   | Interview                    |
//   | Blog post                    |
//   | Podcast                      |
//   | Participation in Radio or TV |

//   Scenario: Creator navigates to the Resource Type tab and selects a Resource subtype for Media Contribution
Given('Creator navigates to the Resource Type tab and selects Resource type "Media Contribution"', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select a Resource Subtype', () => {
    cy.getDataTestId('resource-type-chip-MediaInterview').click();
});
Then('they see field Medium with options:', (dataTable) => {

});
//   | Newspaper or Journal |
//   | Internet             |
//   | Radio                |
//   | TV                   |
//   | Other                |
And('they see field Format with options:', (dataTable) => {
});
//   | Text  |
//   | Sound |
//   | Video |
And('they see freetext input fields for:', (dataTable) => { });
//   | Channel                   |
//   | Name of series or program |
//   | Name of issue or episode  |
And('they can see the DOI', () => { });
