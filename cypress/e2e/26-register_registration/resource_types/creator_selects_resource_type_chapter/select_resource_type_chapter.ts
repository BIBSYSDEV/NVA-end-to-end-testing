import { userUnitResourceTypeChapter } from '../../../../support/constants';
import { chapterContainerField, chapterFields, chapterSubtypes } from '../../../../support/data_testid_constants';
import { Before, Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { dataTestId } from '../../../../support/dataTestIds';
// import { chapterSubtypes } from

// Feature: Creator selects Resource type Chapter

Before(() => {
  cy.login(userUnitResourceTypeChapter);
  cy.startWizardWithEmptyRegistration();
});

// Common steps
Given('Creator navigates to the Resource Type tab and selects Resource type "Chapter"', () => {
  navigateToResourceTab();
});
When('they select the Resource Subtype {string}', (chapterType: string) => {
  cy.get(`[data-testid=${chapterSubtypes[chapterType]}]`).click();
  cy.wrap(chapterType).as('chapterType');
});
// end common steps

const navigateToResourceTab = () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
};

// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Chapter"
// TODO missing subtypes
Given('Creator navigates to Resource Type tab', () => {
  navigateToResourceTab();
});
When('they select the Resource type "Chapter"', () => {});
Then('they see a list of subtypes:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, chapterSubtypes);
});
// | Chapter of Anthology               |
// | Conference abstract                |

// Scenario Outline: Creator sees fields for Chapter subtypes
Then('they see an information box describing that a Container report must be published first', () => {
  cy.get('@chapterType').then((chapterType) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.partOfField}]`)
      .parent()
      .within(() => {
        if (chapterType.toString() === 'Chapter in Anthology') {
          cy.contains(
            'The anthology where the chapter is published, must be registered and made public in NVA before you can register the chapter'
          ).should('be.visible');
        } else if (chapterType.toString() === 'Chapter in Report') {
          cy.contains('The report where the chapter is published must be published first').should('be.visible');
        } else if (chapterType.toString() === 'Conference abstract') {
          cy.contains('The abstract collection where the abstract is published must be published first').should(
            'be.visible'
          );
        }
      });
  });
});
Then('they see a field {string}', (containerField: string) => {
  cy.get(`[data-testid=${chapterContainerField[containerField]}]`);
});
Then('they see fields:', (dataTable: DataTable) => {
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
Then('they see Content type field with options:', (dataTable: DataTable) => {
  // cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).click();
  // dataTable.raw().forEach((value) => {
  //   cy.get(`[data-testid=${chapterContentTypes[value[0]]}]`);
  // });
});
// | Academic Chapter           |
// | Non-fiction Chapter        |
// | Popular Science Chapter    |
// | Textbook Chapter           |
// | Encyclopedia Chapter       |

// Scenario: Creator selects Resource subtype "Chapter in Anthology" and Content type "Academic chapter"
Given('Creator sees fields for Resource subtype "Chapter in Anthology"', () => {
  navigateToResourceTab();
  cy.get(`[data-testid=${chapterSubtypes['Chapter in Anthology']}]`).click();
});
When('they select Content type "Academic chapter"', () => {
  // cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).click();
  // cy.get(`[data-testid=${chapterContentTypes['Academic Chapter']}]`).click();
});
Then('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.partOfField}]`).type('Antologi');
  cy.contains('Antologi').first().click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.nviFailed}]`).should('be.visible');
});
