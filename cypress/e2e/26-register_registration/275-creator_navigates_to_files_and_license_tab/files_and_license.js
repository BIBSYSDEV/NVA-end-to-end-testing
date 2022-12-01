import { userFilesAndLicense } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
});
When('they navigate to the Files and License tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
});
And('they see the File upload widget', () => {
  cy.contains('Drop files here');
});
And('they see an Input Field for Linked Resources', () => {
  // TODO: legg til data-testid i frontend
  // cy.get(`[data-testid=${dataTestId.registrationWizard.files.linkToResourceField}]`).should('be.visible');
  cy.contains('Link to resource')
});
And('they have the option to mark that the Resource has no File or Linked Resource', () => {
  // TODO: legg til data-testid i frontend
  // cy.get(`[data-testid=${dataTestId.registrationWizard.files.noFilesOrLinksButton}]`)
  cy.contains('The resource does not have any file or links to publish');
});
And('they see the tab Description is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).should('be.visible');
});
And('they see the tab Resource Type is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).should('be.visible');
});
And('they see the tab Contributors is clickable', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).should('be.visible');
});
And('they see the tab Files and License is selected', () => {
  cy.get('span').filter(':contains("Files and License")', { timeout: 30000 }).should('have.class', 'Mui-active');
});
And('they see the tab Summary is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-submission]').should('be.visible');
});
And('they see Previous is enabled', () => {
  cy.get('[data-testid=button-previous-tab]').should('be.enabled');
});
And('they see Next is enabled', () => {
  // cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
});

// Scenario: Creator marks that a Resource has no File or Linked Resource
Given('Creator navigates to Files and License tab', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
});
When('they wish to mark that a Resource have no File or Linked Resource', () => { });
Then('they see a warning message that the Resource will have no File or Linked Resource', () => { });
And('they see they can cancel marking the Resource', () => { });
And('they see they can confirm marking the Resource', () => { });

// Scenario: Creator adds a file
Given('Creator navigates to Files and License tab', () => { });
When('they add a file to the File upload widget', () => { });
Then('they can see the file in the list of files', () => { });

// Scenario: Creator sees information about file
Given('Creator adds a file', () => { })
When('they see the file in the list of files', () => { })
Then('they can see information about:', () => { })
// | Version |
// | Publish date |
// | Terms of use |

// Scenario: Creator removes a file
Given('Creator open a Registration with a file', () => { });
And('navigates to Files and License tab', () => { });
When('they remove a file', () => { });
Then('they no longer see the file in the list of files', () => { });

