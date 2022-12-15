import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { userSavePartOfBook } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';

const commonFields = [];

const fields = {
  'ArtisticDesign': [
    resourceTypeFields.artisticType('ProductDesign'),
    resourceTypeFields.artisticDescription,
    resourceTypeFields.exhibitionPlace,
  ],
  'Architecture': [
    resourceTypeFields.artisticType('Building'),
    resourceTypeFields.artisticDescription,
    resourceTypeFields.competition,
    resourceTypeFields.mentionPublication,
    resourceTypeFields.prizeAward,
    resourceTypeFields.exhibition,
  ],
  'PerformingArts': [
    resourceTypeFields.artisticType('TheatricalProduction'),
    resourceTypeFields.artisticDescription,
    resourceTypeFields.exhibitionPlace,
  ],
  'MovingPicture': [
    resourceTypeFields.artisticType('ShortFilm'),
    resourceTypeFields.artisticDescription,
    resourceTypeFields.tvWebStreaming,
    resourceTypeFields.festivalCinema,
    resourceTypeFields.otherFilmAnnouncement,
  ],
  'MusicPerformance': [resourceTypeFields.concert, resourceTypeFields.audioVideoPublication],
  'VisualArts': [
    resourceTypeFields.artisticType('IndividualExhibition'),
    resourceTypeFields.artisticDescription,
    resourceTypeFields.exhibitionPlace,
  ],
  'LiteraryArts': [
    resourceTypeFields.artisticType('Novel'),
    resourceTypeFields.bookPrintedMatter,
    resourceTypeFields.literaryAudioVideoPublication,
    resourceTypeFields.literaryPerformance,
    resourceTypeFields.literaryWebPublicatrion,
  ],
};

const commonContributorRoles = ['Other'];

const artisticContributorRoles = {
  'ArtisticDesign': ['Designer', 'CuratorOrganizer', 'Consultant', ...commonContributorRoles],
  'Architecture': [
    'Architect',
    'LandscapeArchitect',
    'InteriorArchitect',
    'ArchitecturalPlanner',
    ...commonContributorRoles,
  ],
  'PerformingArts': [
    'Dancer',
    'Actor',
    'Choreographer',
    'Director',
    'Scenographer',
    'CostumeDesigner',
    'Producer',
    'ArtisticDirector',
    'Dramatist',
    'Librettist',
    'Dramaturge',
    'SoundDesigner',
    'LightDesigner',
    ...commonContributorRoles,
  ],
  'MovingPicture': [
    'Director',
    'Photographer',
    'Producer',
    'ProductionDesigner',
    'Screenwriter',
    'SoundDesigner',
    'VfxSupervisor',
    'VideoEditor',
    'ContactPerson',
    'RightsHolder',
    ...commonContributorRoles,
  ],
  'MusicPerformance': [
    'Soloist',
    'Conductor',
    'Musician',
    'Composer',
    'Organizer',
    'Writer',
    ...commonContributorRoles,
  ],
  'VisualArts': ['Artist', 'Curator', 'Consultant', ...commonContributorRoles],
  'LiteraryArts': ['Creator', 'TranslatorAdapter', 'Editor', ...commonContributorRoles],
};

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Artistic result
Given('Author begins registering a Registration', () => {
  cy.login(userSavePartOfBook);
  cy.startWizardWithEmptyRegistration();
});
Given('selects {string}', (resourceType: string) => {
  cy.wrap(resourceType).as('resourceType');
});
Given('fill in values for all fields', () => {
  cy.get('@resourceType').then((resourceType: any) => {
    cy.fillInResourceType(resourceType, fields.resourceType);
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.fillInContributors(artisticContributorRoles[resourceType]);
  });
  cy.fillInCommonFields();
});
When('they saves Registration', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
  cy.get('[data-testid="button-save-registration"]').click();
});
Then('they can see the values on the Registration Landing Page', () => {
  cy.get('@resourceType').then((subtype: any) => {
    cy.checkLandingPage(subtype);
  });
});
Then('they can see the values in the Registration Wizard', () => {
  cy.get('[data-testid=button-edit-registration]').click();
  Object.keys(registrationFields).forEach((key) => {
    cy.get(`[data-testid=${registrationFields[key].tab}]`).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      if (subkey !== 'tab') {
        const field = registrationFields[key][subkey];
        cy.checkField(field);
      }
    });
  });
  cy.get('@resourceType').then((subtype) => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.resourceStepButton}]`).click();
    fields[subtype].forEach((field) => {
      cy.checkField(field);
    });
    cy.checkContributors(artisticContributorRoles[subtype]);
  });
});

// | Subtype          |
// | ArtisticDesign   |
// | Architecture     |
// | PerformingArts   |
// | MovingPicture    |
// | MusicPerformance |
// | VisualArts       |
// | LiteraryArts     |
