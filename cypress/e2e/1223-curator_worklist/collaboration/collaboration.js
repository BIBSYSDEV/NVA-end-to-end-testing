// Feature: Collaboration between institutions

import { v4 as uuid } from "uuid";
import { dataTestId } from "../../../support/dataTestIds";
import { collaborationCuratorBibsys, collaborationCuratorSikt, collaborationCuratorUnit, uploaderBibsys, uploaderSikt, uploaderUnit } from "../../../support/constants";

const fileName = 'example.txt'

// institution A: Sikt
// institution B: Unit
// institution C: BIBSYS

const uploaders = {
    'Uploader A': uploaderSikt,
    'Uploader B': uploaderUnit,
    'Uploader C': uploaderBibsys,
}

const curators = {
    'Curator A': collaborationCuratorSikt,
    'Curator B': collaborationCuratorUnit,
    'Curator C': collaborationCuratorBibsys,
}

// Scenario Outline: Files are approved by Curators from file uploaders institution
Given('a Publication is created by institution A with contributors from institutions A, B and C', () => {
    cy.login(uploaderSikt);
    const title = `Collaboration ${uuid()}`;
    cy.wrap(title).as('title');
    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(fileName, title, 'Accepted');
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`colaboration B{enter}`)
    cy.contains('colaboration B').parent().within(() => {
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`colaboration C{enter}`)
    cy.contains('colaboration C').parent().within(() => {
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
        const uploader = data[0];
        cy.get('@title').then(title => {
            cy.login(uploaders[uploader]);
            cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        })
        cy.getDataTestId(dataTestId.startPage.searchResultItem).within(() => {
            cy.get('p > a').first().click();
        });
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
        cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
        const uploadedFileName = `example${uploader.replace('Uploader ', '')}.txt`;
        cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${uploadedFileName}`, { force: true });
        cy.getDataTestId(dataTestId.registrationWizard.files.version, { timeout: 30000 }).first().within(() => {
            cy.get('input[type=radio]').last().click();

        });
        cy.getDataTestId(dataTestId.registrationWizard.files.selectLicenseField).first().scrollIntoView().click({ force: true }).type(' ');
        cy.getDataTestId(dataTestId.registrationWizard.files.licenseItem).first().click({ force: true });
        cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    });
});
Then ('the curator for institution A will not get a task to approve a publication request', () => {
    cy.login(curators['Curator A']);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
});
And ('the curator for institution B will get a task to approve the file from Uploader B and not from Uploader C', () => {});
And ('the curator institution C will get a task to approve the file from Uploader C and not from Uploader B', () => {});
