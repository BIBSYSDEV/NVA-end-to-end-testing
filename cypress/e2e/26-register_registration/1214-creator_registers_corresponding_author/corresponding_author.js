import { userWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userWithAuthor);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get('[data-testid=resource-type-chip-BookMonograph]').click();
});
And('they navigate to the Contributors tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click({ force: true });
});
And('they see an Author', () => {
  cy.get('[data-testid=add-contributor]').click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.searchField}] > div > input`).type(
    'Testuser Withauthor{enter}'
  );
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click({ force: true });
});
When('they check the Corresponding checkbox', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.correspondingCheckbox}] > input`).click({
    force: true,
  });
});
Then('they see the Corresponding Author checkbox is checked', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.correspondingCheckbox}]`).within((checkbox) => {
    cy.wrap(checkbox).get('input').should('be.checked');
  });
});
