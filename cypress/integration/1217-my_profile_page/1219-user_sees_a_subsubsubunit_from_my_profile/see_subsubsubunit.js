import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('they see a Subsubunit from My Profile', () => {
  cy.login(USER_ADD_INSTITUTION).then(() => {
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
    cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
    cy.get('[data-testid=add-new-institution-button]').click();
    cy.get('[data-testid=autocomplete-institution]').type('ntnu');
    cy.contains('Norges teknisk-naturvitenskapelige universitet').click({ force: true });
    cy.contains('Department').should('be.visible');
    cy.get('[data-testid=autocomplete-institution]')
      .last()
      .type('Fakultet for informasjonsteknologi og elektroteknikk');
    cy.contains('Fakultet for informasjonsteknologi og elektroteknikk').click({ force: true });
  });
});

And('they select a Subsubunit from the Subsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().type('IE fakultetsadministrasjon');
  cy.contains('IE fakultetsadministrasjon').click({ force: true });
});
And('the see the Subsubsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().should('have.value', '');
});
When('they click the Subsubsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .within(($autocomplete) => {
      cy.wrap($autocomplete).should('have.value', '');
      cy.wrap($autocomplete).type('realfagsrekruttering');
    });
});

Then('they see a Subsubsubunit dropdown containing all the Subsubsubunits at their Subsubunit', () => {
  cy.contains('Nasjonalt senter for realfagsrekruttering');
});

After(() => {
  // cancel select institution to reset test user
  cy.get('[data-testid=institution-cancel-button]').click({ force: true });
});
