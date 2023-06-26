import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userCurator, userCuratorWithAuthor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

const messageTypes = {
  'Approval': 'Publishing Requests',
  'Support': 'Support Requests',
  'DOI': 'DoiRequests',
};

Before(() => {
  cy.login(userCurator);
});

//   Scenario: Curator opens their Worklist
When('the Curator opens their Worklist', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
});
Then('the Curator see that the Worklist is Scoped', () => {
  cy.contains('Limited to: "BIBSYS"');
});
And('the Worklist contains Requests of type:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.filterMessages(messageTypes[value[0]]),
      cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
  });
});
// | Approval |
// | Support |
// | DOI |
// | Ownership |

// Scenario Outline: Curator views all Requests of a type
When('Curator clicks on Requests of type {string}', (type) => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.filterMessages(messageTypes[type]);
  cy.wrap(type).as('type');
});
Then('Curator see a list of Requests displayed with:', (dataTable) => {
  const elements = {
    'Request status': 'div > div > p',
    'Registration title': 'div > p',
    'Submitter name': 'div > div > div',
    'Request Submitter Date': 'div > p',
    'Beginning of last message': '',
    'Owner name': '',
  };
  cy.getDataTestId(dataTestId.startPage.searchResultItem)
    .first()
    .within((message) => {
      cy.get('@type').then((type) => {
        if (type === 'Support') {
          elements['Request status'] = 'div > p';
        }
        dataTable.rawTable.forEach((value) => {
          cy.get(elements[value[0]]).should('be.visible');
        });
      });
    });
});
//   | Request status            |
//   | Registration title        |
//   | Submitter name            |
//   | Request Submitter Date    |
//   | Beginning of last message |
//   | Owner name                |
And('they see that each Request can be opened', () => { });
// Examples:
//   | Type      |
//   | Approval  |
//   | Support   |
//   | DOI       |

// Scenario: Curator opens a unassigned Request
When('the Curator open a unassigned Request', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().click();
});
Then('the Curator is assigned the Request', () => {
  cy.getDataTestId('message-field').type('Test message{enter}');
  cy.get('ul > li > p').filter(':contains("Test message")').should('be.visible');
});
And('the Request Status is set to "Active"', () => {
  cy.contains('Message sent');
  cy.wait(3000);
  cy.get('[title=Tasks]').click();
  cy.getDataTestId(dataTestId.tasksPage.searchMode.myUserDialogsButton).click();
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
});

// Scenario: Curator unassigns a Request
When('the Curator selects "Mark request unread"', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.searchMode.myUserDialogsButton).click();
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeIndicator).should('be.visible');
  cy.wait(1000);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeSearchField).within(() => {
    cy.getDataTestId('CloseIcon').click({ force: true });
  });
  cy.contains('Successfully updated curator');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeIndicator)
    .filter(':contains("ST")')
    .should('not.exist');
});
Then('the Request Status is set to "New"', () => { });
And('the Request is unassigned the Curator', () => {
  cy.get('[title=Tasks]').click();
  cy.getDataTestId(dataTestId.tasksPage.searchMode.newUserDialogsButton).click();
  cy.wait(3000);
  cy.getDataTestId(dataTestId.tasksPage.searchMode.myUserDialogsButton).click();
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('not.exist');
});

// Scenario: Curator open a assigned Request
When('the Curator selects a Request', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
});
Then('the Request is expanded', () => { });
And('the assigned Curator is viewed', () => { });
And('previous messages are displayed chronologically with:', () => { });
// | Submitter name          |
// | Submitter Date and Time |
// | The full message        |
And('the Curator can reply to a message', () => { });
And('the Curator can open the Requests Resource', () => { });
And('the Curator can change the Status of the Request', () => { });
