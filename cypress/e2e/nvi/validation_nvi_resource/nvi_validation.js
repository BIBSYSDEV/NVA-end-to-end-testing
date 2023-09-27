import { userNviCurator } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';

const filename = 'example.json';
const registrationTitle = `New NVI candidate ${uuidv4()}`

// Background:
Given('an logged-in Curator at an NVI-Institution', () => {
  cy.login(userNviCurator);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, registrationTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.wait(10000);
});

// Scenario: Curator views NVI-report status at own Institution
When('a Curator uses the option to view the NVI-Report status at own Institution', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
});
Then('the Curator sees a visualization of current progress compared with last year', () => {});
And('it contains number of Validated Resources', () => {});
And('it contains number of Nominated Resources', () => {});
And('it contains number of Candidate Resources', () => {});
