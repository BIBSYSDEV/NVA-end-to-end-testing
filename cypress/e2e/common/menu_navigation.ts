import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { dataTestId } from '../../support/dataTestIds';

When('they click the menu item My user profile', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click({ force: true });
  cy.getDataTestId(dataTestId.myPage.myProfileLink).click({ force: true });
});

Given('user opens the page My Profile', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click({ force: true });
  cy.getDataTestId(dataTestId.myPage.myProfileLink).click({ force: true });
});
