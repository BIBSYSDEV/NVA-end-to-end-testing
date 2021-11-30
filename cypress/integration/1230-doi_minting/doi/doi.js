import { USER_CURATOR_DRAFT_DOI, USER_DRAFT_DOI, USER_WITH_AUTHOR } from '../../../support/constants';

// Feature: DOI related scenarios moved from MVP feature

const publicRegistrationRequestingDoi = 'Published registration requesting DOI';
const publicRegistrationWithoutDoi = 'Published registration without DOI';
const draftRegistrationWithoutDoi = 'Draft registration without DOI';
const registrationTitle = 'Draft registration requesting DOI';
const filename = 'example.txt';

// Common steps

Given('that the Creator Opens a DOI request entry from My Worklist', () => {
  cy.login(USER_DRAFT_DOI);
  cy.get('[data-testid=my-messages]').click();
  cy.get('[data-testid^=message]')
    .first()
    .within(() => {
      cy.get('[data-testid="ExpandMoreIcon"]').click();
    });
});

// End common steps

//   @1247
//   Scenario: Creator Edits a comment on a DOI request
// And('the request has status Requested', () => {});
// When('they click the Edit button on a DOI request', () => {});
// Then('they can edit the comment', () => {});
// And('they see a Save button', () => {});

//   @1248
//   Scenario: Creator Saves a comment on a DOI request
// Given('that the Creator Edits a comment on a DOI request', () => {});
// When('they Save the comment', () => {});
// Then('the comment is saved', () => {});
// And('they see a confirmation message', () => {});
// And('they can no longer edit the comment', () => {});

//   @1250
//   Scenario: Creator closes a DOI request
// When('they click the Close button', () => {});
// Then('they see the Worklist', () => {});

//   @1251
//   Scenario: Creator opens a Registration with a DOI request
When('they click the Edit Registration button', () => {
  cy.get('[data-testid^=message]')
    .first()
    .within(() => {
      cy.get('[data-testid^=go-to-registration]').click();
    });
});
Then('the Registration is opened in the Wizard on the first tab', () => {
  cy.get('[data-testid="public-registration-status"]').should('be.visible');
});

//   @1240
//   Scenario: Creator deletes a DOI request
// Given('that the Creator opens My Worklist', () => {});
// When('they click the Delete button on a DOI request', () => {});
// Then('the request is deleted from their Worklist', () => {});
// And('the request is deleted from the Worklist of their Curator', () => {});
// And('the Landing Page for Registration has an enabled "Request DOI" button', () => {});

//   @511
//   Scenario: Owner opens the "Request a DOI" dialog

Given('that a Creator navigates to the Landing Page for Registration for published Registration without DOI', () => {
  cy.login(USER_DRAFT_DOI);
  cy.get('[data-testid=my-registrations]').click();
  cy.get('[data-testid=published-button]').click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${publicRegistrationWithoutDoi})`)
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').click();
    });
});
And('they are the Owner of this Registration', () => {});
And('they click the "Request a DOI" button', () => {
  cy.get('[data-testid=button-toggle-request-doi]').click();
});
Then('the "Request a DOI" dialog is opened', () => {
  cy.get('[data-testid=request-doi-modal]').should('be.visible');
});
And('they see fields for Message', () => {
  cy.get('[data-testid=request-doi-message]').should('be.visible');
});
And('they see a "Send Request" button', () => {
  cy.get('[data-testid=button-send-doi-request]').should('be.visible');
});

//   @1232
//   Scenario: Owner navigates to the Landing Page for Registration and requests a DOI
Given('that the Creator navigates to the Landing Page for Registration for published Registration without DOI', () => {
  cy.login(USER_DRAFT_DOI);
  cy.get('[data-testid=my-registrations]').click();
  cy.get('[data-testid=published-button]').click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${publicRegistrationRequestingDoi})`)
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').click();
    });
});
And('open "Request a DOI" dialog', () => {
  cy.get('[data-testid=button-toggle-request-doi]').click();
});
And('optional add a message to the Curator', () => {
  cy.get('textarea').first().type('Optional message');
});
When('the user click the Send Button', () => {
  cy.get('[data-testid=button-send-doi-request]').click();
});
Then('the Landing Page for Registration is displayed', () => {
  cy.location('pathname').should('contain', 'public');
});
And('the "Request a DOI" button is renamed to "DOI pending" and is disabled', () => {
  cy.get('[data-testid=button-send-doi-request]').should('not.exist');
});
And('the request is listed in User Worklist', () => {
  cy.get('[data-testid=my-messages]').click();
  cy.get('[data-testid^=message]')
    .filter(`:contains(${publicRegistrationRequestingDoi})`)
    .should('be.visible');
});
And('the request is listed in Curator Worklist', () => {
  cy.get('[data-testid=menu-button]').click();
  cy.get('[data-testid=log-out-link]').click();
  cy.login(USER_CURATOR_DRAFT_DOI);
  cy.visit('/');
  cy.get('[data-testid=menu-button]').click();
  cy.get('[data-testid=worklist-link]').click();
  cy.get('[data-testid^=message]')
    .filter(`:contains(${publicRegistrationRequestingDoi})`)
    .should('be.visible');
});

//   @1233
//   Scenario: Owner navigates to the Landing Page for Registration for unpublished Registration without DOI
Given('that the Owner view Landing Page for Registration', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=my-registrations]').click();
});
And('the Registration is not Published', () => {
  cy.get('[data-testid=unpublished-button]').click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${draftRegistrationWithoutDoi})`)
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').click();
    });
});
And('the Registration has no DOI', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
});
When('they look at the Status Bar', () => {
  cy.get('[data-testid=public-registration-status]').as('status_bar');
});
Then('they see buttons for Draft a DOI and Edit Registration', () => {
  cy.get('@status_bar').within((statusBar) => {
    cy.get('[data-testid=button-toggle-request-doi]').should('be.visible');
    cy.get('[data-testid=button-edit-registration]').should('be.visible');
  });
});

//   @1234
//   Scenario: Owner drafts a DOI for an unpublished Registration
Given('that the Owner View Landing Page for Registration for unpublished Registration without DOI', () => {
  cy.login(USER_DRAFT_DOI);
  cy.get('[data-testid=my-registrations]').click();
  cy.get('[data-testid=unpublished-button]').click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${registrationTitle})`)
    .first()
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').click();
    });
});
And('they are the Owner of the Registration', () => {});
When('they click the "Draft a DOI" button', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
  cy.get('[data-testid=button-toggle-reserve-doi]').click();
});
Then('the Landing Page for Registration is displayed', () => {});
And('the "Draft a DOI" button is renamed to "DOI pending" and is disabled', () => {
  cy.get('[data-testid=button-toggle-reserve-doi]').should('not.exist');
});
And('the Draft DOI is added to the metadata', () => {
  cy.reload();
  cy.wait(30000);
  cy.reload();
});
And('the Landing Page for Registration contains the Draft DOI', () => {
  cy.get('[data-testid=my-registrations]').click();
  cy.get('[data-testid=unpublished-button]').click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${registrationTitle})`)
    .first()
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').click();
    });
  cy.get('[data-testid=public-registration-doi-link]').should('be.visible');
});
And('the Draft DOI is not a link', () => {
  cy.contains('(In progress)');
});
//   #Draft DOIs are not acknowledged by the resolving mechanisms (Handle-system)

//   @1235
//   Scenario: Owner navigates to the submission tab and publish a Registration with a drafted DOI
// Given('that the Owner navigates to Submission tab', () => {});
// And('the Registration has status Draft', () => {});
// And('the Registration has a Draft DOI', () => {});
// When('the Owner clicks the publish button', () => {});
// Then('the Landing Page for Registration is displayed', () => {});
// And('the "Request a DOI" button is still named "DOI pending" and is disabled', () => {});
// And('the Landing Page for Registration lists the Draft DOI', () => {});
// And('the Draft DOI is still not a link', () => {});
// And('the DOI request is listed in the Owners work list', () => {});
// And('the DOI request is listed in the Curators work list', () => {});

//   @358
//   Scenario: Curator opens a Registration from a DOI Request Worklist Item
Given('that a Curator views details of a Worklist item', () => {
  cy.login(USER_CURATOR_WITH_AUTHOR);
  cy.get('[data-testid="menu-button"]').click();
  cy.get('[data-testid="worklist-link"]').click();
  cy.get('[data-testid^=message-type]').last().click();
});
And('the item is a DOI request', () => {
  cy.get('[data-testid^=message-type]').last().contains('DOI Request');
});
When('they click "Go to Registration"', () => {
  cy.get('[data-testid^=go-to-registration]').last().click();
});
Then('they see the Registration is opened in the Wizard', () => {
  cy.get('[data-testid=public-registration-status]').should('be.visible');
});
And('they see the Submission tab', () => {});
And('they see the Create DOI button is enabled', () => {});
And('they see the Decline DOI button is enabled', () => {});

//   @512
//   Scenario: A Curator approves a DOI request
Given('that a Curator opens a Registration from a DOI Request Worklist Item', () => {
  cy.login(USER_CURATOR_WITH_AUTHOR);
  cy.get('[data-testid="menu-button"]').click();
  cy.get('[data-testid="worklist-link"]').click();
  cy.get('[data-testid^=message]').first().click();
  cy.get('[data-testid^=message]')
    .first()
    .within(() => {
      cy.get('[data-testid^=go-to-registration]').click();
    });
});
When('they click Create DOI', () => {
  cy.get('[data-testid=button-create-doi]').click();
});
Then('they see the Landing Page for Registration', () => {
  cy.get('[data-testid=public-registration-status]').should('be.visible');
});
And('the Registration has a DOI Link', () => {
  cy.get('[data-testid=public-registration-doi-link]').should('be.visible');
});

And('the Request DOI item is marked as Approved in their Worklist', () => {
  cy.get('[data-testid="menu-button"]').click();
  cy.get('[data-testid="worklist-link"]').click();
});

//   @1243
//   Scenario: A Curator enter a decline-comment on a DOI request
// Given('that a Curator opens an item in the Worklist', () => {});
// And('the item is a DOI request', () => {});
// When('they click Decline DOI', () => {});
// Then('they may enter a decline-comment', () => {});

//   @1244
//   Scenario: A Curator declines a DOI request
Given('that a Curator enters a decline comment on a DOI request', () => {
  cy.login(USER_CURATOR_WITH_AUTHOR);
  cy.get('[data-testid="menu-button"]').click();
  cy.get('[data-testid="worklist-link"]').click();
  cy.get('[data-testid^=message]').first().click();
  cy.get('[data-testid^=message]')
    .first()
    .within(() => {
      cy.get('[data-testid^=message-type]').contains('DOI Request');
    });
});
When('they click Save', () => {});
Then('the DOI request is marked as "Declined"', () => {});
And('the request in the User\'s Worklist is updated to "Declined"', () => {});
And("the request is removed from the Curator's Worklist", () => {});
And('they see their Worklist', () => {});
