//  Feature: Scenarios for search

import { CategoryTypes, userBIBSYSPublishRegistration, userUnitWithAuthor, userUnitWithAuthor1 } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';

const visitStartPage = () => {
  cy.setLocalStorage('i18nextLng', 'eng');
  cy.visit('/', {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
  cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
};

const searchUuid = uuid();
const journalUuid = uuid();
const searchResultJournal = `Search result - Journal ${searchUuid} ${journalUuid}`;
const conferenceAbstractUuid = uuid();
const searchResultConferenceAbstract = `Search result - Conference abstract ${searchUuid} ${conferenceAbstractUuid}`;
const anthologyUuid = uuid();
const searchResultAnthology = `Search result - Anthology ${searchUuid} ${anthologyUuid}`;

const initData = () => {
  cy.login(userUnitWithAuthor);
  cy.createPublishedRegistration(searchResultJournal);
  cy.login(userUnitWithAuthor1);
  cy.createPublishedRegistration(searchResultConferenceAbstract);
  cy.login(userBIBSYSPublishRegistration);
  cy.createPublishedRegistration(searchResultAnthology, CategoryTypes.BOOK_ANTHOLOGY);
  cy.getDataTestId(dataTestId.header.menuButton).click();
  cy.clearAllLocalStorage();
  cy.clearAllCookies();
  cy.reload();
};

BeforeAll(() => initData());

//      Scenario: An anonymous User opens start page and sees search results
Given('an anonymous User', () => {});
When('they open the start page', () => {
  cy.visit('/', {
    auth: {
      username: 'osteloff',
      password: 'osteloff',
    },
  });
  cy.getDataTestId(dataTestId.frontPage.registrationsLink).click();
  cy.getDataTestId(dataTestId.frontPage.searchInputField).should('be.visible');
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
});
Then('they see a list of Registratons', () => {
  cy.getDataTestId('search-results');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
});

//      Scenario: A User sees search results
Given('a User has searched for Registrations', () => {
  visitStartPage();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${journalUuid}{enter}`);
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
    'Title': searchUuid,
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
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${searchUuid}{enter}`);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('be.visible');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().should('contain.text', searchUuid);
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
