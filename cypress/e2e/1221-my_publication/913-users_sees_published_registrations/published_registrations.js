// Feature: User sees published Registrations

import { userPublishedRegistration } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { myRegistrations, myRegistrationsButtons } from '../../../support/data_testid_constants';

// Scenario: User sees published Registrations
Given('Creator opens the page My Registrations', () => {
  cy.login(userPublishedRegistration);
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
});
When('they click Published Registrations in the navigation bar', () => {
  cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).click();
  cy.getDataTestId(dataTestId.myPage.myRegistrationsUnpublishedCheckbox).click();
});
Then('they see a list of all published Registrations with the fields', (dataTable) => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('exist');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).each((registration) => {
    cy.get(registration).within(() => {
      cy.get('p > a').should('exist');
    });
  });
});
// | Title   |
// | Status  |
// | Created |
And('they see list items with Status', (dataTable) => {});
// | Deleted   |
// | Published |
And('they see each list item has buttons', (dataTable) => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).each((registration) => {
    cy.get(registration)
      .parent()
      .within(() => {
        dataTable.rawTable.forEach((value) => {
          cy.get(myRegistrationsButtons[value[0]]);
        });
      });
  });
});
// | Show   |
// | Edit   |
// | Delete |
And('the they see the Edit button is enabled', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).each((registration) => {
    cy.get(registration)
      .parent()
      .within(() => {
        cy.get(myRegistrationsButtons['Edit']).first().should('not.be.disabled');
      });
  });
});
And('the Delete button is enabled for Registrations not marked as Deleted', () => {});
And('they see the navigation bar for Unpublished Registrations is enabled', () => {
  cy.getDataTestId(dataTestId.myPage.myRegistrationsUnpublishedCheckbox).should('exist');
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsUnpublishedCheckbox}] .Mui-checked`).should('not.exist');
});
And('they see the navigation bar for Published Registrations is selected', () => {
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsPublishedCheckbox}] .Mui-checked`).should('exist');
});
