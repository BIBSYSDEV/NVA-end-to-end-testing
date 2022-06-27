import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('that the user is logged in', () => {
  cy.login(userWithAuthor);
})
When('they click on the Menu', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
})
And('they click Log out', () => {
  cy.wait(5000)
  cy.get(`[data-testid=${dataTestId.header.logOutLink}]`).click();
})
Then('they are logged out of the NVA application', () => {
  cy.contains('Withauthor TestUser').should('not.exist');
})


