import {
  userBIBSYSUnreadMessages,
  userBIBSYSMessages,
  userBIBSYSCollaborationCurator,
  CategoryTypes,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import { createPublicationUsingAPI, NviLevels } from '../../../support/create_registration';
// Feature: Registrator worklist

const doiRequests = 'DoiRequests';
const publishingRequests = 'Publishing Requests';
const supportRequests = 'Support Requests';

const filename = 'example.txt';
const registrationTitle = 'Registration with messages';

const USER_BIBSYS = 'Messages TestUser';

const filterMessages = (messageType: string) => {
  if (!(messageType === publishingRequests)) {
    cy.get('body')
      .find(`[data-testid=${dataTestId.tasksPage.typeSearch.publishingButton}]`)
      .then(($button) => {
        if ($button.hasClass('MuiButton-contained')) {
          cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
          cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        }
      });
  } else {
    cy.get('body')
      .find(`[data-testid=${dataTestId.tasksPage.typeSearch.publishingButton}]`)
      .then(($button) => {
        if ($button.hasClass('MuiButton-outlined')) {
          cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
          cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        }
      });
  }
  if (!(messageType === doiRequests)) {
    cy.get('body')
      .find(`[data-testid=${dataTestId.tasksPage.typeSearch.doiButton}]`)
      .then(($button) => {
        if ($button.hasClass('MuiButton-contained')) {
          cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
          cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        }
      });
  } else {
    cy.get('body')
      .find(`[data-testid=${dataTestId.tasksPage.typeSearch.doiButton}]`)
      .then(($button) => {
        if ($button.hasClass('MuiButton-outlined')) {
          cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
          cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        }
      });
  }
  if (!(messageType === supportRequests)) {
    cy.get('body')
      .find(`[data-testid=${dataTestId.tasksPage.typeSearch.supportButton}]`)
      .then(($button) => {
        if ($button.hasClass('MuiButton-contained')) {
          cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
          cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        }
      });
  } else {
    cy.get('body')
      .find(`[data-testid=${dataTestId.tasksPage.typeSearch.supportButton}]`)
      .then(($button) => {
        if ($button.hasClass('MuiButton-outlined')) {
          cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
          cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
        }
      });
  }
};

const initData = () => {
  cy.login(userBIBSYSMessages).then(() => {
    const doiTitle = `Registration with DOI request ${uuidv4()}`;
    createPublicationUsingAPI(doiTitle, CategoryTypes.ACADEMIC_ARTICLE, USER_BIBSYS, NviLevels.LEVEL_1).then();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.searchFor(doiTitle);
    cy.contains(doiTitle).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
    cy.getDataTestId(dataTestId.registrationLandingPage.doiMessageField).type('DOI Support message{enter}');
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
    cy.getSuccessDone();

    cy.startWizardWithEmptyRegistration();
    cy.createValidRegistration(null, `${registrationTitle}, ${uuidv4()}`);
    cy.getDataTestId(dataTestId.registrationWizard.formActions.openSupportButton).click();
    cy.getDataTestId(dataTestId.tasksPage.messageField).type('Support message{enter}');
    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
    cy.getSuccessDone();
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
    cy.getSuccessDone();
  });
};

BeforeAll(() => initData());

//     Scenario Outline: Creator opens My Messages
Given('that the user is logged in as Creator', () => {
  cy.login(userBIBSYSUnreadMessages);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, `${registrationTitle} ${uuidv4()}`);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.reload();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).click();
  cy.getDataTestId('message-field').last().type('Test message{enter}');
  cy.getDataTestId('message-field').last().should('not.contain', 'Test message');
  cy.getSuccessDone();
});
When('they click the menu item My Messages', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
});
Then('they see the My Messages page', () => {
  cy.location('pathname').should('contain', 'my-messages');
});
Then('they see a list of messages with fields:', (dataTable: DataTable) => {
  const elements = {
    'Registration title': () => {
      return cy.get(`[data-testid=${dataTestId.startPage.searchResultItem}] > div > p`).should('not.be.empty');
    },
    'Date': () => {
      return cy.get('p').last().should('not.be.empty');
    },
  };
  dataTable.raw().forEach((element) => {
    cy.getDataTestId(dataTestId.startPage.searchResultItem)
      .first()
      .parent()
      .within(() => {
        elements[element[0]]();
      });
  });
});
//             | Registration title |
//             | Date               |
Then("they see that items' status is one of:", (dataTable: DataTable) => {
  cy.getDataTestId(dataTestId.myPage.myMessages.ticketStatusField).click({ force: true });

  dataTable.raw().forEach((element) => {
    filterMessages(element[0]);
    const status = element[1].replace(',', '').split(' ');
    cy.get(`[data-testid^=${dataTestId.startPage.searchResultItem}]`).should('have.length.above', 0);
  });
});
//             | DoiRequests      | Approved, Rejected, Requested |
//             | Publishing Requests | Approved, Rejected, Requested |
//             | Support Requests | Pending, Resolved             |
Then('they see that each item in the list is expandable', () => {});

//     Scenario: Creator opens a Registration with a DOI request
Given('that the Creator Opens a DOI request entry from My Messages', () => {
  cy.login(userBIBSYSMessages);
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
  cy.wait(1000);
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
  cy.login(userBIBSYSMessages);
});
Given('they open My Messages page', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.wait(1000);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
});
Given('they open a DOI request item in the Messages list', () => {
  filterMessages(supportRequests);
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().parent().parent().parent().click();
});
Given('they see previous messages between Creator and Curator\\(s)', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).click();
  cy.contains('DOI Support message');
});
When('they enter a new message', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).within(() => {
    cy.getDataTestId('message-field').type('New message from user{enter}');
  });
});
When('they click the Send Answer button', () => {});
Then('they see that the new message is added to the Messages list', () => {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).within(() => {
      cy.get('label').should('contain', 'Message');
      cy.getDataTestId('message-field').should('not.contain','New message from user');
    });
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).should(
    'contain',
    'New message from user'
  );
});
