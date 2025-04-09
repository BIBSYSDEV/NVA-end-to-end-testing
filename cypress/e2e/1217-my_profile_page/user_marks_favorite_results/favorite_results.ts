// Feature: User marks results as favorites

import { userFavorite, userFavorite1, userFavorite2 } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

const secondFavoriteResultTitle = 'Favorite result 5';
const thirdFavoriteResultTitle = 'Favorite result 8';
let user = userFavorite;

const navigateToMyProfile = () => {
  cy.login(user);
  cy.getDataTestId(dataTestId.header.myPageLink).click();
};

const createPublications = (user) => {
  const publicationTitleRoot = 'Favorite result';
  cy.login(userFavorite);
  cy.createPublishedRegistration(`${publicationTitleRoot} 1 ${uuid()}`);
  cy.createPublishedRegistration(`${publicationTitleRoot} 2 ${uuid()}`);
  cy.createPublishedRegistration(`${publicationTitleRoot} 3 ${uuid()}`);
  cy.login(userFavorite1);
  cy.createPublishedRegistration(`${publicationTitleRoot} 4 ${uuid()}`);
  cy.createPublishedRegistration(`${publicationTitleRoot} 5 ${uuid()}`);
  cy.createPublishedRegistration(`${publicationTitleRoot} 6 ${uuid()}`);
  cy.login(userFavorite2);
  cy.createPublishedRegistration(`${publicationTitleRoot} 7 ${uuid()}`);
  cy.createPublishedRegistration(`${publicationTitleRoot} 8 ${uuid()}`);
  cy.createPublishedRegistration(`${publicationTitleRoot} 9 ${uuid()}`);
};

const clearFavoredResults = () => {
  cy.getDataTestId('search-results').then(($searchResults) => {
    const favoredResults = $searchResults.find('[data-testid=remove-promoted-publication-button]');
    if (favoredResults.length > 0) {
      cy.getDataTestId('edit-promoted-publication-button').each((icon: any) => {
        cy.get(icon).should('be.enabled').click();
      });
    }
  });
};

Before({ tags: '@second' }, () => {
  user = userFavorite1;
});

Before({ tags: '@third' }, () => {
  user = userFavorite2;
});

// Scenario: User sees own results on their User profile
Given('a user sees their User profile', () => {
  createPublications(user);
  navigateToMyProfile();
});
When('they view their results', () => {
  cy.getDataTestId(dataTestId.myPage.myResultsLink).click();
});
Then('they see all the results where they are registered as a Contributor', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 3);
});
Then('they have an option to mark them as a favorite', () => {
  cy.getDataTestId('edit-promoted-publication-button').should('have.length', 3);
});

// Scenario: User marks a result as a favorite
Given('the User sees own results on their User profile', () => {
  navigateToMyProfile();
  cy.getDataTestId(dataTestId.myPage.myResultsLink).click();
  clearFavoredResults();
});
When('they mark a result as a favorite', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains("${secondFavoriteResultTitle}")`)
    .parent()
    .within(() => {
      cy.getDataTestId('edit-promoted-publication-button').click();
    });
});
Then('they see the result is marked as a favorite', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains("${secondFavoriteResultTitle}")`)
    .parent()
    .within(() => {
      cy.getDataTestId('remove-promoted-publication-button');
    });
});
Then('the favorite results are displayed at the top of the list of results', () => {
  cy.reload();
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .first()
    .parent()
    .within(() => {
      cy.contains(secondFavoriteResultTitle);
      cy.getDataTestId('remove-promoted-publication-button');
    });
});

// Scenario: User unmarks a result as a favorite
Given('they have results marked as favorites', () => {
  cy.getDataTestId('edit-promoted-publication-button').each((markFavorite: any) => {
    cy.get(markFavorite).should('be.enabled').click();
  });
});
When('they unmark a favorite result', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains("${thirdFavoriteResultTitle}")`)
    .parent()
    .within(() => {
      cy.getDataTestId('remove-promoted-publication-button');
    });
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains("${thirdFavoriteResultTitle}")`)
    .parent()
    .within(() => {
      cy.getDataTestId('edit-promoted-publication-button').click();
      cy.wait(3000);
    });
});
Then('the result is not marked as favorite', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .filter(`:contains("${thirdFavoriteResultTitle}")`)
    .parent()
    .within(() => {
      cy.getDataTestId('edit-promoted-publication-button');
    });
});
Then('the result is not displayed at the top of the list of results', () => {
  cy.reload();
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .last()
    .within(() => {
      cy.contains(thirdFavoriteResultTitle);
    });
});
