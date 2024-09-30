import { userContributors } from "../../../support/constants"
import { dataTestId } from "../../../support/dataTestIds";
import { contributorTypes } from "../../../support/data_testid_constants";

// Feature: Creator adds a Contributor

const registrationTypes = {
    'ReportAbstractCollection': 'ReportBookOfAbstract',
    'Dataset': 'DataSet',
}

const openContributorAddDialog = () => {
    cy.login(userContributors);
    cy.startWizardWithEmptyRegistration();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip('AcademicArticle')).click();
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
}

const selectContributorType = () => {
    cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectContributorType}]`).click();
    cy.get('[data-value=Creator]').click();
}

const enterSearchTerm = () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Withauthor TestUser{enter}');
}

const selectContributor = () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
    cy.getDataTestId('CheckCircleIcon');
}

const creatorSelectContributorType = () => {
    openContributorAddDialog();
    selectContributorType();
}

const searchForContributor = () => {
    creatorSelectContributorType()
    enterSearchTerm();
    selectContributor();
}

const creatorSelectsContributorFromSearch = () => {
    searchForContributor();
}

// Scenario Outline: Creator opens the Add Contributor Dialog
Given('Creator navigates to Contributors tab', () => {
    cy.login(userContributors);
    cy.startWizardWithEmptyRegistration();
})
And('the Registration has Registration Type {string}', (type) => {
    cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
    if (registrationTypes[type]) {
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(registrationTypes[type])).click();
    } else {
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(type)).click();
    }
    if (type === 'Dataset') {
        cy.getDataTestId(dataTestId.confirmDialog.cancelButton).click();
    }
    cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
})
When('they click "Add Contributor"', () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
})
Then('they see the "Add Contributor" Dialog', () => { })
And('they see a dropdown with Contributor Types {string}', (typeList) => {
    const types = typeList.split(', ');
    const otherTypes = {
        '': 'RoleOther',
    }
    cy.get(`[data-testid=${dataTestId.registrationWizard.contributors.selectContributorType}]`).click();
    types.forEach((contributorType) => {
        if (contributorType !== 'Other') {
            cy.get(`[data-value=${contributorTypes[contributorType]}]`).should('be.visible');
        } else {
            const otherType = 'RoleOther';
            cy.get(`[data-value=${otherType}]`).should('be.visible');
        }
    });
    cy.get(`[data-value=${contributorTypes[types[0]]}]`).click()
})
And('they see a "Close" Button', () => {
    cy.getDataTestId('close-modal').should('be.visible');
})
And('they see a "Create new Contributor" Button', () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).should('be.visible');
})
And('they see a "Add me as Contributor" Button', () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).should('be.visible');
})
And('they see a disabled "Add" Button', () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).should('be.disabled');
})
// Examples:
//     | RegistrationType              | ContributorTypes                                                                                                                                                              |
//     | BookAnthology                 | Contact person, Related person, Researcher, Rights holder, Supervisor, Other                                                                                                  |
//     | AcademicMonograph             | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | NonFictionMonograph           | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | PopularScienceMonograph       | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | Textbook                      | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | Encyclopedia                  | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ExhibitionCatalog             | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | AcademicChapter               | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | NonFictionChapter             | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | PopularScienceChapter         | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | TextbookChapter               | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | EncyclopediaChapter           | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | Introduction                  | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ExhibitionCatalogChapter      | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ChapterInReport               | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ChapterConferenceAbstract     | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | DegreeBachelor                | Contact person, Editor, Related person, Researcher, Rights holder, Other                                                                                                      |
//     | DegreeMaster                  | Contact person, Editor, Related person, Researcher, Rights holder, Other                                                                                                      |
//     | DegreePhd                     | Contact person, Editor, Related person, Researcher, Rights holder, Other                                                                                                      |
//     | DegreeLicentiate              | Contact person, Editor, Related person, Researcher, Rights holder, Other                                                                                                      |
//     | OtherStudentWork              | Contact person, Editor, Related person, Researcher, Rights holder, Other                                                                                                      |
//     | AcademicArticle               | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | AcademicLiteratureReview      | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | JournalLetter                 | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | JournalReview                 | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | JournalLeader                 | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | JournalCorrigendum            | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | JournalIssue                  | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ConferenceAbstract            | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | CaseReport                    | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | StudyProtocol                 | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ProfessionalArticle           | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | PopularScienceArticle         | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ReportBasic                   | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ReportPolicy                  | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ReportResearch                | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ReportAbstractCollection      | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ReportWorkingPaper            | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ConferenceLecture             | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ConferencePoster              | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | Lecture                       | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | OtherPresentation             | Contact person, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                                                          |
//     | ArtisticDesign                | Designer, Curator/Organizer, Consultant, Other                                                                                                                                |
//     | Architecture                  | Architect, Landscape architect, Interior architect, Architectural planner, Other                                                                                              |
//     | PerformingArts                | Dancer, Actor, Choreographer, Director, Scenographer, Costume designer, Producer, Artistic director, Dramatist, Librettist, Dramaturge, Sound designer, Light designer, Other |
//     | MovingPicture                 | Director, Screenwriter, Producer, Photographer, Production designer, Video editor, Sound design, VFX Supervisor, Other                                                        |
//     | MusicPerformance              | Soloist, Conductor, Musician, Composer, Organizer, Writer, Other                                                                                                              |
//     | LiteraryArts                  | Author, Translator, Editor, Other                                                                                                                                             |
//     | VisualArts                    | Artist, Curator, Consultant, Other                                                                                                                                            |
//     | MediaFeatureArticle           | Other                                                                                                                                                                         |
//     | MediaReaderOpinion            | Other                                                                                                                                                                         |
//     | MediaInterview                | Journalist, Interviewee, Other                                                                                                                                                |
//     | MediaBlogPost                 | Other                                                                                                                                                                         |
//     | MediaPodcast                  | Program host, Participant, Other                                                                                                                                              |
//     | MediaParticipationInRadioOrTv | Program host, Participant, Other                                                                                                                                              |
//     | DataManagementPlan            | Data collector, Data curator, Data manager, Distributor, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                 |
//     | Dataset                       | Data collector, Data curator, Data manager, Distributor, Editor, Related person, Researcher, Rights holder, Supervisor, Other                                                 |
//     | Map                           | Contact person, Rights holder, Other                                                                                                                                          |

// Scenario: Creator selects a Contributor Type
Given('Creator opens the Add Contributor Dialog', () => {
    openContributorAddDialog()
})
When('they select a Contributor Type', () => {
    selectContributorType()
})
Then('they see a search field', () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).should('be.visible');
})

// Scenario: Creator searches for a Contributor
Given('Creator selects a Contributor Type', () => {
    creatorSelectContributorType()
})
When('they enter a search term', () => {
    enterSearchTerm();
})
Then('they see a List of Contributors matching the search term', () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).should('have.length.above', 0);
})
And('they see number of hits and the search term', () => {
    cy.contains('Showing 1-10 of 16');
})
And('they see Previous Publications by the Contributors', () => {
    cy.contains('other registrations')
})
And('they see the Primary Institution for the Contributors', () => {
    cy.contains('The Norwegian Directorate for ICT and Joint Services in Higher Education and Research');
})

// Scenario: Creator selects a Contributor from search
Given('Creator searches for a Contributor', () => {
    searchForContributor();
})
When('they click on a Contributor from the search result', () => {
})
Then('they see the "Add" Button is enabled', () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).should('be.enabled');
})

// Scenario: Creator adds a Contributor to the List of Contributors
Given('Creator selects a Contributor from search', () => {
    creatorSelectsContributorFromSearch();
})
When('they click the "Add" Button', () => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click()
})
Then('the Dialog is closed', () => { })
And('the selected Contributor is added to the List of Contributors', () => { })