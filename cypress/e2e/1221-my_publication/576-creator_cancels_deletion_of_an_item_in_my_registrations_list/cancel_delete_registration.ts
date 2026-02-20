import { CategoryTypes, userName, userUnitCancelDelete } from '../../../support/constants';
import { createDraftPublicationUsingAPI, NviLevels } from '../../../support/create_registration';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';

// Feature: Creator cancels deletion of an item in My Registrations list

// @576
// Scenario: Creator cancels deletion of an item in My Registrations list
Given('that the user is logged in as Creator', () => {
  cy.login(userUnitCancelDelete).then(() => {
    const title = `Delete Registration ${uuid()}`;
    createDraftPublicationUsingAPI(
      title,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitCancelDelete],
      NviLevels.LEVEL_0
    ).then(() => {
      cy.wait(5000);
    });
  });
});
Given('is on the My Registrations page', () => {
  cy.openMyRegistrations();
});
When('they click Delete on an item', () => {
  cy.get('[data-testid^=delete-registration]').first().as('registration');
  cy.get('[data-testid^=delete-registration]').first().click({ force: true });
});
When('they click No in the confirmation dialog', () => {
  cy.getDataTestId(dataTestId.confirmDialog.cancelButton).click({ force: true });
});
Then('they see the Registration in My Registrations list', () => {
  cy.get('@registration').should('be.visible');
});
