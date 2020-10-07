import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('User opens Add Institution from My Profile', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
    cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled').click({ force: true });
  });
});

When('they enter an Institution name', () => {
  cy.get('[data-testid=autocomplete-institution]').click;
});
And('they select an Institution', () => {});
And('they click Save', () => {});
Then('they see the Add Institution dialog is closed', () => {});
And('they see the new Institution in My Profile', () => {});
And('they see a button Remove that is enabled for the new Institution', () => {});
