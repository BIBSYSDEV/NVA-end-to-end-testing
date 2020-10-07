import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { v4 as uuidV4 } from 'uuid';
import 'cypress-localstorage-commands';

Given('that the user is logged in', () => {
  cy.loginCognito(USER_WITH_AUTHOR).then((idToken) => {
    cy.wrap(idToken).as('idToken');
    cy.setLocalStorage('i18nextLng', 'eng');
    cy.setLocalStorage('previouslyLoggedIn', 'true');
    cy.visit('/');
  });
});
When('they click the menu item My Profile', () => {
  cy.get('[data-testid=menu]').click({ force: true });
  cy.get('[data-testid=menu-user-profile-button]').click({ force: true });
});
Then('they see My Profile', () => {});
And('they see their Profile page which includes information for', (dataTable) => {
  const fieldMap = {
    'Real name': 'user-name',
    'Feide ID': 'user-id',
    Email: 'user-id',
    ORCID: 'button-create-connect-orcid',
    'Role(s)': 'user-role',
    Institution: 'institution-presentation',
    'Preferred language': 'language-selector',
  };
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${fieldMap[value[0]]}]`).should('exist');
  });
});
// | Real name          |
// | Feide ID           |
// | Email              |
// | ORCID              |
// | Role(s)            |
// | Institution        |
// | Preferred language |
