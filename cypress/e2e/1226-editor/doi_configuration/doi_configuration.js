import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userEditor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Editor sees DOI configuration

//     In order to inform about the institution's DOI configurations
//     As an Editor
//     I want to see information about my institutions DOI configuration


const doiInformation = {
  'DataCite Member ID': {
    'title': 'Data Cite Repository ID',
    'value': 'NVATEST.UNIT',
  },
  'Institutions DOI prefix': {
    'title': 'DOI prefix',
    'value': '10.15157',
  },
};

//     Background:
Given('a logged in Editor', () => {
  cy.login(userEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
})

// Scenario: Editor opens institutions DOI configuration
Given("the Institution don't have an DOI configuration", () => { });
When("the Editor opens the institution's DOI configuration menu item", () => {
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.doiLinkButton).click();
});
Then('the Editor sees a link to Sikt to order DOI service', () => { });
And('some other text informing about the DOI service', () => { });

// Scenario: Editor opens institutions DOI configuration
Given('the Institution has an DOI configuration', () => { });
When("the Editor opens the institution's DOI configuration menu item", () => { });
Then('the Editor sees following information', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.contains(doiInformation[value[0]].title);
    cy.contains(doiInformation[value[0]].value, { matchCase: false });
  });
});
// | DataCite Member ID |
// | Institutions DOI prefix |
And('some other text informing about the DOI service', () => {
  cy.contains('Digital Object Identifier (DOI) is a persistent identifier.');
});
