// Feature: Collaboration between institutions

import { v4 as uuid } from "uuid";
import { dataTestId } from "../../../support/dataTestIds";
import { collaborationCuratorBIBSYS, collaborationCuratorNMBU, collaborationCuratorUSN, uploaderBIBSYS, uploaderNMBU, uploaderSikt, uploaderUSN } from "../../../support/constants";

const fileName = 'exampleA.txt'

// institution A: Sikt
// institution B: Unit
// institution C: BIBSYS

const collaborators = {
    'Collaborator A': uploaderBIBSYS,
    'Collaborator B': uploaderNMBU,
    'Collaborator C': uploaderUSN,
}

const curators = {
    'Curator A': collaborationCuratorBIBSYS,
    'Curator B': collaborationCuratorNMBU,
    'Curator C': collaborationCuratorUSN,
}

// Scenario Outline: Files are approved by Curators from file uploaders institution
Given('a Publication is created by institution A with contributors from institutions A, B and C', () => {
    cy.login(uploaderBIBSYS);
    const title = `Collaboration ${uuid()}`;
    cy.wrap(title).as('title');
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, title, 'Published');
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`colaboration B{enter}`)
    cy.get('tr').filter(':contains("colaboration B")').filter(':contains("Norwegian University of Life Sciences")').within(() => {
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`colaboration C{enter}`)
    cy.get('tr').filter(":contains('colaboration C')").filter(':contains("University of South-Eastern Norway")').within(() => {
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
});
And('a file is uploaded from:', (dataTable) => {
    dataTable.rawTable.forEach((data) => {
        const collaborator = data[0];
        cy.get('@title').then(title => {
            cy.login(collaborators[collaborator]);
            cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        })
        cy.getDataTestId(dataTestId.startPage.searchResultItem).within(() => {
            cy.get('p > a').first().click();
        });
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
        const uploadedFileName = `example${collaborator.replace('Collaborator ', '')}.txt`;
        cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${uploadedFileName}`, { force: true });
        cy.getDataTestId(dataTestId.registrationWizard.files.fileRow).filter(`:contains(${uploadedFileName})`).within(() => {
            cy.getDataTestId(dataTestId.registrationWizard.files.version, { timeout: 30000 }).last().within(() => {
                cy.get('input[type=radio]').last().click();
            });
            cy.getDataTestId(dataTestId.registrationWizard.files.selectLicenseField).last().scrollIntoView().click({ force: true }).type(' ');
        });
        cy.getDataTestId(dataTestId.registrationWizard.files.licenseItem).first().click({ force: true });
        cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).should('not.exist');
        cy.contains(uploadedFileName);
    });
});
Then('the curator for institution A will not get a task to approve a publication request', () => {
    cy.login(curators['Curator A']);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
});
And('the curator for institution B will get a task to approve the file from Uploader B and not from Uploader C', () => {
    cy.login(curators['Curator B']);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
});
And('the curator institution C will get a task to approve the file from Uploader C and not from Uploader B', () => {
    cy.login(curators['Curator A']);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
    cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
});

// Scenario: Support requests when collaborating
Given('a Publication is created by institution A with contributors from institutions A, B and C', () => { });
When('a support message is sent from:', (dataTable) => {
    dataTable.rawTable.forEach((data) => {
        const collaborator = data[0];
        cy.get('@title').then(title => {
            cy.login(collaborators[collaborator]);
            cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        })
        cy.getDataTestId(dataTestId.startPage.searchResultItem).within(() => {
            cy.get('p > a').first().click();
        });
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.formActions.openSupportButton).click();
        cy.getDataTestId(dataTestId.tasksPage.messageField).within(() => {
            cy.get('textarea').should('be.enabled');
        })
        cy.getDataTestId(dataTestId.tasksPage.messageField).type(`Message from ${collaborator}{enter}`);

    });
});
// | Collaborator A |
// | Collaborator B |
// | Collaborator C |
Then('the curators from the collaborating institutions will only see messages from collaborators from their own institution:', (dataTable) => {
    const institutions = ['A', 'B', 'C'];
    dataTable.rawTable.forEach((data) => {
        const curator = data[0];
        const institution = curator.replace('Curator ', '');
        const ignore = institutions.filter((inst) => inst !== institution);
        cy.login(curators[curator]);
        cy.getDataTestId(dataTestId.header.tasksLink).click();
        cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
        cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
        cy.get('@title').then((title) => {
            cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
            ignore.forEach((inst) => {
                cy.contains(`Message from Collaborator ${inst}`).should('not.exist');
            })
            cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).click();
            cy.contains(`Message from Collaborator ${institution}`);
        })
    });
});
// | Curator A |
// | Curator B |
// | Curator C |