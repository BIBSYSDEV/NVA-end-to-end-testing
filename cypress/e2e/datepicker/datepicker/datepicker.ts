import { Before } from "cypress-cucumber-preprocessor/steps";
import { userWithAuthor } from "../../../support/constants"
import { dataTestId } from "../../../support/dataTestIds";
// Feature: test datepicker - mobile

Before(() => {
    cy.viewport(320, 480);
})

//     Scenario: Datepicker test
Given('New registration', () => {
    cy.login(userWithAuthor);
    // cy.get('button [title=WithAuthor]').click();
    cy.getDataTestId(dataTestId.header.newRegistrationLink).first().click({ force: true });
    cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
})
When('typing in a date', () => {
    cy.chooseDatePicker(dataTestId.registrationWizard.description.datePublishedField, '11.11.2022');
    // cy.getDataTestId('CalendarIcon').click();
    // cy.get('.MuiPickersDay-today').click();
    // cy.getDataTestId(dataTestId.registrationWizard.description.datePublishedField).type('11.11.2022');
})
Then('the date is registered', () => { })