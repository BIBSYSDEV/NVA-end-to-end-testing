import { Before } from "cypress-cucumber-preprocessor/steps";
import { userCurator } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

const requestTypes = {
    'Approval': 'Publishing Request',
    'Support': 'Support',
    'DOI': 'DOI Request',
}

Before(() => {
    cy.login(userCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
});

//   Scenario: Curator opens their Worklist
When('the Curator opens their Worklist', () => { });
Then('the Curator see that the Worklist is Scoped', () => { });
And('the Worklist contains Requests of type:', (dataTable) => {
    dataTable.rawTable.forEach(value => {
        cy.contains(requestTypes[value[0]]);
    })
});
    // | Approval |
    // | Support |
    // | DOI |
    // | Ownership |
