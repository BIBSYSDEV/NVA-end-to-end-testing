import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import { Auth } from '@aws-amplify/auth';
import 'cypress-localstorage-commands';
import {
  mockPersonFeideIdSearch,
  mockPersonNameSearch,
  mockPerson,
  projectSearchMockFile,
  projectApiPath,
  journalSearchMockFile,
} from './mock_data';
import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { dataTestId } from './dataTestIds';
import { registrationFields } from './save_registration';

const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION');
const userPoolId = Cypress.env('AWS_USER_POOL_ID');
const clientId = Cypress.env('AWS_CLIENT_ID');
const stage = Cypress.env('STAGE') ?? 'dev';

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
    userPoolWebClientId: '3rls7ad53ldmjvdbj7p8fii18q',
  },
};

const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const authFlow = 'USER_PASSWORD_AUTH';

export const today = new Date().toISOString().slice(0, 10).replaceAll('-', '');

Cypress.Commands.add('getDataTestId', (dataTestId: string) => {
  cy.get(`[data-testid=${dataTestId}]`);
});

const loginCognito = (userId: string) => {
  return new Cypress.Promise((resolve, reject) => {
    Auth.configure(amplifyConfig);
    const randomPassword = `P%${uuidv4()}`;
    let password = 'P%403f577d-edda-468c-ae77-c8e1a79cd665';

    const authorizeUser = {
      AuthFlow: authFlow,
      ClientId: clientId,
      AuthParameters: {
        USERNAME: userId,
        PASSWORD: password,
      },
    };

    const passwordParams = {
      Password: password,
      UserPoolId: userPoolId,
      Username: userId,
      Permanent: true,
    };

    identityServiceProvider.adminSetUserPassword(passwordParams, (err, data) => {
      if (data) {
        identityServiceProvider.initiateAuth(authorizeUser, async (err, data) => {
          if (data) {
            console.log(data);
            if (!data.ChallengeName) {
              await Auth.signIn(userId, password);
              resolve(data.AuthenticationResult?.IdToken);
            }
          } else {
            reject(err);
          }
        });
      } else {
        reject(err);
      }
    });
  });
};

Cypress.Commands.add('login', (userId) => {
  loginCognito(userId).then(() => {
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.setLocalStorage('beta', 'true');
    cy.mockDepartments();
    cy.visit(`/`, {
      auth: {
        username: Cypress.env('DEVUSER'),
        password: Cypress.env('DEVPASSWORD'),
      },
    });
  });
});

Cypress.Commands.add('startRegistrationWithFile', (fileName) => {
  cy.get(`[data-testid=${dataTestId.header.newRegistrationLink}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.fileAccordion}]`).click({ force: true });
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
});

Cypress.Commands.add('startRegistrationWithLink', (doiLink) => {
  cy.get(`[data-testid=${dataTestId.header.newRegistrationLink}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.linkAccordion}]`).click({ force: true });
  cy.get('[data-testid=new-registration-link-field]').within((linkField) => {
    cy.wrap(linkField).get('input').type(doiLink);
  });
  cy.get('[data-testid=doi-search-button]').click({ force: true });
});

Cypress.Commands.add('startWizardWithEmptyRegistration', () => {
  cy.get(`[data-testid=${dataTestId.header.newRegistrationLink}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.emptyRegistrationAccordion}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible')
    .should('be.enabled');
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible')
    .click({ force: true });
});

Cypress.Commands.add('openMyRegistrations', () => {
  cy.get(`[data-testid=${dataTestId.header.myPageLink}]`).click();
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsLink}]`).click();
});

Cypress.Commands.add('createValidRegistration', (fileName) => {
  // Description
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click({ force: true });
  cy.get('[data-testid=registration-title-field]').type(`Title ${today}`);
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`).type('01.01.2020');

  // Reference
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });

  cy.get('[data-testid=resource-type-chip-BookMonograph]').click({ force: true });

  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.publisherField}]`)
    .click({ force: true })
    .type('Norges');
  cy.contains('Norges forskningsråd').click({ force: true });

  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentValue('academicmonograph')}]`).click();

  // Contributors
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.addContributorButton}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.searchField}]`).type('Testuser Withauthor{enter}');
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.authorRadioButton}]`)
    .first()
    .click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectUserButton}]`).click({ force: true });

  // Files and reference
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click({ force: true });
  cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.files.version}]`, { timeout: 30000 }).within(() => {
    cy.get('input[type=radio]').first().click();
  });
  cy.get('[data-testid=uploaded-file-select-license]').click({ force: true }).type(' ');
  cy.get('[data-testid=license-item]').first().click({ force: true });
});

Cypress.Commands.add('testDataTestidList', (dataTable, values) => {
  dataTable.raw().forEach((value: string[]) => {
    cy.get(`[data-testid=${values[value[0]]}]`, { timeout: 30000 });
  });
});

Cypress.Commands.add('selectRegistration', (title, type) => {
  cy.get(`[data-testid=${dataTestId.header.myPageLink}]`).click();
  cy.get(`[data-testid=${dataTestId.myPage.myRegistrationsLink}]`).click();
  cy.get(`[data-testid=${type}-button]`).click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${title})`)
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').first().click();
    });
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
  cy.intercept(`https://api.${stage}.nva.aws.unit.no/cristin/person?name=*`, mockPersonNameSearch(userId));
});

Cypress.Commands.add('mockProjectSearch', () => {
  cy.fixture(projectSearchMockFile).then((searchResult) => {
    cy.intercept(`${projectApiPath}?query=*`, searchResult);
  });
});

Cypress.Commands.add('mockInstitution', () => {
  cy.fixture('org_query.json').then((organizations) => {
    cy.log(`mocking https://api.${stage}.nva.aws.unit.no/cristin/organization*`);
    cy.intercept(`https://api.${stage}.nva.aws.unit.no/cristin/organization/?query=*`, organizations);
  });
});

Cypress.Commands.add('mockDepartments', () => {
  const institutionIds = ['1111111111', '2222222222', '3333333333'];
  institutionIds.forEach((cristinId) => {
    const departments_file = `departments_${cristinId}.json`;
    cy.fixture(departments_file).then((departments) => {
      cy.intercept(
        `https://api.${stage}.nva.aws.unit.no/institution/departments?uri=https%3A%2F%2Fapi.cristin.no%2Fv2%2Finstitutions%2F${cristinId}*&language=en`,
        departments
      );
      cy.intercept(`https://api.${stage}.nva.aws.unit.no/cristin/organization/${cristinId}.0.0.0`, departments);
      cy.intercept(`https://api.${stage}.nva.aws.unit.no/cristin/organization/${cristinId}.1.0.0`, departments);
      cy.intercept(`https://api.${stage}.nva.aws.unit.no/cristin/organization/${cristinId}.2.0.0`, departments);
      cy.intercept(`https://api.${stage}.nva.aws.unit.no/cristin/organization/${cristinId}.3.0.0`, departments);
      cy.intercept(
        `https://api.${stage}.nva.aws.unit.no/institution/departments?uri=https%3A%2F%2Fapi.cristin.no%2Fv2%2Finstitutions%2F${cristinId}.1.0.0*&language=en`,
        departments
      );
      cy.intercept(
        `https://api.${stage}.nva.aws.unit.no/institution/departments?uri=https%3A%2F%2Fapi.cristin.no%2Fv2%2Finstitutions%2F${cristinId}.2.0.0*&language=en`,
        departments
      );
      cy.intercept(
        `https://api.${stage}.nva.aws.unit.no/institution/departments?uri=https%3A%2F%2Fapi.cristin.no%2Fv2%2Finstitutions%2F${cristinId}.3.0.0*&language=en`,
        departments
      );
      cy.intercept(
        `https://api.${stage}.nva.aws.unit.no/institution/departments?uri=https%3A%2F%2Fapi.cristin.no%2Fv2%2Funits%2F${cristinId}*&language=en`,
        departments
      );
    });
  });
});

const fillInField = (field: Record<string, any>) => {
  switch (field.type) {
    case 'text':
      cy.getDataTestId(field.fieldTestId).should('be.visible').type(field.value, { delay: 1 });
      if (field.fieldTestId === dataTestId.registrationWizard.resourceType.externalLinkField) {
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.externalLinkAddButton).click();
      }
      break;
    case 'date':
      cy.chooseDatePicker(`[data-testid=${field.fieldTestId}]`, field.value);
      break;
    case 'search':
      cy.get(`[data-testid=${field.fieldTestId}]`).should('be.visible').type(field.value, { delay: 1 });
      cy.contains(field.value).click();
      break;
    case 'file':
      cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${field.value}`, { force: true });
      break;
    case 'select':
      cy.get(`[data-testid=${field.fieldTestId}]`).scrollIntoView().should('be.visible').click();
      if (field.fieldTestId === dataTestId.registrationWizard.resourceType.artisticTypeField) {
        cy.get(`[data-value=${field.value}]`).click();
      } else {
        cy.contains(field.value).click({ force: true });
      }
      break;
    case 'add':
      cy.get(`[data-testid=${field['fieldTestId']}]`).click();
      if ('fields' in field.add) {
        Object.keys(field.add.fields).forEach((key) => {
          if (key === dataTestId.registrationWizard.resourceType.artisticSubtype) {
            cy.getDataTestId(key).click();
            cy.get(`[data-value=${field['add']['fields'][key]}]`).click();
          } else if (
            key === dataTestId.registrationWizard.resourceType.artisticOutputDate ||
            key === dataTestId.registrationWizard.resourceType.dateFromField ||
            key === dataTestId.registrationWizard.resourceType.dateToField
          ) {
            cy.chooseDatePicker(`[data-testid=${key}]`, field['add']['fields'][key]);
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
            cy.get(`[data-testid=${key}]`).type(field['add']['fields'][key]);
          }
        });
      } else {
        if ('select' in field.add) {
          cy.get(`[data-testid=${field['add']['select']['selectTestId']}]`).click();
          cy.contains(field['add']['select']['value']).click();
        }
        cy.get(`[data-testid=${field['add']['searchFieldTestId']}]`).type(field['add']['searchValue']);
        cy.get(`[data-testid=${field['add']['resultsTestId']}]`)
          .filter(`:contains(${field['value']})`)
          .click({ force: true });
      }
      cy.get(`[data-testid=${field['add']['selectButtonTestId']}]`).click();
      break;
    case 'checkbox':
      switch (field['checkbox']['selected']) {
        case 'first':
          cy.get(`[data-testid=${field['fieldTestId']}`, { timeout: 30000 }).within(() => {
            cy.get('input').first().click({ force: true });
          });
          break;
        case 'check':
          if (field['value']) {
            cy.get(`[data-testid=${field['fieldTestId']}]`).click({ force: true });
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
      cy.get(`[data-testid=${field['fieldTestId']}]`)
        .parent()
        .parent()
        .within(() => {
          cy.contains(field['value']);
        });
  }
});

Cypress.Commands.add('checkContributors', (contributorRoles) => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  var roleIndex = 0;
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

Cypress.Commands.add('fillInCommonFields', () => {
  Object.keys(registrationFields).forEach((key) => {
    cy.get(`[data-testid=${registrationFields[key]['tab']}]`).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      const field = registrationFields[key][subkey];
      fillInField(field);
    });
  });
});

Cypress.Commands.add('fillInResourceType', (subtype, fields) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get(`[data-testid=resource-type-chip-${subtype}]`).click();
  if (subtype === 'DataSet') {
    cy.getDataTestId(dataTestId.confirmDialog.cancelButton).click();
  }
  fields.forEach((field: any) => {
    fillInField(field);
  });
});

Cypress.Commands.add('fillInContributors', (contributorRoles) => {
  var index = 0;
  contributorRoles.forEach((role: string) => {
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
          cy.get(`[data-testid=${field.landingPageTestId}]`).get(`[title="${field.value}"]`);
        } else if (field['landingPageTestId'] === dataTestId.registrationLandingPage.title) {
          cy.get(`[data-testid=${dataTestId.registrationLandingPage.registrationSubtype}]`)
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
    const mobilePickerSelector = `${selector} input[readonly]`;
    const isMobile = $body.find(mobilePickerSelector).length > 0;
    if (isMobile) {
      // The MobileDatePicker component has readonly inputs and needs to
      // be opened and clicked on edit so its inputs can be edited
      cy.get(mobilePickerSelector).click();
      cy.get('[role="dialog"] [aria-label="calendar view is open, go to text input view"]').click();
      cy.get(`[role="dialog"] ${selector}`)
        .last()
        .then((dialog: any) => {
          cy.log(dialog);
        });
      const selectorString = `[role="dialog"] ${selector}`;
      cy.get(selectorString).last().find('input').clear().type(value);
      cy.contains('[role="dialog"] button', 'OK').click();
    } else {
      cy.get(selector)
        .find('input')
        .then((input: any) => {
          cy.log(input);
        });
      cy.get(selector).find('input').clear().type(value);
    }
  });
});
