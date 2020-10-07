import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('user opens the page My Profile', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
  });
});

When('they click Add Institution', () => {
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled').click({ force: true });
});
Then('they see the Autosearch box for Institutions', () => {
  cy.get('[data-testid=autocomplete-institution]').should('be.visible');
});
