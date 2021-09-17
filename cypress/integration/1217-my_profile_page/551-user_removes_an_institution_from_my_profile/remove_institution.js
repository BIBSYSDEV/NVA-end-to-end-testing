import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_INSTITUTION_REMOVE_INSTITUTION } from '../../../support/constants';
import { MOCK_CRISTINID, MOCK_INSTITUTION } from '../../../support/mock_data';

Given('User sees an Institution from My Profile', () => {
  cy.login(USER_WITH_INSTITUTION_REMOVE_INSTITUTION);
  cy.mockInstitution();
  cy.mockDepartments();
  cy.mockDepartments();
  cy.get('[data-testid=menu-button]').click({ force: true });
  cy.get('[data-testid=my-profile-link]').click({ force: true });
  cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
  cy.get('[data-testid=add-new-institution-button]').click();
  cy.get('[data-testid=autocomplete-institution]').type(MOCK_INSTITUTION[2]);
  cy.contains(MOCK_INSTITUTION[2]).click({ force: true });
  cy.get('[data-testid=institution-add-button]').should('not.be.disabled');
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
When('they click Remove', () => {
  cy.get('[data-testid^=button-delete-institution]').should('have.length', 2);
  cy.get(`[data-testid="button-delete-institution-https://api.cristin.no/v2/institutions/${MOCK_CRISTINID[2]}"]`).click(
    {
      force: true,
    }
  );
});
And('they see a Remove affiliation dialog', () => {
  cy.contains('Remove affiliation?');
});
And('the click on the Yes button', () => {
  cy.get('[data-testid=accept-button]').click({ force: true });
});
Then('they no longer see the institution from My Profile', () => {
  cy.get('[data-testid^=button-delete-institution]').should('have.length', 1);
  cy.contains(MOCK_INSTITUTION[2]).should('not.exist');
});
