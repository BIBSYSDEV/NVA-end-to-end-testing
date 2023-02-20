import { userFilesAndLicense } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { fileFields } from '../../../support/data_testid_constants';

const fileName = 'example.txt'

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
});
And('they see Save is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});

// Scenario: Creator marks that a Resource has no File or Linked Resource
Given('Creator navigates to Files and License tab', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
});
When('they wish to mark that a Resource have no File or Linked Resource', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.files.noFilesOrLinksButton}]`).click();
});
Then('they see a warning message that the Resource will have no File or Linked Resource', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.files.noFilesOrLinksWarning}]`);
});
And('they see they can cancel marking the Resource', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.files.addFilesOrLinksButton}]`).should('be.visible');
});
And('they see they can confirm marking the Resource', () => { });

// Scenario: Creator marks a File with Administrative Agrement
When('they upload a File', () => {
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
})
And('they mark the File with Administrative Agreement', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.files.administrativeAgreement}]`).click();
})
Then('the File is not presented on the Landing Page', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.filesAccordion}]`).should('not.exist');
})


// Scenario: Creator adds a file
When('they add a file to the File upload widget', () => {
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
Then('they can see the file in the list of files', () => {
  cy.get(`[data-testid=uploaded-file-row]`).filter(`:contains(${fileName})`).should('be.visible');
});

// Scenario: Creator sees information about file
Given('Creator adds a file', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
})
When('they see the file in the list of files', () => {
  cy.get(`[data-testid=uploaded-file-row]`).filter(`:contains(${fileName})`).should('be.visible');
})
Then('they can see information about:', (dataTable) => {
  cy.get(`[data-testid=uploaded-file-row]`).filter(`:contains(${fileName})`).within(() => {
    cy.testDataTestidList(dataTable, fileFields);
  })
})
// | Version |
// | Publish date |
// | Terms of use |

// Scenario: Creator removes a file
Given('Creator open a Registration with a file', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
And('navigates to Files and License tab', () => {
  cy.get(`[data-testid=uploaded-file-row]`).filter(`:contains(${fileName})`).should('exist');
});
When('they remove a file', () => {
  cy.get(`[data-testid=uploaded-file-row]`).filter(`:contains(${fileName})`).within(() => {
    cy.get('[data-testid=CancelIcon]').click();
  })
  cy.get(`[data-testid=${dataTestId.confirmDialog.acceptButton}]`).click();
});
Then('they no longer see the file in the list of files', () => {
  cy.get(`[data-testid=uploaded-file-row]`).should('not.exist');
});

