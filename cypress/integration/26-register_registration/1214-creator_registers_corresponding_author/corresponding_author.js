import { userWithAuthor } from '../../../support/constants';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
});
And('they navigate to the Contributors tab', () => {
  cy.get('[data-testid=nav-tabpanel-contributors').click({ force: true });
});
And('they see an Author', () => {
  cy.get('[data-testid=nav-tabpanel-contributors').click({ force: true });
  cy.get('[data-testid=add-Creator]').click({ force: true });
  cy.mockPersonSearch(userWithAuthor);
  cy.get('[data-testid=search-field] > div > input').type('Testuser Withauthor{enter}');
  cy.get('[data-testid=author-radio-button]').click({ force: true });
  cy.get('[data-testid=connect-author-button]').click({ force: true });
});
When('they check the Corresponding checkbox', () => {
  cy.get('[data-testid=author-corresponding-checkbox] > input').click({ force: true });
});
Then('they see the Corresponding Author checkbox is checked', () => {
  cy.get('[data-testid=author-corresponding-checkbox]').within((checkbox) => {
    cy.wrap(checkbox).get('input').should('be.checked');
  });
});
