import { Before } from "cypress-cucumber-preprocessor/steps";
import { userCurator, userCuratorWithAuthor } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

const messageTypes = {
    'Approval': 'Publishing Requests',
    'Support': 'Support Requests',
    'DOI': 'DoiRequests',
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
    dataTable.rawTable.forEach(value => {
        cy.filterMessages(messageTypes[value[0]]),
        cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
    })
});
    // | Approval |
    // | Support |
    // | DOI |
    // | Ownership |

    // Scenario Outline: Curator views all Requests of a type
    When ('Curator clicks on Requests of type {string}', (type) => {
        cy.getDataTestId(dataTestId.header.tasksLink).click();
        cy.filterMessages(messageTypes[type])
        cy.wrap(type).as('type');
    })
    Then ('Curator see a list of Requests displayed with:', (dataTable) => {
        cy.getDataTestId(dataTestId.startPage.searchResultItem).each((message) => {
            
        })
    })
    //   | Request status            |
    //   | Registration title        |
    //   | Submitter name            |
    //   | Request Submitter Date    |
    //   | Beginning of last message |
    //   | Owner name                |
    And ('they see that each Request can be opened', () => {})
    // Examples:
    //   | Type      |
    //   | Approval  |
    //   | Support   |
    //   | DOI       |
