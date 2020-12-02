import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('they see a Subunit from My Profile', () => {
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

When('they click the Subunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .type('Faculty of Information Technology and Electrical Engineering');
});
And('the select a Subunit from the dropdown', () => {
  cy.contains('Faculty of Information Technology and Electrical Engineering').click({ force: true });
});
Then('they see Subsubunit dropdown containing all the subsubunits for that subunit', () => {
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .within(($autocomplete) => {
      cy.wrap($autocomplete).should('have.value', '');
      cy.wrap($autocomplete).type('faculty');
    });
  cy.contains('IE Faculty Administration');
});

After(() => {
  // cancel select institution to reset test user
  cy.get('[data-testid=institution-cancel-button]').click({ force: true });
});
