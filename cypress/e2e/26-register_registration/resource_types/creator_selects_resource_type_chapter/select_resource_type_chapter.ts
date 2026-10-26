import { CategoryTypes, userUnitResourceTypeChapter } from '../../../../support/constants';
import { chapterContainerField, chapterFields, chapterSubtypes } from '../../../../support/data_testid_constants';
import { Before, Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import { dataTestId } from '../../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
// import { chapterSubtypes } from

// Feature: Creator selects Resource type Chapter

const anthology = 'Test Anthology ' + uuid();

BeforeAll(() => {
  cy.login(userUnitResourceTypeChapter);
  cy.createPublishedRegistration(anthology, CategoryTypes.BOOK_ANTHOLOGY);
});

Before(() => {
  cy.login(userUnitResourceTypeChapter);
  cy.startWizardWithEmptyRegistration();
});

// Common steps
Given('Creator navigates to the Resource Type tab and selects Resource type Chapter', () => {
  navigateToResourceTab();
});
When('they select the Resource Subtype {string}', (chapterType: string) => {
  cy.getDataTestId(chapterSubtypes[chapterType]).click();
  cy.wrap(chapterType).as('chapterType');
});
// end common steps

const navigateToResourceTab = () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
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
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField)
      .parent()
      .within(() => {
        if (chapterType.toString() === 'Academic chapter') {
          cy.contains(
            'The anthology where the chapter is published, must be registered and made public in NVA before you can register the chapter'
          ).should('be.visible');
        } else if (chapterType.toString() === 'Chapter in report') {
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
  cy.getDataTestId(chapterContainerField[containerField]);
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
When ('they select the Resource Subtype Chapter', () => {});
Then('they see Content type field with options:', (dataTable: DataTable) => {
  dataTable.raw().forEach((row) => {
    const subtype = row[0];
    cy.getDataTestId(chapterSubtypes[subtype]);
  });
});
// | Academic Chapter           |
// | Non-fiction Chapter        |
// | Popular Science Chapter    |
// | Textbook Chapter           |
// | Encyclopedia Chapter       |
// | Introduction               |
// | Exhibition Catalog Chapter |
// | Chapter in report          |
// | Conference abstract        |

// Scenario: Creator selects Resource subtype "Chapter in Anthology" and Content type "Academic chapter"
Given('Creator sees fields for Resource subtype Chapter', () => {
  navigateToResourceTab();
});
When('they select Content type "Academic chapter"', () => {
  cy.getDataTestId(chapterSubtypes['Academic chapter']).click();
});
Then('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(anthology);
  cy.contains(anthology).first().click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.nviSuccess).should('be.visible');
});
