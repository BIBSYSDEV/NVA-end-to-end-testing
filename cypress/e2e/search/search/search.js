//  Feature: Scenarios for search

import { dataTestId } from "../../../support/dataTestIds"

const visitStartPage = () => {
    cy.setLocalStorage('i18nextLng', 'eng');
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
    const pad = (value) => `0${value}`.slice(-2);
    const date = new Date();
    const dateValue = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`
    const values = {
        'Resource Type': 'Academic article',
        'Publication date': '12/31/2020',
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
Given('a User searches for Registrations', () => {
    visitStartPage()
    cy.getDataTestId(dataTestId.startPage.searchField).type('search result{enter}');
})
When('they select the facet for {string}:', (facet) => {
    const facets = {
        'Resource type': dataTestId.startPage.typeFacets,
        'Institution': dataTestId.startPage.institutionFacets,
    }
    cy.wrap(facet).as('facet');
    cy.getDataTestId(facets[facet]).within(() => {
        cy.get('[data-testid^=facet-item] > div').first().click();
    });
})
//  | Resource type |
//  | Institution |
Then('they see Registrations filtered with the chosen facet', () => {
    cy.get('@facet').then((facet) => {
        const resultCount = {
            'Resource type': 2,
            'Institution': 3,
        }
        cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', resultCount[facet]);
    })
})

//      Scenario: A user adds a filter to search results
Given('a User searches for Registrations', () => { })
When('they select the option to add a filter', () => {
    cy.getDataTestId(dataTestId.startPage.advancedSearch.addFilterButton).click();
})
Then('they they can add filter for fields:', (dataTable) => {
    const fieldValues = {
        'Title': 'entityDescription.mainTitle',
        'Abstract': 'entityDescription.abstract',
        'Keywords': 'entityDescription.tags',
        'Contributor': 'entityDescription.contributors.identity.name',
        'Publication Year': 'entityDescription.publicationDate.year',

    }
    cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedFieldSelect).click();
    dataTable.rawTable.forEach((value) => {
        cy.get(`[data-value="${fieldValues[value[0]]}"]`);
    })
    cy.contains('Title').click();
})
//  | Title |
//  | Abstract |
//  | Keywords |
//  | Contributor |
//  | Publication Year |
And('they can use the operators:', (dataTable) => {
    cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedOperatorSelect).click();
    dataTable.rawTable.forEach(value => {
        cy.contains(value[0]);
    })
})
//  | Contains |
//  | Does not contain |

// Scenario: A User filters a search result
Given('a User searches for Registrations', () => { })
And('they add a filter to the search', () => {
    cy.getDataTestId(dataTestId.startPage.advancedSearch.addFilterButton).click();
    cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedFieldSelect).click();
    cy.get('[data-value="entityDescription.mainTitle"]').click();
    cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedValueField).type('anthology');
})
When('they invoke the filter', () => {
    cy.getDataTestId(dataTestId.startPage.advancedSearch.searchButton).last().click();
})
Then('they see a search result list with filtered search results', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 2);
})



