//  Feature: Scenarios for search

import { userPublishRegistration, userWithAuthor, userWithAuthor1 } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const visitStartPage = () => {
  cy.setLocalStorage('i18nextLng', 'eng');
  cy.visit('/', {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
};

let init = true;

const createSearchResults = () => {
  if (init) {
    cy.login(userWithAuthor);
    cy.createPublishedRegistration(`Search result - Journal ${uuid()}`);
    cy.login(userWithAuthor1);
    cy.createPublishedRegistration(`Search result - Conference abstract ${uuid()}`);
    cy.login(userPublishRegistration);
    cy.createPublishedRegistration(`Search result - Anthology ${uuid()}`, 'BookAnthology');
    cy.getDataTestId(dataTestId.header.menuButton).click();
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
    cy.reload();
    init = false;
  }
};

//      Scenario: An anonymous Aser opens start page and sees search results
Given('an anonymous User', () => {
  createSearchResults();
});
When('they open the start page', () => {
  cy.getDataTestId('logo').click({ force: true });
  cy.wait(3000);
  cy.getDataTestId(dataTestId.startPage.searchField).should('be.visible');
});
Then('they see a list of Registratons', () => {
  cy.getDataTestId('search-results');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
});

//      Scenario: A User sees search results
Given('a User has searched for Registrations', () => {
  visitStartPage();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type('search result journal{enter}');
});
When('they see the search result list', () => {
  cy.getDataTestId('search-results');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
});
Then('they can see values for:', (dataTable: DataTable) => {
  const pad = (value: number) => `0${value}`.slice(-2);
  const date = new Date();
  const dateValue = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;

  const values = {
    'Resource Type': 'Academic article',
    'Publication date': dateValue,
    'Title': 'Search result',
    'Contributors': 'Withauthor TestUser',
    'Abstract': 'Abstract',
  };
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .first()
    .within(() => {
      dataTable.raw().forEach((value) => {
        cy.contains(values[value[0]], { matchCase: false });
      });
    });
});
//  | Resource Type |
//  | Publication date |
//  | Title |
//  | Contributors |
//  | Abstract |

//      Scenario: A User select a search result
When('they select one of the Registrations', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .first()
    .within(() => {
      cy.get('p > a').first().click();
    });
});
Then('they see the landing page for the Registration', () => {
  cy.location('pathname').should('contain', 'registration');
  cy.location('pathname').should('not.contain', 'edit');
});

//      Scenario: A User uses facets to filter search results
Given('a User searches for Registrations', () => {
  visitStartPage();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type('search result{enter}');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('be.visible');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().should('contain.text', 'Search result');
});
When('they select the facet for {string}:', (facet: string) => {
  const facets = {
    'Resource type': dataTestId.aggregations.typeFacets,
    'Institution': dataTestId.aggregations.institutionFacets,
    'Contributor': dataTestId.aggregations.contributorFacets,
  };
  cy.wrap(facet).as('facet');
  cy.getDataTestId(facets[facet]).within(() => {
    cy.get('[data-testid^=facet-item] > div').first().click();
  });
});
//  | Resource type |
//  | Institution   |
//  | Contributor   |
Then('they see Registrations filtered with the chosen facet', () => {
  cy.get('@facet').then((facet) => {
    const resultCount = {
      'Resource type': 2,
      'Institution': 2,
      'Contributor': 1,
    };
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', resultCount[facet.toString()]);
  });
});

//      Scenario: A user adds a filter to search results
When('they select the option to add a filter', () => {
  cy.getDataTestId(dataTestId.startPage.advancedSearch.activateFilterButton).click();
});
Then('they they can add filter for fields:', (dataTable: DataTable) => {
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
  };
  cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedFieldSelect).click();
  dataTable.raw().forEach((value) => {
    cy.get(`[data-value="${fieldValues[value[0]]}"]`);
  });
  cy.contains('Title').click();
});
//  | Title |
//  | Abstract |
//  | Keywords |
//  | Contributor |
//  | Publication Year |
Then('they can use the operators:', (dataTable: DataTable) => {
  // cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedOperatorSelect).click();
  // dataTable.raw().forEach(value => {
  //     cy.contains(value[0]);
  // })
});
//  | Contains |
//  | Does not contain |

// Scenario: A User filters a search result
Given('they add a filter to the search', () => {
  cy.getDataTestId(dataTestId.startPage.advancedSearch.activateFilterButton).click();
  cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedFieldSelect).click();
  cy.get('[data-value="title"]').click();
  cy.getDataTestId(dataTestId.startPage.advancedSearch.advancedValueField).type('anthology');
});
When('they invoke the filter', () => {
  cy.getDataTestId(dataTestId.startPage.advancedSearch.searchButton).last().click();
});
Then('they see a search result list with filtered search results', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 1);
});
