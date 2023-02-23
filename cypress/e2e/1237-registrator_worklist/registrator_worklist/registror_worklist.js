// Feature: Registrator worklist

//     Scenario Outline: Creator opens My Messages
Given('that the user is logged in as Creator', () => {});
When('they click the menu item My Messages', () => {});
Then('they see the My Messages page', () => {});
And('they see a list of {string} with fields:', () => {});
//             | Registration title |
//             | Date               |
And("they see that items' status is one of {string}", () => {});
And('they see that each item in the list is expandable', () => {});
//         Examples:
//             | RequestType      | RequestStatus                 |
//             | DoiRequests      | Approved, Rejected, Requested |
//             | Support Requests | Pending, Resolved             |

//     Scenario: Creator views details of an item in the Messages list
//         Given that the Creator opens My Messages
//         When they expand an item
//         Then they see the item's Publication title
//         And they see a list of Messages between Creator and Curator with fields:
//             | Message   |
//             | Submitter |
//             | Date      |
//         And they see an input field for Answer
//         And they see buttons
//             | Send Answer       |
//             | Go to Publication |
//             | Archive           |

//     Scenario: Creator closes a message
//         Given that the Creator Opens a message from My Messages
//         When they click the Close button
//         Then they see the Worklist

//     @TEST_NP-4193
//     @1251
//     @test
//     Scenario: Creator opens a Registration with a DOI request
Given('that the Creator Opens a DOI request entry from My Messages', () => {
  cy.login(userDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.myPageLink}]`).click();
  cy.get(`[data-testid=${dataTestId.myPage.messagesLink}]`).click();
  cy.get('[data-testid^=message-title]')
    .first()
    .parent()
    .parent()
    .within(() => {
      cy.get('[data-testid="ExpandMoreIcon"]').click();
    });
});
When('they click the Edit Registration button', () => {
  cy.get('[data-testid^=go-to-registration]').filter(':visible').first().click();
});
Then('the Registration is opened in the Wizard on the first tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
});

//     Scenario: Creator deletes a DOI request
//         Given that the Creator opens My Worklist
//         When they click the Delete button on a DOI request
//         Then the request is deleted from their Worklist
//         And the request is deleted from the Worklist of their Curator
//         And the Landing Page for Publication has an enabled "Request DOI" button

//     Scenario: Creator adds a new message on a message thread
//         Given that a User is logged in as Creator
//         And they open My Messages page
//         And they open a DOI request item in the Messages list
//         And they see previous messages between Creator and Curator(s)
//         When they enter a new message
//         And they click the Send Answer button
//         Then they see that the new message is added to the Messages list
