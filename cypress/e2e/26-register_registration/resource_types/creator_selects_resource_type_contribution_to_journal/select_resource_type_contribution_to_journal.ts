import { Before, Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import { CategoryTypes, userName, userUnitResourceTypeJournal } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { journalSubtypes, journalFields } from '../../../../support/data_testid_constants';
import { v4 as uuid } from 'uuid';
import { createPublicationUsingAPI, NviLevels } from '../../../../support/create_registration';

// Feature: Creator selects Resource type Contribution to journal

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';

const corrigendumTitle = `Test article corrigendum ${uuid()}`;
const originalPublication = `Original publication for corrigendum ${uuid()}`;

BeforeAll(() => {
  cy.login(userUnitResourceTypeJournal).then(() => {
    const user = userName[userUnitResourceTypeJournal];
    createPublicationUsingAPI(originalPublication, CategoryTypes.ACADEMIC_ARTICLE, user, NviLevels.LEVEL_0).then(
      (builder) => {
        createPublicationUsingAPI(corrigendumTitle, CategoryTypes.JOURNAL_CORRIGENDUM, user, NviLevels.LEVEL_0, null, builder.identifier).then(
          (builder) => {}
        );
      });
  });
});

Before(() => {
  cy.wrap('').as('subtype');
  cy.wrap(false).as('link');
});

// Common steps
When('they click the Save button', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});
When('they select the Resource type "Contribution to journal"', () => {});
When('they select Resource subtype Journal article', () => {
  cy.get(`[data-testid=resource-type-chip-${CategoryTypes.ACADEMIC_ARTICLE}]`).click();
});
When('they enter an invalid value in fields:', (dataTable: DataTable) => {
  dataTable.raw().forEach((field: string[]) => {
    cy.getDataTestId(journalFields[field[0]]).type('{selectall}{del}invalid');
  });
});

Then('they can see "Invalid format" error messages for fields:', (dataTable: DataTable) => {
  dataTable.raw().forEach((field) => {
    cy.getDataTestId(journalFields[field[0]]).within(() => {
      cy.get('input').focus().blur();
      cy.wrap(field).get('p').should('have.class', 'Mui-error');
    });
  });
});
Then('they see fields:', (dataTable: DataTable) => {
  const fields = { ...journalFields };
  cy.get('@subtype').then((subtype) => {
    if (subtype.toString() === 'Corrigendum') {
      fields['Search field for Journal'] = dataTestId.registrationWizard.resourceType.corrigendumForField;
    }
    cy.testDataTestidList(dataTable, fields);
  });
});
When('they select the Resource subtype "Corrigendum"', () => {
  cy.getDataTestId(journalSubtypes['Corrigendum']).click({ force: true });
  cy.get('@link').then((link) => {
    link && cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  });
});
// End common steps

// @274
// Scenario: Creator navigates to the Resource Type tab and see list of Journal types
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userUnitResourceTypeJournal).then(() => {
    cy.startWizardWithEmptyRegistration();
  });
});
When('they navigate to the Resource Type tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
Then('they can select Journal Resource types:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, journalSubtypes);
});
// | Journal article |
// | Feature article |
// | Comment         |
// | Book review     |
// | Leader          |
// | Corrigendum     |
// | Booklet         |

// @1656
// Scenario: Creator sees fields for Journal type
Given('Creator navigates to the Resource Type tab and see list of Journal types', () => {
  cy.login(userUnitResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
});
When('they select either of:', (dataTable: DataTable) => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
});

// Scenario: Creator sees that fields for Journal article are validated
Given('Creator sees fields for Journal type', () => {
  cy.login(userUnitResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
});
When('they enter numbers for "Pages from" and "Pages to"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.pagesFromField).type('10');
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.pagesToField).type('9');
});
When('the number for "Pages from" is greater than the number for "Pages to"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.pagesFromField).within(() => {
    cy.get('input').type('10');
  });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.pagesToField).within(() => {
    cy.get('input').type('9');
  });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable: DataTable) => {
  cy.get('[data-testid^=snackbar]').should('not.exist');
  const fields = { ...journalFields };
  cy.get('@subtype').then((subtype) => {
    if (subtype.toString() === 'Corrigendum') {
      fields['Search box for Journal'] = dataTestId.registrationWizard.resourceType.corrigendumForField;
    }
    dataTable.raw().forEach((field) => {
      cy.getDataTestId(fields[field[0]]).within(() => {
        cy.get('p').should('have.class', 'Mui-error');
        cy.get('p').should('have.class', 'Mui-required');
      });
    });
  });
});
Then('they can see error messages for fields "Pages from" and "Pages to"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.pagesFromField).within(() => {
    cy.get('p').should('have.class', 'Mui-error');
  });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.pagesToField).within(() => {
    cy.get('p').should('have.class', 'Mui-error');
  });
});

// @1625
// Scenario: Creator sees fields for Resource subtype "Corrigendum"
When('they select the Resource type "Corrigendum"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalCorrigendum')).click();
});
Then('they see a disabled field for Journal based on selected Journal article', () => {
  cy.get('[data-testid=corrigendum-for-field]').within(() => {
    cy.get('input').type(originalPublication);
  });
  cy.contains(originalPublication).click({ force: true });
  cy.get('[data-testid=journal-chip]').contains(originalPublication);
});

// Scenario: Creator sees that fields for Resource subtype "Corrigendum" are validated
Given('Creator sees fields for Resource subtype "Corrigendum"', () => {
  cy.login(userUnitResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('JournalCorrigendum')).click();
});

// Scenario: Creator sees extra fields for Norwegian Science Index (NVI) compatible Journal article
Given('Creator sees fields for Journal article', () => {
  cy.login(userUnitResourceTypeJournal);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(CategoryTypes.ACADEMIC_ARTICLE)).click({ force: true });
});
When('they select type to be {string}:', (type: string) => {
  const elements = [];
  type.split(' ').forEach((element) => {
    elements.push(element.charAt(0).toUpperCase() + element.slice(1));
  });
  const resourceType = elements.join('');
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(resourceType)).click();
  // cy.intercept('GET', '/publication-channels-v2/serial-publication?*', { fixture: 'channel_mock_serial.json' }).as(
  //   'serialChannel'
  // );
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('Chemical');
  cy.contains('ACS Chemical Biology').last().click();
});
Then('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.nviSuccess).should('be.visible');
});
// | Academic article           |
// | Academic literature review |
