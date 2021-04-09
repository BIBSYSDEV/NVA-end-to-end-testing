import { And } from 'cypress-cucumber-preprocessor/steps';
import {
  JOURNAL_FIELDS,
  REPORT_FIELDS,
  STUDENT_THESIS_FIELDS,
  CHAPTER_FIELDS,
  BOOK_FIELDS,
} from '../../../support/data_testid_constants';

And('they enter an invalid value in fields:', (dataTable) => {
  let tag = '';
  let name = '';
  if (window.testState.currentScenario.tags && window.testState.currentScenario.tags.length > 0) {
    tag = window.testState.currentScenario.tags[0].name;
  } else {
    name = window.testState.currentScenario.name;
    name = name.substring(0, name.indexOf('(example')).trim();
  }

  let fields = {};
  if (tag !== '') {
    switch (tag) {
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
    }
  } else {
    switch (name) {
      case 'Creator sees that fields for Norwegian Science Index (NVI) compatible Resource subtype are validated':
      case 'Creator sees that fields for Norwegian Science Index (NVI) incompatible Resource subtype are validated':
        fields = JOURNAL_FIELDS;
        break;
    }
  }
  dataTable.rawTable.forEach((field) => {
    cy.get(`[data-testid=${fields[field[0]]}]`).type('invalid');
  });
});

const testMandatoryFields = (dataTable) => {
  let tag = '';
  let name = '';
  if (window.testState.currentScenario.tags && window.testState.currentScenario.tags.length > 0) {
    tag = window.testState.currentScenario.tags[0].name;
  } else {
    name = window.testState.currentScenario.name;
    name = name.substring(0, name.indexOf('(example')).trim();
  }

  let fields = {};

  if (tag !== '') {
    switch (tag) {
      case '@2229':
        fields = BOOK_FIELDS;
        break;
    }
  } else {
    switch (name) {
      case 'they can see "Mandatory" error message for fields:':
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
