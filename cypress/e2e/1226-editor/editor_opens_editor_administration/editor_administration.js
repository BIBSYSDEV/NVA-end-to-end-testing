import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userEditor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Editor opens Editor Administration

//     In order to inform about the institution's configurations
//     As an Editor
//     I want to see institution names, codes, and institutional author


const information = {
  "Institution's short name": "Institution short name",
  "Institution's ROR": 'Research Organization Registry (ROR)',
  "Institution's author intentity": "The institution's code",
};

const menuItems = {
  'Institutions configuration': dataTestId.editor.institutionsNameLinkButton,
  'Vocabulary settings': dataTestId.editor.vocabularyLinkButton,
  'Publishing strategi': dataTestId.editor.publishStrategyLinkButton,
  'DOI configurasjon': dataTestId.editor.doiLinkButton,
  // #        | change owner of registration |
  // #        | Sletting av publikasjoner    |
  'NVI-rapportering': '',
  // #        | Lisenser og filer            |
};

//     Background:
Given('a logged in Editor', () => {
  cy.login(userEditor);
});

// Scenario: Editor opens institutions configuration
When("the Editor opens the institution's configuration menu item", () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
});
Then('the Editor sees one or many registered official names in Bokmål, English, Nynorsk or Northern Sámi', () => {
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.institutionsNameLinkButton).click();
  cy.contains("The institution's Norwegian name");
  cy.contains("The institution's English name");
});
And('they see all of', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.contains(information[value[0]]);
  });
});
// | Institution's short name       |
// | Institution's ROR              |
// | Institution's author intentity |
And('they may also see', () => { });
// | Institution's Feide domain     |
And('the Editor sees a menu with following options', (dataTable) => {
  dataTable.rawTable.forEach((menuItem) => {
    if(menuItem[0] !== "Curator's responsibility") {
      cy.getDataTestId(menuItems[menuItem[0]]);
    }
  });
  cy.getDataTestId(dataTestId.editor.areaOfResponsibilityLinkButton)
  cy.getDataTestId(dataTestId.editor.overviewAccordion).click();
});
//         | Institutions configuration |
//         | Vocabulary settings        |
//         | Publishing strategi        |
//         | DOI configurasjon          |
//         | Curator's responsibility   |
// #        | change owner of registration |
// #        | Sletting av publikasjoner    |
//         | NVI-rapportering           |
// #        | Lisenser og filer            |
And('"Institutions configuration" is the active choice', () => {
  cy.getDataTestId(menuItems['Institutions configuration']).should('have.class', 'MuiButton-containedPrimary');
});
