import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('user sees a Subunit from My Profile', () => {
  cy.login(USER_ADD_INSTITUTION).then(() => {
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
    cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
    cy.get('[data-testid=add-new-institution-button]').click();
    cy.get('[data-testid=autocomplete-institution]').type('ntnu');
    cy.contains('Norwegian University of Science and Technology').click({ force: true });
    cy.contains('Department').should('be.visible');
  });
});

When('they select a Subunit from the Subunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .type('Faculty of Information Technology and Electrical Engineering');
  cy.contains('Faculty of Information Technology and Electrical Engineering').click({ force: true });
});
And('they click Add', () => {
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution and subunit in My Profile', () => {
  cy.contains('Norwegian University of Science and Technology');
  cy.contains('Faculty of Information Technology and Electrical Engineering');
});

After(() => {
  // remove institution to reset test user
  cy.get('[data-testid="button-delete-institution-https://api.cristin.no/v2/units/194.63.0.0"]').click({ force: true });
  cy.get('[data-testid=accept-button]').click({ force: true });
});
