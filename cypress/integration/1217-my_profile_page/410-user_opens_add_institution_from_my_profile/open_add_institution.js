import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { MOCK_CRISTINID } from '../../../support/mock_data';

Given('user opens the page My Profile', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
});

When('they click Add Institution', () => {
  cy.get('[data-testid=add-new-institution-button]').should('be.visible');
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click({ force: true });
});
Then('they see the Autosearch box for Institutions', () => {
  cy.get('[data-testid=autocomplete-institution]').should('be.visible');
});
