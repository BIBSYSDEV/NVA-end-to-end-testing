import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_INSTITUTION_SUBSUBSUBUNIT } from '../../../support/constants';
import { MOCK_CRISTINID, MOCK_DEPARTMENT, MOCK_INSTITUTION } from '../../../support/mock_data';

Given('user sees a Subsubsubunit from My Profile', () => {
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
  cy.get('[data-testid=autocomplete-institution]').last().type(MOCK_DEPARTMENT[1]);
  cy.contains(MOCK_DEPARTMENT[1]).click({ force: true });
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .within(($autocomplete) => {
      cy.wrap($autocomplete).should('have.value', '');
      cy.wrap($autocomplete).type(MOCK_DEPARTMENT[2]);
    });
});

When('they select a Subsubsubunit from the Subsubsubunit dropdown', () => {
  cy.contains(MOCK_DEPARTMENT[2]).click({ force: true });
});

And('they click Add', () => {
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution and Subunit and Subsubunit and Subsubsubunit in My Profile', () => {
  cy.contains(MOCK_INSTITUTION[2]);
  cy.contains(MOCK_DEPARTMENT[0]);
  cy.contains(MOCK_DEPARTMENT[1]);
  cy.contains(MOCK_DEPARTMENT[2]);
});

After(() => {
  // remove institution to reset test user
  cy.get(`[data-testid="button-delete-institution-https://api.cristin.no/v2/units/${MOCK_CRISTINID[2]}.3.0.0"]`).click({
    force: true,
  });
  cy.get('[data-testid=accept-button]').click({ force: true });
});
