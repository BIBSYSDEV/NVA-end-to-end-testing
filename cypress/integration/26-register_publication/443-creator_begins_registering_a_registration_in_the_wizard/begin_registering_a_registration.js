import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

const LINK = 'https://doi.org/10.1126/science.169.3946.635';

Given('Creator begins registering a Registration', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=new-registration]').click({ force: true });
});
And('they have selected {string} for starting the Wizard', (method) => {
  const methods = {
    'Link to registration': 'new-registration-link',
    'Upload file': 'new-registration-file',
  };
  cy.get(`[data-testid=${methods[method]}]`).click({ force: true });
  switch (method) {
    case methods[0]:
      cy.get('[data-testid=new-registration-link-input]').type(LINK);
      cy.get('[doi-search-button]').should('be.enabled');
      cy.get('[doi-search-button]').click({ force: true });
      break;
    case methods[1]:
      break;
  }
});
When('they click Start', () => {});
Then('they see the Wizard', () => {});
// Examples:
//   | Method                 |
//   | Link to registration   |
//   | Upload file            |
