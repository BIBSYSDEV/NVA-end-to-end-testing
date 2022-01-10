import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

When('they click the menu item My user profile', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
});

Given('user opens the page My Profile', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
});
