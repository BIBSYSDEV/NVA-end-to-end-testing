import { userSaveMediaContribution } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';

const writtenCommonFields = [
    resourceTypeFields.journal,
    resourceTypeFields.volume,
    resourceTypeFields.issue,
    resourceTypeFields.pagesFrom,
    resourceTypeFields.pagesTo,
    resourceTypeFields.articleNumber,
];

const otherCommonFields = [
    resourceTypeFields.mediaMedium,
    resourceTypeFields.mediaFormat,
    resourceTypeFields.mediaChannel,
    resourceTypeFields.mediaSeries,
    resourceTypeFields.mediaIssue,
]

const fields = {
    'MediaFeatureArticle': [...writtenCommonFields],
    'MediaReaderOpinion': [...writtenCommonFields],
    'MediaInterview': [...otherCommonFields],
    'MediaBlogPost': [...otherCommonFields],
    'MediaPodcast': [...otherCommonFields],
    'MediaParticipationInRadioOrTv': [...otherCommonFields],
};

const commonContributorRoles = ['Other'];

const mediaContributorRoles = {
    'MediaFeatureArticle': ['Creator', ...commonContributorRoles],
    'MediaReaderOpinion': ['Creator', ...commonContributorRoles],
    'MediaInterview': ['Journalist', 'InterviewSubject', ...commonContributorRoles],
    'MediaBlogPost': ['Creator', ...commonContributorRoles],
    'MediaPodcast': ['ProgrammeLeader', 'ProgrammeParticipant', ...commonContributorRoles],
    'MediaParticipationInRadioOrTv': ['ProgrammeLeader', 'ProgrammeParticipant', ...commonContributorRoles],
};

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Book
Given('Author begins registering a Registration', () => {
    cy.login(userSaveMediaContribution);
    cy.startWizardWithEmptyRegistration();
});
And('selects {string}', (resourceType) => {
    cy.wrap(resourceType).as('resourceType');
});
And('fill in values for all fields', () => {
    cy.get('@resourceType').then((resourceType) => {
        cy.fillInResourceType(resourceType, fields[resourceType]);
        cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
        const contributorRoles = mediaContributorRoles[resourceType];
        cy.fillInContributors(contributorRoles);
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
        cy.checkContributors(mediaContributorRoles[subtype])
    });
});

// Examples:
// | Subtype                       |
// | MediaFeatureArticle           |
// | MediaReaderOpinion            |
// | MediaInterview                |
// | MediaBlogPost                 |
// | MediaPodcast                  |
// | MediaParticipationInRadioOrTv |
