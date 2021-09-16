import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_INSTITUTION_SUBSUBSUBUNIT } from '../../../support/constants';
import { MOCK_CRISTINID, MOCK_DEPARTMENT, MOCK_INSTITUTION } from '../../../support/mock_data';

Given('they see a Subsubunit from My Profile', () => {
  cy.login(USER_INSTITUTION_SUBSUBSUBUNIT);
  cy.mockInstitution();
  cy.mockDepartments();
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

And('they select a Subsubunit from the Subsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().type(MOCK_DEPARTMENT[1]);
  cy.contains(MOCK_DEPARTMENT[1]).click({ force: true });
});
And('the see the Subsubsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().should('have.value', '');
});
When('they click the Subsubsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .within(($autocomplete) => {
      cy.wrap($autocomplete).should('have.value', '');
      cy.wrap($autocomplete).type(MOCK_DEPARTMENT[2]);
    });
});

Then('they see a Subsubsubunit dropdown containing all the Subsubsubunits at their Subsubunit', () => {
  cy.contains(MOCK_DEPARTMENT[2]);
});

After(() => {
  // cancel select institution to reset test user
  cy.get('[data-testid=institution-cancel-button]').click({ force: true });
});
