// Feature: Performance testing

import { userWithAuthor } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds"

const testTimeOut = 3000;

// Scenario: Startpage
Given('an anonymous user', () => { })
When('they open the Startpage', () => {
    cy.visit('/', {
        auth: {
            username: Cypress.env('DEVUSER'),
            password: Cypress.env('DEVPASSWORD'),
        },
    });
});
Then('the startpage should be presented in less than 3 seconds', () => {
    cy.getDataTestId(dataTestId.header.logInButton, { timeout: testTimeOut });
});

// Scenario: Startpage logged in user
Given('an authorized user', () => { });
When('they are logged in', () => {
    cy.login(userWithAuthor);
});
Then('the startpage with their username should be presented in less than 3 seconds', () => {
    cy.getDataTestId(dataTestId.header.menuButton, { timeout: testTimeOut });
});

// Scenario: Search performance for default search results
Given('a user on the startpage', () => { })
When('they first open the startpage', () => {
    cy.visit('/', {
        auth: {
            username: Cypress.env('DEVUSER'),
            password: Cypress.env('DEVPASSWORD'),
        },
    });
});
Then('the default search results should be presented in less than 3 seconds', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem, { timeout: testTimeOut });
});

// Scenario: Search performance
Given('a user already on the startpage', () => {
    cy.visit('/', {
        auth: {
            username: Cypress.env('DEVUSER'),
            password: Cypress.env('DEVPASSWORD'),
        },
    });
});
When('they search for a registration', () => {
    cy.getDataTestId(dataTestId.startPage.searchField).type('registration{enter}');
});
Then('the search results should be presented in less than 3 seconds', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem, { timeout: testTimeOut });
});

// Scenario: Logged in user creates empty Registration
Given('a logged in user', () => {
    cy.login(userWithAuthor);
});
When('they start an empty Registration', () => {
    cy.getDataTestId(dataTestId.header.newRegistrationLink).click();
    cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
});
Then('they are presented the Registration wizard in less than 5 seconds', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton, { timeout: testTimeOut });
});

// Scenario: Logged in user saves Registration
Given('a logged in user', () => { });
When('they start registering a Registration', () => {
    cy.getDataTestId(dataTestId.header.newRegistrationLink).click();
    cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
    cy.getDataTestId(dataTestId.registrationWizard.description.titleField).type('Performance test');
});
And('they save the Registration', () => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
});
Then('they are presented the Registration landing page in less than 5 seconds', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.editButton, { timeout: testTimeOut });
});