// Feature: File metadata read and file download permissions
//     As a system user
//     I want file metadata read and file download permissions to be enforced based on file state and user role
//     So that only authorized users can read the metadata

import { v4 as uuid } from 'uuid';
import { userPublicationCuratorMessages, userPublicationMessages, userWithAuthor, userCuratorInstitution, userPublishNoRights, userDOIMessages, } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';


let init = false;
const UPLOADED_FILE = 'UploadedFile';
const PENDING_OPEN_FILE = 'PendingOpenFile';
const PENDING_INTERNAL_FILE = 'PendingInternalFile';
const OPEN_FILE = 'OpenFile';
const INTERNAL_FILE = 'InternalFile';
const HIDDEN_FILE = 'HiddenFile';

const NONE = 'None';
const OPEN = 'Open file';
const INTERNAL = 'Internal file';
const HIDDEN = 'Hidden file';


const addContributor = () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.reload();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton);
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.startPage.searchField).type('Withauthor TestUser{enter}');
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.startPage.searchField).type('Doi Messages TestUser{enter}');
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).parent().parent().parent().filter(':contains("Doi Messages TestUser")').filter(':contains("SINTEF")').within(() => {
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('be.enabled');
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccess();
    cy.getSuccessDone();
};

const titles = {

    [UPLOADED_FILE]: `${UPLOADED_FILE} ${uuid()}`,
    [PENDING_OPEN_FILE]: `${PENDING_OPEN_FILE} ${uuid()}`,
    [PENDING_INTERNAL_FILE]: `${PENDING_INTERNAL_FILE} ${uuid()}`,
    [INTERNAL_FILE]: `${INTERNAL_FILE} ${uuid()}`,
    [OPEN_FILE]: `${OPEN_FILE} ${uuid()}`,
    [HIDDEN_FILE]: `${HIDDEN_FILE} ${uuid()}`,
};

const initData = () => {

    const ACADEMIC_ARTICLE = 'AcademicArticle';
    const fileName = 'lorem_ipsum.txt';

    cy.login(userPublicationMessages);

    // cy.createPublishedRegistration(titles[UPLOADED_FILE], ACADEMIC_ARTICLE, fileName, null, NONE);
    // addContributor();

    cy.createPublishedRegistration(titles[PENDING_OPEN_FILE], ACADEMIC_ARTICLE, fileName, 'Accepted', OPEN);
    addContributor();

    cy.createPublishedRegistration(titles[PENDING_INTERNAL_FILE], ACADEMIC_ARTICLE, fileName, 'Accepted', INTERNAL);
    addContributor();

    cy.createPublishedRegistration(titles[OPEN_FILE], ACADEMIC_ARTICLE, fileName, 'Accepted', OPEN);
    addContributor();

    cy.createPublishedRegistration(titles[INTERNAL_FILE], ACADEMIC_ARTICLE, fileName, 'Accepted', INTERNAL);
    addContributor();

    cy.createPublishedRegistration(titles[HIDDEN_FILE]);
    addContributor();

    cy.login(userPublicationCuratorMessages);
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${titles[OPEN_FILE]}{enter}`);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${titles[OPEN_FILE]})`).within(() => {
        cy.get('a').first().click();
    });
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
    cy.getSuccess();
    cy.getSuccessDone();

    cy.getDataTestId('logo').click();
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${titles[INTERNAL_FILE]}{enter}`);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${titles[INTERNAL_FILE]})`).within(() => {
        cy.get('a').first().click();
    });
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton).click();
    cy.getSuccess();
    cy.getSuccessDone();

    cy.getDataTestId('logo').click();
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${titles[HIDDEN_FILE]}{enter}`);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${titles[HIDDEN_FILE]})`).within(() => {
        cy.get('a').first().click();
    });
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
    cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
    cy.contains(HIDDEN).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccess();
    cy.getSuccessDone();
};


const users = {
    'Uploader at X': userPublicationMessages,
    'Contributor at X': userDOIMessages,
    'Other contributors': userWithAuthor,
    'File curator at X': userPublicationCuratorMessages,
    'File curators for other contributors': userCuratorInstitution,
    'Everyone else': userPublishNoRights,
};

//   Scenario Outline: Verify file metadata read permissions
Given('a file of type {string}', (fileType) => {
    if (!init) {
        initData();
        init = true;
    }
    cy.wrap(fileType).as('fileType');
});
When('the user have the role {string}', (userRole) => {
    cy.wrap(userRole).as('userRole');
    if (userRole !== 'Everyone else') {
        cy.login(users[userRole]);
    } else {
        cy.visit('/', {
            auth: {
                username: Cypress.env('DEVUSER'),
                password: Cypress.env('DEVPASSWORD'),
            },
        });
    }
});
And('the user attempts to "write-metadata"', () => {
    cy.get('@fileType').then(fileType => {
        const title = titles[fileType];
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).within(() => {
            cy.get('a').first().click();
        });
        cy.getDataTestId(dataTestId.registrationLandingPage.contributors).should('exist');
    });
});
Then('the action outcome is {string}', (outcome) => {
    cy.get('@fileType').then(fileType => {
        if (outcome === 'Allowed') {
            cy.get('@userRole').then((userRole) => {
                if (userRole !== 'Everyone else') {
                    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
                    cy.reload();
                    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
                    cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).within(() => {
                        cy.get('input').should('be.enabled');
                    });
                    if (fileType === OPEN_FILE || fileType === PENDING_OPEN_FILE) {
                        cy.getDataTestId(dataTestId.registrationWizard.files.selectLicenseField).within(() => {
                            cy.get('input').should('be.enabled');
                        });
                        cy.getDataTestId(dataTestId.registrationWizard.files.version).within(() => {
                            cy.get('input').should('be.enabled');
                        });
                        cy.getDataTestId(dataTestId.registrationWizard.files.expandFileRowButton).click();
                        cy.getDataTestId(dataTestId.registrationWizard.files.embargoDateField).should('be.enabled');
                    }
                } else {
                    cy.getDataTestId(dataTestId.registrationLandingPage.openFileButton).should('exist');
                }
            });
        } else {
            cy.get('@userRole').then((userRole) => {
                if (userRole !== 'Everyone else') {
                    cy.getDataTestId(dataTestId.registrationWizard.files.deleteFile).should('not.exist');
                } else {
                    cy.getDataTestId(dataTestId.registrationLandingPage.filesAccordion).should('not.exist');
                }
            });
        }
    });
});

// Examples:
//   | FileType            | UserRole                             | Outcome     |
//   | UploadedFile        | Uploader at X                        | Allowed     |
//   | UploadedFile        | Contributor at X                     | Not Allowed |
//   | UploadedFile        | Other contributors                   | Not Allowed |
//   | UploadedFile        | File curator at X                    | Allowed     |
//   | UploadedFile        | File curators for other contributors | Not Allowed |
//   | UploadedFile        | Everyone else                        | Not Allowed |
//   | UploadedFile        | External client                      | Not Allowed |
//   | PendingOpenFile     | Uploader at X                        | Allowed     |
//   | PendingOpenFile     | Contributor at X                     | Allowed     |
//   | PendingOpenFile     | Other contributors                   | Allowed     |
//   | PendingOpenFile     | File curator at X                    | Allowed     |
//   | PendingOpenFile     | File curators for other contributors | Allowed     |
//   | PendingOpenFile     | Everyone else                        | Not Allowed |
//   | PendingOpenFile     | External client                      | Not Allowed |
//   | PendingInternalFile | Uploader at X                        | Allowed     |
//   | PendingInternalFile | Contributor at X                     | Allowed     |
//   | PendingInternalFile | Other contributors                   | Allowed     |
//   | PendingInternalFile | File curator at X                    | Allowed     |
//   | PendingInternalFile | File curators for other contributors | Allowed     |
//   | PendingInternalFile | Everyone else                        | Not Allowed |
//   | PendingInternalFile | External client                      | Not Allowed |
//   | OpenFile            | Uploader at X                        | Allowed     |
//   | OpenFile            | Contributor at X                     | Allowed     |
//   | OpenFile            | Other contributors                   | Allowed     |
//   | OpenFile            | File curator at X                    | Allowed     |
//   | OpenFile            | File curators for other contributors | Allowed     |
//   | OpenFile            | Everyone else                        | Allowed     |
//   | OpenFile            | External client                      | Allowed     |
//   | InternalFile        | Uploader at X                        | Allowed     |
//   | InternalFile        | Contributor at X                     | Allowed     |
//   | InternalFile        | Other contributors                   | Allowed     |
//   | InternalFile        | File curator at X                    | Allowed     |
//   | InternalFile        | File curators for other contributors | Allowed     |
//   | InternalFile        | Everyone else                        | Not Allowed |
//   | InternalFile        | External client                      | Allowed     |
//   | HiddenFile          | Uploader at X                        | Not Allowed |
//   | HiddenFile          | Contributor at X                     | Not Allowed |
//   | HiddenFile          | Other contributors                   | Not Allowed |
//   | HiddenFile          | File curator at X                    | Allowed     |
//   | HiddenFile          | File curators for other contributors | Not Allowed |
//   | HiddenFile          | Everyone else                        | Not Allowed |
//   | HiddenFile          | External client                      | Not Allowed |