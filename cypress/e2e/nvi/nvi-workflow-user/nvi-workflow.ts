// Feature: NVI workflow

import { dataTestId } from "../../../support/dataTestIds";
import { userNviCuratorInstitutionA } from "../../../support/constants";
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Scenario Outline: Publication NVI status - user
Given('a Curator views the NVI-tasklist', () => {
    cy.login(userNviCuratorInstitutionA);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
});
When('a Publication is a {string}', (category) => {
    cy.wrap(category).as('category');
});
When('the Publication has status {string}', (publicationStatus) => {
    cy.wrap(publicationStatus).as('publicationStatus');
});
When('the Publication is collaborating with {string}', (isCollaboration) => {
    cy.wrap(isCollaboration).as('isCollaboration');
});
When('the Publication is {string}', (typeOfRegistration) => {
    cy.wrap(typeOfRegistration).as('typeOfRegistration');
});
Then('the Publication has NVI status {string}', (isNviPublication) => {
    cy.get('@category').then((category) => {
        cy.get('@publicationStatus').then((publicationStatus) => {
            cy.get('@isCollaboration').then((isCollaboration) => {
                cy.get('@typeOfRegistration').then((typeOfRegistration) => {
                    const title = `User ${typeOfRegistration} ${category} ${publicationStatus} ${isCollaboration}`;
                    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
                    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
                    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
                    if (isNviPublication === 'NVI Publication') {
                        cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).filter(`:contains(${title})`);
                    } else {
                        cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).should('not.exist');
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
