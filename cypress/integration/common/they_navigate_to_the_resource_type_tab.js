import { When } from 'cypress-cucumber-preprocessor/steps';
import { RESOURCE_TYPE_FIELDS } from '../../support/data_testid_constants';

When('they navigate to the Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type').click({ force: true });
  cy.wrap(RESOURCE_TYPE_FIELDS).as('fields');
});
