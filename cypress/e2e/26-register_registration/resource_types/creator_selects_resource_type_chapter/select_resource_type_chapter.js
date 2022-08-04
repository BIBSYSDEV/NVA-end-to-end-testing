import { userResourceType } from '../../../../support/constants';
import {
  chapterContainerField,
  chapterContentTypes,
  chapterFields,
  chapterSubtypes,
} from '../../../../support/data_testid_constants';
import { Before } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from '../../../../support/dataTestIds';
// import { chapterSubtypes } from

// Feature: Creator selects Resource type Chapter

Before(() => {
  cy.login(userResourceType);
  cy.startWizardWithEmptyRegistration();
});

// Common steps
Given('Creator navigates to the Resource Type tab and selects Resource type "Chapter"', () => {
  navigateToResourceTab();
  selectChapter();
});
When('they select the Resource Subtype {string}', (chapterType) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${chapterSubtypes[chapterType]}]`).click();
});
// end common steps

const navigateToResourceTab = () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
};

const selectChapter = () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Chapter]').click({ force: true });
};

// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Chapter"
// TODO missing subtypes
Given('Creator navigates to Resource Type tab', () => {
  navigateToResourceTab();
});
When('they select the Resource type "Chapter"', () => {
  selectChapter();
});
Then('they see a list of subtypes:', (dataTable) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.testDataTestidList(dataTable, chapterSubtypes);
});
// | Chapter of Anthology               |
// | Conference abstract                |

// Scenario Outline: Creator sees fields for Chapter subtypes
Then('they see an information box describing that a Container report must be published first', () => {
  cy.contains('The anthology where this chapter is published in must be published in advance')
});
And('they see a field {string}', (containerField) => {
  cy.get(`[data-testid=${chapterContainerField[containerField]}]`);
});
And('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, chapterFields);
});
//     | DOI        |
//     | Pages from |
//     | Pages to   |
// Examples:
//     | ChapterType          | ContainerField                                |
//     | Chapter of Anthology | Search box for published Anthologies          |
//     | Conference abstract  | Search box for published Abstract collections |

// Scenario: Creator sees fields for Resource subtype "Chapter in Anthology"
Then('they see Content type field with options:', (dataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).click();
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${chapterContentTypes[value[0]]}]`);
  });
});
// | Academic Chapter           |
// | Non-fiction Chapter        |
// | Popular Science Chapter    |
// | Textbook Chapter           |
// | Encyclopedia Chapter       |

// Scenario: Creator selects Resource subtype "Chapter in Anthology" and Content type "Academic chapter"
Given('Creator sees fields for Resource subtype "Chapter in Anthology"', () => {
  navigateToResourceTab();
  selectChapter();
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${chapterSubtypes['Chapter in Anthology']}]`).click();
});
When('they select Content type "Academic chapter"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).click();
  cy.get(`[data-testid=${chapterContentTypes['Academic Chapter']}]`).click();
});
Then('they see fields:', (dataTable) => {
  cy.testDataTestidList(dataTable, chapterFields);
});
// | Peer reviewed and presents new research |
And('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.nviFailed}]`).should('be.visible');
});
