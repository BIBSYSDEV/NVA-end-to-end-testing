import { userOpenMyRegistrations } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('the user is logged in as Creator', () => {
  cy.login(userOpenMyRegistrations);
});
When('they click the button My Registrations', () => {
  cy.openMyRegistrations();
});
Then('they see My Registrations', () => {
  cy.location('pathname').should('eq', '/my-page/registrations/my-registrations');
});
And('they see a list of all unpublished Registrations with the fields', () => {
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`);
});
// | Publication name |
// | Status           |
// | Date             |
And('they see each list item has a button Delete and Edit that is enabled', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .find('p > a')
    .each((presentationLine) => {
      cy.wrap(presentationLine).get('[data-testid^=edit-registration]').should('exist');
      cy.wrap(presentationLine).get('[data-testid^=edit-registration]').should('not.be.disabled');
      cy.wrap(presentationLine).get('[data-testid^=delete-registration]').should('exist');
      cy.wrap(presentationLine).get('[data-testid^=delete-registration]').should('not.be.disabled');
    });
});
And('they see the navigation bar for unpublished Registrations is selected', () => {
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsUnpublishedCheckbox}] .Mui-checked`).should('exist');
});
And('they see the navigation bar for published registrations is enabled', () => {
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsPublishedCheckbox}] .Mui-checked`).should('not.exist');
  cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).should('exist');
});
And('they see items with Status', (dataTable) => {});
// Examples:
//   | Draft    |
//   | Rejected |
