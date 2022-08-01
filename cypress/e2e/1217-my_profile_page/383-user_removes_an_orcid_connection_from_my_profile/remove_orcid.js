import { userRemoveOrcid } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { mockPerson } from '../../../support/mock_data';

const stage = Cypress.env('STAGE') ?? 'dev';

Given('user opens the page My Profile', () => {
  cy.login(userRemoveOrcid);
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.header.myProfileLink}]`).click({ force: true });
});
When('they click Remove ORCID', () => {
  cy.intercept(`https://api.${stage}.nva.aws.unit.no/person/*/identifiers/orcid/delete`, {
    ...mockPerson(userRemoveOrcid),
    orcids: [],
  });
  cy.get('[data-testid=button-confirm-delete-orcid]').click({ force: true });
  cy.get('[data-testid=accept-button]').click({ force: true });
});
Then('they see a confirmation that the ORCID is removed', () => {
  cy.get('[data-testid=snackbar-success]').should('be.visible');
});
