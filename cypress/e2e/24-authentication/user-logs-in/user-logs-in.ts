import {
  feideTestUser,
  feideTestUserGivenName,
  feideTestUserWithoutNin,
  userUnitLogout,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { loginThroughFeide, visitApp } from '../../../support/login';
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('that the user is logged in', () => {
  cy.login(userUnitLogout);
});
Given('that the user is not logged in', () => {
  cy.setLocalStorage('i18nextLng', 'eng');
  visitApp();
  cy.getDataTestId(dataTestId.header.logInButton).should('be.visible');
});
When('they click Log in', () => {
  cy.getDataTestId(dataTestId.header.logInButton).click();
});
When('they log in as a Feide test user', () => {
  loginThroughFeide(feideTestUser);
});
When('they log in as a Feide test user without a national identity number', () => {
  loginThroughFeide(feideTestUserWithoutNin);
});
Then('they see their name in the Menu', () => {
  cy.getDataTestId(dataTestId.header.menuButton).should('contain', feideTestUserGivenName);
});
Then('they are told that the login failed and to try BankID instead', () => {
  cy.getDataTestId(dataTestId.snackbar.error).should('contain', 'Log in failed. Try logging in with BankID instead.');
});
Then('they are still not logged in', () => {
  cy.getDataTestId(dataTestId.header.logInButton).should('be.visible');
});
When('they click on the Menu', () => {
  cy.getDataTestId(dataTestId.header.menuButton).click();
});
When('they click Log out', () => {
  cy.getDataTestId(dataTestId.header.logOutLink).click();
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.reload();
});
Then('they are logged out of the NVA application', () => {
  cy.getDataTestId(dataTestId.header.logInButton).should('be.visible');
  cy.contains('Log out TestUser', { timeout: 30000 }).should('not.exist');
});
