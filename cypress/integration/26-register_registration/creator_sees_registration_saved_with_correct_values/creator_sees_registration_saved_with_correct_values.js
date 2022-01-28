import { And } from 'cypress-cucumber-preprocessor/steps';
import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { registrationFields } from '../../../support/save_registration';

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
  cy.get('@type').then((type) => {
    cy.get('@subtype').then((subtype) => {
      cy.fillInResourceType(type, subtype);
      cy.fillInContributors(type, subtype);
    });
  });
  cy.fillInCommonFields();
});
When('they saves registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
  cy.get('[data-testid="button-save-registration"]').click();
});
Then('they can see the values on the Registration Landing Page', () => {
  cy.checkLandingPage();
});
And('they can see the values in the registration wizard', () => {
  cy.get('[data-testid=button-edit-registration]').click();
  cy.get('@type').then((type) => {
    cy.get('@subtype').then((subtype) => {
      Object.keys(registrationFields).forEach((key) => {
        cy.get(`[data-testid=${registrationFields[key]['tab']}]`).click();
        Object.keys(registrationFields[key]).forEach((subkey) => {
          if (subkey !== 'tab') {
            const field = registrationFields[key][subkey];
            cy.checkField(field);
          }
        });
      });
          // cy.checkResourceFields(type, subtype);
      // cy.checkContributors(type, subtype);
    });
  });
});
// | Resource Type           | Subtype         |
// | Book                    | BookMonograph   |
// | Book                    | BookAnthology   |
