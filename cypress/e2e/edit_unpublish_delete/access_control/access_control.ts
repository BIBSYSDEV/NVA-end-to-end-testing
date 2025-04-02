import { userCuratorDegree, userCuratorInstitution, userCuratorResourceOwner, userEditorDelete, userResourceOwner, userVerifiedContributor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { changeContributor } from '../../../support/create_registration';
import { Before, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Feature: Edit, unpublish or delete Registration

const users = {
    'verified contributor': userVerifiedContributor,
    'resource owner': userResourceOwner,
    'Curator (institution)': userCuratorInstitution,
    'Curator (resource owner)': userCuratorResourceOwner,
    'Editor': userEditorDelete,
    'Thesis Curator': userCuratorDegree,
};

const resourceOwnerName = 'Access Resource owner TestUser';
const verifiedContributorName = 'Access Verified contributor TestUser';


let titleRoot = '';

Before({ tags: '@edit' }, () => {
    titleRoot = 'Edit registration';
});

Before({ tags: '@unpublish' }, () => {
    titleRoot = 'Unpublish registration';
});

// Scenario Outline: User edits Registration
Given('{string} open landing page for Registration', (user: string) => {
    const title = `${titleRoot} ${user} ${uuid()}`;
    cy.login(userResourceOwner);
    cy.createPublishedRegistration(title);
    cy.wait(5000);
    if (user !== 'Resource Owner') {
        changeContributor(resourceOwnerName, verifiedContributorName);
    }
    cy.login(users[user]);
    cy.wrap(user).as('user');
});
When('they {string} and want to edit the Registration', (condition) => {
    cy.get('@user').then(user => {
        const registrationTitle = `Edit registration ${user}`;
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`);
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${registrationTitle}")`).first().within(() => {
            cy.get('a').first().click();
        });
    });
});
Then('they have an option to edit the Registration', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton);
});
Then('when they use the option to edit the Registration is opened in the Registration Wizard', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.location('pathname').should('contain', 'edit');
});
// Examples:
//     | User                         | Condition                                         |
//     | Verified Contributor         | are a Contributor on the Registration             |
//     | Resource Owner               | own the Registration                              |
//     | Curator Verified Contributor | are Curator for a Contributor on the Registration |
//     | Curator Resource Owner       | are Curator for Resource Owner                    |
//     | Editor                       | are Editor                                        |
//     | Thesis Curator               | are Curator for a Thesis Registration             |

// Scenario Outline: User unpublish Registration
When('they {string} and want to unpublish the Registration', (condition) => {
    cy.get('@user').then(user => {
        const title = `Unpublish registration ${user}`;
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${title}")`).first().within(() => {
            cy.get('a').first().click();
        });
    });
});
Then('they have an option to unpublish the Registration', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.morePublishingActionsButton).click();
});
Then('when they use the option to unpublish the Registration is no longer published', () => {
    cy.getDataTestId(dataTestId.unpublishActions.openUnpublishModalButton).click();
    cy.getDataTestId(dataTestId.unpublishActions.unpublishJustificationTextField).type('Unpublish justification');
    cy.getDataTestId(dataTestId.unpublishActions.confirmUnpublishCheckbox).click();
    cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
    cy.contains('The result is unpublished');
});
// Examples:
//     | User                     | Condition                                         |
//     | verified contributor     | are a Contributor on the Registration             |
//     | resource owner           | own the Registration                              |
//     | Curator (institution)    | are Curator for a Contributor on the Registration |
//     | Curator (resource owner) | are Curator for Resource Owner                    |
//     | Editor                   | are Editor                                        |
//     | Thesis Curator               | are Curator for a Thesis Registration             |
