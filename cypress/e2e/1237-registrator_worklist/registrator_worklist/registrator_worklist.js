import { unreadUserMessages, userMessages } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';
// Feature: Registrator worklist

const doiRequests = 'DoiRequests';
const publishingRequests = 'Publishing Requests';
const supportRequests = 'Support Requests';

const filename = 'example.txt';
const registrationTitle = 'Registration with messages';

const filterMessages = ((messageType) => {
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).then($button => {
    const publishingRequestFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((publishingRequestFilter && !(messageType === publishingRequests)) ||
      (!publishingRequestFilter && messageType === publishingRequests)) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click({force: true});
  });
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).then(($button) => {
    const doiRequestFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((doiRequestFilter && !(messageType === doiRequests)) || (!doiRequestFilter && messageType === doiRequests)) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click({force: true});
  });
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).then(($button) => {
    const supportFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((supportFilter && !(messageType === supportRequests)) || (!supportFilter && messageType === supportRequests)) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click({force: true});
  });
});

//     Scenario Outline: Creator opens My Messages
Given('that the user is logged in as Creator', () => {
  cy.login(unreadUserMessages);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, `${registrationTitle} ${uuidv4()}`);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).click();
  cy.getDataTestId('message-field').last().type('Test message{enter}');
  cy.contains('Message sent');
  // cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
  cy.wait(6000);
});
When('they click the menu item My Messages', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
});
Then('they see the My Messages page', () => {
  cy.location('pathname').should('contain', 'my-messages');
});
And('they see a list of messages with fields:', (dataTable) => {
  const elements = {
    'Registration title': () => {
      return cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > div > span`).should('not.be.empty');
    },
    'Date': () => {
      return cy.get('span').last().should('not.be.empty');
    },
  };
  dataTable.rawTable.forEach((element) => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem)
      .first()
      .parent()
      .within(() => {
        elements[element]();
      });
  });
});
//             | Registration title |
//             | Date               |
And("they see that items' status is one of:", (dataTable) => {
  // cy.getDataTestId(dataTestId.myPage.myMessages.ticketStatusField).click();
  // cy.get('[data-value=Pending]').click();
  // cy.get('[data-value=Closed]').click();
  // cy.get('[data-value=Completed]').click();
  cy.getDataTestId(dataTestId.myPage.myMessages.ticketStatusField).click({force: true});

  dataTable.rawTable.forEach((element) => {
    filterMessages(element[0]);
    const status = element[1].replace(',', '').split(' ');
    cy.get(`[data-testid^=${dataTestId.startPage.searchResultItem}]`).should('have.length.above', 0);
  });
});
//             | DoiRequests      | Approved, Rejected, Requested |
//             | Publishing Requests | Approved, Rejected, Requested |
//             | Support Requests | Pending, Resolved             |
And('they see that each item in the list is expandable', () => {});

//     Scenario: Creator closes a message
Given('that the Creator Opens a message from My Messages', () => {
  cy.login(userMessages);
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
  cy.getDataTestId(dataTestId.startPage.searchResultItem).click();
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('not.exist');
});
When('they click the Close button', () => {
  cy.get('[title=tasks]').click();
});
Then('they see the Worklist', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
});

//     Scenario: Creator opens a Registration with a DOI request
Given('that the Creator Opens a DOI request entry from My Messages', () => {
  cy.login(userMessages);
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
  filterMessages(doiRequests);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().click();
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
});
And('they open My Messages page', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
});
And('they open a DOI request item in the Messages list', () => {
  filterMessages(supportRequests);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().click();
});
And('they see previous messages between Creator and Curator\\(s)', () => {});
When('they enter a new message', () => {});
And('they click the Send Answer button', () => {});
Then('they see that the new message is added to the Messages list', () => {});
