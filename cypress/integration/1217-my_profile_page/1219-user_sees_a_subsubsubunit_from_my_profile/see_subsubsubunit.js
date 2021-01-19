import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_ADD_INSTITUTION } from '../../../support/constants';

Given('they see a Subsubunit from My Profile', () => {
  cy.login(USER_ADD_INSTITUTION).then(() => {
    cy.get('[data-testid=menu]').click({ force: true });
    cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
    cy.get('[data-testid=add-new-institution-button]').should('not.be.disabled');
    cy.get('[data-testid=add-new-institution-button]').click();
    cy.get('[data-testid=autocomplete-institution]').type('ntnu');
    cy.contains('Norwegian University of Science and Technology').click({ force: true });
    cy.contains('Department').should('be.visible');
    cy.get('[data-testid=autocomplete-institution]')
      .last()
      .type('Faculty of Information Technology and Electrical Engineering');
    cy.contains('Faculty of Information Technology and Electrical Engineering').click({ force: true });
  });
});

And('they select a Subsubunit from the Subsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().type('IE Faculty Administration');
  cy.contains('IE Faculty Administration').click({ force: true });
});
And('the see the Subsubsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]').last().should('have.value', '');
});
When('they click the Subsubsubunit dropdown', () => {
  cy.get('[data-testid=autocomplete-institution]')
    .last()
    .within(($autocomplete) => {
      cy.wrap($autocomplete).should('have.value', '');
      cy.wrap($autocomplete).type('recruit');
    });
});

Then('they see a Subsubsubunit dropdown containing all the Subsubsubunits at their Subsubunit', () => {
  cy.contains('The National Centre for Science Recruitment');
});

After(() => {
  // cancel select institution to reset test user
  cy.get('[data-testid=institution-cancel-button]').click({ force: true });
});
