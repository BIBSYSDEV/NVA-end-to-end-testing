import { adminUser } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('that the user is logged in as Application Administrator', () => {
  cy.login(adminUser);
});
When('they click the menu item Institutions', () => {
  cy.get(`[data-testid=${dataTestId.header.basicDataLink}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.basicData.adminInstitutionsLink}]`).click({ force: true });
});
Then('they see the page Institutions', () => {
  cy.location('pathname').should('equal', '/basic-data/institutions');
});
And('they see a table of all Institutions \\(customers)', () => {
  cy.get('[data-testid=customer-institutions-list]').should('be.visible');
});
And('they see the table contains the fields', (dataTable) => {
  cy.get('[data-testid=customer-institutions-list]').within(() => {
    dataTable.rawTable.forEach((value) => {
      cy.get('thead').contains(value[0]);
    });
  });
});
// | Name |
// | Date |
And('they see a button Edit that is enabled for each Institution', () => {
  cy.get('[data-testid^=edit-institution]').should('have.length.above', 0);
});
And('they see a button Add institution that is enabled', () => {
  cy.get('[data-testid=add-institution-button]').should('be.visible');
});
