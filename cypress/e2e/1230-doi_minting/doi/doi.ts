import { v4 as uuid, v4 } from 'uuid';
import { userCuratorDraftDoi, userDraftDoi2 } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Feature: DOI related scenarios moved from MVP feature

const publicRegistrationRequestingDoi = `Published registration requesting DOI ${uuid()}`;
const publicRegistrationWithoutDoi = `Published registration without DOI ${uuid()}`;
const draftRegistrationWithoutDoi = `Draft registration without DOI ${uuid()}`;
const registrationTitle = `Draft registration requesting DOI ${uuid()}`;
const draftRegistrationPublishWithRequestedDoi = `Draft registration publish with requested DOI ${uuid()}`;
const publishedRegistrationWithDraftDoi = `Published registration with draft DOI ${uuid()}`;

const published = 'published';
const unpublished = 'unpublished';
const filename = 'example.txt';

// Scenario: Owner navigates to the submission tab and publish a Registration with a drafted DOI
Given('that the Owner navigates to Submission tab', () => {
  cy.login(userDraftDoi2);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, publishedRegistrationWithDraftDoi);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
});
Given('the Registration has status Draft', () => {
  cy.selectRegistration(publishedRegistrationWithDraftDoi, unpublished);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.reserveDoiButton).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
});
When('the Owner clicks the publish button', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.wait(3000);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
  cy.wait(3000);
});
Then('the Landing Page for Registration is displayed', () => {});
Then('the "Request a DOI" button is still named "DOI pending" and is disabled', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).within(() => {
    cy.contains('DOI request waiting for approval');
  });
});
Then('the Landing Page for Registration lists the Draft DOI', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.generalInfo).within(() => {
    cy.contains('DOI')
      .parent()
      .within(() => {
        cy.contains('Pending');
      });
  });
});
Then('the Draft DOI is still not a link', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.generalInfo).within(() => {
    cy.contains('DOI')
      .parent()
      .within(() => {
        cy.get('a').should('not.exist');
      });
  });
});
Then('the DOI request is listed in the Owners work list', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
  cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${publishedRegistrationWithDraftDoi})`);
});
Then('the DOI request is listed in the Curators work list', () => {
  cy.login(userCuratorDraftDoi);
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${publishedRegistrationWithDraftDoi})`);
});

//   @1251
//   Scenario: Creator opens a Registration with a DOI request
Given('that the Creator Opens a DOI request entry from My Worklist', () => {
  cy.login(userDraftDoi2);
  cy.createPublishedRegistration(publicRegistrationRequestingDoi);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
  cy.wait(3000);
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.requestDoiButton).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.sendDoiButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
  cy.get('[data-testid^=result-list-item]').first().parent().parent().parent().click();
});

When('they click the Edit Registration button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.editButton}]`).click();
});
Then('the Registration is opened in the Wizard on the first tab', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.descriptionField).should('exist');
});

//   @511
//   Scenario: Owner opens the "Request a DOI" dialog

Given('that a Creator navigates to the Landing Page for Registration for published Registration without DOI', () => {
  cy.login(userDraftDoi2);
  cy.selectRegistration(publicRegistrationWithoutDoi, published);
});
Given('they are the Owner of this Registration', () => {});
Given('they click the "Request a DOI" button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.requestDoiButton}]`).click();
});
Then('the "Request a DOI" dialog is opened', () => {});
Then('they see fields for Message', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiMessageField}]`).should('be.visible');
});
Then('they see a "Send Request" button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.sendDoiButton}]`).should('be.visible');
});

//   @1232
//   Scenario: Owner navigates to the Landing Page for Registration and requests a DOI
Given('that the Creator navigates to the Landing Page for Registration for published Registration without DOI', () => {
  cy.login(userDraftDoi2);
  cy.selectRegistration(publicRegistrationRequestingDoi, published);
});
Given('open "Request a DOI" dialog', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion}]`).click();
});
Given('optional add a message to the Curator', () => {
  cy.get('textarea').first().type('Optional message');
});
When('the user click the Send Button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.sendDoiButton}]`).click();
});
Then('the "Request a DOI" button is renamed to "DOI pending" and is disabled', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.sendDoiButton}]`).should('not.exist');
});
Then('the request is listed in User Worklist', () => {
  cy.get(`[data-testid=${dataTestId.header.myPageLink}]`).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${publicRegistrationRequestingDoi})`).should('be.visible');
});
Then('the request is listed in Curator Worklist', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.logOutLink}]`).click();
  cy.login(userCuratorDraftDoi);
  cy.visit(`/`, {
    auth: {
      username: Cypress.env('DEVUSER'),
      password: Cypress.env('DEVPASSWORD'),
    },
  });
  cy.get(`[data-testid=${dataTestId.header.tasksLink}]`).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${publicRegistrationRequestingDoi})`).should('be.visible');
});

//   @1233
//   Scenario: Owner navigates to the Landing Page for Registration for unpublished Registration without DOI
Given('that the Owner view Landing Page for Registration', () => {
  cy.login(userDraftDoi2);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(null, draftRegistrationWithoutDoi);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
});
Given('the Registration is not Published', () => {
  cy.selectRegistration(draftRegistrationWithoutDoi, unpublished);
});
Given('the Registration has no DOI', () => {
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
  cy.login(userDraftDoi2);
  cy.startWizardWithEmptyRegistration();
  cy.createValidRegistration(filename, registrationTitle);
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.selectRegistration(registrationTitle, unpublished);
});
Given('they are the Owner of the Registration', () => {});
When('they click the "Draft a DOI" button', () => {
  cy.get('[data-testid=doi-presentation]').should('not.exist');
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.reserveDoiButton).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.contains('DOI is reserved');
});
Then('the "Draft a DOI" button is renamed to "DOI pending" and is disabled', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.reserveDoiButton}]`).should('not.exist');
});
Then('the Draft DOI is added to the metadata', () => {
  cy.wait(5000);
  cy.reload();
});
Then('the Landing Page for Registration contains the Draft DOI', () => {
  cy.selectRegistration(registrationTitle, unpublished);
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
});
Then('the Draft DOI is not a link', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.generalInfo).within(() => {
    cy.contains('DOI')
      .parent()
      .within(() => {
        cy.get('a').should('not.exist');
      });
  });
});
//   #Draft DOIs are not acknowledged by the resolving mechanisms (Handle-system)

//   @1235
// Scenario: Owner navigates to the submission tab and publish a Registration with a drafted DOI
Given('the Registration has a Draft DOI', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`)
    .parent()
    .within(() => {
      cy.contains('(Reserved DOI)');
    });
});
When('the Owner clicks the publish button', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.publishButton}]`).click();
});
Then('the "Request a DOI" button is still named "DOI pending" and is disabled', () => {
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.doiRequestAccordion).click();
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.reserveDoiButton}]`).should('not.exist');
});
Then('the Landing Page for Registration lists the Draft DOI', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`).should('be.visible');
});
Then('the Draft DOI is still not a link', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.doiLink}]`)
    .parent()
    .within(() => {
      cy.contains('(Reserved DOI)');
    });
});
Then('the DOI request is listed in the Owners work list', () => {
  cy.get(`[data-testid=${dataTestId.header.myPageLink}]`).click();
  cy.getDataTestId(dataTestId.myPage.messagesAccordion).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${draftRegistrationPublishWithRequestedDoi})`);
});
Then('the DOI request is listed in the Curators work list', () => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.logOutLink}]`).click();
  cy.login(userCuratorDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.tasksLink}]`).click();
  cy.get('[data-testid^=message-title]').filter(`:contains(${draftRegistrationPublishWithRequestedDoi})`);
});

//   @358
//   Scenario: Curator opens a Registration from a DOI Request Worklist Item
Given('that a Curator views details of a Worklist item', () => {
  cy.login(userCuratorDraftDoi);
  cy.get(`[data-testid=${dataTestId.header.tasksLink}]`).click();
  cy.get('[data-testid^=message-type]').last().click();
});
Given('the item is a DOI request', () => {
  cy.get('[data-testid^=message-type]').last().contains('DOI Request');
});
When('they click "Go to Registration"', () => {
  cy.get('[data-testid^=go-to-registration]').last().click();
});
Then('they see the Registration is opened in the Wizard', () => {
  cy.get(`[data-testid=${dataTestId.registrationLandingPage.generalInfo}]`).should('be.visible');
});
Then('they see the Submission tab', () => {});
Then('they see the Create DOI button is enabled', () => {});
Then('they see the Decline DOI button is enabled', () => {});

// Scenario: Owner navigates to the Landing page and requests a DOI
Given('that the Creator navigates to the Landing page for published Registration without DOI', () => {});
Given('open "Request a DOI" dialog', () => {});
Given('optional add a message to the Curator', () => {});
When('the user click the Send Button', () => {});
Then('the Landing page is displayed', () => {});
Then('the "Request a DOI" button is no longer visible', () => {});
Then('the request is listed in My Messages', () => {});
Then('the request is listed in Curator Worklist', () => {});
