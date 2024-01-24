// Feature: Performance test My page

import { userWithAuthor } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";

//   Scenario: User views Dialogue on My page
    Given ('logged in user', () => {
        cy.login(userWithAuthor);
    });
    When ('they navigate to My page', () => {
        cy.getDataTestId(dataTestId.header.myPageLink).click();
    });
    And ('select Dialogue', () => {
        cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
    });
    Then ('Messages to the user are presented within 3 seconds', () => {});

//   Scenario: User views result Registrations on My page
    Given ('logged in user', () => {});
    When ('they navigate to My page', () => {});
    And ('they select Result Registrations', () => {
        cy.getDataTestId(dataTestId.myPage.myRegistrationsLink).click();
    });
    Then ('the users draft Registrations are presented within 3 seconds', () => {
        cy.getDataTestId(dataTestId.startPage.searchResultItem, {timeout: 3000})
    });

//   Scenario: User views result Registrations on My page
    Given ('logged in user', () => {});
    When ('they navigate to My page', () => {});
    And ('they select Project Registrations', () => {
        cy.getDataTestId(dataTestId.myPage.myProjectRegistrationsLink).click();
    });
    Then ('the users Projects are presented within 3 seconds', () => {});

//   Scenario: User views Research profile on My page
    Given ('logged in user', () => {});
    When ('they navigate to My page', () => {});
    And ('they select Research profile', () => {
        cy.getDataTestId(dataTestId.myPage.researchProfileAccordion).click();
    });
    Then ('the users Research profile is presented within 3 seconds', () => {});

//   Scenario: User views User profile on My page
    Given ('logged in user', () => {});
    When ('they navigate to My page', () => {});
    And ('they select User profile', () => {
        cy.getDataTestId(dataTestId.myPage.myProfileAccordion).click();
    });
    Then ('the users User profile is presented within 3 seconds', () => {});
