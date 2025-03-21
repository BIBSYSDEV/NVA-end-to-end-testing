// Feature: Creator selects Resource type Artistic Result and subtype Literary Arts

import { userLiteraryArts } from '../../../../../support/constants';
import { dataTestId } from '../../../../../support/dataTestIds';
import {
  literaryArtsAnnouncements,
  literaryArtsBookFields,
  literaryArtsPerformanceFields,
  literaryArtsWebFields,
  literaryArtsAudioVisualFields,
} from '../../../../../support/data_testid_constants';
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"
Given('Creator navigates to the Resource Type tab and selects Resource type "Artistic Result"', () => {
  cy.login(userLiteraryArts);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
});
When('they select Resource Subtype "Literary Arts"', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.resourceTypeChip('LiteraryArts')}]`).click();
});
Then('they see fields:', () => {});
//   | More information |
Then('they see field for Type Work with options:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticTypeField}]`).click();
  dataTable.raw().forEach((value) => {
    if (value[0] === 'Other') {
      cy.get(`[data-value=LiteraryArtsOther]`).should('be.visible');
    } else {
      cy.get(`[data-value=${value[0]}]`).should('be.visible');
    }
  });
});
//   | Novel        |
//   | Poetry       |
//   | Novella      |
//   | ShortFiction |
//   | Essay        |
//   | Translation  |
//   | Retelling    |
//   | Play         |
//   | Other        |
Then('they can add Announcements of type:', (dataTable: DataTable) => {
  cy.testDataTestidList(dataTable, literaryArtsAnnouncements);
});
//   | Monograph                |
//   | Web Publication          |
//   | Performance              |
//   | Audio/Visual Publication |

//   Scenario: Creator adds an Monograph
Given('Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"', () => {
  cy.login(userLiteraryArts);
  cy.startWizardWithEmptyRegistration();
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.resourceTypeChip('LiteraryArts')}]`).click();
});
When('they add a Monograph with details for:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addBookButton}]`).click();
  dataTable.raw().forEach((field: string[]) => {
    cy.get(`[data-testid=${literaryArtsBookFields[field[0]]['field']}]`).type(literaryArtsBookFields[field[0]]['value']);
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
//   | Publisher   |
//   | Year        |
//   | ISBN        |
//   | Total pages |
Then('the Monograph is listed under Announcements', () => {
  cy.contains(literaryArtsBookFields['Publisher']['value']);
});
Then('they can edit the Monograph', () => {
  cy.contains('Show/Edit');
});
Then('they can remove the Monograph', () => {
  cy.contains('Remove');
});

//   Scenario: Creator adds an Web Publication
// Given('Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"', () => { })
When('they add a Web Publication with details for:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addWebPublicationButton}]`).click();
  dataTable.raw().forEach((field: string[]) => {
    cy.get(`[data-testid=${literaryArtsWebFields[field[0]]['field']}]`).type(literaryArtsWebFields[field[0]]['value']);
  });
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
//   | Link      |
//   | Publisher |
//   | Year      |
Then('the Web Publication is listed under Announcements', () => {
  cy.contains(literaryArtsWebFields['Publisher']['value']);
});
Then('they can edit the Web Publication', () => {
  cy.contains('Show/Edit');
});
Then('they can remove the Web Publication', () => {
  cy.contains('Remove');
});

//   Scenario: Creator adds an Performance
// Given('Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"', () => { })
When('they add a Performance with details for:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addPerformanceButton}]`).click();
  dataTable.raw().forEach((field) => {
    if (field[0] === 'Type of Performance') {
      cy.get(`[data-testid=${literaryArtsPerformanceFields[field[0]]['field']}]`).click();
      cy.get(`[data-value=${literaryArtsPerformanceFields[field[0]]['value']}]`).click();
    } else if (field[0] === 'Date') {
      cy.chooseDatePicker(
        `[data-testid=${literaryArtsPerformanceFields[field[0]]['field']}]`,
        literaryArtsPerformanceFields[field[0]]['value']
      );
    } else {
      cy.get(`[data-testid=${literaryArtsPerformanceFields[field[0]]['field']}]`).type(
        literaryArtsPerformanceFields[field[0]]['value']
      );
    }
  });
});
//   | Type of Performance |
//   | Place               |
//   | Date                |
When('Type of Performance can be one of:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.subtypeField}]`).click();
  dataTable.raw().forEach((type) => {
    if (type[0] !== 'Other') {
      cy.get(`[data-value=${type}]`);
    } else {
      cy.get(`[data-value=LiteraryArtsPerformanceOther]`);
    }
  });
  cy.get(`[data-value=${literaryArtsPerformanceFields['Type of Performance']['value']}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
//   | Reading |
//   | Play    |
//   | Other   |
Then('the Performance is listed under Announcements', () => {
  cy.contains(literaryArtsPerformanceFields['Type of Performance']['value']);
});
Then('they can edit the Performance', () => {
  cy.contains('Show/Edit');
});
Then('they can remove the Performance', () => {
  cy.contains('Remove');
});

//   Scenario: Creator adds an Audio/Visual Publication
// Given('Creator navigates to the Resource Type tab and selects Resource subtype "Literary Arts"', () => { })
When('they add an AudioVisual Publication with details for:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.addAudioVideoButton}]`).click();
  dataTable.raw().forEach((field) => {
    if (field[0] === 'Type of audio/visual publication') {
      cy.get(`[data-testid=${literaryArtsAudioVisualFields[field[0]]['field']}]`).click();
      cy.get(`[data-value=${literaryArtsAudioVisualFields[field[0]]['value']}]`).click();
    } else {
      cy.get(`[data-testid=${literaryArtsAudioVisualFields[field[0]]['field']}]`).type(
        literaryArtsAudioVisualFields[field[0]]['value']
      );
    }
  });
});
//   | Type of audio/visual publication |
//   | Publisher                        |
//   | Year                             |
//   | ISBN                             |
//   | Duration                         |
When('Type of Type of audiovisual publication can be one of:', (dataTable: DataTable) => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.subtypeField}]`).click();
  dataTable.raw().forEach((type: string[]) => {
    if (type[0] === 'Other') {
      cy.get(`[data-value=LiteraryArtsAudioVisualOther]`);
    } else {
      cy.get(`[data-value=${type[0]}]`);
    }
  });
  cy.get(`[data-value=${literaryArtsAudioVisualFields['Type of audio/visual publication']['value']}]`).click();
  cy.get(`[data-testid=${dataTestId.registrationWizard.resourceType.artisticOutputSaveButton}]`).click();
});
//   | Audiobook |
//   | RadioPlay |
//   | ShortFilm |
//   | Podcast   |
//   | Other     |
Then('the AudioVisual Publication is listed under Announcements', () => {
  cy.contains(literaryArtsAudioVisualFields['Publisher']['value']);
});
Then('they can edit the AudioVisual Publication', () => {
  cy.contains('Show/Edit');
});
Then('they can remove the AudioVisual Publication', () => {
  cy.contains('Remove');
});
