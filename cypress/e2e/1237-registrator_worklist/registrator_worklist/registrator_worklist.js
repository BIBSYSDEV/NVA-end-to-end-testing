import { userMessages } from "../../../support/constants";
import { dataTestId } from "../../../support/dataTestIds";
// Feature: Registrator worklist

const doiRequests = 'DoiRequests';
const publishingRequests = 'Publishing Requests';
const supportRequests = 'Support Requests';

const filterMessages = ((messageType) => {
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).then($button => {
    const publishingRequestFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((publishingRequestFilter && !(messageType === publishingRequests)) ||
      (!publishingRequestFilter && (messageType === publishingRequests))) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
  })
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).then($button => {
    const doiRequestFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((doiRequestFilter && !(messageType === doiRequests)) ||
      (!doiRequestFilter && (messageType === doiRequests))) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
  })
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).then($button => {
    const supportFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((supportFilter && !(messageType === supportRequests)) ||
      (!supportFilter && (messageType === supportRequests))) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
  })
})


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
And("they see that items' status is one of:", (dataTable) => {
  dataTable.rawTable.forEach(element => {
    filterMessages(element[0]);
    const status = element[1].replace(',', '').split(' ');
    cy.get(`[data-testid^=${dataTestId.startPage.searchResultItem}]`).should('have.length.above', 0);
  });
});
//             | DoiRequests      | Approved, Rejected, Requested |
//             | Publishing Requests | Approved, Rejected, Requested |
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
  cy.login(userMessages);
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
  filterMessages(doiRequests);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().find('p > a').first().click();
});
When('they click the Edit Registration button', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
});
Then('the Registration is opened in the Wizard on the first tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.titleField).should('be.visible');
});

//     Scenario: Creator deletes a DOI request
//         Given that the Creator opens My Worklist
//         When they click the Delete button on a DOI request
//         Then the request is deleted from their Worklist
//         And the request is deleted from the Worklist of their Curator
//         And the Landing Page for Publication has an enabled "Request DOI" button

//     Scenario: Creator adds a new message on a message thread
Given('that a User is logged in as Creator', () => {
  cy.login(userMessages);
})
And('they open My Messages page', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
})
And('they open a DOI request item in the Messages list', () => {
  filterMessages(supportRequests);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().find('p > a').first().click();
})
And('they see previous messages between Creator and Curator\\(s)', () => { })
When('they enter a new message', () => { })
And('they click the Send Answer button', () => { })
Then('they see that the new message is added to the Messages list', () => { })
