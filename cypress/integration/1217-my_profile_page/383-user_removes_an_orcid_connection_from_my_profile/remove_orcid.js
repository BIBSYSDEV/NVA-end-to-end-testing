import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_REMOVE_ORCID } from '../../../support/constants';
import { mockPerson } from '../../../support/mock_data';

const stage = Cypress.env('STAGE');

Given('user opens the page My Profile', () => {
  cy.login(USER_REMOVE_ORCID);
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
});
When('they click Remove ORCID', () => {
  cy.intercept(`https://api.${stage}.nva.aws.unit.no/person/*/identifiers/orcid/delete`, {
    ...mockPerson(USER_REMOVE_ORCID),
    orcids: [],
  });
  cy.get('[data-testid=button-confirm-delete-orcid]').click({ force: true });
  cy.get('[data-testid=accept-button]').click({ force: true });
});
Then('they see a confirmation that the ORCID is removed', () => {
  cy.get('[data-testid=snackbar-success]').should('be.visible');
});
