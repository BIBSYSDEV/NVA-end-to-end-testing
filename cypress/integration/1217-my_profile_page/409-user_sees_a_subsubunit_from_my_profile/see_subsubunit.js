import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('they see a Subunit from My Profile', () => {
  cy.loginCognito(USER_ADD_INSTITUTION).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
    cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
    cy.get('[data-testid=add-new-institution-button]').click();
    cy.get('[data-testid=autocomplete-institution]').type('ntnu');
    cy.contains('Norges teknisk-naturvitenskapelige universitet').click({ force: true });
    cy.contains('Department').should('be.visible');
  });
});

When('they click the Subunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().type('Fakultet for informasjonsteknologi og elektroteknikk');
});
And('the select a Subunit from the dropdown', () => {
  cy.contains('Fakultet for informasjonsteknologi og elektroteknikk').click({ force: true });
});
Then('they see Subsubunit dropdown containing all the subsubunits for that subunit', () => {
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .within(($autocomplete) => {
      cy.wrap($autocomplete).should('have.value', '');
      cy.wrap($autocomplete).type('fakultet');
      cy.wrap($autocomplete).contains('fakultetsadministrasjon');
    });
});

After(() => {
  // cancel select institution to reset test user
  cy.get('[data-testid=institution-cancel-button]').click({ force: true });
});
