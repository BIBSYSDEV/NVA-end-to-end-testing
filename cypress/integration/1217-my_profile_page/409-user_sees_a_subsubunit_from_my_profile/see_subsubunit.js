import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_INSTITUTION_SUBSUBUNIT } from '../../../support/constants';
import { MOCK_CRISTINID, MOCK_DEPARTMENT, MOCK_INSTITUTION } from '../../../support/mock_data';

Given('they see a Subunit from My Profile', () => {
  cy.login(USER_INSTITUTION_SUBSUBUNIT);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
  cy.get('[data-testid=autocomplete-institution]').type('ntnu');
  cy.contains(MOCK_INSTITUTION[2]).click({ force: true });
  cy.contains('Department').should('be.visible');
});

When('they click the Subunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().type(MOCK_DEPARTMENT[0]);
});
And('they select a Subunit from the dropdown', () => {
  cy.contains(MOCK_DEPARTMENT[0]).click({ force: true });
});
Then('they see Subsubunit dropdown containing all the subsubunits for that subunit', () => {
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .within(($autocomplete) => {
      cy.wrap($autocomplete).should('have.value', '');
      cy.wrap($autocomplete).type(MOCK_DEPARTMENT[1]);
    });
  cy.contains(MOCK_DEPARTMENT[1]);
});

After(() => {
  // cancel select institution to reset test user
  cy.get('[data-testid=institution-cancel-button]').click({ force: true });
});
