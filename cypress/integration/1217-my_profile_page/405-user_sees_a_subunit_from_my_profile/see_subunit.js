import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';

Given('User opens Add Institution from My Profile', () => {
  cy.login(USER_ADD_INSTITUTION).then(() => {
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
  cy.contains('Norwegian University of Science and Technology').click({ force: true });
});
Then('they see Subunit dropdown containing all the subunits at their Institution', () => {
  cy.contains('Department').should('be.visible');
});

After(() => {
  // cancel select institution to reset test user
  cy.get('[data-testid=institution-cancel-button]').click({ force: true });
});
