// Feature: NVI points calculations

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { v4 as uuidv4 } from "uuid";
import { dataTestId } from "../../../support/dataTestIds";
import { TestUsers } from "../../../support/constants";

//   Scenario Outline: Verify NVI points calculations for different NVI candidates
    Given ('a curator looks at a NVI candidate with Category {string} and NVI level {string}', (category, level) => {
        cy.login(TestUsers.nvi.usn.institution);
        const categoryText = category.toString();
        const levelText = level.toString();

        const title = `NVI Candidate ${categoryText} ${levelText} ${uuidv4()}`;
        cy.wrap(title).as('title');

        switch (categoryText) {
            case 'AcademicLiteratureReview':
            case 'AcademicArticle':
                cy.createPublishedRegistration(title, categoryText);
                if (levelText === 'Level 1') {
                    cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
                    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
                    cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('acm journal of data and information quality{enter}');
                    cy.contains('ACM Journal of Data and Information Quality').click();
                    cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
                    cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
                    cy.getSuccessDone();
                }
                break;
            case 'AcademicMonograph':
                cy.log(`Category is Academic Monograph with NVI Level: ${levelText}`);
                break;
            default:
                throw new Error(`Unknown category: ${categoryText}`);
        }
    });
    Given ('{string} local contributors and {string} international contributors with {string} total contributors', (contributors, internationalContributors, totalContributors) => {
        if(internationalContributors.toString() === 'yes') {
            cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
            cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
            cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
            cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Foreign TestUser{enter}');
            cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
            cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
            cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click();
            cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
            cy.getSuccessDone();
        }
    }); 
    When ('the curator reviews the NVI candidate', () => {
        cy.get('@title').then(title => {
            cy.login(TestUsers.nvi.usn.curator);
            cy.getDataTestId(dataTestId.header.tasksLink).click();
            cy.getDataTestId(dataTestId.tasksPage.nviAccordion).click();
            cy.selectNVICandidate(title.toString());
        })
    });
    Then ('the NVI points should be calculated as {string}', (expectedPoints) => {
        cy.get('table')
            .filter(':contains("Points")')
            .within(() => {
                cy.contains(expectedPoints.toString());
            });
    });

    // Examples:
    //   | Category                 | NVILevel | Contributors | InternationalContributors | totalContributors | ExpectedPoints |
    //   | AcademicArticle          | Level 1  |            1 | no                        |                 1 |              1 |
    //   | AcademicArticle          | Level 2  |            1 | no                        |                 1 |              3 |
    //   | AcademicArticle          | Level 1  |            1 | yes                       |                 2 |           0.91 |
    //   | AcademicArticle          | Level 2  |            1 | yes                       |                 2 |           2.75 |
    //   | AcademicLiteratureReview | Level 1  |            1 | no                        |                 1 |              1 |
    //   | AcademicMonograph        | Level 1  |            1 | no                        |                 1 |              5 |
    //   | AcademicMonograph        | Level 2  |            1 | no                        |                 1 |              8 |
    //   | AcademicMonograph        | Level 1  |            1 | yes                       |                 2 |           4.59 |
    //   | AcademicMonograph        | Level 2  |            1 | yes                       |                 2 |           7.35 |
