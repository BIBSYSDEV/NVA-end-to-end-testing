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
    const dateValue = `${date.getDate()}.${pad(date.getMonth() + 1)}.${pad(date.getFullYear())}`

    const values = {
        'Resource Type': 'Academic article',
        'Publication date': dateValue,
        'Title': 'Search result',
        'Contributors': 'PublishRegistration TestUser',
        'Abstract': 'abstract',
    }
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().within(() => {
        dataTable.rawTable.forEach(value => {
            cy.contains(values[value[0]], { matchCase: false });
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
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('be.visible');
})
When('they select the facet for {string}:', (facet) => {
    const facets = {
        'Resource type': dataTestId.startPage.typeFacets,
        'Institution': dataTestId.startPage.institutionFacets,
        'Contributor': dataTestId.startPage.contributorFacets,
    }
    cy.wrap(facet).as('facet');
    cy.getDataTestId(facets[facet]).within(() => {
        cy.get('[data-testid^=facet-item] > div').first().click();
    });
})
//  | Resource type |
//  | Institution   |
//  | Contributor   |
Then('they see Registrations filtered with the chosen facet', () => {
    cy.get('@facet').then((facet) => {
        const resultCount = {
            'Resource type': 2,
            'Institution': 3,
            'Contributor': 3,
        }
        cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', resultCount[facet]);
    })
})

//      Scenario: A user adds a filter to search results
Given('a User searches for Registrations', () => { })
When('they select the option to add a filter', () => {
    cy.getDataTestId(dataTestId.startPage.advancedSearch.activateFilterButton).click();
})
Then('they they can add filter for fields:', (dataTable) => {
    const fieldValues = {
        'Title': 'title',
        'Abstract': 'abstract',
        'Keywords': 'tags',
        'Contributor': 'contributorName',
        'ISBN': 'isbn',
        'ISSN': 'issn',
        'DOI': 'doi',
        'Handle': 'handle',
        'Funding': 'fundingIdentifier',
        'Course': 'course',
        'Cristin identifier': 'cristinIdentifier',
        'Identifier': 'id',
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
    // cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedOperatorSelect).click();
    // dataTable.rawTable.forEach(value => {
    //     cy.contains(value[0]);
    // })
})
//  | Contains |
//  | Does not contain |

// Scenario: A User filters a search result
Given('a User searches for Registrations', () => { })
And('they add a filter to the search', () => {
    cy.getDataTestId(dataTestId.startPage.advancedSearch.activateFilterButton).click();
    cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedFieldSelect).click();
    cy.get('[data-value="title"]').click();
    cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedValueField).type('anthology');
})
When('they invoke the filter', () => {
    cy.getDataTestId(dataTestId.startPage.advancedSearch.searchButton).last().click();
})
Then('they see a search result list with filtered search results', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 2);
})



