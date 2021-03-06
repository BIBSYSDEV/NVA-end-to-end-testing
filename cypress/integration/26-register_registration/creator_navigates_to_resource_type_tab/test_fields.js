import { And } from 'cypress-cucumber-preprocessor/steps';

const testFields = (dataTable) => {
  cy.get('@fields').then((fields) => {
    if (Object.keys(fields).length > 0) {
      const fieldTestList = {};
      dataTable.rawTable.forEach((fieldName) => {
        fieldTestList[fieldName] = fields[fieldName];
      });
      cy.testDataTestidList(dataTable, fieldTestList);
    }
  });
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
