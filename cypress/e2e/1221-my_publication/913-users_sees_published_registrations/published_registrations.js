// Feature: User sees published Registrations

import { userPublishedRegistration } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

// Scenario: User sees published Registrations
Given('Creator opens the page My Registrations', () => {
    cy.login(userPublishedRegistration);
    cy.get(`[data-testid=${dataTestId.header.myPageLink}]`).click();
    cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsLink}]`).click();
})
When('they click Published Registrations in the navigation bar', () => {
    cy.get(`[data-testid=published-button]`).click();
})
Then('they see a list of all published Registrations with the fields', (dataTable) => {
    cy.get(`[data-testid^=registration-title]`).should('exist');
    cy.get(`[data-testid^=registration-title]`).forEach(registration => {
        cy.log(registration);
        dataTable.rawTable.forEach((value) => {

        })
    });
})
// | Title   |
// | Status  |
// | Created |
And('they see list items with Status', () => { })
// | Deleted   |
// | Published |
And('they see each list item has buttons', () => { })
// | Show   |
// | Edit   |
// | Delete |
And('the they see the Edit button is enabled', () => { })
And('the Delete button is enabled for Registrations not marked as Deleted', () => { })
And('they see the navigation bar for Unpublished Registrations is enabled', () => { })
And('they see the navigation bar for Published Registrations is selected', () => { })
