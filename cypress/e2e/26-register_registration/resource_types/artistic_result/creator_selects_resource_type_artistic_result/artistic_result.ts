// Feature: Creator selects Resource type Artistic Result

import { userUnitArtistic } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { artisticSubtypes } from '../../../../../support/data_testid_constants';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"
Given('Creator begins registering a Registration in the Wizard with a File', () => {
  cy.login(userUnitArtistic);
  cy.startWizardWithEmptyRegistration();
});
When('Creator navigates to Resource Type tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select the Resource type "Artistic Result"', () => {});
Then('they see a list of subtypes:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, artisticSubtypes);
});
// | Artistic result - Architecture   |
// | Artistic result - Design         |
// | Artistic result - Film           |
// | Artistic result - Music          |
// | Artistic result - Performing art |
// | Artistic result - Writing art    |
// | Artistic result - Visual art     |
