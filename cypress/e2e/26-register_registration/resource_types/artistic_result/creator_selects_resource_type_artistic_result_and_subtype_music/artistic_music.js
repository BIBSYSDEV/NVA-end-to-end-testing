// Feature: Creator selects Resource type Artistic Result and subtype Music

import { userMusic } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import { musicAudioVideoFields, musicAudioVideoTrackFields, musicAudioVideoTrackTypes, musicAwards, musicConcertFields, musicConcertProgramFields, musicOtherFields, musicOtherWorksField, musicScoreFields } from '../../../../../support/data_testid_constants';

// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Music"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.login(userMusic);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select Resource Subtype "Music"', () => {
  cy.get('[data-testid=resource-type-chip-MusicPerformance]').click();
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
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.placeField}]`).type('Test concert place');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputDuration}]`).type('Test concert duration');
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.outputInstantDateField}]`, '11.11.2011');
  cy.get(`[data-testid=${musicConcertProgramFields['Works']}]`).click();
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.concertProgramTitle}]`).type('Title');
  cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.concertProgramComposer}]`).type('Composer');
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
  cy.contains('Show/Edit');
});
And('they can delete existing Exhibitions', () => {
  cy.contains('Remove');
});

// Scenario: Creator adds a Concert to a Music result
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Music"', () => {
  cy.login(userMusic);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get('[data-testid=resource-type-chip-MusicPerformance]').click();
});
When('they add a Concert with details for:', (dataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addConcertShowButton}]`).click();
  dataTable.rawTable.forEach(value => {
    if (value[0] === 'Date') {
      cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.resourceType.outputInstantDateField}]`, '11.11.2011');
    } else if (value[0] !== 'Works') {
      cy.get(`[data-testid=${musicConcertFields[value[0]]}]`).type(`Test ${value[0]}`);
    }
  })
});
// | Part of a series/tour |
// | Place                 |
// | Date                  |
// | Extent                |
// | Works                 |
And('each Work has details for:', (dataTable) => {
  cy.get(`[data-testid=${musicConcertFields['Works']}]`).click();
  dataTable.rawTable.forEach((value) => {
    if (value[0 === 'Premiere']) {
      cy.get(`[data-testid^=${musicConcertProgramFields[value[0]]}]`).first().within(() => {
        cy.get('input').click();
      })
    } else {
      cy.get(`[data-testid^=${musicConcertProgramFields[value[0]]}]`).first().type(`Test ${value[0]}`);
    }
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
// | Title    |
// | Composer |
// | Premiere |
Then('the Concert is listed under Exhibitions', () => {
  cy.contains('Test Place');
});

// Scenario: Creator selects that a Concert is part of a series/tour
When('they select "Part of a series/tour"', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.addConcertShowButton).click();
});
Then('they see field:', () => {
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.concertSeriesCheckbox).click();
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.dateFromField);
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.dateToField);
});
// | Date from |
// | Date end  |

// Scenario: Creator adds a Audio/visual publication to a Music result
When('they add a Audiovisual publication with details for:', (dataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addAudioVideoPublicationButton}]`).click();
  dataTable.rawTable.forEach((value) => {
    if (value[0] === 'Format') {
      cy.get(`[data-testid=${musicAudioVideoFields[value[0]]}]`).click();
      cy.get(`[data-value=${musicAudioVideoTrackTypes['CD']}]`).click();
    } else if (value[0] === 'Track list') {
      cy.get(`[data-testid=${musicAudioVideoFields[value[0]]}]`).click()
    } else if (value[0] === 'ISRC') {
      cy.get(`[data-testid=${musicAudioVideoFields[value[0]]}]`).type('NG-JY5-45-11574')
    } else {
      cy.get(`[data-testid=${musicAudioVideoFields[value[0]]}]`).type(`Test audio/video ${value[0]}`);
    }
  })
});
// | Format           |
// | Publisher        |
// | Catalogue number |
// | Track list       |
And('Format can be any of:', (dataTable) => {
  cy.get(`[data-testid=${musicAudioVideoFields['Format']}]`).click();
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-value=${musicAudioVideoTrackTypes[value[0]]}]`)
  })
  cy.get(`[data-value=${musicAudioVideoTrackTypes[dataTable.rawTable[0][0]]}]`).click();
});
// | CD        |
// | DVD       |
// | Streaming |
// | Download  |
// | LP/EP     |
// | Other     |
And('each Track list item has details for:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    if (value[0] === 'Extent') {
      cy.get(`[data-testid^=${musicAudioVideoTrackFields[value[0]]}]`).first().type(10);

    } else {
      cy.get(`[data-testid^=${musicAudioVideoTrackFields[value[0]]}]`).first().type(`Test audio/video ${value[0]}`);
    }
  });
});
// | Title    |
// | Composer |
// | Extent   |
Then('the Audiovisual publication is listed under Exhibitions', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
  cy.contains('Test audio/video Publisher');
});

// Scenario: Creator adds a Music score to a Music result
When('they add a Music score with details for:', (dataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addScoreManuscriptButton}]`).click();
  dataTable.rawTable.forEach((value) => {
    if (value[0] === 'ISMN') {
      cy.get(`[data-testid=${musicScoreFields[value[0]]}]`).type(`9790230671187`);
    } else if (value[0] === 'ISRC') {
      cy.get(`[data-testid=${musicScoreFields[value[0]]}]`).type(`AA6Q72000047`);
    } else {
      cy.get(`[data-testid=${musicScoreFields[value[0]]}]`).type(`Test score ${value[0]}`);
    }
  })
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
// | Ensemble  |
// | Movements |
// | Extent    |
// | Publisher |
// | ISMN      |
// | ISRC      |
Then('the Music score is listed under Exhibitions', () => {
  cy.contains('Test score Publisher');
});

// Scenario: Creator adds a Other performance to a Music result
When('they add a Other performance with details for:', (dataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addOtherButton}]`).click();
  dataTable.rawTable.forEach((value) => {
    if (value[0] === 'Other performance') {
      cy.get(`[data-testid=${musicOtherFields[value[0]]}]`).click();
    } else {
      cy.get(`[data-testid=${musicOtherFields[value[0]]}]`).type(`Test other ${value[0]}`);
    }
  })
});
// | Type   |
// | Place  |
// | Extent |
// | Works  |
And('each Other performance has details for:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${musicOtherWorksField[value[0]]}]`).type(`Test other ${value[0]}`);
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
// | Title    |
// | Composer |
Then('the Other performance is listed under Exhibitions', () => {
  cy.contains('Test other Place');
});
