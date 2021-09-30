import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';
import { MOCK_INSTITUTION, MOCK_DEPARTMENT } from '../../../support/mock_data';

Given('User opens Add Institution from My Profile', () => {
  cy.mockInstitution();
  cy.mockDepartments();
  cy.login(USER_ADD_INSTITUTION);
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
});

When('they enter an Institution name', () => {
  cy.get('[data-testid=autocomplete-institution]').type(MOCK_INSTITUTION[2]);
});
And('they select an Institution', () => {
  cy.contains(MOCK_INSTITUTION[2]).click();
});
Then('they see Subunit dropdown containing all the subunits at their Institution', () => {
  cy.contains('Department').should('be.visible');
  cy.get('[data-testid=autocomplete-institution]').last().click();
  cy.contains(MOCK_DEPARTMENT[0]).should('be.visible');
});
