// Feature: Permissions given claimed publisher

import { BeforeAll, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { v4 as uuid } from 'uuid';
import { dataTestId } from '../../../support/dataTestIds';

const notAllowed = 'Not Allowed';
const allowrd = 'Allowrd';

BeforeAll(() => {
  // - student thesis curator
  // - publication owner
  // - contributor
  // - editor
  // - other curator
});

//   Scenario Outline: Verify operation when user is not from the same organization as claimed publisher
Given('a "published" publication', () => {});
Given('publication is a degree', () => {});
Given('publication has claimed publisher', () => {});
When('the user have the role {string}', (userRole) => {
  cy.wrap(userRole).as('userRole');
});
Then('the user is {string} to partial update', (canPartialUpdate) => {
  cy.get('@userRole').then((userRole) => {
    const role = userRole.toString();
    if (role !== 'External client' && role !== 'Related external client') {
      if (canPartialUpdate === notAllowed) {
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).should('not.exist');
      }
    }
  });
});
Then('the user is {string} to update', (canUpdate) => {
  cy.get('@userRole').then((userRole) => {
    const role = userRole.toString();
    if (role !== 'External client' && role !== 'Related external client') {
      if (canUpdate === notAllowed) {
        cy.getDataTestId(dataTestId.registrationLandingPage.editButton).should('not.exist');
      }
    }
  });
});
Then('the user is {string} to unpublish', (canUnpublish) => {
  cy.get('@userRole').then((userRole) => {
    const role = userRole.toString();
    if (role !== 'External client' && role !== 'Related external client') {
      if (canUnpublish === notAllowed) {
        if (role === 'Everyone else') {
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishingRequestAccordion).should(
            'not.exist'
          );
        }
      }
    }
  });
});

// Examples:
//   | UserRole                          | partial-update | update      | unpublish   |
//   | Everyone else                     | Not Allowed    | Not Allowed | Not Allowed |
//   | External client                   | Not Allowed    | Not Allowed | Not Allowed |
//   | Publication owner                 | Allowed        | Not Allowed | Not Allowed |
//   | Contributor                       | Allowed        | Not Allowed | Not Allowed |
//   | File, support, doi or nvi curator | Allowed        | Not Allowed | Not Allowed |
//   | Editor                            | Allowed        | Not Allowed | Not Allowed |
//   | Related external client           | Allowed        | Not Allowed | Not Allowed |
//   | Degree file curator               | Allowed        | Allowed     | Allowed     |

//   Scenario Outline: Verify update operation when user is from the same organization as claimed
//   publisher and publication has no approved files
Given('publication has no approved files', () => {});
Given('publisher is claimed by organization', () => {});
When('the user is from the same organization as claimed publisher', () => {});
When('the user attempts to "update"', () => {});
Then('the action outcome is {string', (outcome) => {});

// Examples:
//   | UserRole                          | Outcome     |
//   | Everyone else                     | Not Allowed |
//   | External client                   | Not Allowed |
//   | Publication owner                 | Allowed     |
//   | Contributor                       | Allowed     |
//   | File, support, doi or nvi curator | Allowed     |
//   | Editor                            | Allowed     |
//   | Degree file curator               | Allowed     |
//   | Related external client           | Allowed     |

//   Scenario Outline: Verify permission when
// user is from the same organization as claimed publisher
When('the user is from the same organization as claimed publisher', () => {});

// Examples:
//   | UserRole                          | update      | unpublish   | approve-files |
//   | Everyone else                     | Not Allowed | Not Allowed | Not Allowed   |
//   | External client                   | Not Allowed | Not Allowed | Not Allowed   |
//   | Publication owner                 | Not Allowed | Not Allowed | Not Allowed   |
//   | Contributor                       | Not Allowed | Not Allowed | Not Allowed   |
//   | File, support, doi or nvi curator | Not Allowed | Not Allowed | Not Allowed   |
//   | Editor                            | Allowed     | Allowed     | Not Allowed   |
//   | Related external client           | Allowed     | Allowed     | Not Allowed   |
//   | Degree file curator               | Allowed     | Allowed     | Allowed       |
