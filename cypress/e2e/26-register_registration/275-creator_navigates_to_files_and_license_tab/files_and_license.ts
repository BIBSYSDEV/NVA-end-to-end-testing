import { userFilesAndLicense } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { fileFields } from '../../../support/data_testid_constants';
import { DataTable, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const fileName = 'example.txt';

Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
});
When('they navigate to the Files and License tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
});
Then('they see the File upload widget', () => {
  cy.contains('Drop files here');
});
Then('they see an Input Field for Linked Resources', () => {
  // TODO: legg til data-testid i frontend
  // cy.getDataTestId(dataTestId.registrationWizard.files.linkToResourceField).should('be.visible');
  cy.contains('Link to resource');
});
Then('they have the option to mark that the Resource has no File or Linked Resource', () => {
  // TODO: legg til data-testid i frontend
  // cy.getDataTestId(dataTestId.registrationWizard.files.noFilesOrLinksButton)
  cy.contains('The resource does not have any files or links to publish');
});
Then('they see the tab Description is clickable', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton).should('be.visible');
});
Then('they see the tab Resource Type is clickable', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).should('be.visible');
});
Then('they see the tab Contributors is clickable', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).should('be.visible');
});
Then('they see the tab Files and License is selected', () => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).within(() => {
    cy.get('span > span > span').should('have.class', 'Mui-active');
  });
});
Then('they see the tab Summary is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-submission]').should('be.visible');
});
Then('they see Previous is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.previousTabButton).should('be.enabled');
});
Then('they see Next is enabled', () => {});
Then('they see Save is enabled', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
});

// Scenario: Creator marks that a Resource has no File or Linked Resource
Given('Creator navigates to Files and License tab', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
});
When('they wish to mark that a Resource have no File or Linked Resource', () => {
  cy.getDataTestId('CheckBoxOutlineBlankIcon').parent().click();
  // cy.getDataTestId(dataTestId.registrationWizard.files.noFilesOrLinksButton).click();
});
Then('they see a warning message that the Resource will have no File or Linked Resource', () => {});
Then('they see they can cancel marking the Resource', () => {});
Then('they see they can confirm marking the Resource', () => {});

// Scenario: Creator marks a File with Administrative Agrement
When('they upload a File', () => {
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
When('they mark the File with Administrative Agreement', () => {
  cy.getDataTestId(dataTestId.registrationWizard.files.toPublishCheckbox).click();
});
Then('the File is not presented on the Landing Page', () => {
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).should('not.exist');
});

// Scenario Outline: Creator looks up an invalid Link as Linked Resource
Given('Creator navigates to Files and License tab', () => {});
When('they enter {string} in the Linked Resource field', (link) => {
  cy.getDataTestId(dataTestId.registrationWizard.files.linkToResourceField).type(`${link}{enter}`);
});
When('they click the Add Link Button', () => {
  // cy.getDataTestId(dataTestId.registrationWizard.files.addFilesOrLinksButton).click();
});
Then('they see an error message that the Link could not be added', () => {});

// Examples:
//   | Link                       |
//   | https://github.com/xxx/yyy |

// Scenario: Creator adds a file
When('they add a file to the File upload widget', () => {
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
Then('they can see the file in the list of files', () => {
  cy.getDataTestId('uploaded-file-row').filter(`:contains(${fileName})`).should('be.visible');
});

// Scenario: Creator sees information about file
Given('Creator adds a file', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
  cy.contains('Open file').click();
});
When('they see the file in the list of files', () => {
  cy.getDataTestId('uploaded-file-row').filter(`:contains(${fileName})`).should('be.visible');
});
Then('they can see information about:', (dataTable: DataTable) => {
  cy.getDataTestId('uploaded-file-row')
    .filter(`:contains(${fileName})`)
    .within(() => {
      cy.testDataTestidList(dataTable, fileFields);
    });
});
// | Version |
// | Publish date |
// | Terms of use |

// Scenario: Creator removes a file
Given('Creator open a Registration with a file', () => {
  cy.login(userFilesAndLicense);
  cy.startWizardWithEmptyRegistration();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
Given('navigates to Files and License tab', () => {
  cy.getDataTestId('uploaded-file-row').filter(`:contains(${fileName})`).should('exist');
});
When('they remove a file', () => {
  cy.getDataTestId('uploaded-file-row')
    .filter(`:contains(${fileName})`)
    .within(() => {
      cy.getDataTestId(dataTestId.registrationWizard.files.deleteFile).click();
    });
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});
Then('they no longer see the file in the list of files', () => {
  cy.getDataTestId('uploaded-file-row').should('not.exist');
});
