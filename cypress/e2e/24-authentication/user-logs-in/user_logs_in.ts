import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userLogout } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('that the user is logged in', () => {
  cy.login(userLogout);
})
When('they click on the Menu', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
})
And('they click Log out', () => {
  cy.get(`[data-testid=${dataTestId.header.logOutLink}]`).click();
  cy.reload();
})
Then('they are logged out of the NVA application', () => {
  cy.get(`[data-testid=${dataTestId.header.logInButton}]`).should('be.visible');
  cy.contains('Log out TestUser', { timeout: 30000 }).should('not.exist');
})


