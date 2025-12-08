import { Given } from "@badeball/cypress-cucumber-preprocessor"
import { ReferenceType, registrationBuilder, RegistrationData, RegistrationPartTypes } from "../../../support/create_registration";
import { ContributorTypes, TestUsers } from "../../../support/constants";

Given ('I create a new registration', () => {
    cy.login(TestUsers.creators.basic).then(() => {
        console.log(Cypress.env('accessToken'));
        const regBuilder = registrationBuilder(Cypress.env('accessToken'))
          .create();
        cy.wrap(regBuilder).as('registrationData');
    });
    cy.get('@registrationData').then((regData: unknown) => {
        const builder: RegistrationData = regData as RegistrationData;

        builder.update();
    });
});