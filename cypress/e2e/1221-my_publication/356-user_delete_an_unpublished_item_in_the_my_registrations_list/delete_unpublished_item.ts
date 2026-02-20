import { v4 as uuid } from 'uuid';
import { CategoryTypes, userName, userUnitDeleteRegistrations } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import { createDraftPublicationUsingAPI, NviLevels } from '../../../support/create_registration';

const firstTitle = `Delete registration ${uuid()}`;
const secondTitle = `Delete registration ${uuid()}`;

let init = false;
const initData = () => {
  cy.login(userUnitDeleteRegistrations).then(() => {
    createDraftPublicationUsingAPI(
      firstTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitDeleteRegistrations],
      NviLevels.LEVEL_0
    ).then(() => {});
    createDraftPublicationUsingAPI(
      secondTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitDeleteRegistrations],
      NviLevels.LEVEL_0
    ).then(() => {});
  });
};

BeforeAll(() => initData());

Given('Creator opens My Registrations', () => {
  cy.login(userUnitDeleteRegistrations);
  cy.openMyRegistrations();
});
When('they click Delete on an item', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains(${firstTitle})`)
    .first()
    .parent()
    .within(() => {
      cy.get('[data-testid^=delete-registration]').click();
    });
});
When('they see a confirmation pop-up is opened', () => {
  cy.get('[data-testid=confirm-delete-dialog]').should('be.visible');
});
When('they select Yes', () => {
  cy.get('[data-testid=accept-button]').click();
  cy.get('[data-testid=accept-button]').should('not.exist');
  cy.wait(3000);
  cy.reload();
});
Then('they see that the Registration is deleted', () => {
  cy.get('a').filter(`:contains(${firstTitle})`).should('not.exist');
});

// Scenario: Creator deletes all Draft Registrations
When('they select "Delete all drafts"', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
  cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox)
    .parent()
    .parent()
    .parent()
    .within(() => {
      cy.get('button').click();
    });
});
When('they confirm that they want to Delete all drafts', () => {
  cy.get('[data-testid=accept-button]').click();
  cy.get('[data-testid=accept-button]').should('not.exist');
  cy.reload();
});
Then('all Draft Registration are deleted', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 0);
});
