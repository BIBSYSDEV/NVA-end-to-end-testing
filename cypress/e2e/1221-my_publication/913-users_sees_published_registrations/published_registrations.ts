// Feature: User sees published Registrations

import { CategoryTypes, userName, userUnitPublishedRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { myRegistrationsButtons } from '../../../support/data_testid_constants';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { createPublicationUsingAPI, NviLevels } from '../../../support/create_registration';

// Scenario: User sees published Registrations
Given('Creator opens the page My Registrations', () => {
  cy.login(userUnitPublishedRegistration).then(() => {
    const title = `Published registration ${uuid()}`;
    cy.wrap(title).as('registrationTitle');
    createPublicationUsingAPI(title, CategoryTypes.ACADEMIC_ARTICLE, userName[userUnitPublishedRegistration], NviLevels.LEVEL_1);
    cy.getDataTestId(dataTestId.header.myPageLink).click();
    cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
  });
});
When('they click Published Registrations in the navigation bar', () => {
  cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
});
Then('they see a list of all published Registrations with the fields', (dataTable: DataTable) => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('exist');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).each((registration: any) => {
    cy.get(registration).within(() => {
      cy.get('p > a').should('exist');
    });
  });
  cy.get('@registrationTitle').then((title: unknown) => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem)
      .filter(`:contains("${title as string}")`)
      .should('exist');
  });
});
// | Title   |
// | Status  |
// | Created |
Then('they see list items with Status', (dataTable: DataTable) => {});
// | Deleted   |
// | Published |
Then('they see each list item has buttons', (dataTable: DataTable) => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).each((registration: any) => {
    cy.get(registration)
      .parent()
      .within(() => {
        dataTable.raw().forEach((value) => {
          cy.get(myRegistrationsButtons[value[0]]);
        });
      });
  });
});
// | Show   |
// | Edit   |
// | Delete |
Then('the they see the Edit button is enabled', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).each((registration: any) => {
    cy.get(registration)
      .parent()
      .within(() => {
        cy.get(myRegistrationsButtons['Edit']).first().should('not.be.disabled');
      });
  });
});
Then('the Delete button is enabled for Registrations not marked as Deleted', () => {});
Then('they see the navigation bar for Unpublished Registrations is enabled', () => {
  cy.getDataTestId(dataTestId.myPage.myRegistrationsUnpublishedCheckbox).should('exist');
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsUnpublishedCheckbox}] .Mui-checked`).should('not.exist');
});
Then('they see the navigation bar for Published Registrations is selected', () => {
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsPublishedCheckbox}] .Mui-checked`).should('exist');
});
