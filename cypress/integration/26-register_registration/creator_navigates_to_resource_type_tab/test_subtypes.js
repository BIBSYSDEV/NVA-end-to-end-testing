import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { JOURNAL_SUBTYPES, REPORT_SUBTYPES, STUDENT_THESIS_SUBTYPES } from '../../../support/data_testid_constants';

Then('they see a list of subtypes:', (dataTable) => {
  const tag = window.testState.currentScenario.tags[0].name;
  let subtypes = {};
  switch (tag) {
    case '@274':
      subtypes = JOURNAL_SUBTYPES;
      break;
    case '@393':
      subtypes = REPORT_SUBTYPES;
      break;
    case '@394':
      subtypes = STUDENT_THESIS_SUBTYPES;
      break;
    case '@1624':
      // TODO not implemented
      // subtypes = OTHER_SUBTYPES;
      break;
  }
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, subtypes);
});

const selectSubtype = (subType) => {
  let scenario = window.testState.currentScenario.name;
  if (window.testState.currentScenario.tags.length > 0) {
    scenario = window.testState.currentScenario.tags[0].name;
  }
  if (scenario.includes('(example')) {
    scenario = scenario.substring(0, scenario.indexOf('(example')).trim();
  }

  cy.log(scenario);
  cy.log(subType);
  cy.log(window.testState.currentScenario);

  let subtypes = {};
  switch (scenario) {
    case '@1409':
      subtypes = JOURNAL_SUBTYPES;
      break;
    case '@1694':
    case 'Creator sees that fields are validated for Resource subtypes for "Student thesis"':
      subtypes = STUDENT_THESIS_SUBTYPES;
      break;
  }
  cy.log(subtypes);
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${subtypes[subType]}]`).click({ force: true });
};

And('they select {string}', (subType) => {
  selectSubtype(subType);
});

And('they select {string}:', (subType) => {
  selectSubtype(subType);
});
