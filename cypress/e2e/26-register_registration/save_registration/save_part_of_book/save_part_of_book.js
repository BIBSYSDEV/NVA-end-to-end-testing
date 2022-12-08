import { userSavePartOfBook } from '../../../../support/constants';
import { dataTestId } from '../../../../support/dataTestIds';
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration';

const filename = 'example.json';

const commonFields = [
    resourceTypeFields.partOf,
    resourceTypeFields.pagesFrom,
    resourceTypeFields.pagesTo,
];

const fields = {
    'ChapterArticle': [...commonFields, resourceTypeFields.chapterContent],
    'ChapterInReport': [...commonFields],
    'ChapterConferenceAbstract': [...commonFields],
};

const commonContributorRoles = ['Creator', 'ContactPerson', 'RightsHolder', 'Other'];

const reportContributorRoles = {
    'ChapterArticle': [...commonContributorRoles],
    'ChapterInReport': [...commonContributorRoles],
    'ChapterConferenceAbstract': [...commonContributorRoles],
};

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Part of book
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
        const contributorRoles = reportContributorRoles[resourceType];
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
        cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
        const contributorRoles = reportContributorRoles[subtype];
        var roleIndex = 0;
        contributorRoles.forEach((role) => {
            roleIndex++;
            const name = `Withauthor ${roleIndex}`;
            cy.get(`[value=${role}]`)
                .parent()
                .parent()
                .parent()
                .parent()
                .parent()
                .within(() => {
                    cy.contains(name);
                });
        });
    });
});

// | Subtype                   |
// | ChapterArticle            |
// | ChapterInReport           |
// | ChapterConferenceAbstract |
