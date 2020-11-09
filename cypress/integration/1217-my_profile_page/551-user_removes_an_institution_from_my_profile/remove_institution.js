import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('User sees an Institution from My Profile', () => {
  cy.login(USER_ADD_INSTITUTION).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
    cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
    cy.get('[data-testid=add-new-institution-button]').click();
    cy.get('[data-testid=autocomplete-institution]').type('ntnu');
    cy.contains('Norges teknisk-naturvitenskapelige universitet').click({ force: true });
    cy.get('[data-testid=institution-add-button]').should('not.be.disabled');
    cy.get('[data-testid=institution-add-button]').click({ force: true });
  });
});
When('they click Remove', () => {
  cy.get('[data-testid^=button-delete-institution]').should('have.length', 2);
  cy.get('[data-testid="button-delete-institution-https://api.cristin.no/v2/institutions/194"]').click({ force: true });
});
And('they see a Remove affiliation dialog', () => {
  cy.contains('Remove affiliation?');
});
And('the click on the Yes button', () => {
  cy.get('[data-testid=accept-button]').click({ force: true });
});
Then('they no longer see the institution from My Profile', () => {
  cy.get('[data-testid^=button-delete-institution]').should('have.length', 1);
  cy.contains('Norges teknisk-naturvitenskapelige universitet').should('not.exist');
});
