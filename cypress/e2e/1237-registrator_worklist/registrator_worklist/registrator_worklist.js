import { userMessages } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";
// Feature: Registrator worklist


//     Scenario Outline: Creator opens My Messages
Given('that the user is logged in as Creator', () => {
  cy.login(userMessages);
});
When('they click the menu item My Messages', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
});
Then('they see the My Messages page', () => {
  cy.location('pathname').should('contain', 'my-messages');
});
And('they see a list of messages with fields:', (dataTable) => {
  const elements = {
    'Registration title': () => {
      return cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > div > span`,).should('not.be.empty');
    },
    'Date': () => {
      return cy.get('span').last().should('not.be.empty')
    },
  }
  dataTable.rawTable.forEach(element => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).first().parent().within(() => {
      elements[element]();
    })
  });
});
//             | Registration title |
//             | Date               |
And("they see that items' status is one of:", () => { });
//             | DoiRequests      | Approved, Rejected, Requested |
//             | Support Requests | Pending, Resolved             |
And('they see that each item in the list is expandable', () => { });

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

//     Scenario: Creator opens a Registration with a DOI request
Given('that the Creator Opens a DOI request entry from My Messages', () => {
  cy.login(userDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.myPageLink}]`).click();
  cy.get(`[data-testid=${dataTestId.myPage.messagesLink}]`).click();
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
