// Feature: Performance test Basic data

import { adminUser, userInstAdminPerformance } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

const testTimeOut = 3000;

//   Scenario: Institution admin views Person Register
Given('a logged in Institution admin', () => {
    cy.login(userInstAdminPerformance)
});
When('they navigate to Basic data', () => {
    cy.getDataTestId(dataTestId.header.basicDataLink).click();
});
And('select Person Register', () => {
    cy.getDataTestId(dataTestId.basicData.personRegisterAccordion).click();
});
Then('a list of Persons are presented within 3 seconds', () => {
    cy.get('[data-testid^=cristin-id]', { timeout: testTimeOut })
});

//   Scenario: Institution admin views Institutions
Given('a logged in App admin', () => {
    cy.login(adminUser);
});
When('they navigate to Basic data', () => { });
And('select Institutions', () => {
    cy.getDataTestId(dataTestId.basicData.institutionsAccordion).click();
});
Then('a list of Institutions are presented within 3 seconds', () => {
    cy.get('tbody > tr > td > p').filter(':contains("Test Institution")');
});

//   Scenario: Institution admin views navigate
Given('a logged in App admin', () => { });
When('they navigate to Basic data', () => { });
And('select NVI', () => {
    cy.getDataTestId(dataTestId.basicData.nviPeriodsLink).click();
});
Then('NVI registration period is presented within 3 seconds', () => {
    cy.get('ul > li > p').filter(':contains("Start date")');
});
