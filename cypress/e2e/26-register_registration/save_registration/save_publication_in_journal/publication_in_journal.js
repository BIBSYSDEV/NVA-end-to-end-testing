import { userSaveJournal } from "../../../../support/constants"
import { dataTestId } from "../../../../support/dataTestIds";
import { registrationFields, resourceTypeFields } from '../../../../support/save_registration'

const filename = 'example.json';

const commonFields = [
    resourceTypeFields.journal,
    resourceTypeFields.volume,
    resourceTypeFields.issue,
    resourceTypeFields.pagesFrom,
    resourceTypeFields.pagesTo,
    resourceTypeFields.articleNumber,
]

const fields = {
    'JournalArticle': [...commonFields, resourceTypeFields.journalContent],
    'JournalLetter': [...commonFields],
    'JournalReview': [...commonFields],
    'JournalLeader': [...commonFields],
    'JournalCorrigendum': [...commonFields],
    'JournalIssue': [...commonFields],
    'ConferenceAbstract': [...commonFields],
}

const contributorRoles = [
    'Creator',
    'ContactPerson',
    'RightsHolder',
    'Other',
]

// Scenario Outline: Creator sees registration is saved with correct values presented on landing page for Publication in Journal
Given('Author begins registering a Registration', () => {
    cy.login(userSaveJournal);
    cy.startWizardWithEmptyRegistration();
})
And('selects {string}', (resourceType) => {
    cy.wrap(resourceType).as('resourceType');
})
And('fill in values for all fields', () => {
    cy.get('@resourceType').then(resourceType => {
        cy.fillInResourceType(resourceType, fields[resourceType]);
    });
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.fillInContributors(contributorRoles);
    cy.fillInCommonFields();
})
When('they saves Registration', () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.stepper.filesStepButton}]`).click();
    cy.get('[data-testid="button-save-registration"]').click();
})
Then('they can see the values on the Registration Landing Page', () => {
    cy.get('@resourceType').then((subtype) => {
        cy.checkLandingPage(subtype);
    });
})
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
        var roleIndex = 0;
        contributorRoles.forEach(role => {
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
        })
    });
})

// Examples:
//     | Subtype            |
//     | JournalArticle     |
//     | JournalLetter      |
//     | JournalReview      |
//     | JournalLeader      |
//     | JournalCorrigendum |
//     | JournalIssue       |
//     | ConferenceAbstract |