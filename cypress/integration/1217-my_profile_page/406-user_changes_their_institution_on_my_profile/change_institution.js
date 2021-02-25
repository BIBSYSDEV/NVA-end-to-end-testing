import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_CHANGE_INSTITUTION } from '../../../support/constants';

const INSTITUTION = 'Fjellhaug International University College';
const SUB_UNIT = 'Avdeling Aarhus';

Given('that a User is logged in', () => {
  cy.login(USER_CHANGE_INSTITUTION);
});
And('they open My Profile', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
});
And('they see their Connected Institution', () => {
  cy.get('[data-testid=institution-presentation]').contains(INSTITUTION);
});
When('they click Change Institution', () => {
  cy.get('[data-testid=institution-presentation]')
    .contains(INSTITUTION)
    .parents('[data-testid=institution-presentation]')
    .within(($presentation) => {
      cy.wrap($presentation).get('[data-testid^=button-edit-institution]').click({ force: true });
    });
});
Then('they see their Institution is selected inside the Institution dropdown', () => {
  cy.get(`[value="${INSTITUTION}"]`);
});
And('they see a Subunit dropdown with subunits for the selected Institution', () => {
  cy.get('[data-testid=autocomplete-institution]').should('have.length.at.least', 2);
  cy.get('[data-testid=autocomplete-institution]').last().click({ force: true });
  cy.contains('Avdeling Aarhus');
});
And('they see a Save button', () => {
  cy.get('[data-testid=add-new-institution-button]').should('be.visible');
});
