import { CategoryTypes, userName, userUnitOpenMyRegistrations } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { createDraftPublicationUsingAPI, NviLevels } from '../../../support/create_registration';

Given('the user is logged in as Creator', () => {
  cy.login(userUnitOpenMyRegistrations).then(() => {
    const title = `My registration ${uuid()}`;
    createDraftPublicationUsingAPI(title, CategoryTypes.ACADEMIC_ARTICLE, userName[userUnitOpenMyRegistrations]).then(
      () => {
        cy.wait(3000);
      }
    );
  });
});
When('they click the button My Registrations', () => {
  cy.openMyRegistrations();
});
Then('they see My Registrations', () => {
  cy.location('pathname').should('eq', '/my-page/registrations');
});
Then('they see a list of all unpublished Registrations with the fields', () => {
  cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > p > a`);
});
// | Publication name |
// | Status           |
// | Date             |
Then('they see each list item has a button Delete and Edit that is enabled', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .find('p > a')
    .each((presentationLine) => {
      cy.wrap(presentationLine).get('[data-testid^=edit-registration]').should('exist');
      cy.wrap(presentationLine).get('[data-testid^=edit-registration]').should('not.be.disabled');
      cy.wrap(presentationLine).get('[data-testid^=delete-registration]').should('exist');
      cy.wrap(presentationLine).get('[data-testid^=delete-registration]').should('not.be.disabled');
    });
});
Then('they see the navigation bar for unpublished Registrations is selected', () => {
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsUnpublishedCheckbox}] .Mui-checked`).should('exist');
});
Then('they see the navigation bar for published registrations is enabled', () => {
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsPublishedCheckbox}] .Mui-checked`).should('not.exist');
  cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).should('exist');
});
Then('they see items with Status', (dataTable: DataTable) => {});
// Examples:
//   | Draft    |
//   | Rejected |
