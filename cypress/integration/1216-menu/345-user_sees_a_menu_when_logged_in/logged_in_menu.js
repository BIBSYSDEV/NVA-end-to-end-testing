import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import { v4 as uuidV4 } from 'uuid';
import 'cypress-localstorage-commands';

Given('that the user is logged in', () => {
  cy.login(USER_WITH_AUTHOR);
});
And('they have no NVA role', () => {});
When('they look at any page in NVA', () => {
  cy.visit(`/${uuidV4()}`);
});
Then('they see a menu containing', (dataTable) => {
  cy.get('[data-testid=menu]').click({ force: true });
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid]`).contains(value[0]);
  });
});
// | My profile |
// | Log out    |
