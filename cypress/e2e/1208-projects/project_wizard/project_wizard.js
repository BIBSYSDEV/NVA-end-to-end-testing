import { userProjectWizard } from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
// Feature: User edits Project

const projectWizardTabs = {
  'Description': dataTestId.projectWizard.stepper.projectDescriptionStepButton,
  'Details': dataTestId.projectWizard.stepper.projectDetailsStepButton,
  'Connections': dataTestId.projectWizard.stepper.projectConnectionsStepButton,
  'Contributors': dataTestId.projectWizard.stepper.projectContributorsStepButton,
  'Error': dataTestId.projectWizard.stepper.projectErrorStep,
}

const projectFields = {
  'Title': dataTestId.registrationWizard.description.projectForm.titleField,
  'Coordinating institution': dataTestId.registrationWizard.description.projectForm.coordinatingInstitutionField,
  'Start date': dataTestId.registrationWizard.description.projectForm.startDateField,
  'End date': dataTestId.registrationWizard.description.projectForm.endDateField,
  'Category': dataTestId.registrationWizard.description.projectForm.projectCategoryField,
  'Scientific summary (Norwegian)':
    dataTestId.registrationWizard.description.projectForm.scentificSummaryNorwegianField,
  'Popular science summary (Norwegian)':
    dataTestId.registrationWizard.description.projectForm.popularScienceSummaryNorwegianField,
  'Scientific summary (English)': dataTestId.registrationWizard.description.projectForm.scentificSummaryEnglishField,
  'Popular science summary (English)':
    dataTestId.registrationWizard.description.projectForm.popularScienceSummaryEnglishField,
  'Keywords': dataTestId.registrationWizard.description.projectForm.keywordsField,
  'Participants': dataTestId.registrationWizard.description.projectForm.addParticipantButton,
  'Financing': dataTestId.registrationWizard.description.addFundingButton,
};

const projectSearchFields = {
  'Participants': dataTestId.registrationWizard.description.projectForm.addParticipantButton,
  'Financing': dataTestId.registrationWizard.description.addFundingButton,
  'Associated Projects': dataTestId.registrationWizard.description.projectForm.relatedProjectsSearchField,
};

// Background:
Given('A User is logged in', () => { });
And('the User got one of the following roles:', () => {
  cy.setLocalStorage('beta', 'true');
  cy.login(userProjectWizard);
});
// | Registrator           |
// | Curator               |
// | Project Owner         |
// | Project Manager       |
// | Local Project Manager |

// Scenario: User opens the Project Wizard to register a new Project
When('the User selects Create new Project', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
});
Then('they see the Project Wizard start page', () => {
  cy.location('pathname').should('contain', 'projects/new');
});
And('they can select:', (options) => {
  const optionList = {
    'Search for Financing': dataTestId.newProjectPage.createEmptyProjectAccordion,
    'Empty registration': dataTestId.newProjectPage.createNFRProjectAccordion,
  };
  cy.testDataTestidList(options, optionList);
});
// | Search for Financing |
// #| REK Approval         |
// | Empty registration   |
And('they see a Close option', () => {
  cy.getDataTestId(dataTestId.projectForm.cancelNewProjectButton).should('exist');
});

// Scenario: User starts to register a Project with a suggested Financing from NFR
Given('User opens the Project Wizard to register a new Project', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
});
When('they activate the search field, a list of Financings where the user has a role is presented', () => {
  cy.getDataTestId(dataTestId.newProjectPage.createNFRProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.nrfProjectSearchInput).type('test');
});
Then('they selects a Financing', () => {
  cy.contains('testdata').click();
});
And('the Project Wizard opens pre-filled with metadata', () => {
  cy.getDataTestId(dataTestId.newProjectPage.startNfrProjectButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.titleField).should('not.be.empty');
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.startDateField).should('not.have.value', '');
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.endDateField).should('not.have.value', '');
});


// Scenario: User opens the Project Wizard and start registering a Project without Financing selected
Given('User opens the Project Wizard to register a new Project', () => { });
When('they open the Project Wizard to register a new Project', () => { });
And('they selects Empty registration', () => {
  cy.getDataTestId(dataTestId.newProjectPage.createEmptyProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.titleInput).type('New test project');
  cy.getDataTestId(dataTestId.newProjectPage.startEmptyProjectButton).click();
});
Then('the Project Wizard opens with no metadata pre-filled', () => {
  cy.get(`[data-testid=${dataTestId.projectWizard.descriptionPanel.startDateField}]`).should('be.empty');
  cy.get(`[data-testid=${dataTestId.projectWizard.descriptionPanel.endDateField}]`).should('be.empty');
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDetailsStepButton).click();
  cy.get(
    `[data-testid=${dataTestId.registrationWizard.description.projectForm.coordinatingInstitutionField}] > div > input`
  ).should('be.empty');
});


// Scenario: The User opens the Project Wizard and registers a new project
Given('User opens the Project Wizard to registar a new Project', () => { });
And('they open the Project Wizard to register a new Project', () => { });
When('they selects Empty registration', () => { });
Then('they see the Project Wizard with Description fields:', (fields) => {
  cy.testDataTestidList(fields, projectFields);
});
// | Title |
// | Scientific summary (Norwegian) |
// | Scientific summary (English) |
// | Popular science summary (Norwegian) |
// | Popular science summary (English) |
// | Keywords |
// | Start date |
// | End date |
And('they see the Project Wizard with Details fields:', (fields) => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDetailsStepButton).click();
  cy.testDataTestidList(fields, projectFields);
});
// | Coordinating institution |
// | Category |
And('they can add Funding', () => {
  cy.getDataTestId(dataTestId.projectWizard.detailsPanel.addFundingButton);
});
And('they can add Project participants', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectContributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.addParticipantButton);
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.addProjectManagerButton);
});
And('they can link to Related projects', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectConnectionsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.relatedProjectsSearchField);
});
And('they can Save and view the project', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.saveProjectButton);
});



// Scenario: User adds a Project Participant
Given('User views the Projects Participants section', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
  cy.getDataTestId(dataTestId.newProjectPage.createEmptyProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.titleInput).type('New test project');
  cy.getDataTestId(dataTestId.newProjectPage.startEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectContributorsStepButton).click();
});
When('the User adds a Project manager', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.addProjectManagerButton).click();
});
And('the User searches for a project manager', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Project manager testuser');
});
And('the User selects a Project manager from the search results', () => {
  cy.contains('Project manager TestUser').parent().within(() => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
  });
  cy.getDataTestId(dataTestId.projectForm.addProjectManagerButton).last().click();
});
Then('they see the Person listed as Project manager', () => {
  cy.contains('Project manager TestUser');
});
When('the User adds a Projects Participant', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.addParticipantButton).click();
});
And('the User searches for a Project participant', () => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type('Withauthor testuser');
});
And('the User selects a Participant from the search results', () => {
  cy.contains('Withauthor TestUser').parent().within(() => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
  });
  cy.getDataTestId(dataTestId.projectForm.selectContributorButton).click();
});
Then('they see the Person listed as a Project Participant with the selected role', () => {
  cy.contains('Withauthor TestUser');
});

const TITLE = 'Title';
const SCIENTIFIC_SUMMARY_NORWEGIAN = 'Scientific summary (Norwegian)';
const SCIENTIFIC_SUMMARY_ENGLISH = 'Scientific summary (English)';
const POPULAR_SCIENCE_SUMMARY_NORWEGIAN = 'Popular science summary (Norwegian)';
const POPULAR_SCIENCE_SUMMARY_ENGLISH = 'Popular science summary (English)';
const KEYWORDS = 'Keywords';
const START_DATE = 'Start date';
const END_DATE = 'End date';


const descriptionFields = {
  'Title': {
    value: 'E2E test project',
    dataTestId: dataTestId.projectWizard.descriptionPanel.titleField,
  },
  'Scientific summary (Norwegian)': {
    value: 'Scientific summary (Norwegian)',
    dataTestId: dataTestId.projectWizard.descriptionPanel.scientificSummaryNorwegianField,
  },
  'Scientific summary (English)': {
    value: 'Scientific summary (English)',
    dataTestId: dataTestId.projectWizard.descriptionPanel.scientificSummaryEnglishField,
  },
  'Popular science summary (Norwegian)': {
    value: 'Popular science summary (Norwegian)',
    dataTestId: dataTestId.projectWizard.descriptionPanel.popularScienceSummaryNorwegianField,
  },
  'Popular science summary (English)': {
    value: 'Popular science summary (English)',
    dataTestId: dataTestId.projectWizard.descriptionPanel.popularScienceSummaryEnglishField,
  },
  'Keywords': {
    value: 'Odontologi',
    dataTestId: dataTestId.projectWizard.descriptionPanel.keywordsField,
  },
  'Start date': {
    value: '01.01.2024',
    dataTestId: dataTestId.projectWizard.descriptionPanel.startDateField,
  },
  'End date': {
    value: '01.02.2024',
    dataTestId: dataTestId.projectWizard.descriptionPanel.endDateField,
  },
}

const detailsFields = {
  'Coordinating institution': {
    value: 'Sikt - Norwegian Agency',
    dataTestId: dataTestId.registrationWizard.description.projectForm.coordinatingInstitutionField,
  },
  'Category': {
    value: 'Basic Research',
    dataTestId: dataTestId.projectWizard.detailsPanel.projectCategoryField,
  },
  'Funding': {
    value: 'User Testing Tool',
    dataTestId: dataTestId.projectWizard.detailsPanel.addFundingButton,
  },
}

const projectManager = 'Project WIzard TestUser';
const projectParticipant = 'Withauthor TestUser';
const linkedProject = 'Project for testing 20230512'
const SIKT = 'Sikt - Norwegian Agency for Shared Services in Education and Research';
const NFR = 'Research Council of Norway';

// Scenario: User sees that a Project is created with correct values
Given('User opens the Project Wizard to register a new Project', () => { });
When('they fill inn values for Description:', (fields) => {
  cy.getDataTestId(dataTestId.newProjectPage.createEmptyProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.titleInput).type(descriptionFields['Title'].value);
  cy.getDataTestId(dataTestId.newProjectPage.startEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDescriptionStepButton).click();
  fields.rawTable.forEach(value => {
    const field = value[0];
    if (field === 'Keywords') {
      cy.getDataTestId(descriptionFields[field].dataTestId).type(descriptionFields[field].value);
      cy.contains(descriptionFields[field].value).click();
    } else if (field === 'Start date') {
      cy.chooseDatePicker(`[data-testid=${descriptionFields[field].dataTestId}]`, descriptionFields[field].value);
    } else if (field === 'End date') {
      cy.chooseDatePicker(`[data-testid=${descriptionFields[field].dataTestId}]`, descriptionFields[field].value);
    } else if (field !== 'Title') {
      cy.getDataTestId(descriptionFields[field].dataTestId).type(descriptionFields[field].value);
    }
  });
});
// | Title                               |
// | Scientific summary (Norwegian)      |
// | Scientific summary (English)        |
// | Popular science summary (Norwegian) |
// | Popular science summary (English)   |
// | Keywords                            |
// | Start date                          |
// | End date                            |
And('they fill inn values for Details:', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDetailsStepButton).click();
  cy.getDataTestId(detailsFields['Coordinating institution'].dataTestId).type(detailsFields['Coordinating institution'].value);
  cy.contains(detailsFields['Coordinating institution'].value).click();
  cy.getDataTestId(detailsFields['Category'].dataTestId).type(detailsFields['Category'].value);
  cy.contains(detailsFields['Category'].value).click();
  cy.getDataTestId(detailsFields['Funding'].dataTestId).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).within(() => {
    cy.get('textarea').first().should('be.enabled');
  });
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).click();
  cy.contains(NFR).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.nfrProjectSearchField).type(detailsFields['Funding'].value);
  cy.contains(detailsFields['Funding'].value).click();
});
// | Coordinating institution |
// | Category                 |
// | Funding                  |
And('they add Participants', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectContributorsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.addProjectManagerButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(projectManager);
  cy.contains(projectManager).parent().within(() => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
  });
  cy.getDataTestId(dataTestId.projectForm.addProjectManagerButton).last().click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.addParticipantButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(projectParticipant);
  cy.contains(projectParticipant).parent().within(() => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
  });
  cy.getDataTestId(dataTestId.projectForm.selectContributorButton).last().click();
});
And('they add Connections', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectConnectionsStepButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.relatedProjectsSearchField).type('project for testing');
  cy.contains(linkedProject).click();
});
And('they save the Project', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.projectForm.saveProjectButton).click();
  cy.getDataTestId('snackbar-success');
});
Then('they see all the filled inn values on the Project presentation page', () => {
  cy.getDataTestId(dataTestId.projectLandingPage.scientificSummaryAccordion).click();
  cy.getDataTestId(dataTestId.projectLandingPage.relatedProjectsAccordion).click();
  cy.getDataTestId(dataTestId.projectLandingPage.participantsAccordion).click();
  cy.getDataTestId(dataTestId.projectLandingPage.participantsAccordion).click();
  const landingPageDescriptionFields = [
    TITLE,
    SCIENTIFIC_SUMMARY_ENGLISH,
    POPULAR_SCIENCE_SUMMARY_ENGLISH,
    KEYWORDS,
    START_DATE,
    END_DATE,
  ];
  landingPageDescriptionFields.forEach(field => cy.contains(descriptionFields[field].value));
  cy.contains(projectManager);
  cy.contains(projectParticipant);
  cy.contains(detailsFields['Coordinating institution'].value);
  cy.contains(detailsFields['Category'].value);
  cy.contains(NFR);
  cy.contains(linkedProject);
});
When('they edit the Project', () => {
  cy.getDataTestId(dataTestId.projectLandingPage.editProjectButton).click();
});
Then('they see the values on the Description page is the same that they filled in', (fields) => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDescriptionStepButton).click();
  fields.rawTable.forEach(value => {
    const field = value[0];
    if (field === 'Start date' || field === 'End date') {
      cy.getDataTestId(descriptionFields[field].dataTestId).should('have.value', descriptionFields[field].value);
    } else {
      cy.contains(descriptionFields[field].value);
    }
  })
});
// | Title                               |
// | Scientific summary (Norwegian)      |aw
// | Scientific summary (English)        |
// | Popular science summary (Norwegian) |
// | Popular science summary (English)   |
// | Keywords                            |
// | Start date                          |
// | End date                            |
And('they see the values on the Details page is the same that they filled in', (fields) => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDetailsStepButton).click();
  fields.rawTable.forEach(value => {
    const field = value[0];
    switch (field) {
      case 'Coordinating institution':
        cy.getDataTestId(detailsFields[field].dataTestId).within(() => {
          cy.get('div > input').should('have.value', SIKT);
        });
        break;
      case 'Category':
        cy.getDataTestId(detailsFields[field].dataTestId).should('contain', detailsFields[field].value);
        break;
      case 'Funding':
        cy.getDataTestId(dataTestId.projectWizard.detailsPanel.fundingIdField).within(() => {
          cy.get('div > input').should('have.value', '222925');
        })
        break;
    }
  })

});
// | Coordinating institution |
// | Category                 |
// | Funding                  |
And('they see the Participants they added', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectContributorsStepButton).click();
  cy.contains(projectManager);
  cy.contains(projectParticipant);
});
And('they see the Connections they added', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectConnectionsStepButton).click();
  cy.contains(linkedProject);
});


// Scenario: User adds a Financing source for Project
Given('User views Financing tab for Project', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
  cy.getDataTestId(dataTestId.newProjectPage.createEmptyProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.titleInput).type('New test project');
  cy.getDataTestId(dataTestId.newProjectPage.startEmptyProjectButton).click();
});
When('a User adds a new Financing', () => {
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDetailsStepButton).click();
  cy.getDataTestId(dataTestId.projectWizard.detailsPanel.addFundingButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).within(() => {
    cy.get('textarea').first().should('be.enabled');
  });
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).click();
});
And('the User is presented a list of Financing sources', () => { });
And('NFR is listed first', () => { });
Then('the User selects a Financing source for Project', () => {
  cy.contains('Research Council of Norway').click();
});
And('the selected Financing source is listed', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.fundingSourceSearchField}] > div > textarea`).should(
    'have.text',
    'Research Council of Norway (RCN)'
  );
});

// Scenario: User selects NFR as Financing source for Project
Given('User adds a Financing source for Project', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.projectRegistrationsAccordion).click();
  cy.getDataTestId(dataTestId.myPage.createProjectButton).click();
  cy.getDataTestId(dataTestId.newProjectPage.createEmptyProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.titleInput).type('New test project');
  cy.getDataTestId(dataTestId.newProjectPage.startEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectDetailsStepButton).click();
  cy.getDataTestId(dataTestId.projectWizard.detailsPanel.addFundingButton).click();
});
And('the Financing source for Project is NFR', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).within(() => {
    cy.get('textarea').first().should('be.enabled');
  });
  cy.getDataTestId(dataTestId.registrationWizard.description.fundingSourceSearchField).click();
  cy.contains('Research Council of Norway').click();
});
When('they activate the search field', () => {
  cy.getDataTestId(dataTestId.registrationWizard.description.nfrProjectSearchField).type('User Testing Tool');
});
Then('they selects a NFR project', () => {
  cy.contains('User Testing Tool').click();
});
And('the selected Financing title and ID is listed', () => {
  cy.get(`[data-testid=${dataTestId.registrationWizard.description.fundingIdField}] > div > input`).should('have.value', '222925');
});

// Scenario: User selects a non-NFR as Financing source for Project
Given('User adds a Financing source for Project', () => { });
And('the Financing source for Project is not NFR', () => { });
And('the selected Financing source for Project is presented', () => { });
And('the User is presented following fields:', () => { });
//   | Title |
//   | ID    |
//   | Value |
When('the fieleds are filled in the Financing source ia stored', () => { });
And('the add new Financing source option is activated', () => { });

// Scenario: Curator edit a Project in the Project Wizard
Given("a Curator on the Project's Coordinating Institution", () => { });
When('the Curator opens the Project in the Project Wizard', () => { });
Then('the Curator can manage the Projects data', () => { });

const participants = {
  'Project manager': {
    name: 'Project manager TestUser',
    add: () => cy.getDataTestId(dataTestId.projectForm.addProjectManagerButton).click(),
    selectData: () => cy.getDataTestId(dataTestId.projectForm.addProjectManagerButton).last().click(),
  },
  'Project participant': {
    name: 'Project WIzard TestUser',
    add: () => cy.getDataTestId(dataTestId.projectForm.addParticipantButton).click(),
    selectData: () => cy.getDataTestId(dataTestId.projectForm.selectContributorButton).click(),
  }
}

// Scenario: User selects a sub-unit for a Participants
Given('User opens the Project Wizard to registar a new Project', () => { });
When('they add Participants for:', (roles) => {
  cy.getDataTestId(dataTestId.newProjectPage.createEmptyProjectAccordion).click();
  cy.getDataTestId(dataTestId.newProjectPage.titleInput).type(descriptionFields['Title'].value);
  cy.getDataTestId(dataTestId.newProjectPage.startEmptyProjectButton).click();
  cy.getDataTestId(dataTestId.projectWizard.stepper.projectContributorsStepButton).click();
  roles.rawTable.forEach(role => {
    const participant = role[0];
    participants[participant].add();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(participants[participant].name);
    cy.contains(participants[participant].name).parent().within(() => {
      cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
    });
    participants[participant].selectData();
  })
});
// | Project manager     |
// | Project participant |
Then('they can set the affiliation of the Participants to a sub-unit:', () => { });
// | Project manager     |
// | Project participant |
