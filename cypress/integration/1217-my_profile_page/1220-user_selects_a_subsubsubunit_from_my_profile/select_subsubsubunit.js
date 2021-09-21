import { After, And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_INSTITUTION_SUBSUBSUBUNIT } from '../../../support/constants';

Given('user sees a Subsubsubunit from My Profile', () => {
  cy.login(USER_INSTITUTION_SUBSUBSUBUNIT).then(() => {
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
    cy.get('[data-testid=autocomplete-institution]').last().type('IE Faculty Administration');
    cy.contains('IE Faculty Administration').click({ force: true });
    cy.get('[data-testid=autocomplete-institution]')
      .last()
      .within(($autocomplete) => {
        cy.wrap($autocomplete).should('have.value', '');
        cy.wrap($autocomplete).type('recruit');
      });
  });
});

When('they select a Subsubsubunit from the Subsubsubunit dropdown', () => {
  cy.contains('The National Centre for Science Recruitment').click({ force: true });
});

And('they click Add', () => {
  cy.get('[data-testid=institution-add-button]').click({ force: true });
});
Then('they see the new Institution and Subunit and Subsubunit and Subsubsubunit in My Profile', () => {
  cy.contains('Norwegian University of Science and Technology');
  cy.contains('Faculty of Information Technology and Electrical Engineering');
  cy.contains('IE Faculty Administration');
  cy.contains('The National Centre for Science Recruitment');
});

After(() => {
  // remove institution to reset test user
  cy.get('[data-testid="button-delete-institution-https://api.cristin.no/v2/units/194.63.1.20"]').click({
    force: true,
  });
  cy.get('[data-testid=accept-button]').click({ force: true });
});
