import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_VIEW_REGISTRATION } from '../../../support/constants';

Given('that a Creator views a Registration', () => {
  cy.login(USER_VIEW_REGISTRATION);
  cy.get('[data-testid=menu-button]').click();
  cy.get('[data-testid=my-registrations-link]').click({ force: true });
  cy.get('[data-testid^=edit-registration]').first().click({ force: true });
});
And('they navigate to the Files and License tab', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').click({ force: true });
});
When('they click Save and Present', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they see the Landing Page for the Registration', () => {
  cy.location('pathname').should('contain', 'registration').and('contain', 'public');
});
