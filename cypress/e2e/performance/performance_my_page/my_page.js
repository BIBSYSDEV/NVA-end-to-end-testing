// Feature: Performance test My page

import { userWithAuthor } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

const testTimeOut = 3000;

//   Scenario: User views Dialogue on My page
Given('logged in user', () => {
    cy.login(userWithAuthor);
});
When('they navigate to My page', () => {
    cy.getDataTestId(dataTestId.header.myPageLink).click();
});
And('select Dialogue', () => {
    cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
});
Then('Messages to the user are presented within 3 seconds', () => { });

//   Scenario: User views result registrations on My page
Given('logged in user', () => { });
When('they navigate to My page', () => { });
And('they select Result registrations', () => {
    cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
});
Then('the users draft Registrations are presented within 3 seconds', () => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem, {timeout: testTimeOut});
});

//   Scenario: User views result registrations on My page
Given('logged in user', () => { });
When('they navigate to My page', () => { });
And('they select Project registrations', () => {
    cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
});
Then('the users Projects are presented within 3 seconds', () => {
    cy.get('ul > li > div > p', {timeout: testTimeOut}).filter(':contains("E2E")');
});

//   Scenario: User views Research profile on My page
Given('logged in user', () => { });
When('they navigate to My page', () => { });
And('they select Research profile', () => { });
Then('the users Research profile is presented within 3 seconds', () => { });

//   Scenario: User views User profile on My page
Given('logged in user', () => { });
When('they navigate to My page', () => { });
And('they select User profile', () => { });
Then('the users User profile is presented within 3 seconds', () => { });
