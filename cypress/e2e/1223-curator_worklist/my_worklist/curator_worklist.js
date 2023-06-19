import { Before } from "cypress-cucumber-preprocessor/steps";
import { userCurator, userCuratorWithAuthor } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

const requestTypes = {
    'Approval': 'Publishing Request',
    'Support': 'Support',
    'DOI': 'DOI Request',
}

Before(() => {
    cy.login(userCurator);
});

//   Scenario: Curator opens their Worklist
When('the Curator opens their Worklist', () => {
    cy.getDataTestId(dataTestId.header.tasksLink).click();
});
Then('the Curator see that the Worklist is Scoped', () => {
    cy.contains('Limited to: "BIBSYS"')
 });
And('the Worklist contains Requests of type:', (dataTable) => {
    const messageTypes = {
        'Approval': 'Publishing Requests',
        'Support': 'Support Requests',
        'DOI': 'DoiRequests',
    }
    dataTable.rawTable.forEach(value => {
        cy.filterMessages(messageTypes[value[0]]),
        cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
    })
});
    // | Approval |
    // | Support |
    // | DOI |
    // | Ownership |
