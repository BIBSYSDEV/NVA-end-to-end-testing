// Feature: User sees published Registrations

import { userPublishedRegistration } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";
import { myRegistrations, myRegistrationsButtons } from "../../../support/data_testid_constants";

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
    cy.get(`[data-testid^=registration-title]`).each(registration => {
        cy.get(registration).parent().within(() => {
            dataTable.rawTable.forEach((value) => {
                cy.get(`[data-testid^=${myRegistrations[value[0]]}]`);
            })
        })
    });
})
// | Title   |
// | Status  |
// | Created |
And('they see list items with Status', (dataTable) => {
    dataTable.rawTable.forEach(value => {
        cy.get(`[data-testid^=${myRegistrations['Status']}]`).filter(`:contains(${value[0]})`);
    })
})
// | Deleted   |
// | Published |
And('they see each list item has buttons', (dataTable) => {
    cy.get(`[data-testid^=registration-title]`).each(registration => {
        cy.get(registration).parent().within(() => {
            dataTable.rawTable.forEach((value) => {
                cy.get(`[data-testid^=${myRegistrationsButtons[value[0]]}]`);
            })
        })
    });
})
// | Show   |
// | Edit   |
// | Delete |
And('the they see the Edit button is enabled', () => {
    cy.get(`[data-testid^=registration-title]`).each(registration => {
        cy.get(registration).parent().within(() => {
            cy.get(`[data-testid^=${myRegistrationsButtons['Edit']}]`).first().should('not.be.disabled');
        })
    });
})
And('the Delete button is enabled for Registrations not marked as Deleted', () => { })
And('they see the navigation bar for Unpublished Registrations is enabled', () => {
    cy.get(`[data-testid=unpublished-button]`)
})
And('they see the navigation bar for Published Registrations is selected', () => {
    cy.get(`[data-testid=published-button]`)
})
