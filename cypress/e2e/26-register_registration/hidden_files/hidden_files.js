// Feature: Hidden and internal files

import { user, userPublishRegistration, userPublishingCurator } from "../../../support/constants";
import { v4 as uuid } from 'uuid'
import { dataTestId } from "../../../support/dataTestIds";

const fileName = "example.txt";

// Scenario Outline: Creator adds a non-open file
Given('Creator navigates to Files and License tab', () => {
    cy.login(userPublishingCurator);
    cy.startWizardWithEmptyRegistration();
    const title = `Non-open file ${uuid()}`;
    cy.createValidRegistration(null, title);
});
When('they add a file to the File upload widget', () => {
    cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
And('they mark the file as {string}', (fileType) => {
    cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
    cy.contains(fileType).click();
});
Then('they can see the file in the list of files', () => {
    cy.contains(fileName);
});
And('the file is marked as {string}', (fileType) => {
    cy.getDataTestId(dataTestId.registrationWizard.files.fileRow).filter(`:contains(${fileType})`);
});
When('they publish the Registration', () => {
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
});
Then('they see the file under Internal files', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.internalFilesTab).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.file).filter(`:contains(${fileName})`);
});

// Examples:
//     | File type     |
//     | Hidden file   |
//     | Internal file |

// Scenario Outline: Curator approves non-open file
Given('a registration with a {string}', (fileType) => {
    cy.login(userPublishRegistration);
    cy.startWizardWithEmptyRegistration();
    const title = `Non-open file ${uuid()}`;
    cy.wrap(title).as('title');
    cy.wrap(fileType).as('fileType');
    cy.createValidRegistration(null, title);
    cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
    cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
    cy.contains(fileType).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
});
And('the files need approval from a Curator', () => { });
When('a Curator view the landing page of the registration', () => {
    cy.login(userPublishingCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.get('@title').then(title => {
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
    });
});
Then('they see {string}', (approvalMessage) => {
    cy.get('@fileType').then(fileType => {
        if (fileType === 'Internal file') {
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).contains(approvalMessage);
        }
    });

});
When('they approve the file', () => {
    cy.get('@fileType').then(fileType => {
        if (fileType === 'Internal file') {
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
            cy.contains('The registration was published');
        }
    });

});
Then('they see the file is approved', () => {
    cy.get('@fileType').then(fileType => {
        if (fileType === 'Internal file') {
            cy.get('@title').then(title => {
                cy.wait(15000);
                cy.reload();
                cy.contains(title);
                cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).within(taskPanel => {
                    if (taskPanel.find(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).length > 0) {
                        cy.wait(15000);
                        cy.reload();
                        cy.contains(title);
                    }
                })
                cy.contains('1 file archived');
                cy.contains('1 waiting for approval').should('not.exist');
            });
        }
    });
});

// Examples:
//     | File type     | Approval message                   |
//     | Internal file | internal file waiting for approval |
//     | Hidden file   | hidden file waiting for approval   |

// Scenario Outline: Curator changes open file to non-open file
Given('a published registration with an open file', () => {
    cy.login(userPublishRegistration);
    cy.startWizardWithEmptyRegistration();
    const title = `Non-open file ${uuid()}`;
    cy.wrap(title).as('title');
    cy.createValidRegistration(fileName, title);
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
});
And('the file needs approval', () => { });
When('a curator edit the registration and changes the open file to {string}', (fileType) => {
    cy.wrap(fileType).as('fileType');
    cy.login(userPublishingCurator);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.get('@title').then(title => {
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
    })
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
    cy.contains(fileType).click();
});
And('navigates to the landing page', () => {
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
});
Then('they see the file under Internal files', () => { });
And('they see {string}', (approvalMessage) => { });
When('they approve the file', () => { });
Then('they see the file is approved', () => { });

// Examples:
// | File type     | Approval message                   |
// | Internal file | internal file waiting for approval |
// | Hidden file   | hidden file waiting for approval   |
