import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { v4 as uuidv4 } from 'uuid';
import 'cypress-localstorage-commands';

Given('the user has navigated to any other page than Start Page', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[user-testid=my-registrations]').click({ force: true });
});
And('they see a "Back" button', () => {
  cy.contains('Back');
});
When('they click "Back"', () => {
  cy.contains('Back').click({ force: true });
});
Then('they see the previous page', () => {
  cy.location().should('equal', '/');
});
