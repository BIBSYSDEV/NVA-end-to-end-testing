import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';
const filename = 'example.txt';

Given('Creator begins registering a Registration in the Wizard with a Link', () => {
  cy.startRegistrationWithLink(doiLink);
  cy.get('[data-testid=registration-link-next-button]').should('be.enabled');
  cy.get('[data-testid=registration-link-next-button]').click({ force: true });
});

Given('Creator begins registering a Registration in the Wizard with a File', () => {
  cy.startRegistrationWithFile(filename);
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});

And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
  cy.get('[data-testid=button-next-tab]').click({ force: true });
  cy.get('[data-testid=button-previous-tab]').click({ force: true });
});
