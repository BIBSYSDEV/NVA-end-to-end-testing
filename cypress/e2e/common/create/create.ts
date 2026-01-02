import { Given } from "@badeball/cypress-cucumber-preprocessor"
import { findContributorByName, registrationBuilder, createEntityDescription } from "../../../support/create_registration";
import { CategoryTypes, ContributorTypes, TestUsers } from "../../../support/constants";
import { v4 as uuid } from 'uuid';

Given('I create a new registration', () => {
    cy.login(TestUsers.creators.basic).then(() => {
        const builder = registrationBuilder(Cypress.env('accessToken'))
            .create();
        const contributor = findContributorByName(Cypress.env('accessToken'), "withauthor", ContributorTypes.CREATOR);
        cy.then(() => {
            const category: CategoryTypes = CategoryTypes.BOOK_ANTHOLOGY;
            const entity = createEntityDescription(`Test ${category} ${uuid()}`, category, '1003');
            const newBuilder = builder.addEntityDescription(entity)
                .addContributor(contributor);
            console.log(`Builder payload: ${JSON.stringify(newBuilder.payload)}`);
            newBuilder.update();
            cy.then(() => {
                builder.publish();
                cy.then(() => {
                    cy.wait(3000); // Wait for 3 seconds to ensure the registration is processed
                    cy.reload();
                });
            });
        })
    });
});