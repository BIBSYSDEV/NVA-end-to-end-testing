import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_INSTITUTION_SUBSUBUNIT } from '../../../support/constants';
import { MOCK_DEPARTMENT, MOCK_INSTITUTION } from '../../../support/mock_data';

Given('user sees a Subsubunit from My Profile', () => {
  cy.login(USER_INSTITUTION_SUBSUBUNIT);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
  cy.get('[data-testid=autocomplete-institution]').type(MOCK_INSTITUTION[2]);
  cy.contains(MOCK_INSTITUTION[2]).click({ force: true });
  cy.contains('Department').should('be.visible');
  cy.get('[data-testid=autocomplete-institution]').last().type(MOCK_DEPARTMENT[0]);
  cy.contains(MOCK_DEPARTMENT[0]).click({ force: true });
});

When('they select a Subsubunit from the Subsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().type(MOCK_DEPARTMENT[1]);
  cy.contains(MOCK_DEPARTMENT[1]).click({ force: true });
});
And('they click Add', () => {
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution and Subunit and Subsubunit in My Profile', () => {
  cy.contains(MOCK_INSTITUTION[2]);
  cy.contains(MOCK_DEPARTMENT[0]);
  cy.contains(MOCK_DEPARTMENT[1]);
});
