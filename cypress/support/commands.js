import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import Amplify, { Auth } from 'aws-amplify';
import 'cypress-localstorage-commands';
import 'cypress-file-upload';
import {
  PERSON_API_PATH,
  mockPersons,
  PROJECT_SEARCH_MOCK_FILE,
  PROJECT_API_PATH,
  PUBLISHER_SEARCH_MOCK_FILE,
  JOURNAL_SEARCH_MOCK_FILE,
} from './mock_data';

const AWS_ACCESS_KEY_ID = Cypress.env('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = Cypress.env('AWS_SECRET_ACCESS_KEY');
const AWS_SESSION_TOKEN = Cypress.env('AWS_SESSION_TOKEN');
const REGION = Cypress.env('AWS_REGION');
const USER_POOL_ID = Cypress.env('AWS_USER_POOL_ID');
const CLIENT_ID = Cypress.env('AWS_CLIENT_ID');

const SET_AUTHORITY_DATA = 'set authority data';

AWS.config = new AWS.Config({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN,
  region: REGION,
});

const amplifyConfig = {
  Auth: {
    region: REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: CLIENT_ID,
  },
};

const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const AUTH_FLOW = 'ADMIN_USER_PASSWORD_AUTH';

Cypress.Commands.add('connectAuthor', () => {
  cy.get('[data-testid=create-author-button]').click();
  cy.get('[data-testid=modal_next]').click();
});

Cypress.Commands.add('skipOrcid', () => {
  cy.get('[data-testid=skip-connect-to-orcid]').click();
});

Cypress.Commands.add('setLanguage', () => {
  cy.get('[data-testid=menu]').click();
  cy.get('[data-testid=menu-user-profile-button]').click();
  cy.get('[data-testid=language-selector]').click();
  cy.get('[data-testid=user-language-eng]').click();
});

Cypress.Commands.add('checkMenu', (table) => {
  cy.get('[data-testid=menu]').click();
  table.forEach((row) => {
    const menuItem = row[0];
    cy.get('li').should('contain.text', menuItem);
  });
});

Cypress.Commands.add('loginCognito', (userId) => {
  return new Cypress.Promise((resolve, reject) => {
    Amplify.configure(amplifyConfig);
    const RANDOM_PASSWORD = `P%${uuidv4()}`;

    const authorizeUser = {
      AuthFlow: AUTH_FLOW,
      ClientId: CLIENT_ID,
      UserPoolId: USER_POOL_ID,
      AuthParameters: {
        USERNAME: userId,
        PASSWORD: RANDOM_PASSWORD,
      },
    };

    const passwordParams = {
      Password: RANDOM_PASSWORD,
      UserPoolId: USER_POOL_ID,
      Username: userId,
      Permanent: true,
    };

    identityServiceProvider.adminSetUserPassword(passwordParams, (err, data) => {
      if (data) {
        identityServiceProvider.adminInitiateAuth(authorizeUser, async (err, data) => {
          if (data) {
            if (!data.ChallengeName) {
              await Auth.signIn(userId, RANDOM_PASSWORD);
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
    cy.visit('/');
  });
});

Cypress.Commands.add('startRegistrationWithFile', (fileName) => {
  cy.get('[data-testid=new-registration]').click({ force: true });
  cy.get('[data-testid=new-registration-file]').click({ force: true });
  cy.get('input[type=file]').attachFile(fileName);
});

Cypress.Commands.add('startWizardWithFile', (fileName) => {
  cy.startRegistrationWithFile(fileName);
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});

Cypress.Commands.add('startRegistrationWithLink', (doiLink) => {
  cy.get('[data-testid=new-registration]').click({ force: true });
  cy.get('[data-testid=new-registration-link]').click({ force: true });
  cy.get('[data-testid=new-registration-link-field]').within((linkField) => {
    cy.wrap(linkField).get('input').type(doiLink);
  });
  cy.get('[data-testid=doi-search-button]').click({ force: true });
});

Cypress.Commands.add('startWizardWithLink', (doiLink) => {
  cy.startRegistrationWithLink(doiLink);
  cy.get('[data-testid=registration-link-next-button]').should('be.enabled');
  cy.get('[data-testid=registration-link-next-button]').click({ force: true });
});

Cypress.Commands.add('logoutCognito', () => {
  Auth.signOut();
});

Cypress.Commands.add('createValidRegistration', () => {
  // Description
  cy.get('[data-testid=nav-tabpanel-description').click({ force: true });
  cy.get('[data-testid=registration-title-field]').type('Title');
  cy.get('[data-testid=date-published-field]').type('01.01.2020');

  // Reference
  cy.get('[data-testid=nav-tabpanel-resource-type').click({ force: true });

  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });

  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });

  cy.get('[data-testid=publisher-search-field]').click({ force: true }).type('Norges');
  cy.contains('Norges forskningsråd').click({ force: true });

  cy.get('[data-testid=content-field]').click();
  cy.get('[data-testid=content-value-academic-monograph]').click();

  cy.get('[data-testid=peer-review-field] > div > label > span').first().click({ force: true });

  // Contributors
  cy.get('[data-testid=nav-tabpanel-contributors').click({ force: true });
  cy.get('[data-testid=Creator] > button').click({ force: true });
  cy.get('[data-testid=search-field]').type('Testuser Withauthor{enter}');
  cy.get('[data-testid=author-radio-button]').click({ force: true });
  cy.get('[data-testid=connect-author-button]').click({ force: true });

  // Files and reference
  cy.get('[data-testid=nav-tabpanel-files-and-license').click({ force: true });
  cy.get('[data-testid=uploaded-file-select-license]').click({ force: true }).type(' ');
  cy.get('[data-testid=license-item]').first().click({ force: true });
});

Cypress.Commands.add('testDataTestidList', (dataTable, values) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${values[value[0]]}]`);
  });
});

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

Cypress.Commands.add('mockPersonSearch', (person) => {
  cy.intercept(PERSON_API_PATH, mockPersons[person]);
});

Cypress.Commands.add('mockProjectSearch', (searchTerm) => {
  cy.fixture(PROJECT_SEARCH_MOCK_FILE).then((searchResult) => {
    cy.intercept(PROJECT_API_PATH, searchResult);
  });
});

Cypress.Commands.add('mockInstitution', (cristinId) => {
  cy.fixture('institutions.json').then((institutions) => {
    cy.intercept('https://api.dev.nva.aws.unit.no/institution/institutions*', institutions);
  });
});

Cypress.Commands.add('mockDepartments', (cristinId) => {
  var departments_file = 'departments.json';
  cristinId ? (departments_file = `departments_${cristinId}.json`) : null;
  cy.fixture(departments_file).then((departments) => {
    cy.intercept(
      `https://api.dev.nva.aws.unit.no/institution/departments?uri=https%3A%2F%2Fapi.cristin.no%2Fv2%2Finstitutions%2F${cristinId}*&language=en`,
      departments
    );
    cy.intercept(
      `https://api.dev.nva.aws.unit.no/institution/departments?uri=https%3A%2F%2Fapi.cristin.no%2Fv2%2Funits%2F${cristinId}*&language=en`,
      departments
    );
  });
});

Cypress.Commands.add('mockPublishers', () => {
  cy.fixture(PUBLISHER_SEARCH_MOCK_FILE).then((publishers) => {
    cy.intercept('https://api.dev.nva.aws.unit.no/publication-channels/publisher*', publishers);
  });
});

Cypress.Commands.add('mockJournalSearch', () => {
  cy.fixture(JOURNAL_SEARCH_MOCK_FILE).then((journals) => {
    cy.intercept('https://api.dev.nva.aws.unit.no/publication-channels/journal*', journals);
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
