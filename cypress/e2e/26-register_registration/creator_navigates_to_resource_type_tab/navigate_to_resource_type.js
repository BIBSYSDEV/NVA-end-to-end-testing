import { userWithAuthor5 } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { resourceTypeFields } from '../../../support/data_testid_constants';

// Feature: Creator navigates to Resource Type tab

// Common steps
Given('Creator begins registering a Registration in the Wizard with a File', () => {
  cy.login(userWithAuthor5);
  cy.startWizardWithEmptyRegistration();
});
When('they navigate to the Resource Type tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });
  cy.wrap(resourceTypeFields).as('fields');
});
// end common steps

//   @453
//   Scenario: Creator navigates to Resource Type tab
Then('they see the field for Type', () => {
  cy.get(`[data-testid^=resource-type-]`).should('exist')
});
And('they see the tab Description is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).should('be.enabled');
});
And('they see the tab Resource Type is selected', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).get('[tabindex=0]');
});
And('they see the tab Contributors is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).should('be.visible');
});
And('they see the tab Files and License is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).should('be.visible');
});
And('they see Previous is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.previousTabButton).should('be.enabled');
});
And('they see Next is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.nextTabButton).should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});

//   Scenario: Creator sees that fields are validated on Resource Type tab

And('they click the Save button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => { });
// | Type |
