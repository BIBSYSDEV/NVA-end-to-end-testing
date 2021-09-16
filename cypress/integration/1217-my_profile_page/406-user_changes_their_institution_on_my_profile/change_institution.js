import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_CHANGE_INSTITUTION } from '../../../support/constants';
import { MOCK_CRISTINID, MOCK_DEPARTMENT, MOCK_INSTITUTION } from '../../../support/mock_data';

Given('that a User is logged in', () => {
  cy.login(USER_CHANGE_INSTITUTION);
});
And('they open My Profile', () => {
  cy.mockInstitution();
  cy.mockDepartments(MOCK_CRISTINID[0]);
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.changeUserInstitution(MOCK_CRISTINID[0]);
  cy.get('[data-testid=my-profile-link]').click({ force: true });
});
And('they see their Connected Institution', () => {
  cy.get('[data-testid=institution-presentation]').contains(MOCK_INSTITUTION[0]);
});
When('they click Edit Institution', () => {
  cy.get('[data-testid=institution-presentation]')
    .contains(MOCK_INSTITUTION[0])
    .parents('[data-testid=institution-presentation]')
    .within(($presentation) => {
      cy.wrap($presentation).get('[data-testid^=button-edit-institution]').click({ force: true });
    });
});
Then('they see their Institution is selected inside the Institution dropdown', () => {
  cy.get(`[value="${MOCK_INSTITUTION[0]}"]`);
});
And('they see a Subunit dropdown with subunits for the selected Institution', () => {
  cy.get('[data-testid=autocomplete-institution]').should('have.length.at.least', 2);
  cy.get('[data-testid=autocomplete-institution]').last().click({ force: true });
  cy.contains(MOCK_DEPARTMENT[0]);
});
And('they see a Save button', () => {
  cy.get('[data-testid=add-new-institution-button]').should('be.visible');
});
