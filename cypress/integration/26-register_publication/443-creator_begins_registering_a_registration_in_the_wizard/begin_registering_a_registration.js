import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { NEW_REGISTRATION_BUTTONS, NEW_REGISTRATION_START_BUTTONS } from '../../../support/data_testid_constants';

const LINK = 'https://doi.org/10.1126/science.169.3946.635';
const fileName = 'example.txt';

Given('Creator begins registering a Registration', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=new-registration]').click({ force: true });
});
And('they have selected {string} for starting the Wizard', (method) => {
  cy.get(`[data-testid=${NEW_REGISTRATION_BUTTONS[method]}]`).click({ force: true });
  cy.wrap(method).as('registrationMethod');
  const methods = Object.keys(NEW_REGISTRATION_BUTTONS);
  switch (method) {
    // Start registation with link
    case methods[0]:
      cy.get('[data-testid=new-registration-link-input]').type(LINK);
      cy.get('[data-testid=doi-search-button]').should('be.enabled');
      cy.get('[data-testid=doi-search-button]').click({ force: true });
      break;
    // Start registration with file
    case methods[1]:
      cy.get('input[type=file]').attachFile(fileName);
      break;
  }
});
When('they click Start', () => {
  cy.get('@registrationMethod').then((method) => {
    cy.get(`[data-testid=${NEW_REGISTRATION_START_BUTTONS[method]}]`).click({ force: true });
  });
});
Then('they see the Wizard', () => {
  cy.location('pathname').should('contain', '/registration');
  cy.location('pathname').should('have.length', 50);
});
// Examples:
//   | Method                 |
//   | Link to registration   |
//   | Upload file            |
