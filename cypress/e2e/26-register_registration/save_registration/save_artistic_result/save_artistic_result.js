import { userSavePartOfBook } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';

const commonFields = [
];

const fields = {
    'ArtisticDesign': [
        resourceTypeFields.artisticType('Product design'),
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
    'MovingPicture': [...commonFields],
    'MusicPerformance': [
        resourceTypeFields.concert,
        resourceTypeFields.audioVideoPublication,
    ],
    'VisualArts': [...commonFields],
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
    'Architecture': ['Architect', 'LandscapeArchitect', 'InteriorArchitect', 'ArchitecturalPlanner', ...commonContributorRoles],
    'PerformingArts': [],
    'MovingPicture': [],
    'MusicPerformance': ['Soloist', 'Conductor', 'Musician', 'Composer', 'Organizer', 'Writer', ...commonContributorRoles],
    'VisualArts': [],
    'LiteraryArts': ['Creator', 'TranslatorAdapter', 'Editor', ...commonContributorRoles],
};

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Artistic result
Given('Author begins registering a Registration', () => {
    cy.login(userSavePartOfBook);
    cy.startWizardWithEmptyRegistration();
});
And('selects {string}', (resourceType) => {
    cy.wrap(resourceType).as('resourceType');
});
And('fill in values for all fields', () => {
    cy.get('@resourceType').then((resourceType) => {
        cy.fillInResourceType(resourceType, fields[resourceType]);
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
    cy.get('@resourceType').then((subtype) => {
        cy.checkLandingPage(subtype);
    });
});
And('they can see the values in the Registration Wizard', () => {
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
        cy.checkContributors(artisticContributorRoles[subtype])
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
