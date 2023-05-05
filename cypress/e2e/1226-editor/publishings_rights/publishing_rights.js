import { userEditor, userSecondEditor } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Feature: Editor decides who gets publishing rights

// 	In order to decide the publishing policy at an Institution
// 	As an Editor
// 	I want to choose between different options

const publishStrategies = {
  'Registrator has full publishing rights': dataTestId.editor.workflowRegistratorPublishesAll,
  'Registrator can only publish metadata': dataTestId.editor.workflowRegistratorPublishesMetadata,
  'Only Curator can publish': dataTestId.editor.workflowRegistratorRequiresApproval,
};

// Background:
Given('an Institution with one or more Editor roles', () => {
  cy.login(userSecondEditor);
});

// Scenario: Default publishing rights
When('the Editor of an Institution hasn’t chosen a policy', () => {
  cy.login(userEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
});
Then('the publications policy is:', () => {
  cy.getDataTestId(dataTestId.editor.workflowRegistratorPublishesAll).should('be.disabled');
});
// | Registrator has full publishing rights |

// Scenario: Editor defines publishing rights
Given('a Editor views the Editor page', () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
});
When('the Editor chooses {string}:', (strategy) => {
  cy.wrap(publishStrategies[strategy]).as('strategyButton');
  cy.getDataTestId(publishStrategies[strategy]).click({ force: true });
});
// | Registrator has full publishing rights |
// | Registrator can only publish metadata  |
// | Only Curator can publish               |
Then('the Institutions publications policy is changed accordingly', () => {
  cy.get('@strategyButton').then((button) => {
    cy.getDataTestId(button).should('be.disabled');
  })
});
And('the Editor is notified that a new policy is activated', () => {
  cy.get('@strategyButton').then(strategy => {
    if (strategy !== publishStrategies[Object.keys(publishStrategies)[0]]) {
      cy.getDataTestId('snackbar-success');
    }
  })
});
