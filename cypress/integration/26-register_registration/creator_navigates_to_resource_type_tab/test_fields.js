import { And } from 'cypress-cucumber-preprocessor/steps';
import {
  JOURNAL_FIELDS,
  REPORT_FIELDS,
  STUDENT_THESIS_FIELDS,
  CHAPTER_FIELDS,
  OTHER_PUBLICATION_FIELDS,
} from '../../../support/data_testid_constants';

const testFields = (dataTable) => {
  const tag = window.testState.currentScenario.tags[0].name;
  let fields = {};
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
    case '@1669':
      break;
  }
  const fieldTestList = {};
  if (Object.keys(fields).length > 0) {
    dataTable.rawTable.forEach((fieldName) => {
      fieldTestList[fieldName] = fields[fieldName];
    });
    cy.testDataTestidList(dataTable, fieldTestList);
  }
};

And('they see fields:', (dataTable) => {
  testFields(dataTable);
});

And('they see fields', (dataTable) => {
  testFields(dataTable);
});

And('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
  cy.get('[data-testid^=peer_review]').should('be.visible');
});
