import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import 'cypress-localstorage-commands';
import {
  mockPersonFeideIdSearch,
  mockPersonNameSearch,
  journalSearchMockFile,
} from './mock_data';
import { Given, When, Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from './dataTestIds';
import { registrationFields, resourceTypeFields } from './save_registration';
import { userSecondEditor, tokens, addToken } from './constants';

const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION') ?? 'eu-west-1';
const userPoolId = Cypress.env('AWS_USER_POOL_ID');
const clientId = Cypress.env('AWS_CLIENT_ID');
const stage = Cypress.env('STAGE') ?? 'e2e';


AWS.config.update({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  sessionToken: awsSessionToken,
  region: region,
});

const amplifyConfig = {
  Auth: {
    region: region,
    userPoolId: userPoolId,
    userPoolWebClientId: clientId,
  },
};

const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const authFlow = 'USER_PASSWORD_AUTH';

export const today = new Date().toISOString().slice(0, 10).replaceAll('-', '');
export const todayDatePicker = () => {
  const pad = (value) => `0${value}`.slice(-2);
  const date = new Date();
  const dateValue = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`
  return dateValue;
}

Cypress.Commands.add('connectAuthor', () => {
  cy.get(`[data-testid=create-author-button]`).click();
  cy.get('[data-testid=modal_next]').click();
});

Cypress.Commands.add('skipOrcid', () => {
  cy.get('[data-testid=skip-connect-to-orcid]').click();
});

Cypress.Commands.add('setLanguage', () => {
  cy.getDataTestId(dataTestId.header.generalMenuButton).click();
  cy.getDataTestId(dataTestId.header.myProfileLink).click();
  cy.get('[data-testid=language-selector]').click();
  cy.get('[data-testid=user-language-eng]').click();
});

Cypress.Commands.add('checkMenu', (table) => {
  cy.getDataTestId(dataTestId.header.generalMenuButton).click();
  table.forEach((row) => {
    const menuItem = row[0];
    cy.get('li').should('contain.text', menuItem);
  });
});

Cypress.Commands.add('getDataTestId', (dataTestId, options) => {
  cy.get(`[data-testid=${dataTestId}]`, options);
});

Cypress.Commands.add('loginCognito', (userId) => {
  return new Cypress.Promise((resolve, reject) => {
    Amplify.configure(amplifyConfig);
      const randomPassword = `P%${uuidv4()}`;

      const authorizeUser = {
        AuthFlow: authFlow,
        ClientId: clientId,
        AuthParameters: {
          USERNAME: userId,
          PASSWORD: randomPassword,
        },
      };

      const passwordParams = {
        Password: randomPassword,
        UserPoolId: userPoolId,
        Username: userId,
        Permanent: true,
      };

      let tries = 0;
      let trying = false;
      do {
        identityServiceProvider.adminSetUserPassword(passwordParams, (err, data) => {
          if (data) {
            identityServiceProvider.initiateAuth(authorizeUser, async (err, data) => {
              if (data) {
                if (!data.ChallengeName) {
                  await Auth.signIn(userId, randomPassword);
                  resolve(data.AuthenticationResult.IdToken);
                } else {
                  trying = true;
                  console.log('fail.. challenge');
                  reject(err);
                }
              } else {
                trying = true;
                console.log('fail.. init auth');
                reject(err);
              }
            });
          } else {
            trying = true;
            console.log('fail.. set password');
            reject(err);
          }
        });
        tries++;
        if (tries > 3) {
          trying = false;
        }
      } while (trying);
  });
});

Cypress.Commands.add('login', (userId) => {
  cy.loginCognito(userId).then(() => {
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.setLocalStorage('beta', 'true');
    cy.visit(`/`, {
      auth: {
        username: Cypress.env('DEVUSER'),
        password: Cypress.env('DEVPASSWORD'),
      },
    });
  });
});

Cypress.Commands.add('startRegistrationWithFile', (fileName) => {
  cy.getDataTestId(dataTestId.header.newRegistrationLink).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.new.fileAccordion).click({ force: true });
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});

Cypress.Commands.add('startWizardWithFile', (fileName) => {
  cy.startRegistrationWithFile(fileName);
  cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').should('be.enabled');
  cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').click({ force: true });
});

Cypress.Commands.add('startRegistrationWithLink', (doiLink) => {
  cy.getDataTestId(dataTestId.header.newRegistrationLink).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.new.linkAccordion).click({ force: true });
  cy.get('[data-testid=new-registration-link-field]').within((linkField) => {
    cy.wrap(linkField).get('input').type(doiLink);
  });
  cy.get('[data-testid=doi-search-button]').click({ force: true });
});

Cypress.Commands.add('startWizardWithLink', (doiLink) => {
  cy.startRegistrationWithLink(doiLink);
  cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').should('be.enabled');
  cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').click({ force: true });
});

Cypress.Commands.add('startWizardWithEmptyRegistration', () => {
  cy.getDataTestId(dataTestId.header.newRegistrationLink).first().click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
});

Cypress.Commands.add('logoutCognito', () => {
  Auth.signOut();
});

Cypress.Commands.add('openMyRegistrations', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
});

Cypress.Commands.add('createValidRegistration', (fileName, title) => {
  // Description
  cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton).click({ force: true });
  title = title ? `${title} ${today}` : `Title ${today}`;
  cy.get('[data-testid=registration-title-field]').type(title, { delay: 0 });
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`, '01.01.2020');

  // Reference
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });

  cy.getDataTestId('resource-type-chip-AcademicArticle').click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).click({ force: true }).type('Norges byggforskningsinstitutt');
  cy.contains('Norges byggforskningsinstitutt').click({ force: true });

  // Contributors
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton, { timeOut: 30000 }).should('not.exist');

  // Files and reference
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click({ force: true });
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  cy.getDataTestId(dataTestId.registrationWizard.files.version, { timeout: 30000 }).within(() => {
    cy.get('input[type=radio]').last().click();
  });
  cy.get('[data-testid=uploaded-file-select-license]').scrollIntoView().click({ force: true }).type(' ');
  cy.get('[data-testid=license-item]').first().click({ force: true });
});

Cypress.Commands.add('testDataTestidList', (dataTable, values) => {
  dataTable.rawTable.forEach((value) => {
    cy.getDataTestId(values[value[0]], { timeout: 30000 });
  });
});

Cypress.Commands.add('selectRegistration', (title, type) => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
  if (type === 'published') {
    cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).click();
    cy.getDataTestId(dataTestId.myPage.myRegistrationsUnpublishedCheckbox).click();
  }
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${title})`)
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').first().click();
    });
});

Cypress.Commands.add('addFeideId', (username) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .then((state) => {
      const { authority } = state.user;
      authority.feideids.push(username);
      cy.window().its('store').invoke('dispatch', {
        type: 'set authority data',
        authority: authority,
      });
    });
});

Cypress.Commands.add('findScenario', () => {
  let scenario = '';
  if (window.testState.currentScenario.tags && window.testState.currentScenario.tags.length > 0) {
    scenario = window.testState.currentScenario.tags[0].name;
  } else {
    scenario = window.testState.currentScenario.name;
    if (scenario.includes('(example')) {
      scenario = scenario.substring(0, scenario.indexOf('(example')).trim();
    }
  }
  cy.wrap(scenario).as('scenario');
});

// Commands for mocking

Cypress.Commands.add('addMockOrcid', (username) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .then((state) => {
      const { authority } = state.user;
      authority.orcids.push('test_orcid');
      cy.window().its('store').invoke('dispatch', {
        type: 'set authority data',
        authority: authority,
      });
    });
});

Cypress.Commands.add('mockPersonSearch', (userId) => {
  cy.intercept(
    `https://api.${stage}.nva.aws.unit.no/person?feideid=${userId.replace('@', '%40')}`,
    mockPersonFeideIdSearch(userId)
  );
  cy.intercept(`https://api.${stage}.nva.aws.unit.no/cristin/person?results=10&page=1&name=*`, mockPersonNameSearch(userId));
});

Cypress.Commands.add('mockJournalSearch', () => {
  cy.fixture(journalSearchMockFile).then((journals) => {
    cy.intercept(`https://api.${stage}.nva.aws.unit.no/publication-channels/journal*`, journals);
  });
});

Cypress.Commands.add('changeUserInstitution', (institution) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .then((state) => {
      const { authority } = state.user;
      authority.orgunitids = [`https://api.cristin.no/v2/institutions/${institution}`];
      cy.window().its('store').invoke('dispatch', {
        type: 'set authority data',
        authority: authority,
      });
    });
});

const fillInField = (field) => {
  switch (field['type']) {
    case 'text':
      cy.getDataTestId(field['fieldTestId']).should('be.visible').type(field['value'], { delay: 1 });
      if (field.fieldTestId === dataTestId.registrationWizard.resourceType.externalLinkField) {
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.externalLinkAddButton).click();
      }
      break;
    case 'date':
      cy.chooseDatePicker(`[data-testid=${field['fieldTestId']}]`, todayDatePicker());
      break;
    case 'search':
      cy.getDataTestId(field['fieldTestId']).should('be.visible').type(field['value'], { delay: 1 });
      cy.contains(field['value']).click();
      break;
    case 'file':
      cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${field['value']}`, { force: true });
      break;
    case 'select':
      cy.getDataTestId(field['fieldTestId']).scrollIntoView().should('be.visible').click({ force: true }).type(' ');
      if (
        field.fieldTestId === dataTestId.registrationWizard.resourceType.artisticTypeField ||
        field.fieldTestId === dataTestId.registrationWizard.resourceType.mediaMedium
      ) {
        cy.get(`[data-value=${field['value']}]`).click();
      } else {
        cy.contains(field['value']).click({ force: true });
      }
      break;
    case 'add':
      cy.getDataTestId(field['fieldTestId']).click();
      if ('fields' in field['add']) {
        Object.keys(field['add']['fields']).forEach((key) => {
          if (key === dataTestId.registrationWizard.resourceType.subtypeField) {
            cy.getDataTestId(key).click();
            cy.get(`[data-value=${field['add']['fields'][key]}]`).click();
          } else if (
            key === dataTestId.registrationWizard.resourceType.outputInstantDateField ||
            key === dataTestId.registrationWizard.resourceType.dateFromField ||
            key === dataTestId.registrationWizard.resourceType.dateToField
          ) {
            if(field == resourceTypeFields['bookPrintedMatter']) {
              cy.getDataTestId(key).type(field['add']['fields'][key]);
            } else {
              cy.chooseDatePicker(`[data-testid=${key}]`, todayDatePicker());
            }
          } else if (key === dataTestId.registrationWizard.resourceType.concertAddWork) {
            cy.getDataTestId(key).click();
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.concertProgramTitle}]`)
              .first()
              .type(field['add']['fields'][key]);
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.concertProgramComposer}]`)
              .first()
              .type(field['add']['fields'][key]);
          } else if (key === dataTestId.registrationWizard.resourceType.audioVideoAddTrack) {
            cy.getDataTestId(key).click();
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.audioVideoContentTitle}]`)
              .first()
              .type(field['add']['fields'][key]);
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.audioVideoContentComposer}]`)
              .first()
              .type(field['add']['fields'][key]);
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.artisticOutputDuration}]`)
              .first()
              .type('20');
          } else {
            cy.getDataTestId(key).type(field['add']['fields'][key]);
          }
        });
      } else {
        if ('select' in field['add']) {
          cy.getDataTestId(field['add']['select']['selectTestId']).click();
          cy.contains(field['add']['select']['value']).click();
        }
        cy.getDataTestId(field['add']['searchFieldTestId']).type(field['add']['searchValue']);
        cy.getDataTestId(field['add']['resultsTestId']).filter(`:contains(${field['value']})`).click({ force: true });
      }
      cy.getDataTestId(field['add']['selectButtonTestId']).click();
      break;
    case 'checkbox':
      switch (field['checkbox']['selected']) {
        case 'first':
          cy.getDataTestId(field['fieldTestId'], { timeout: 30000 }).within(() => {
            cy.get('input').first().click({ force: true });
          });
          break;
        case 'check':
          if (field['value']) {
            cy.getDataTestId(field['fieldTestId']).click({ force: true });
          }
          break;
      }
      break;
    default:
      break;
  }
};

Cypress.Commands.add('checkField', (field) => {
  const value = field['landingPageValue'] ?? field['value'];
  switch (field['elementType']) {
    case 'input':
      if (field.fieldTestId === dataTestId.registrationWizard.resourceType.externalLinkField) {
        cy.contains(value);
      } else {
        cy.get(`[data-testid=${field['fieldTestId']}] input`).should('have.value', value);
      }
      break;
    case 'date':
      const dateValue = todayDatePicker();
      cy.get(`[data-testid=${field['fieldTestId']}]`).parent().find('input').should('have.value', dateValue);
      break;
    case 'textArea':
      cy.get(`[data-testid=${field['fieldTestId']}] textArea`).should('contain', value);
      break;
    case 'chip':
      cy.get(`[data-testid=${field['fieldTestId']}] span`).should('contain', value);
      break;
    case 'search':
      if (
        field.fieldTestId === dataTestId.registrationWizard.resourceType.relatedRegistrationField ||
        field.fieldTestId === dataTestId.registrationWizard.resourceType.compliesWithField
      ) {
        cy.contains(value);
      } else {
        cy.get(`[data-testid=${field['fieldTestId']}] div`).should('contain', value);
      }
      break;
    case 'file':
      cy.get('[data-testid=uploaded-file-row]').should('contain', value);
      break;
    case 'radio':
      cy.get(`[data-testid=${field['fieldTestId']}] span`)
        .parent()
        .first()
        .within(() => {
          cy.contains(value);
          cy.get('input').should('be.checked');
        });
      break;
    case 'checkbox':
      cy.get(`[data-testid=${field['fieldTestId']}] span`)
        .parent()
        .within(() => {
          cy.get('input').should(value ? 'be.checked' : 'not.be.checked');
        });
      break;
    case 'announcement':
      cy.getDataTestId(field['fieldTestId'])
        .parent()
        .parent()
        .within(() => {
          cy.contains(field['value']);
        });
  }
});

Cypress.Commands.add('checkContributors', (contributorRoles) => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  let roleIndex = 0;
  contributorRoles.forEach((role) => {
    roleIndex++;
    const name = `Withauthor ${roleIndex} `;
    if (contributorRoles.length > 5) {
      cy.contains('Search by name')
        .parent()
        .within(() => {
          cy.get('input').clear().type(name, { delay: 1 });
        });
    }
    cy.get(`[value=${role}]`)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.contains(name);
        cy.get(`[value=${role}]`);
      });
  });
});

Cypress.Commands.add('fillInCommonFields', (hasFileVersion) => {
  Object.keys(registrationFields).forEach((key) => {
    cy.getDataTestId(registrationFields[key]['tab']).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      const field = registrationFields[key][subkey];
      if (subkey !== 'version' || hasFileVersion) {
        fillInField(field);
      }
    });
  });
});

Cypress.Commands.add('fillInResourceType', (subtype, fields) => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.get(`[data-testid=resource-type-chip-${subtype}]`).click();
  if (subtype === 'DataSet') {
    cy.getDataTestId(dataTestId.confirmDialog.cancelButton).click();
  }
  fields.forEach((field) => {
    fillInField(field);
  });
});

Cypress.Commands.add('fillInContributors', (contributorRoles) => {
  let index = 0;
  contributorRoles.forEach((role) => {
    index++;
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectContributorType).click();
    cy.get(`[data-value=${role}]`).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`Withauthor ${index}`);
    cy.getDataTestId(dataTestId.registrationWizard.contributors.authorRadioButton)
      .filter(`:contains('Withauthor ${index} ')`)
      .first()
      .click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  });
});

Cypress.Commands.add('checkLandingPage', () => {
  Object.keys(registrationFields).forEach((key) => {
    Object.keys(registrationFields[key]).forEach((subkey) => {
      const field = registrationFields[key][subkey];
      if (field['landingPageTestId']) {
        if (field['landingPageTestId'] === dataTestId.registrationLandingPage.license) {
          cy.getDataTestId(field.landingPageTestId).get(`[title="${field.value}"]`);
        } else if (field['landingPageTestId'] === dataTestId.registrationLandingPage.title) {
          cy.getDataTestId(dataTestId.registrationLandingPage.registrationSubtype)
            .parent()
            .should('contain', field.value);
        } else {
          cy.get(`[data-testid^=${field.landingPageTestId}]`).should('contain', field.value);
        }
      }
    });
  });
});

Cypress.Commands.add('chooseDatePicker', (selector, value) => {
  cy.get('body').then(($body) => {
    const mobilePickerSelector = `[data-testid=CalendarIcon]`;
    const isMobile = $body.find(mobilePickerSelector).length === 0;
    if (isMobile) {
      // The MobileDatePicker component has readonly inputs and needs to
      // be opened and clicked on edit so its inputs can be edited
      // cy.get(mobilePickerSelector).click();
      // cy.get('[role="dialog"] [aria-label="calendar view is open, go to text input view"]').click();
      // cy.get(`[role="dialog"] ${selector}`, { force: true })
      //   .last()
      //   .find('input')
      //   .parent()
      //   .type(value, { force: true });
      // cy.contains('[role="dialog"] button', 'OK').click();
      cy.get(selector).click();
      cy.get('[role=dialog]').then(($dialog) => {
        const selectDay = $dialog.find('.MuiPickersDay-today').length > 0
        const selectYear = $dialog.find('.Mui-selected').length > 0;
        if (selectDay) {
          cy.get('.MuiPickersDay-today').click();
          cy.contains('[role="dialog"] button', 'OK').click();
        } else {
          // if (selectYear) {
          cy.get('.Mui-selected').click();
          cy.contains('[role="dialog"] button', 'OK').click();
          // } else {
          //   cy.get(selector).type(value, { force: true });
          // }
        }
      })
    } else {
      cy.get(selector).type(value);
    }
  });
});

Cypress.Commands.add('setWorkflowRegistratorPublishesAll', () => {
  cy.login(userSecondEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
  cy.getDataTestId(dataTestId.editor.workflowRegistratorPublishesAll).click({ force: true });
});

Cypress.Commands.add('setWorkflowRegistratorPublishesMetadata', () => {
  cy.login(userSecondEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
  cy.getDataTestId(dataTestId.editor.workflowRegistratorPublishesMetadata).click({ force: true });
});

Cypress.Commands.add('setWorkflowRegistratorRequiresApproval', () => {
  cy.login(userSecondEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
  cy.getDataTestId(dataTestId.editor.workflowRegistratorRequiresApproval).click({ force: true });
});

const doiRequests = 'DoiRequests';
const publishingRequests = 'Publishing Requests';
const supportRequests = 'Support Requests';

Cypress.Commands.add('filterMessages', (messageType) => {
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).then($button => {
    const publishingRequestFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((publishingRequestFilter && !(messageType === publishingRequests)) ||
      (!publishingRequestFilter && (messageType === publishingRequests))) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
  });
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).then($button => {
    const doiRequestFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((doiRequestFilter && !(messageType === doiRequests)) ||
      (!doiRequestFilter && (messageType === doiRequests))) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
  });
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).then($button => {
    const supportFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((supportFilter && !(messageType === supportRequests)) ||
      (!supportFilter && (messageType === supportRequests))) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
  });
});