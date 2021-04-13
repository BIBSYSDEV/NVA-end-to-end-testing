import { And } from 'cypress-cucumber-preprocessor/steps';
import {
  JOURNAL_FIELDS,
  REPORT_FIELDS,
  STUDENT_THESIS_FIELDS,
  CHAPTER_FIELDS,
  BOOK_FIELDS,
} from '../../../support/data_testid_constants';

And('they enter an invalid value in fields:', (dataTable) => {
  let scenario = '';
  if (window.testState.currentScenario.tags && window.testState.currentScenario.tags.length > 0) {
    scenario = window.testState.currentScenario.tags[0].name;
  } else {
    scenario = window.testState.currentScenario.name;
    if (scenario.includes('(example')) {
      scenario = scenario.substring(0, scenario.indexOf('(example')).trim();
    }
  }

  let fields = {};
  switch (scenario) {
    case '@395':
    case '@2021':
      fields = CHAPTER_FIELDS;
      break;
    case '@1625':
    case '@1656':
    case '@1659':
      fields = JOURNAL_FIELDS;
      break;
    case '@1693':
      fields = REPORT_FIELDS;
      break;
    case '@1694':
      fields = STUDENT_THESIS_FIELDS;
      break;
    case 'Creator sees that fields for Norwegian Science Index (NVI) compatible Resource subtype are validated':
    case 'Creator sees that fields for Norwegian Science Index (NVI) incompatible Resource subtype are validated':
      fields = JOURNAL_FIELDS;
      break;
    case 'Creator sees that fields are validated for Resource subtypes for "Report"':
      fields = REPORT_FIELDS;
      break;
  }
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${fields[field[0]]}]`).type('invalid');
  });
});

const testMandatoryFields = (dataTable) => {
  let scenario = '';
  if (window.testState.currentScenario.tags && window.testState.currentScenario.tags.length > 0) {
    scenario = window.testState.currentScenario.tags[0].name;
  } else {
    scenario = window.testState.currentScenario.name;
    if (scenario.includes('(example')) {
      scenario = scenario.substring(0, scenario.indexOf('(example')).trim();
    }
  }

  let fields = {};

  switch (scenario) {
    case '@2229':
      fields = BOOK_FIELDS;
      break;
    case 'Creator sees that fields are validated on Resource Type tab':
      fields = { 'Type': 'publication-context-type' };
      break;
    case 'Creator sees that fields for Resource subtype "Corrigendum" are validated':
    case 'Creator sees that fields for Norwegian Science Index (NVI) compatible Resource subtype are validated':
    case 'Creator sees that fields for Norwegian Science Index (NVI) incompatible Resource subtype are validated':
      fields = JOURNAL_FIELDS;
      break;
    case 'Creator sees that fields are validated for Resource subtypes for "Report"':
      fields = REPORT_FIELDS;
      break;
    case 'Creator sees that fields are validated for Resource subtypes for "Student thesis"':
      fields = STUDENT_THESIS_FIELDS;
      break;
  }
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${fields[value[0]]}]`).within((field) => {
      cy.wrap(field).contains('is required');
    });
  });
};

Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  testMandatoryFields(dataTable);
});

Then('they can see "Mandatory" error message for fields:', (dataTable) => {
  testMandatoryFields(dataTable);
});

And('they can see "Invalid format" error message for fields:', (dataTable) => {
  let scenario = '';
  if (window.testState.currentScenario.tags && window.testState.currentScenario.tags.length > 0) {
    scenario = window.testState.currentScenario.tags[0].name;
  } else {
    scenario = window.testState.currentScenario.name;
    scenario = scenario.substring(0, scenario.indexOf('(example')).trim();
  }

  let fields = {};

  switch (scenario) {
    case 'Creator sees that fields for Resource subtype "Corrigendum" are validated':
    case 'Creator sees that fields for Norwegian Science Index (NVI) compatible Resource subtype are validated':
    case 'Creator sees that fields for Norwegian Science Index (NVI) incompatible Resource subtype are validated':
      fields = JOURNAL_FIELDS;
      break;
    case 'Creator sees that fields are validated for Resource subtypes for "Report"':
      fields = REPORT_FIELDS;
      break;
    case 'Creator sees that fields are validated for Resource subtypes for "Student thesis"':
      fields = STUDENT_THESIS_FIELDS;
      break;
  }

  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${fields[field[0]]}]`).within((field) => {
      cy.wrap(field).type('invalid');
      cy.wrap(field).get('input').focus().blur();
      cy.wrap(field).contains('has invalid format');
    });
  });
});
