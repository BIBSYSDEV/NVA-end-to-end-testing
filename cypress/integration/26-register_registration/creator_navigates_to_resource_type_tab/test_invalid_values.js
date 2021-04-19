import { And } from 'cypress-cucumber-preprocessor/steps';
import {
  JOURNAL_FIELDS,
  REPORT_FIELDS,
  STUDENT_THESIS_FIELDS,
  CHAPTER_FIELDS,
  BOOK_FIELDS,
} from '../../../support/data_testid_constants';

And('they enter an invalid value in fields:', (dataTable) => {
  cy.get('@fields').then((fields) => {
    if (fields !== {}) {
      dataTable.rawTable.forEach((field) => {
        cy.get(`[data-testid=${fields[field[0]]}]`).type('invalid');
      });
    }
  });
});

const testMandatoryFields = (dataTable) => {};

Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  cy.get('@fields').then((fields) => {
    if (Object.keys(fields).length > 0) {
      dataTable.rawTable.forEach((value) => {
        cy.get(`[data-testid=${fields[value[0]]}]`).within((field) => {
          cy.wrap(field).contains('is required');
        });
      });
    }
  });
});

Then('they can see "Mandatory" error message for fields:', (dataTable) => {
  testMandatoryFields(dataTable);
});

And('they can see "Invalid format" error messages for fields:', (dataTable) => {
  cy.get('@fields').then((fields) => {
    if (Object.keys(fields).length > 0) {
      dataTable.rawTable.forEach((field) => {
        cy.get(`[data-testid=${fields[field[0]]}]`).within((field) => {
          cy.wrap(field).type('invalid');
          cy.wrap(field).get('input').focus().blur();
          cy.wrap(field).contains('has invalid format');
        });
      });
    }
  });
});
