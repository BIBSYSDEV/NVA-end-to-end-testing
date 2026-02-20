// Feature: Curator tasks and message flow

import {
  CategoryTypes,
  userName,
  userSintefDOICuratorMessages,
  userSintefDOIMessages,
  userSintefPublicationCuratorMessages,
  userSintefPublicationMessages,
  userSintefSupportCuratorMessages,
  userSintefSupportMessages,
} from '../../../support/constants';
import { v4 as uuidv4 } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
  createPublicationUsingAPI,
  NviLevels,
  registrationBuilder,
  RegistrationData,
  uploadFileToRegistration,
} from '../../../support/create_registration';

const PUBLISHING_CURATOR = 'Publish-curator';
const DOI_CURATOR = 'DOI-curator';
const SUPPORT_CURATOR = 'Support-curator';
const PUBLISHING_REQUEST = 'Publish';
const DOI_REQUEST = 'Allocate DOI';
const SUPPORT_REQUEST = 'Support';

const curatorUsers = {
  [PUBLISHING_CURATOR]: userSintefPublicationCuratorMessages,
  [DOI_CURATOR]: userSintefDOICuratorMessages,
  [SUPPORT_CURATOR]: userSintefSupportCuratorMessages,
};

const users = {
  [PUBLISHING_REQUEST]: userSintefPublicationMessages,
  [DOI_REQUEST]: userSintefDOIMessages,
  [SUPPORT_REQUEST]: userSintefSupportMessages,
};

const fileName = 'example.txt';

// Scenario Outline: Curator unassigned task numbers
Given('a User with role {string}', (user: string) => {
  cy.login(curatorUsers[user]);
});
When('they view the main page for NVA', () => {
  cy.getDataTestId(dataTestId.startPage.searchResultItem).should('be.visible');
});
Then('they see the number of unassigned tasks', () => {
  cy.wait(5000);
  cy.getDataTestId(dataTestId.header.tasksLink).within(() => {
    cy.get('span > span > span').should('exist');
    cy.get('span > span > span').filter(':contains("0")').should('not.exist');
    cy.get('span > span > span').then(($it) => cy.wrap($it.text()).as('taskNumbers'));
  });
});
When('they view the Tasks page', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
});
Then('they see the number of dialogs without curator', () => {
  cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).within(() => {
    cy.get('span > span > span').should('exist');
    cy.get('@taskNumbers').then((taskNumber) => {
      cy.get('span > span > span').filter(`:contains("${taskNumber}")`);
    });
  });
});

// Examples:
//     | Role               |
//     | Publishing-curator |
//     | DOI-curator        |
//     | Support-curator    |

// Scenario Outline: Updating message numbers
Given('a User with role {string}', (role) => {});
When('they see the number of unassigned tasks', () => {});
When('a User with the role Creator send a {string} request', (type: string) => {
  const title = `Messages ${type} ${uuidv4()}`;
  cy.wrap(title).as('title');
  cy.login(users[type]).then(() => {
    createPublicationUsingAPI(title, CategoryTypes.ACADEMIC_ARTICLE, userName[users[type]], NviLevels.LEVEL_0).then(
      (builder) => {
        const registrationBuilder = builder as RegistrationData;
        uploadFileToRegistration(registrationBuilder.identifier, fileName).then((file) => {
          registrationBuilder
            .addFile(file)
            .update()
            .then(() => {});
        });
        cy.searchFor(title);
        cy.get('a').filter(`:contains(${title})`).click();
        switch (type) {
          case PUBLISHING_REQUEST:
            break;
          case DOI_REQUEST:
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
            cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
            break;
          case SUPPORT_REQUEST:
            cy.getDataTestId(dataTestId.tasksPage.messageField).type('Support message{enter}');
            break;
        }
      }
    );
  });
});
Then('the User with role {string} see that the number of unassigned tasks are increased', (role: string) => {
  cy.login(curatorUsers[role]);
  cy.get('@taskNumbers').then((taskNumbers) => {
    const value = Number(taskNumbers) + 1;
    cy.getDataTestId(dataTestId.header.tasksLink).within(() => {
      cy.get('span > span > span').should('exist');
      cy.get('span > span > span').filter(':contains("0")').should('not.exist');
      cy.get('span > span > span').filter(`:contains("${value.toString()}")`);
    });
  });
  cy.wait(10000);
});

// Examples:
//     | Role               | Type         |
//     | Publishing-curator | Publish      |
//     | DOI-curator        | Allocate DOI |
//     | Support-curator    | Support      |

// Scenario Outline: User dialog with curator
Given('a User with the role Creator sends a {string} request', (type: string) => {
  const title = `Messages ${type} ${uuidv4()}`;
  cy.wrap(title).as('title');
  cy.login(users[type]).then(() => {
    createPublicationUsingAPI(title, CategoryTypes.ACADEMIC_ARTICLE, userName[users[type]], NviLevels.LEVEL_0).then(
      (builder: unknown) => {
        const registrationBuilder = builder as RegistrationData;
        uploadFileToRegistration(registrationBuilder.identifier, fileName).then((file) => {
          registrationBuilder
            .addFile(file)
            .update()
            .then(() => {});
        });
      }
    );
  });
});
When('they send a message with the {string} request', (type) => {
  cy.wrap(type).as('type');
  cy.get('@title').then((title: unknown) => {
    const registrationTitle = title as string;
    cy.searchFor(registrationTitle);
    cy.get('a').filter(`:contains(${registrationTitle})`).click();
    switch (type) {
      case PUBLISHING_REQUEST:
        cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).within(() => {
          cy.getDataTestId(dataTestId.tasksPage.messageField).last().type('Publishing request message{enter}');
        });
        cy.getSuccessDone();
        break;
      case DOI_REQUEST:
        cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
        cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
        cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
        break;
      case SUPPORT_REQUEST:
        cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).within(() => {
          cy.getDataTestId(dataTestId.tasksPage.messageField).type('Support message{enter}');
        });
        break;
    }
  });
});
When('a curator with role {string} responds to the message', (role: unknown) => {
  cy.get('@type').then((type: unknown) => {
    const messageType = type as string;
    cy.get('@title').then((title: unknown) => {
      const registrationTitle = title as string;
      const curatorRole = role as string;
      cy.login(curatorUsers[curatorRole]);
      cy.getDataTestId(dataTestId.header.tasksLink).click();
      cy.searchFor(registrationTitle);
      cy.get('a').filter(`:contains(${registrationTitle})`).click();
      switch (messageType) {
        case PUBLISHING_REQUEST:
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).within(() => {
            cy.getDataTestId(dataTestId.tasksPage.messageField).last().type('Publishing response message{enter}');
          });
          cy.getSuccessDone();
          break;
        case DOI_REQUEST:
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).within(() => {
            cy.getDataTestId(dataTestId.tasksPage.messageField).last().type('DOI response message{enter}');
          });
          cy.getSuccessDone();
          break;
        case SUPPORT_REQUEST:
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).within(() => {
            cy.getDataTestId(dataTestId.tasksPage.messageField).type('Support response message{enter}');
          });
          break;
      }
    });
  });
});
Then('the Creator can read the message on the landing page of the Registration', () => {
  cy.get('@type').then((type: unknown) => {
    const messageType = type as string;
    cy.get('@title').then((title: unknown) => {
      const registrationTitle = title as string;
      cy.login(users[messageType]);
      cy.searchFor(registrationTitle);
      cy.get('a').filter(`:contains(${registrationTitle})`).click();
      switch (messageType) {
        case PUBLISHING_REQUEST:
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).within(() => {
            cy.contains('Publishing response message');
          });
          break;
        case DOI_REQUEST:
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).within(() => {
            cy.contains('DOI response message');
          });
          break;
        case SUPPORT_REQUEST:
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).within(() => {
            cy.contains('Support response message');
          });
          break;
      }
    });
  });
});

// Examples:
//     | Role               | Type         |
//     | Publishing-curator | Publish      |
//     | DOI-curator        | Reserve DOI  |
//     | DOI-curator        | Allocate DOI |
//     | DOI-curator        | Assign DOI   |
//     | DOI-curator        | Reject DOI   |
//     | Support-curator    | Support      |
