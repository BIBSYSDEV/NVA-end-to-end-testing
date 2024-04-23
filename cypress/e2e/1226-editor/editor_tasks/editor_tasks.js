import { userEditor, userSecondEditor, userThirdEditor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

//     In order to see who is responsible for which parts of the institution
//     As an Editor
//     I want to see a list of all curators and there area of responsibility

//     In order to decide who is responsible for which parts of the institution
//     As an Editor
//     I want to manage which curators is responsible for which parts of the institution

//     Background:
Given('a logged in Editor', () => {
  cy.login(userEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
});

// Scenario: Editor views curators and area of responsibility
Given('the Institusion have Curators registered', () => { });
When("the Editor opens the institution's responsibility menu item", () => {
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.curatorsSettingsLinkButton).click();
});
Then('the Editor sees a list that contains', (dataTable) => {
  cy.getDataTestId(dataTestId.editor.editUserButton);
});
// | Curator's name                             |
// | Curator's ORCID symbol (if present)        |
// | Curator's affiliation                      |
// | Curator's area of responsibility           |
// | Option to add an area of responsibility    |
And('an option to add rights to edit thesis', () => { });

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

const information = {
  "Institution's short name": 'Institution short name',
  "Institution's ROR": 'Research Organization Registry (ROR)',
  "Institution's author intentity": "The institution's code",
};

const menuItems = {
  'Institution name': dataTestId.editor.institutionsNameLinkButton,
  'Vocabulary settings': dataTestId.editor.vocabularyLinkButton,
  'Publishing strategi': dataTestId.editor.publishStrategyLinkButton,
  'DOI configuration': dataTestId.editor.doiLinkButton,
  // #        | change owner of registration |
  // #        | Sletting av publikasjoner    |
  'NVI-rapportering': '',
  // #        | Lisenser og filer            |
};

// Scenario: Editor opens institutions configuration
When("the Editor opens the institution's configuration menu item", () => { });
Then('the Editor sees one or many registered official names in Bokmål, English, Nynorsk or Northern Sámi', () => {
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
And('they may also see', () => {
  cy.contains('Unique Feide ID');
});
// | Institution's Feide domain     |
And('the Editor sees a menu with following options', (dataTable) => {
  dataTable.rawTable.forEach((menuItem) => {
    if (menuItem[0] !== "Curator's responsibility") {
      cy.getDataTestId(menuItems[menuItem[0]]);
    }
  });
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
And('"Institution name" is the active choice', () => {
});

const publishStrategies = {
  'Registrator has full publishing rights': dataTestId.editor.workflowRegistratorPublishesAll,
  'Registrator can only publish metadata': dataTestId.editor.workflowRegistratorPublishesMetadata,
  'Only Curator can publish': dataTestId.editor.workflowRegistratorRequiresApproval,
};

Given('an Institution with one or more Editor roles', () => {
});

// Scenario: Default publishing rights
When('the Editor of an Institution hasn’t chosen a policy', () => {
  cy.login(userThirdEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
});
Then('the publications policy is:', () => {
  cy.getDataTestId(dataTestId.editor.workflowRegistratorPublishesAll).should('be.disabled');
});
// | Registrator has full publishing rights |

// Scenario: Editor defines publishing rights
Given('a Editor views the Editor page', () => {
  cy.login(userSecondEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
});
When('the Editor chooses {string}:', (strategy) => {
  cy.wrap(publishStrategies[strategy]).as('strategyButton');
  cy.getDataTestId(publishStrategies[strategy]).click({ force: true });
});
// | Registrator has full publishing rights |
// | Registrator can only publish metadata  |
// | Only Curator can publish               |
Then('the Institutions publications policy is changed accordingly', () => {
  cy.get('@strategyButton').then((button) => {
    cy.getDataTestId(button).should('be.disabled');
  });
});
And('the Editor is notified that a new policy is activated', () => {
  cy.get('@strategyButton').then((strategy) => {
    if (strategy !== publishStrategies[Object.keys(publishStrategies)[0]]) {
      cy.getDataTestId('snackbar-success');
    }
  });
  cy.wait(3000);
});

const vocabularies = {
  'HRCS Activity': 'hrcs-activity-button-group',
  'HRCS Category': 'hrcs-category-button-group',
};

const vocabularyStatus = {
  'Disabled': dataTestId.editor.vocabularyDisabled,
  'Allowed': dataTestId.editor.vocabularyAllowed,
  'Default': dataTestId.editor.vocabularyDefault,
};

// Scenario Outline: Editor sees fields for Vocabulary settings
Given('Editor opens Editor Administration', () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
});
And('they see Vocabulary settings', () => {
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.vocabularyLinkButton).click();
});
Then('they a list of Vocabularies:', (dataTable) => {
  dataTable.rawTable.forEach((vocabulary) => {
    cy.getDataTestId(vocabularies[vocabulary[0]]);
  });
});
//     | HRCS Activity |
//     | HRCS Category |
Then('they can set a Vocabulary to be one of:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    Object.values(vocabularies).forEach((vocabulary) => {
      cy.getDataTestId(vocabulary).within(() => {
        cy.getDataTestId(vocabularyStatus[value[0]]);
      });
    });
  });
});
// | Disabled |
// | Allowed  |
// | Default  |
