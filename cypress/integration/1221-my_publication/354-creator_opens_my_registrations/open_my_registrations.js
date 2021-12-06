import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

Given('the user is logged in as Creator', () => {
  cy.login(USER_WITH_AUTHOR);
});
When('they click the button My Registrations', () => {
  cy.get('[data-testid=menu-button]').click();
  cy.get('[data-testid=my-registrations-link]').click({ force: true });
});
Then('they see My Registrations', () => {
  cy.location('pathname').should('eq', '/my-registrations');
});
And('they see a list of all unpublished Registrations with the fields', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get('thead').contains(value[0]);
  });
});
// | Publication name |
// | Status           |
// | Date             |
And('they see each list item has a button Delete and Edit that is enabled', () => {
  cy.get('tr')
    .find('[data-testid^=registration-title]')
    .each((presentationLine) => {
      cy.wrap(presentationLine).get('[data-testid^=edit-registration]').should('exist');
      cy.wrap(presentationLine).get('[data-testid^=edit-registration]').should('not.be.disabled');
      cy.wrap(presentationLine).get('[data-testid^=delete-registration]').should('exist');
      cy.wrap(presentationLine).get('[data-testid^=delete-registration]').should('not.be.disabled');
    });
});
And('they see the navigation bar for unpublished Registrations is selected', () => {
  cy.get('[data-testid=unpublished-button][tabindex=0]');
});
And('they see the navigation bar for published registrations is enabled', () => {
  cy.get('[data-testid=published-button]').should('be.enabled');
});
And('they see items with Status', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    if (value[0] !== 'Rejected') {
      // TODO Rejected not implemented
      cy.get('[data-testid^=registration-status]').contains(value[0]);
    }
  });
});
// Examples:
//   | Draft    |
//   | Rejected |
