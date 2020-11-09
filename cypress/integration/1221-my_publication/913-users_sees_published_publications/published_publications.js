import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import 'cypress-localstorage-commands';

Given('that the user is logged in as Creator', () => {
  cy.login(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
  });
});
