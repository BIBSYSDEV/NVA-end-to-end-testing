import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Creator sees registration is saved with correct values presented on landing page

// Scenario Outline:
Given('Author begins registering a registration', () => {
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
});
And('selects {string} and {string}', (type, subType) => {
  cy.wrap(type).as('type');
  cy.wrap(subType).as('subtype');
});
And('fill in values for all fields', () => {
  cy.fillInCommonFields();
  cy.get('@type').then((type) => {
    cy.get('@subtype').then((subtype) => {
      cy.fillInResourceType(type, subtype);
    });
  });
});
When('they saves registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
  cy.get('[data-testid="button-save-registration"]').click();
});
Then('they can see the values on the Registration Landing Page', () => {
  cy.checkLandingPage();
});
// | Resource Type           | Subtype         |
// | Contribution to journal | Journal article |
