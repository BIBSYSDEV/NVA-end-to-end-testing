import { Then, And } from 'cypress-cucumber-preprocessor/steps';

Then('they see a list of subtypes:', (dataTable) => {
  cy.get('@subTypes').then((subTypes) => {
    if (Object.keys(subTypes).length > 0) {
      cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
      cy.testDataTestidList(dataTable, subTypes);
    }
  });
});

And('they select the Subtype {string}:', (subType) => {
  cy.get('@subTypes').then((subTypes) => {
    if (Object.keys(subTypes).length > 0) {
      cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
      cy.get(`[data-testid=${subTypes[subType]}]`).click({ force: true });
    }
  });
});
