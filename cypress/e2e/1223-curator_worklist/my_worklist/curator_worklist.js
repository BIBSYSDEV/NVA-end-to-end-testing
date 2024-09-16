import { Before } from 'cypress-cucumber-preprocessor/steps';
import { userCurator2, userDoiCurator, userMessages, userNviCurator, userPublishingCurator, userSupportCurator } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

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
}

const requestTypes = {
  'Approval': dataTestId.tasksPage.typeSearch.publishingButton,
  'DOI': dataTestId.tasksPage.typeSearch.doiButton,
  'Support': dataTestId.tasksPage.typeSearch.supportButton,
  'NVI': dataTestId.tasksPage.nvi.statusFilter.pendingRadio,
}

const filename = 'example.txt';
const registrationTitle = 'Support message registration';

Before(() => {
  // cy.login(userCurator2);
});

//   Scenario: Curator opens their Worklist
When('the {string} opens their Worklist', (user) => {
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
  cy.get('@user').then(user => {
    if (user === 'Nvi-Curator') {
      cy.contains('Sikt');
    } else {
      cy.get('[value=BIBSYS]');
      // cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).click();
    }
  })
});
And('the Worklist contains Requests of type {string}', (type) => {
  cy.getDataTestId(requestTypes[type]);
});
// | Approval |
// | Support |
// | DOI |
// | Ownership |

// Scenario Outline: Curator views all Requests of a type
When('{string} clicks on Requests of type {string}', (user, type) => {
  cy.wrap(type).as('type');
  cy.wrap(user).as('user');
  cy.login(curatorUsers[user]);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  if (user === 'Nvi-Curator') {
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  } else {
    cy.get('[value=BIBSYS]');
    // cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).click();
  }
});
Then('Curator see a list of Requests displayed with:', (dataTable) => {
  cy.get('@user').then(user => {
    cy.get('@type').then((type) => {
      const elements = {
        'Request status': 'div > div > p',
        'Registration title': 'div > p',
        'Submitter name': 'div > div > div',
        'Request Submitter Date': 'div > p',
        'Beginning of last message': '',
        'Owner name': '',
      };
      if (user === 'Nvi-Curator') {
        cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).within(() => {
          cy.get('li').first().within(() => {
            cy.get('div > span');
            cy.get('div > p').should('have.length', 4);
            cy.get('div > p > a').should('have.length', 2);
          });
        });
      } else {
        cy.getDataTestId(dataTestId.startPage.searchResultItem)
          .first()
          .within((message) => {
            if (type === 'Support') {
              elements['Request status'] = 'div > p';
            }
            dataTable.rawTable.forEach((value) => {
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
And('they see that each Request can be opened', () => { });
// Examples:
//   | Type      |
//   | Approval  |
//   | Support   |
//   | DOI       |

// Scenario: Curator opens a unassigned Request
When('the {string} open a unassigned Request of type {string}', (user, type) => {
  cy.login(curatorUsers[user]);
  cy.wrap(user).as('user');
  cy.wrap(type).as('type');
  const title = `Open unassigned ${user} ${type}`
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  if (user === 'Nvi-Curator') {
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.wait(3000);
    cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).filter(`:contains("${title}")`).within(() => {
      cy.get('li > div > p > a').first().click();
    });
  } else {
    cy.get('[value=BIBSYS]');
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.wait(3000);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${title}")`).click();
  }
});
Then('the Curator is assigned the Request', () => {
  cy.getDataTestId('message-field').last().type('Test message{enter}');
  cy.get('ul > li > p').filter(':contains("Test message")').should('be.visible');
});
And('the Request Status is set to "Active"', () => {
  cy.get('@user').then(user => {
    if (user === 'Nvi-Curator') {
      cy.contains('Note saved successfully')
    } else {
      cy.contains('Message sent');
    }
    // cy.wait(3000);
    cy.getDataTestId(dataTestId.header.tasksLink).click();
    if (user === 'Nvi-Curator') {
    } else {
      cy.getDataTestId(dataTestId.myPage.myMessages.ticketStatusField).click();
      cy.get('[data-value=Completed]').click();
      cy.get('[data-value=Completed]').type('{esc}');
      cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
    }
  })
});

// Scenario: Curator unassigns a Request
When('the {string} selects "Mark request unread" on a request of type {string}', (user, type) => {
  cy.login(curatorUsers[user]);
  cy.wrap(user).as('user');
  const title = `Unassign ${user} ${type}`;
  cy.wrap(title).as('title');
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  if (user === 'Nvi-Curator') {
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).filter(`:contains("${title}")`).within(() => {
      cy.get('li > div > p > a').first().click();
    });
  } else {
    cy.get('[value=BIBSYS]');
    // cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).click();
    cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${title}")`).first().click();
  }
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeSearchField).should('be.visible');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeSearchField).click();
  cy.wait(3000);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeSearchField).type('{downArrow}{enter}')
  cy.getDataTestId(dataTestId.tasksPage.messageField).last().type('Curator message{enter}');
  if (user === 'Nvi-Curator') {
    cy.contains('Note saved successfully');
    cy.wait(5000);
  } else {
    cy.contains('Message sent');
  }
  cy.get('[title=Tasks]').click();

  if (user === 'Nvi-Curator') {
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
    cy.getDataTestId(dataTestId.tasksPage.nvi.statusFilter.assignedRadio).within(() => {
      cy.get('input').click();
    })
    cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).within(() => {
      cy.get('li > div > p > a').filter(`:contains(${title})`).click();
    });
  } else {
    cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`).first().click();
  }
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.assigneeIndicator).should('be.visible');
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
  cy.wait(6000)
  cy.get('[title=Tasks]').click();
  cy.get('@user').then(user => {
    cy.get('@title').then(title => {
      if (user === 'Nvi-Curator') {
        cy.get('li').filter(`:contains(${title})`).should('not.exist');
      } else {
        cy.getDataTestId(dataTestId.tasksPage.curatorSelector).click();
        cy.contains(`${user} TestUser`, { matchCase: false }).click();
        cy.contains(title).should('not.exist');
      }
    });
  });
});

// Scenario: Curator open a assigned Request
When('the Curator selects a Request', () => {
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

// Scenario Outline: Curator open the Request's Resource
Given('the {string} receives a Request of type {string}', (user, type) => {
  cy.login(curatorUsers[user]);
  cy.wrap(user).as('user');
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  if (user === 'Nvi-Curator') {
    cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
  } else {
    cy.get('[value=BIBSYS]');
    cy.getDataTestId(dataTestId.tasksPage.curatorSelector).click();
    cy.getDataTestId(dataTestId.tasksPage.curatorSelector).within(() => {
      cy.getDataTestId('CloseIcon').click();
    });
  }
  cy.wrap(type).as('type');
  const title = `Open ${user} ${type}`;
  cy.wrap(title).as('title')
});
When('the Curator opens the Requests Resource', () => {
  cy.get('@user').then(user => {
    cy.get('@title').then(title => {
      if (user === 'Nvi-Curator') {
        cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).filter(`:contains("${title}")`).first().within(() => {
          cy.get('li > div > p > a').first().click();
        });
      } else {
        cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
        cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains("${title}")`).first().click();
      }
    });
  });
});
Then('the Landing Page of the Resource is viewed', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.registrationSubtype).should('exist');
});
And('the Curator has the option to {string}', (action) => {
  const typeActions = {
    'Publish Files': dataTestId.registrationLandingPage.tasksPanel.publishingRequestAcceptButton,
    'Reject publishing': dataTestId.registrationLandingPage.tasksPanel.publishingRequestRejectButton,
    'Answer Message': dataTestId.tasksPage.messageField,
    'Mint DOI': dataTestId.registrationLandingPage.tasksPanel.createDoiButton,
    'Reject DOI request': dataTestId.registrationLandingPage.rejectDoiButton,
    'Approve Candidate': dataTestId.tasksPage.nvi.approveButton,
    'Reject Candidate': dataTestId.tasksPage.nvi.rejectButton,
  }
  if (action === 'Answer Message') {
    cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).click();
  }
  cy.getDataTestId(typeActions[action]).should('be.visible');
});
And('the Curator can Decline the Request', () => {
  const typeDeclineActions = {
    'Approval': dataTestId.registrationLandingPage.tasksPanel.publishingRequestRejectButton,
    'DOI': dataTestId.registrationLandingPage.rejectDoiButton,
  }
  cy.get('@type').then(type => {
    cy.getDataTestId(typeDeclineActions[type]).should('be.visible');
  })
})
// Examples:
// | Type      | Action       |
// | Approval  | Publish      |
// | DOI       | Mint DOI     |
// | Ownership | Change owner |

const curatorAnswer = 'Test Curator answered';

// Scenario: User gets an answer to a Support Request
When('the Curator sends an answer of type "Support"', () => {
  cy.login(userMessages);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, registrationTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.supportAccordion).click();
  cy.getDataTestId('message-field').last().type('Test message{enter}');
  cy.contains('Message sent');
  cy.wait(10000);

  cy.login(userCurator2);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.get('[value=BIBSYS]');
  // cy.getDataTestId(dataTestId.tasksPage.dialoguesWithoutCuratorButton).click();
  cy.filterMessages('Support Requests');
  cy.getDataTestId(dataTestId.startPage.searchResultItem).first().click();
  cy.getDataTestId('message-field').last().type(`${curatorAnswer}{enter}`);
  cy.contains('Message sent');
})
Then('the Request status is set to "Answered"', () => {
  cy.login(userMessages);
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
})
And('the User can read the answer in My Messages', () => {
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${registrationTitle}{enter}`)
  cy.getDataTestId(dataTestId.startPage.searchResultItem).parent().parent().filter(`:contains(${curatorAnswer})`);
})

// Scenario: User gets an answer to a Request
When('the Curator writes an answer', () => { })
And('sends it to the User', () => { })
And('the Request Type is:', () => { })
// | Approval  |
// | DOI       |
// | Ownership |
Then('the User can see the answer in My Messages', () => { })

// Scenario Outline: Curator change Status on a Request
When('Curator selects a new status "<Status>" on a Request', () => { })
Then('the status of the Request is set to {string}', (status) => { })
// Examples:
//   | Status   |
//   | Archived |
//   | Deleted  |

// Scenario: Curator receives assignment of responses to requests they have previously responded to
When('the Curator:', () => { })
// | Sends an answer          |
// | Publishes a resource     |
// | Mints a DOI              |
// | Declines a DOI           |
// | Changes Owner            |
// | Declines change of owner |
Then('the Curator is Assigned the Request', () => { })

// Scenario: Curator receives Requests in their scope
Given('the Request is of type:', () => { })
// | Approval |
// | Support  |
// | DOI      |
When("the Requests' Submitter is Affilliated within the Curators Scope", () => { })
Then('the Request is part of the Curators Worklist', () => { })

// Scenario: Curator receives Requests they have been assigned from outside their scope
Given('the Request is of type:', () => { })
// | Approval |
// | Support  |
// | DOI      |
When('the Curator is assigned the Request', () => { })
Then('the Request is part of the Curators Worklist', () => { })

// Scenario: Curator receives Ownership requests within their scope
Given('the Request is of type "Ownership"', () => { })
When('the Affilliation of the Owner of the Resource associated with the Request is within Curators Scope', () => { })
Then('the Request is part of the Curators Worklist', () => { })

// Scenario: Curator receives Ownership requests they have been assigned from outside their scope
Given('the Request is of type "Ownership"', () => { })
When('the Curator is assigned the Request', () => { })
Then('the Request is part of the Curators Worklist', () => { })
