//  Feature: Scenarios for search

import { dataTestId } from "../../../support/dataTestIds"

const visitStartPage = () => {
    cy.visit('/', {
        auth: {
            username: Cypress.env('DEVUSER'),
            password: Cypress.env('DEVPASSWORD'),
        },
    })
}

//      Scenario: An anonymous Aser opens start page and sees search results
Given('an anonymous User', () => { })
When('they open the start page', () => {
    visitStartPage();
})
Then('they see a list of Registratons', () => {
    cy.getDataTestId('search-results');
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
})

//      Scenario: A User sees search results
Given('a User has searched for Registrations', () => {
    visitStartPage();
    cy.getDataTestId(dataTestId.startPage.searchField).type('search result{enter}');
})
When('they see the search result list', () => {
    cy.getDataTestId('search-results');
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
})
Then('they can see values for:', (dataTable) => {
    const date = new Date();
    const dateValue = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`
    const values = {
        'Resource Type': 'Vitenskapelig artikkel',
        'Publication date': dateValue,
        'Title': 'Search result',
        'Contributors': 'Publish registration TestUser',
        'Abstract': 'Abstract',
    }
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        dataTable.rawTable.forEach(value => {
            cy.contains(values[value[0]]);
        })
    })
})
//  | Resource Type |
//  | Publication date |
//  | Title |
//  | Contributors |
//  | Abstract |

//      Scenario: A User select a search result
Given('a User has searched for Registrations', () => {
    visitStartPage()
})
When('they select one of the Registrations', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        cy.get('p > a').first().click();
    })
})
Then('they see the landing page for the Registration', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.registrationSubtype).should('be.visible');
})

//      Scenario: A User uses facets to filter search results
Given('a User searches for Registrations', () => { })
When('they select the {string} for:', (facet) => { })
//  | Resource type |
//  | Institution |
Then('they see Registrations filtered with the chosen facet', () => { })

//      Scenario: A user adds a filter to search results
Given('a User searches for Registrations', () => {
    visitStartPage();
})
When('they select the option to add a filter', () => {
    cy.get('button').filter(':contains("Add filter")').click();
})
Then('they they can add filter for fields:', () => { })
//  | Title |
//  | Abstract |
//  | Keywords |
//  | Contributor |
//  | Publication Year |
And('they can use the operators:', () => { })
//  | Contains |
//  | Does not contain |


