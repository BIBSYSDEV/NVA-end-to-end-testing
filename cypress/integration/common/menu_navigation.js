import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from '../../support/dataTestIds';

When('they click the menu item My user profile', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.header.myProfileLink}]`).click({ force: true });
});

Given('user opens the page My Profile', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.header.myProfileLink}]`).click({ force: true });
});
