// Feature: User marks results as favorites

import { Before } from "cypress-cucumber-preprocessor/steps";
import { userFavorite, userFavorite1, userFavorite2 } from "../../../support/constants"
import { dataTestId } from "../../../support/dataTestIds";

const navigateToMyProfile = () => {
    cy.login(user);
    cy.getDataTestId(dataTestId.header.myPageLink).click();
}

const clearFavoredResults = () => {
    cy.getDataTestId('search-results').then(($searchResults) => {
        const favoredResults = $searchResults.find('[data-testid=StarIcon]');
        if (favoredResults.length > 0) {
            cy.getDataTestId('edit-promoted-publication-button').each((icon) => {
                cy.get(icon).should('be.enabled').click();
            });
        }
    });
}

const secondFavoriteResultTitle = 'Favorite result 5';
const thirdFavoriteResultTitle = 'Favorite result 8';
let user = userFavorite;

Before({ tags: '@second' }, () => {
    user = userFavorite1;
})

Before({ tags: '@third' }, () => {
    user = userFavorite2;
})

// Scenario: User sees own results on their User profile
Given('a user sees their User profile', () => {
    navigateToMyProfile();
});
When('they view their results', () => {
    cy.getDataTestId(dataTestId.myPage.myResultsLink).click();
});
Then('they see all the results where they are registered as a Contributor', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length', 3);
});
And('they have an option to mark them as a favorite', () => {
    cy.getDataTestId('edit-promoted-publication-button').should('have.length', 3);
});

// Scenario: User marks a result as a favorite
Given('the User sees own results on their User profile', () => {
    navigateToMyProfile();
    cy.getDataTestId(dataTestId.myPage.myResultsLink).click();
    clearFavoredResults();
});
When('they mark a result as a favorite', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${secondFavoriteResultTitle}")`).parent().within(() => {
        cy.getDataTestId('edit-promoted-publication-button').click();
    });
});
Then('they see the result is marked as a favorite', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${secondFavoriteResultTitle}")`).parent().within(() => {
        cy.getDataTestId('StarIcon');
    });
});
And('the favorite results are displayed at the top of the list of results', () => {
    cy.reload();
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().parent().within(() => {
        cy.contains(secondFavoriteResultTitle);
        cy.getDataTestId('StarIcon');
    });
});

// Scenario: User unmarks a result as a favorite
Given('the User sees own results on their User profile', () => { });
And('they have results marked as favorites', () => {
    cy.getDataTestId('edit-promoted-publication-button').each((markFavorite) => {
        cy.get(markFavorite).should('be.enabled').click();
    });
});
When('they unmark a favorite result', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${thirdFavoriteResultTitle}")`)
        .parent()
        .within(() => {
            cy.getDataTestId('StarIcon');
        });
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${thirdFavoriteResultTitle}")`)
        .parent()
        .within(() => {
            cy.getDataTestId('edit-promoted-publication-button').click();
            cy.wait(3000)
        });
});
Then('the result is not marked as favorite', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${thirdFavoriteResultTitle}")`)
        .parent()
        .within(() => {
            cy.getDataTestId('StarOutlineIcon');
        });
});
And('the result is not displayed at the top of the list of results', () => {
    cy.reload();
    cy.getDataTestId(dataTestId.startPage.searchResultItem)
        .last()
        .parent()
        .within(() => {
            cy.contains(thirdFavoriteResultTitle);
        });
});

