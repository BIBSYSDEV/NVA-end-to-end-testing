import { Given, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_INST_ADMIN_WITH_AUTHOR } from '../../../support/constants';

Given('that an App Admin or Institution Admin opens User Administration', () => {
  cy.login(USER_INST_ADMIN_WITH_AUTHOR);
  cy.get('[data-testid=menu').click({ force: true });
  cy.get('[data-testid=menu-admin-institution-users-button]').click({ force: true });
});
And('they see only one current Institution Admin', () => {
  cy.get('[data-testid^=button-remove-role-Institution-admin]').should('have.length', 1);
});
Then('they see that the Delete button on its name is disabled', () => {
  cy.get('[data-testid^=button-remove-role-Institution-admin]').first().should('be.disabled');
});
