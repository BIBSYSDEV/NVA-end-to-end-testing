import { And, Then } from 'cypress-cucumber-preprocessor/steps';

And('they enter an invalid value in fields:', (dataTable) => {
  cy.get('@fields').then((fields) => {
    if (Object.keys(fields).length > 0) {
      dataTable.rawTable.forEach((field) => {
        cy.get(`[data-testid=${fields[field[0]]}]`).type('invalid');
      });
    }
  });
});

Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  cy.get('@fields').then((fields) => {
    if (Object.keys(fields).length > 0) {
      dataTable.rawTable.forEach((value) => {
        cy.get(`[data-testid=${fields[value[0]]}]`).within((field) => {
          cy.wrap(field).get('p').should('have.class', 'Mui-error');
          cy.wrap(field).get('p').should('have.class', 'Mui-required');
        });
      });
    }
  });
});

And('they can see "Invalid format" error messages for fields:', (dataTable) => {
  cy.get('@fields').then((fields) => {
    if (Object.keys(fields).length > 0) {
      dataTable.rawTable.forEach((field) => {
        cy.get(`[data-testid=${fields[field[0]]}]`).within((field) => {
          cy.wrap(field).type('invalid');
          cy.wrap(field).get('input').focus().blur();
          cy.wrap(field).get('p').should('have.class', 'Mui-error');
        });
      });
    }
  });
});
