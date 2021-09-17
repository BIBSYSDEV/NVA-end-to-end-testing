import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_INSTITUTION_SUBSUBUNIT } from '../../../support/constants';

Given('user sees a Subsubunit from My Profile', () => {
  cy.login(USER_INSTITUTION_SUBSUBUNIT);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
  cy.get('[data-testid=autocomplete-institution]').type('Mock institution 3');
  cy.contains('Norwegian University of Science and Technology').click({ force: true });
  cy.contains('Department').should('be.visible');
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .type('Faculty of Information Technology and Electrical Engineering');
  cy.contains('Faculty of Information Technology and Electrical Engineering').click({ force: true });
});

When('they select a Subsubunit from the Subsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().type('IE Faculty Administration');
  cy.contains('IE Faculty Administration').click({ force: true });
});
And('they click Add', () => {
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution and Subunit and Subsubunit in My Profile', () => {
  cy.contains('Norwegian University of Science and Technology');
  cy.contains('Faculty of Information Technology and Electrical Engineering');
  cy.contains('IE Faculty Administration');
});

After(() => {
  // remove institution to reset test user
  cy.get('[data-testid="button-delete-institution-https://api.cristin.no/v2/units/194.63.1.0"]').click({ force: true });
  cy.get('[data-testid=accept-button]').click({ force: true });
});
