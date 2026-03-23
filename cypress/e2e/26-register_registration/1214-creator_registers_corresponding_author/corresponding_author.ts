import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userUnitWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userUnitWithAuthor);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicMonograph')).click();
});
Given('they navigate to the Contributors tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click({ force: true });
});
Given('they see an Author', () => {
  cy.get('[data-testid=add-contributor]').click({ force: true });
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.searchField}] > div > input`).type(
    'Testuser Withauthor{enter}'
  );
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
    .first()
    .click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click({ force: true });
});
When('they check the Corresponding checkbox', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.correspondingCheckbox}] > input`).click({
    force: true,
  });
});
Then('they see the Corresponding Author checkbox is checked', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.correspondingCheckbox).within((checkbox) => {
    cy.wrap(checkbox).get('input').should('be.checked');
  });
});
