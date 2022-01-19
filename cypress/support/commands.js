import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import Amplify, { Auth } from 'aws-amplify';
import 'cypress-localstorage-commands';
import 'cypress-file-upload';
import {
  mockPersonFeideIdSearch,
  mockPersonNameSearch,
  mockPerson,
  projectSearchMockFile,
  projectApiPath,
  journalSearchMockFile,
} from './mock_data';
import { Given, When, Then, And, Before } from 'cypress-cucumber-preprocessor/steps';
import { dataTestId } from './dataTestIds';
import { registrationFields } from './save_registration';

const awsAccessKeyId = Cypress.env('AWS_ACCESS_KEY_ID');
const awsSecretAccessKey = Cypress.env('AWS_SECRET_ACCESS_KEY');
const awsSessionToken = Cypress.env('AWS_SESSION_TOKEN');
const region = Cypress.env('AWS_REGION');
const userPoolId = Cypress.env('AWS_USER_POOL_ID');
const clientId = Cypress.env('AWS_CLIENT_ID');
const stage = Cypress.env('STAGE') ?? 'dev';

AWS.config = new AWS.Config({
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

const authFlow = 'ADMIN_USER_PASSWORD_AUTH';

Cypress.Commands.add('connectAuthor', () => {
  cy.get(`[data-testid=create-author-button]`).click();
  cy.get('[data-testid=modal_next]').click();
});

Cypress.Commands.add('skipOrcid', () => {
  cy.get('[data-testid=skip-connect-to-orcid]').click();
});

Cypress.Commands.add('setLanguage', () => {
  cy.get(`[data-testid=${dataTestId.header.generalMenuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.myProfileLink}]`).click();
  cy.get('[data-testid=language-selector]').click();
  cy.get('[data-testid=user-language-eng]').click();
});

Cypress.Commands.add('checkMenu', (table) => {
  cy.get(`[data-testid=${dataTestId.header.generalMenuButton}]`).click();
  table.forEach((row) => {
    const menuItem = row[0];
    cy.get('li').should('contain.text', menuItem);
  });
});

Cypress.Commands.add('loginCognito', (userId) => {
  return new Cypress.Promise((resolve, reject) => {
    Amplify.configure(amplifyConfig);
    const randomPassword = `P%${uuidv4()}`;

    const authorizeUser = {
      AuthFlow: authFlow,
      ClientId: clientId,
      UserPoolId: userPoolId,
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

    identityServiceProvider.adminSetUserPassword(passwordParams, (err, data) => {
      if (data) {
        identityServiceProvider.adminInitiateAuth(authorizeUser, async (err, data) => {
          if (data) {
            if (!data.ChallengeName) {
              await Auth.signIn(userId, randomPassword);
              resolve(data.AuthenticationResult.IdToken);
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
});

Cypress.Commands.add('login', (userId) => {
  cy.loginCognito(userId).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.mockPersonSearch(userId);
    cy.mockCreatePerson(userId);
    cy.mockUpdatePerson(userId);
    cy.mockDepartments();
    cy.visit('/');
  });
});

Cypress.Commands.add('startRegistrationWithFile', (fileName) => {
  cy.get(`[data-testid=${dataTestId.header.newRegistrationLink}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.fileAccordion}]`).click({ force: true });
  cy.get('input[type=file]').attachFile(fileName);
});

Cypress.Commands.add('startWizardWithFile', (fileName) => {
  cy.startRegistrationWithFile(fileName);
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible')
    .should('be.enabled');
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible')
    .click({ force: true });
});

Cypress.Commands.add('startRegistrationWithLink', (doiLink) => {
  cy.get(`[data-testid=${dataTestId.header.newRegistrationLink}]`).click({ force: true });
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.linkAccordion}]`).click({ force: true });
  cy.get('[data-testid=new-registration-link-field]').within((linkField) => {
    cy.wrap(linkField).get('input').type(doiLink);
  });
  cy.get('[data-testid=doi-search-button]').click({ force: true });
});

Cypress.Commands.add('startWizardWithLink', (doiLink) => {
  cy.startRegistrationWithLink(doiLink);
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible')
    .should('be.enabled');
  cy.get(`[data-testid=${dataTestId.registrationWizard.new.startRegistrationButton}]`)
    .filter(':visible')
    .click({ force: true });
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

Cypress.Commands.add('logoutCognito', () => {
  Auth.signOut();
});

Cypress.Commands.add('createValidRegistration', (fileName) => {
  // Description
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.descriptionStepButton}]`).click({ force: true });
  cy.get('[data-testid=registration-title-field]').type('Title');
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`).type('01.01.2020');

  // Reference
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click({ force: true });

  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });

  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });

  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.publisherField}]`)
    .click({ force: true })
    .type('Norges');
  cy.contains('Norges forskningsråd').click({ force: true });

  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentField}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.contentValue('academic-monograph')}]`).click();

  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.peerReviewed}] > div > label > span`)
    .first()
    .click({ force: true });

  // Contributors
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.contributorsStepButton}]`).click({ force: true });
  cy.get('[data-testid=Creator] > button').click({ force: true });
  cy.get('[data-testid=search-field]').type('Testuser Withauthor{enter}');
  cy.get('[data-testid=author-radio-button]').click({ force: true });
  cy.get('[data-testid=connect-author-button]').click({ force: true });

  // Files and reference
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click({ force: true });
  cy.get('input[type=file]').attachFile(fileName);
  cy.get(`[data-testid=${dataTestId.registrationWizard.files.version}]`).within(() => {
    cy.get('input[type=radio]').first().click();
  });
  cy.get('[data-testid=uploaded-file-select-license]').click({ force: true }).type(' ');
  cy.get('[data-testid=license-item]').first().click({ force: true });
});

Cypress.Commands.add('testDataTestidList', (dataTable, values) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${values[value[0]]}]`);
  });
});

Cypress.Commands.add('selectRegistration', (title, type) => {
  cy.get(`[data-testid=${dataTestId.header.menuButton}]`).click();
  cy.get(`[data-testid=${dataTestId.header.myRegistrationsLink}]`).click();
  cy.get(`[data-testid=${type}-button]`).click();
  cy.get('[data-testid^=registration-title]')
    .filter(`:contains(${title})`)
    .parent()
    .within(() => {
      cy.get('[data-testid^=open-registration]').click();
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
  cy.intercept(`https://api.${stage}.nva.aws.unit.no/person?name=*`, mockPersonNameSearch(userId));
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

Cypress.Commands.add('mockUpdatePerson', (userId) => {
  cy.intercept('POST', `https://api.${stage}.nva.aws.unit.no/person/1234567890/identifiers/feideid/add`, (req) => {
    const author = { ...mockPerson(userId), feideids: [userId] };
    req.reply(author);
  });
  cy.intercept('POST', `https://api.${stage}.nva.aws.unit.no/person/1234567890/identifiers/orgunitid/add`, (req) => {
    const author = { ...mockPerson(userId), feideids: [userId] };
    const orgunitids = [...mockPerson(userId).orgunitids];
    orgunitids.push(req.body['identifier']);
    author.orgunitids = [...orgunitids];
    req.reply(author);
  });
  cy.intercept(
    'DELETE',
    `https://api.${stage}.nva.aws.unit.no/person/1234567890/identifiers/orgunitid/delete`,
    (req) => {
      const author = { ...mockPerson(userId), feideids: [userId] };
      author['orgunitids'] = author['orgunitids'].filter((item) => {
        return item !== req.body['identifier'];
      });
      req.reply(author);
    }
  );
  cy.intercept('DELETE', `https://api.${stage}.nva.aws.unit.no/person/1234567890/identifiers/feideid/delete`, (req) => {
    const author = { ...mockPerson(userId), feideids: [userId] };
    author['feideid'] = author['feideid'].filter((item) => {
      return item !== req.body['identifier'];
    });
    req.reply(author);
  });
});

Cypress.Commands.add('mockCreatePerson', (userId) => {
  const author = { ...mockPerson(userId), feideids: [userId] };
  cy.intercept('POST', `https://api.${stage}.nva.aws.unit.no/person`, {
    statusCode: 200,
    body: author,
  });
});

Cypress.Commands.add('fillInCommonFields', () => {
  Object.keys(registrationFields).forEach((key) => {
    cy.get(`[data-testid=${registrationFields[key]['tab']}]`).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      const field = registrationFields[key][subkey];
      switch (field['type']) {
        case 'text':
          cy.get(`[data-testid=${field['fieldTestId']}]`).should('be.visible').type(field['value']);
          break;
        case 'search':
          cy.get(`[data-testid=${field['fieldTestId']}]`).should('be.visible').type(field['value']);
          cy.contains(field['value']).click();
          break;
        case 'file':
          cy.get('input[type=file]').attachFile(field['value']);
          break;
        case 'select':
          cy.get(`[data-testid=${field['fieldTestId']}]`).should('be.visible').type(' ');
          cy.contains(field['value']).click({ force: true });
          break;
        case 'add':
          cy.get(`[data-testid=${field['fieldTestId']}]`).click();
          if ('select' in field['add']) {
            cy.get(`[data-testid=${field['add']['select']['selectTestId']}]`).click();
            cy.contains(field['add']['select']['value']).click({ force: true });
          }
          cy.get(`[data-testid=${field['add']['searchFieldTestId']}]`).type(field['add']['searchValue']);
          cy.get(`[data-testid=${field['add']['resultsTestId']}]`).filter(`:contains(${field['value']})`).click();
          cy.get(`[data-testid=${field['add']['selectButtonTestId']}]`).click();
          break;
        case 'checkbox':
          switch (field['checkbox']['selected']) {
            case 'first':
              cy.get(`[data-testid=${field['fieldTestId']}`).within(() => {
                cy.get('input').first().click();
              });
              break;
            case 'check':
              if (field['value']) {
                cy.get(`[data-testid=${field['fieldTestId']}]`).click();
              }
              break;
          }
          break;
        default:
          break;
      }
    });
  });
});

Cypress.Commands.add('checkLandingPage', () => {
  Object.keys(registrationFields).forEach((key) => {
    Object.keys(registrationFields[key]).forEach((subkey) => {
      const field = registrationFields[key][subkey];
      if (field['landingPageTestId']) {
        if (field['landingPageTestId'] === dataTestId.registrationLandingPage.license) {
          cy.get(`[data-testid=${field['landingPageTestId']}]`).get(`[title="${field['value']}"]`);
        } else {
          cy.get(`[data-testid^=${field['landingPageTestId']}]`).should('contain', field['value']);
        }
      }
    });
  });
});
