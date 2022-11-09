import { userCuratorDraftDoi, userDraftDoi } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: DOI related scenarios moved from MVP feature

const publicRegistrationRequestingDoi = 'Published registration requesting DOI';
const publicRegistrationWithoutDoi = 'Published registration without DOI';
const draftRegistrationWithoutDoi = 'Draft registration without DOI';
const registrationTitle = 'Draft registration requesting DOI';
const draftRegistrationPublishWithRequestedDoi = 'Draft registration publish with requested DOI';
const publishedRegistrationWithDoi = 'Published registration with DOI';

const published = 'published';
const unpublished = 'unpublished';
const filename = 'example.txt';

// Common steps

Given('that the Creator Opens a DOI request entry from My Worklist', () => {
  cy.login(userDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.myPageLink}]`).click();
  cy.get(`[data-testid=${dataTestId.myPage.messagesLink}]`).click();
  cy.get('[data-testid^=message-title]')
    .first()
    .parent()
    .parent()
    .within(() => {
      cy.get('[data-testid="ExpandMoreIcon"]').click();
    });
});

// End common steps

//   @1251
//   Scenario: Creator opens a Registration with a DOI request
When('they click the Edit Registration button', () => {
  cy.get('[data-testid^=go-to-registration]').filter(':visible').first().click();
});
Then('the Registration is opened in the Wizard on the first tab', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
});

//   @511
//   Scenario: Owner opens the "Request a DOI" dialog

Given('that a Creator navigates to the Landing Page for Registration for published Registration without DOI', () => {
  cy.login(userDraftDoi);
  cy.selectRegistration(publicRegistrationWithoutDoi, published);
});
And('they are the Owner of this Registration', () => { });
And('they click the "Request a DOI" button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.requestDoiButton}]`).click();
});
Then('the "Request a DOI" dialog is opened', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.requestDoiModal}]`).should('be.visible');
});
And('they see fields for Message', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiMessageField}]`).should('be.visible');
});
And('they see a "Send Request" button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.taskPanel.sendDoiButton}]`).should('be.visible');
});

//   @1232
//   Scenario: Owner navigates to the Landing Page for Registration and requests a DOI
Given('that the Creator navigates to the Landing Page for Registration for published Registration without DOI', () => {
  cy.login(userDraftDoi);
  cy.selectRegistration(publicRegistrationRequestingDoi, published);
});
And('open "Request a DOI" dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
});
And('optional add a message to the Curator', () => {
  cy.get('textarea').first().type('Optional message');
});
When('the user click the Send Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.sendDoiButton}]`).click();
});
Then('the Landing Page for Registration is displayed', () => {
  cy.location('pathname').should('contain', 'public');
});
And('the "Request a DOI" button is renamed to "DOI pending" and is disabled', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.sendDoiButton}]`).should('not.exist');
});
And('the request is listed in User Worklist', () => {
  cy.get(`[data-testid=${dataTestId.header.messagesLink}]`).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${publicRegistrationRequestingDoi})`).should('be.visible');
});
And('the request is listed in Curator Worklist', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.logOutLink}]`).click();
  cy.login(userCuratorDraftDoi);
  cy.visit('/');
  cy.get(`[data-testid=${dataTestId.header.worklistLink}]`).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${publicRegistrationRequestingDoi})`).should('be.visible');
});

//   @1233
//   Scenario: Owner navigates to the Landing Page for Registration for unpublished Registration without DOI
Given('that the Owner view Landing Page for Registration', () => {
  cy.login(userDraftDoi);
});
And('the Registration is not Published', () => {
  cy.selectRegistration(draftRegistrationWithoutDoi, unpublished);
});
And('the Registration has no DOI', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
});
When('they look at the Status Bar', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
});
Then('they see buttons for Draft a DOI and Edit Registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.reserveDoiButton}]`).should('be.visible');
});

//   @1234
//   Scenario: Owner drafts a DOI for an unpublished Registration
Given('that the Owner View Landing Page for Registration for unpublished Registration without DOI', () => {
  cy.login(userDraftDoi);
  cy.selectRegistration(registrationTitle, unpublished);
});
And('they are the Owner of the Registration', () => { });
When('they click the "Draft a DOI" button', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.reserveDoiButton}]`).click();
});
Then('the Landing Page for Registration is displayed', () => { });
And('the "Draft a DOI" button is renamed to "DOI pending" and is disabled', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.reserveDoiButton}]`).should('not.exist');
});
And('the Draft DOI is added to the metadata', () => {
  cy.wait(5000);
  cy.reload();
});
And('the Landing Page for Registration contains the Draft DOI', () => {
  cy.selectRegistration(registrationTitle, unpublished);
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
});
And('the Draft DOI is not a link', () => {
  cy.contains('(In progress)');
});
//   #Draft DOIs are not acknowledged by the resolving mechanisms (Handle-system)

//   @1235
// Scenario: Owner navigates to the submission tab and publish a Registration with a drafted DOI
Given('that the Owner navigates to Submission tab', () => {
  cy.login(userDraftDoi);
});
And('the Registration has status Draft', () => {
  cy.selectRegistration(draftRegistrationPublishWithRequestedDoi, unpublished);
});
And('the Registration has a Draft DOI', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`)
    .parent()
    .within(() => {
      cy.contains('(In progress)');
    });
});
When('the Owner clicks the publish button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.publishButton}]`).click();
});
Then('the Landing Page for Registration is displayed', () => { });
And('the "Request a DOI" button is still named "DOI pending" and is disabled', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.reserveDoiButton}]`).should('not.exist');
});
And('the Landing Page for Registration lists the Draft DOI', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
});
And('the Draft DOI is still not a link', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`)
    .parent()
    .within(() => {
      cy.contains('(In progress)');
    });
});
And('the DOI request is listed in the Owners work list', () => {
  cy.get(`[data-testid=${dataTestId.header.messagesLink}]`).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${draftRegistrationPublishWithRequestedDoi})`);
});
And('the DOI request is listed in the Curators work list', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.logOutLink}]`).click();
  cy.login(userCuratorDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.worklistLink}]`).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${draftRegistrationPublishWithRequestedDoi})`);
});

//   @358
//   Scenario: Curator opens a Registration from a DOI Request Worklist Item
Given('that a Curator views details of a Worklist item', () => {
  cy.login(userCuratorDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.worklistLink}]`).click();
  cy.get('[data-testid^=message-type]').last().click();
});
And('the item is a DOI request', () => {
  cy.get('[data-testid^=message-type]').last().contains('DOI Request');
});
When('they click "Go to Registration"', () => {
  cy.get('[data-testid^=go-to-registration]').last().click();
});
Then('they see the Registration is opened in the Wizard', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.status}]`).should('be.visible');
});
And('they see the Submission tab', () => { });
And('they see the Create DOI button is enabled', () => { });
And('they see the Decline DOI button is enabled', () => { });

//   @512
//   Scenario: A Curator approves a DOI request
Given('that a Curator opens a Registration from a DOI Request Worklist Item', () => {
  cy.login(userCuratorDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.worklistLink}]`).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${publishedRegistrationWithDoi})`).click();
  cy.get('[data-testid^=go-to-registration]').filter(':visible').first().click();
});
When('they click Create DOI', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.createDoiButton}]`).first().click();
  cy.reload();
});
Then('they see the Landing Page for Registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.status}]`).should('be.visible');
});
And('the Registration has a DOI Link', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
});

And('the Request DOI item is marked as Approved in their Worklist', () => {
  cy.get(`[data-testid=${dataTestId.header.worklistLink}]`).click();
});

//   @1244
//   Scenario: A Curator declines a DOI request
Given('that a Curator enters a decline comment on a DOI request', () => { });
When('they click Save', () => { });
Then('the DOI request is marked as "Declined"', () => { });
And('the request in the User\'s Worklist is updated to "Declined"', () => { });
And("the request is removed from the Curator's Worklist", () => { });
And('they see their Worklist', () => { });
