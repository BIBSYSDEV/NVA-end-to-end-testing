import { userNviCurator } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';

// Background:
Given('an logged-in Curator at an NVI-Institution', () => {
  cy.login(userNviCurator);
});

// Scenario: Curator views NVI-report status at own Institution
When('a Curator uses the option to view the NVI-Report status at own Institution', () => {
  cy.getDataTestId(dataTestId.header.tasksLink).click();
  cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
});
Then('the Curator sees a visualization of current progress compared with last year ', () => {});
And('it contains number of Validated Resources', () => {});
And('it contains number of Nominated Resources', () => {});
And('it contains number of Candidate Resources', () => {});
