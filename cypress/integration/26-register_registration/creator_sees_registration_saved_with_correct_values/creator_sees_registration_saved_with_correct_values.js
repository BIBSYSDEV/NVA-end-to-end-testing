import { userWithAuthor } from '../../../support/constants';

// Feature: Creator sees registration is saved with correct values presented on landing page

// Scenario Outline:
Given('Author begins registering a registration', () => {
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
});
And('selects {string} and {string}', (resourceType, subType) => {
  cy.fillInCommonFields();
});
And('fill in values for all fields', () => {});
When('they saves registration', () => {
  cy.get('[data-testid="button-save-registration"]').click();
});
Then('they can see the values on the Registration Landing Page', () => {});
// | Resource Type           | Subtype         |
// | Contribution to journal | Journal article |
