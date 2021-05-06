import { And } from 'cypress-cucumber-preprocessor/steps';

And('they select Resource subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('@subTypes').then((subTypes) => {
    cy.get(`[data-testid=${subTypes[subtype]}]`).click({ force: true });
  });
});
