// Feature: NVI workflow

import { dataTestId } from "../../../support/dataTestIds";
import { userNviCurator } from "../../../support/constants";

// Scenario Outline: Publication NVI status - contributor
Given('a Curator views the NVI-tasklist', () => {
    cy.login(userNviCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
});
When('a Publication is a {string}', (category) => {
    cy.wrap(category).as('category');
});
And('the Publication has status {string}', (publicationStatus) => {
    cy.wrap(publicationStatus).as('publicationStatus');
});
And('the Publication is collaborating with {string}', (isCollaboration) => {
    cy.wrap(isCollaboration).as('isCollaboration');
});
And('the Publication is {string}', (typeOfRegistration) => {
    cy.wrap(typeOfRegistration).as('typeOfRegistration');
});
Then('the Publication has NVI status {string}', (isNviPublication) => {
    cy.get('@category').then((category) => {
        cy.get('@publicationStatus').then((publicationStatus) => {
            cy.get('@isCollaboration').then((isCollaboration) => {
                cy.get('@typeOfRegistration').then((typeOfRegistration) => {
                    const title = `${typeOfRegistration} ${category} ${publicationStatus} ${isCollaboration}`;
                    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
                    if (isNviPublication === 'NVI Publication') {
                        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`);
                    } else {
                        cy.getDataTestId(dataTestId.startPage.searchResultItem).should('not.exist');
                    }
                });
            });
        });
    });
});

// Examples:
// | Category           | PublicationStatus | IsCollaboration      | TypeOfRegistration  | IsNviPublication    |
// | Scientific Article | Published         | No one               | Manual Registration | NVI Publication     |
// | Scientific Article | Published         | No one               | Import              | NVI Publication     |
// | Scientific Article | Draft             | No one               | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | No one               | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | No one               | Import              | Not NVI Publication |
// | Scientific Article | Published         | NVI-insitution       | Manual Registration | NVI Publication     |
// | Scientific Article | Published         | NVI-insitution       | Import              | NVI Publication     |
// | Scientific Article | Draft             | NVI-insitution       | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | NVI-insitution       | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | NVI-insitution       | Import              | Not NVI Publication |
// | Scientific Article | Published         | NVA-insitution       | Manual Registration | NVI Publication     |
// | Scientific Article | Published         | NVA-insitution       | Import              | NVI Publication     |
// | Scientific Article | Draft             | NVA-insitution       | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | NVA-insitution       | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | NVA-insitution       | Import              | Not NVI Publication |
// | Scientific Article | Published         | external institution | Manual Registration | NVI Publication     |
// | Scientific Article | Published         | external institution | Import              | NVI Publication     |
// | Scientific Article | Draft             | external institution | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | external institution | Manual Registration | Not NVI Publication |
// | Scientific Article | Unpublished       | external institution | Import              | Not NVI Publication |
