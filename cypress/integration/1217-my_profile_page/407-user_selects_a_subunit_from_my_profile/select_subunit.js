import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_INSTITUTION_SUBUNIT } from '../../../support/constants';
import { MOCK_CRISTINID, MOCK_DEPARTMENT, MOCK_INSTITUTION } from '../../../support/mock_data';

Given('user sees a Subunit from My Profile', () => {
  cy.login(USER_INSTITUTION_SUBUNIT);
  cy.mockInstitution();
  cy.mockDepartments(MOCK_CRISTINID[0]);
  cy.mockDepartments(MOCK_CRISTINID[2]);
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
  cy.get('[data-testid=autocomplete-institution]').type('Mock institution 3');
  cy.contains(MOCK_INSTITUTION[2]).click({ force: true });
  cy.contains('Department').should('be.visible');
});

When('they select a Subunit from the Subunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().type(MOCK_DEPARTMENT[0]);
  cy.contains(MOCK_DEPARTMENT[0]).click({ force: true });
});
And('they click on a subunit', () => {
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution and subunit in My Profile', () => {
  cy.contains(MOCK_INSTITUTION[2]);
  cy.contains(MOCK_DEPARTMENT[0]);
});

After(() => {
  // remove institution to reset test user
  cy.get(`[data-testid="button-delete-institution-https://api.cristin.no/v2/units/${MOCK_CRISTINID[2]}.1.0.0"]`).click({
    force: true,
  });
  cy.get('[data-testid=accept-button]').click({ force: true });
});
