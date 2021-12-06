import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('the user has navigated to any other page than Start Page', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=menu-button]').click();
  cy.get('[data-testid=my-registrations-link]').click({ force: true });
});
And('they see a "Back" button', () => {
  cy.get('[data-testid=navigate-back-button]').should('be.visible');
});
When('they click "Back"', () => {
  cy.get('[data-testid=navigate-back-button]').click({ force: true });
});
Then('they see the previous page', () => {
  cy.get('[data-testid=button-read-more]').should('exist');
});
