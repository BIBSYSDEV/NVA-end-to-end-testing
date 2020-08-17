import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_CONNECT_ORCID, NAME_CONNECT_ORCID } from '../../support/constants';
import { createUser, addQualifierToAuthority } from '../../support/users';

Given('that the user has valid Feide credentials', () => {});
And('they have logged in with Feide before', () => {
  createUser(USER_CONNECT_ORCID, NAME_CONNECT_ORCID).then((authority) => {
    cy.wrap(authority).as('authority');
    cy.get('@idToken').then((idToken) => {
      cy.addQualifierId(authority.systemControlNumber, 'feide', USER_CONNECT_ORCID, idToken).then(() => {
        cy.addQualifierId(authority.systemControlNumber, 'orgunitid', '2020.0.0.0', idToken);
      });
    });
  });
});
And('they have not connected ORCID', () => {});
And('they are on the Start page', () => {
  cy.get('@authority').then((authority) => {
    cy.visit('/');
  });
});
When('they click Log in', () => {});
And('they are redirected to Feide', () => {});
And('they enter their Feide credentials', () => {});
Then('they are redirected back to the Start page', () => {});
And('they see their name in the Menu', () => {
  cy.get('@authority').then((authority) => {
    cy.get('[data-testid=menu]').should('contain.text', NAME_CONNECT_ORCID);
  });
});
And('they see the Connect ORCID dialog', () => {
  cy.get('@authority').then((authority) => {
    cy.get('[data-testid=modal_next]').click({ force: true });
    cy.get('[data-testid=connect-to-orcid').should('be.visible');
  });
});
