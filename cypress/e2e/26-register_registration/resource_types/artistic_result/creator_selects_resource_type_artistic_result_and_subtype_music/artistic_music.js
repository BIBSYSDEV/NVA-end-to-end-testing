// Feature: Creator selects Resource type Artistic Result and subtype Music

import { userMusic } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { musicAwards } from '../../../../../support/data_testid_constants';

// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Music"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.login(userMusic);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get(`[data-testid=publication-context-type]`).click();
  cy.get('[data-testid=publication-context-type-Artistic]').click();
});
When('they select Resource Subtype "Music"', () => {
  cy.get(`[data-testid=publication-instance-type]`).click();
  cy.get('[data-testid=publication-instance-type-MusicPerformance]').click();
});
And('they can add Exhibitions of type:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${musicAwards[value[0]]}]`);
  });
});
// | Concert                  |
// | Audio/visual publication |
// | Music score              |
// | Other performance        |
And('they can edit existing Exhibitions', () => {
  cy.get(`[data-testid=${musicAwards['Concert']}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.concertPlace}]`).type('Test music award name');

});
And('they can delete existing Exhibitions', () => {});

// Scenario: Creator adds a Concert to a Music result
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Music"', () => {});
When('they add a Concert with details for:', () => {});
// | Part of a series/tour |
// | Place                 |
// | Date                  |
// | Extent                |
// | Works                 |
And('each Work has details for:', () => {});
// | Title    |
// | Composer |
// | Premiere |
Then('the Concert is listed under Exhibitions', () => {});

// Scenario: Creator selects that a Concert is part of a series/tour
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Music"', () => {});
When('they select "Part of a series/tour"', () => {});
Then('they see field:', () => {});
// | Date from |
// | Date end  |

// Scenario: Creator adds a Audio/visual publication to a Music result
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Music"', () => {});
When('they add a Audio/visual publication with details for:', () => {});
// | Format           |
// | Publisher        |
// | Catalogue number |
// | Track list       |
And('Format can be any of:', () => {});
// | CD        |
// | DVD       |
// | Streaming |
// | Download  |
// | LP/EP     |
// | Other     |
And('each Track list item has details for:', () => {});
// | Title    |
// | Composer |
// | Extent   |
Then('the Audio/visual publication is listed under Exhibitions', () => {});

// Scenario: Creator adds a Music score to a Music result
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Music"', () => {});
When('they add a Music score with details for:', () => {});
// | Ensemble  |
// | Movements |
// | Extent    |
// | Publisher |
// | ISMN      |
// | ISRC      |
Then('the Music score is listed under Exhibitions', () => {});

// Scenario: Creator adds a Other performance to a Music result
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Music"', () => {});
When('they add a Other performance with details for:', () => {});
// | Type   |
// | Place  |
// | Extent |
// | Works  |
And('each Work has details for:', () => {});
// | Title    |
// | Composer |
Then('the Other performance is listed under Exhibitions', () => {});
