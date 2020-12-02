import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_REMOVE_ORCID } from '../../../support/constants';

Given('user opens the page My Profile', () => {
  cy.login(USER_REMOVE_ORCID);
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
});
When('they click Remove ORCID', () => {});
Then('they see a confirmation that the ORCID is removed', () => {});
