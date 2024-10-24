// Feature: Creator selects Resource type Artistic Result

import { userArtistic } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { artisticSubtypes } from '../../../../../support/data_testid_constants';

// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"
Given('Creator begins registering a Registration in the Wizard with a File', () => {
  cy.login(userArtistic);
  cy.startWizardWithEmptyRegistration();
});
When('Creator navigates to Resource Type tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select the Resource type "Artistic Result"', () => {
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.testDataTestidList(dataTable, artisticSubtypes);
});
// | Artistic result - Architecture   |
// | Artistic result - Design         |
// | Artistic result - Film           |
// | Artistic result - Music          |
// | Artistic result - Performing art |
// | Artistic result - Writing art    |
// | Artistic result - Visual art     |

// Scenario: Creator selects Other type of work for Resource Type "Artistic result"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.login(userArtistic);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
And('they select any Subtype', () => {
  cy.get('[data-testid^=resource-type-chip-]').first().click();
});
When('they select Other as Type Work', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
  cy.get('[data-value=Other]').click();
});
Then('they see a new field where they can enter actual Type', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOtherTypeField}]`).should('be.visible');
});
