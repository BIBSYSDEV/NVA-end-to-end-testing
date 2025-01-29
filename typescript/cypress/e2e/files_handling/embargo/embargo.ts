// Feature: Embargo of files

import { userEmbargo } from "../../../support/constants";
import { v4 as uuid } from 'uuid';
import { dataTestId } from "../../../support/dataTestIds";

//     Registrar can set embargo date for files
//     Registrar can add a note to emargoed files
//     Files are not available for download before embargo date

    const filename = 'example.txt';
    const pad = (value) => `0${value}`.slice(-2);

    // Scenario: User sets embargo date for files
        Given ('User registers a registration', () => {
            const title = `View embargo ${uuid()}`
            cy.login(userEmbargo);
            cy.startWizardWithEmptyRegistration();
            cy.createValidRegistration(filename, title)
         });
        When ('they view files in the Wizard', () => {
            cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
        });
        Then ('they can set an embargo date for files', () => {
            cy.getDataTestId(dataTestId.registrationWizard.files.expandFileRowButton).click();
            cy.getDataTestId(dataTestId.registrationWizard.files.embargoDateField).should('be.visible');
        });
        And ('add a note for legal clarification', () => {
            cy.getDataTestId(dataTestId.registrationWizard.files.legalNoteField).should('be.visible');
        });

    // Scenario: User view a Registration with embargoed files, embargo date in the future
        Given ('a User view the landing page for a Registration with embargoed files', () => {
            const title = `View embargo future date ${uuid()}`
            const date = new Date();
            const futureDate = `${pad(date.getDate() + 1)}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;

            cy.login(userEmbargo);
            cy.startWizardWithEmptyRegistration();
            cy.createValidRegistration(filename, title)
            cy.getDataTestId(dataTestId.registrationWizard.files.expandFileRowButton).click();
            cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.files.embargoDateField}]`, futureDate);
            cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).should('not.exist');
            cy.wait(10000);
            cy.getDataTestId('logo').click();
            cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
            cy.getDataTestId(dataTestId.startPage.searchResultItem)
                .filter(`:contains("${title}")`)
                .within(() => {
                    cy.get('a').first().click();
            })
        });
        When ('the embargo date is in the future', () => {

        });
        Then ('they see a message that the files will be available at the embargo date', () => {});
        And ('they see the note for legal clarification', () => {});

    // Scenario: User view a Registration with embargoed files, embargo date current date or in the past
        Given ('a User view the landing page for a Registration with embargoed files', () => {
            const title = `View embargo past date ${uuid()}`
            cy.login(userEmbargo);
            cy.createValidRegistration(filename, title)
        });
        When ('the embargo date is the current date or in the past', () => {});
        Then ('they can view the embargoed files', () => {});
        And ('they see the note for legal clarification', () => {});


