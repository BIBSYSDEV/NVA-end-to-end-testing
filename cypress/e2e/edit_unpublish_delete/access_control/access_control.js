import { userCuratorDegree, userCuratorInstitution, userCuratorResourceOwner, userEditorDelete, userFilesAndLicense, userResourceOwner, userVerifiedContributor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Edit, unpublish or delete Registration

const users = {
    'verified contributor': userVerifiedContributor,
    'resource owner': userResourceOwner,
    'Curator (institution)': userCuratorInstitution,
    'Curator (resource owner)': userCuratorResourceOwner,
    'Editor': userEditorDelete,
    'Thesis Curator': userCuratorDegree,
}


// Scenario Outline: User edits Registration
Given('{string} open landing page for Registration', (user) => {
    cy.login(users[user]);
    cy.wrap(user).as('user');
})
When('they {string}', (condition) => {
    cy.get('@user').then(user => {
        const title = `Edit registration ${user}`
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${title}")`).first().within(() => {
            cy.get('a').first().click();
        });
    })
})
Then('they have an option to edit the Registration', () => {
    cy.get('[data-testid=EditIcon]');
})
And('when they use the option to edit the Registration is opened in the Registration Wizard', () => {
    cy.get('[data-testid=EditIcon]').click();
    cy.location('pathname').should('contain', 'edit');
})
// Examples:
//     | User                         | Condition                                         |
//     | Verified Contributor         | are a Contributor on the Registration             |
//     | Resource Owner               | own the Registration                              |
//     | Curator Verified Contributor | are Curator for a Contributor on the Registration |
//     | Curator Resource Owner       | are Curator for Resource Owner                    |
//     | Editor                       | are Editor                                        |
//     | Thesis Curator               | are Curator for a Thesis Registration             |