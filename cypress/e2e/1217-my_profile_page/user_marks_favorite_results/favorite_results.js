// Feature: User marks results as favorites

import { userFavorite, userFavorite1, userFavorite2 } from "../../../support/constants"
import { dataTestId } from "../../../support/dataTestIds";

const navigateToMyProfile = () => {
    cy.getDataTestId(dataTestId.header.myPageLink).click();
    cy.getDataTestId(dataTestId.myPage.myProfileAccordion).click();
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

// Scenario: User sees own results on their User profile
Given('a user sees their User profile', () => {
    cy.login(userFavorite);
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
    cy.login(userFavorite1);
    navigateToMyProfile();
    cy.getDataTestId(dataTestId.myPage.myResultsLink).click();
    clearFavoredResults();
});
When('they mark a result as a favorite', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(':contains("Favorite result 5")').parent().within(() => {
        cy.getDataTestId('edit-promoted-publication-button').click();
    });
});
Then('they see the result is marked as a favorite', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(':contains("Favorite result 5")').parent().within(() => {
        cy.getDataTestId('StarIcon');
    });
});
And('the favorite results are displayed at the top of the list of results', () => {
    cy.getDataTestId(dataTestId.myPage.myProfileLink).click();
    cy.getDataTestId(dataTestId.myPage.myResultsLink).click();
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().parent().within(() => {
        cy.contains('Favorite result 5');
        cy.getDataTestId('StarIcon');
    });
});

// Scenario: User unmarks a result as a favorite
Given('the User sees own results on their User profile', () => {
    cy.login(userFavorite2);
    navigateToMyProfile();
    cy.getDataTestId(dataTestId.myPage.myResultsLink).click();
    clearFavoredResults();
});
And('they have results marked as favorites', () => {
    cy.getDataTestId('edit-promoted-publication-button').each((markFavorite) => {
        cy.get(markFavorite).should('be.enabled').click();
    });
});
When('they unmark a favorite result', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(':contains("Favorite result 8")')
        .parent()
        .within(() => {
            cy.getDataTestId('StarIcon');
        });
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(':contains("Favorite result 8")')
        .parent()
        .within(() => {
            cy.getDataTestId('edit-promoted-publication-button').click();
        });
});
Then('the result is not marked as favorite', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(':contains("Favorite result 8")')
        .parent()
        .within(() => {
            cy.getDataTestId('StarOutlineIcon');
        });
});
And('the result is not displayed at the top of the list of results', () => {
    cy.getDataTestId(dataTestId.myPage.myProfileLink).click();
    cy.getDataTestId(dataTestId.myPage.myResultsLink).click();
    cy.getDataTestId(dataTestId.startPage.searchResultItem)
        .last()
        .parent()
        .within(() => {
            cy.contains('Favorite result 8');
        });
});
