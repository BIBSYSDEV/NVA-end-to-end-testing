import { userUnitLogout } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('that the user is logged in', () => {
  cy.login(userUnitLogout);
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
