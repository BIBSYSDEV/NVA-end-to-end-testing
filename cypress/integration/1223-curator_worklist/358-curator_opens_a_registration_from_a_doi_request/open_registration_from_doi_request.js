import { userCuratorWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Curator opens a Registration from a DOI Request

Given('that a Curator views their Worklist', () => {
  cy.login(userCuratorWithAuthor);
  cy.get(`[data-testid=${dataTestId.header.worklistLink}]`).click({ force: true });
});
And('they have selected the DOI Requests tab', () => {});
And('they have expanded an Message', () => {
  cy.get('[data-testid^=message-]').first().as('doiRequest');
  cy.get('@doiRequest').click();
});
When('they click "Go to registration"', () => {
  cy.get('@doiRequest').within(() => {
    cy.get(`[data-testid=${dataTestId.registrationLandingPage.status}]`).first().click({ force: true });
  });
});
Then("they see the Landing Page for the DOI Request's Registration", () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.status}]`).should('exist');
});
And('the Create DOI button is enabled', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.createDoiButton}]`).should('be.enabled');
});
And('the Decline DOI button is enabled', () => {
  cy.get('[data-testid=button-reject-doi]'`[data-testid=${dataTestId.registrationLandingPage.rejectDoiButton}]`).should(
    'be.enabled'
  );
});
