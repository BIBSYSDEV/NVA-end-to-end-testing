import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_NO_ROLE } from '../../../support/constants';
Given('that a User is logged in with Feide', () => {
  cy.login(USER_NO_ROLE);
});
And('their Institution is a Customer of NVA', () => {});
And('their Administrator has not assigned any roles to them', () => {});
When('they navigate to My Profile', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
});
Then('they see that they have no roles', () => {
  cy.get('[data-testid=user-role]').should('be.null');
});
And('they see an Information text explaining why they have no roles', () => {
  cy.contains("You don't have any roles because your administrator has not assigned any roles to you");
});
