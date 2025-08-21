import {
  userPublishNoRights,
  userDoiCurator,
  userNviCurator,
  userPublishingCurator,
  userSupportCurator,
  userVerifiedContributor,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { currentYear, NVI_PENDING } from '../../../support/commands';
import { Before, Given, When, Then, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';

const messageTypes = {
  'Approval': 'Publishing Requests',
  'Support': 'Support Requests',
  'DOI': 'DoiRequests',
};

const curatorUsers = {
  'Publishing-Curator': userPublishingCurator,
  'Support-Curator': userSupportCurator,
  'Doi-Curator': userDoiCurator,
  'Nvi-Curator': userNviCurator,
};

const taskPanels = {
  'Publishing-Curator': dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion,
  'Support-Curator': dataTestId.registrationLandingPage.tasksPanel.supportAccordion,
  'Doi-Curator': dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion,
};

const requestTypes = {
  'Approval': dataTestId.tasksPage.typeSearch.publishingButton,
  'DOI': dataTestId.tasksPage.typeSearch.doiButton,
  'Support': dataTestId.tasksPage.typeSearch.supportButton,
  'NVI': 'status-filter',
};

const year = currentYear;
const filename = 'example.txt';
const registrationTitle = `Support message registration ${uuid()}`;
const publicationType = 'AcademicArticle';

const APPROVAL = 'Approval';
const SUPPORT = 'Support';
const DOI = 'DOI';
const NVI = 'NVI';

const createWorklistItem = (title, type) => {
  if (type === NVI) {
    cy.login(userVerifiedContributor);
  } else {
    cy.login(userPublishNoRights);
  }
  cy.createPublishedRegistration(title, publicationType, filename);
  cy.refreshPublish();
  switch (type) {
    case APPROVAL:
      break;
    case SUPPORT:
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).within(() => {
        cy.getDataTestId(dataTestId.tasksPage.messageField).type('Support message{enter}');
      });
      break;
    case DOI:
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
      break;
    case 'NVI':
      break;
  }
};

const users = {
  'Approval': 'Publishing-Curator',
  'Support': 'Support-Curator',
  'DOI': 'Doi-Curator',
  'NVI': 'Nvi-Curator',
};

const titles = {
  requestsTitle: (type) => `${type} request publication ${uuid()}`,
  openUnassignedTitle: (type) => `Open unassigned ${users[type]} ${type} ${uuid()}`,
  unassignTitle: (type) => `Unassign ${users[type]} ${type} ${uuid()}`,
  openTitle: (type) => `Open ${users[type]} ${type} ${uuid()}`,
};

const requestTitles = {};
const openUnassignedTitles = {};
const unassignTitles = {};
const openTitles = {};

BeforeAll(() => {
  const types = [APPROVAL, SUPPORT, DOI, NVI];

  types.forEach((type) => {
    const title = titles.requestsTitle(type);
    requestTitles[type] = title;
    createWorklistItem(title, type);
  });

  types.forEach((type) => {
    const title = titles.openUnassignedTitle(type);
    openUnassignedTitles[type] = title;
    createWorklistItem(title, type);
  });
});

//   Scenario: Curator opens their Worklist
When('the {string} opens their Worklist', (user: string) => {
  cy.login(curatorUsers[user]);
  cy.wrap(user).as('user');
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  if (user === 'Nvi-Curator') {
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  } else {
    // cy.getDataTestId(dataTestId.myPage.myMessages.ticketStatusField).type('{downarrow}{enter}{esc}');
  }
});
Then('the Curator see that the Worklist is Scoped', () => {
  cy.get('@user').then((user) => {
    if (user.toString() === 'Nvi-Curator') {
      cy.contains('Sikt');
    } else {
      cy.get('[value=BIBSYS]');
    }
  });
});
Then('the Worklist contains Requests of type {string}', (type: string) => {
  cy.getDataTestId(requestTypes[type]);
});
// | Approval |
// | Support |
// | DOI |
// | Ownership |

// Scenario Outline: Curator views all Requests of a type
When('{string} clicks on Requests of type {string}', (user: string, type: string) => {
  cy.wrap(type).as('type');
  cy.wrap(user).as('user');
  cy.login(curatorUsers[user]);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  if (user === 'Nvi-Curator') {
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
    cy.get(`[data-value=${year}]`).click();
  } else {
    cy.get('[value=BIBSYS]');
  }
});
Then('Curator see a list of Requests displayed with:', (dataTable: DataTable) => {
  cy.get('@user').then((user) => {
    cy.get('@type').then((type) => {
      const elements = {
        'Request status': 'div > div > p',
        'Registration title': 'div > p',
        'Submitter name': 'div > div > div',
        'Request Submitter Date': 'div > p',
        'Beginning of last message': '',
        'Owner name': '',
      };
      if (user.toString() === 'Nvi-Curator') {
        cy.selectNVIStatus(NVI_PENDING);
        cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).within(() => {
          cy.get('li')
            .first()
            .within(() => {
              cy.get('div > span');
              cy.get('div > p').should('have.length', 4);
              cy.get('div > p > a').should('have.length', 2);
            });
        });
      } else {
        cy.getDataTestId(dataTestId.startPage.searchResultItem)
          .first()
          .within((message) => {
            if (type.toString() === SUPPORT) {
              elements['Request status'] = 'div > p';
            }
            dataTable.raw().forEach((value) => {
              cy.get(elements[value[0]]).should('be.visible');
            });
          });
      }
    });
  });
});
//   | Request status            |
//   | Registration title        |
//   | Submitter name            |
//   | Request Submitter Date    |
//   | Beginning of last message |
//   | Owner name                |
Then('they see that each Request can be opened', () => {});
// Examples:
//   | Type      |
//   | Approval  |
//   | Support   |
//   | DOI       |

// Scenario: Curator opens a unassigned Request
When('the {string} open a unassigned Request of type {string}', (user: string, type: string) => {
  const title = openUnassignedTitles[type];
  cy.login(curatorUsers[user]);
  cy.wrap(user).as('user');
  cy.wrap(type).as('type');
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  if (user === 'Nvi-Curator') {
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.tasksPage.nvi.yearSelect).click();
    cy.get(`[data-value=${year}]`).click();
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.selectNVIStatus(NVI_PENDING);
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.wait(3000);
    cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList)
      .filter(`:contains("${title}")`)
      .within(() => {
        cy.get('li > div > p > a').first().click();
      });
  } else {
    cy.get('[value=BIBSYS]');
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.wait(3000);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${title}")`).first().click();
  }
});
Then('the Curator is assigned the Request', () => {
  cy.getDataTestId('message-field').last().type('Test message{enter}');
  cy.get('ul > li > p').filter(':contains("Test message")').should('be.visible');
});
Then('the Request Status is set to "Active"', () => {
  cy.get('@user').then((user) => {
    cy.getSuccess();
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    if (user.toString() === 'Nvi-Curator') {
    } else {
      cy.getDataTestId(dataTestId.myPage.myMessages.ticketStatusField).click();
      cy.wait(3000);
      cy.get('[data-value=Completed]').click();
      cy.get('[data-value=Completed]').type('{esc}');
      cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
    }
  });
});
