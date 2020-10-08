import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('User opens Add Institution from My Profile', () => {
  cy.loginCognito(USER_ADD_INSTITUTION).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
    cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
    cy.get('[data-testid=add-new-institution-button]').click();
  });
});

When('they enter an Institution name', () => {
  cy.get('[data-testid=autocomplete-institution]').type('ntnu');
});
And('they select an Institution', () => {
  cy.contains('Norges teknisk-naturvitenskapelige universitet').click({ force: true });
});
And('they see a button Add that is enabled for the new Institution', () => {
  cy.get('[data-testid=institution-add-button]').should('be.visible');
});
And('they see a button Cancel that is enabled for the new Institution', () => {
  cy.get('[data-testid=institution-cancel-button]').should('be.visible');
});
And('they click on the Add button', () => {
  cy.get('[placeholder="Search for department"]').should('be.visible');
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution in My Profile', () => {
  cy.contains('Norges teknisk-naturvitenskapelige universitet');
});
And('they see a button Remove that is enabled for the new Institution', () => {
  cy.get('[data-testid^=button-delete-institution]').should(($delete) => {
    expect($delete).to.have.length(2);
  });
});
