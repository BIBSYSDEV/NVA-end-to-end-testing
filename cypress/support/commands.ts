/// <reference types="cypress" />
import 'cypress-localstorage-commands';
import { dataTestId } from './dataTestIds';
import { registrationFields } from './save_registration';
import { mockPersonFeideIdSearch, mockPersonNameSearch } from './mock_data';
import { FileVersions, userSecondEditor } from './constants';
import { createValidRegistrationWithType } from './create_registration';
import { login } from './login';

const stage = Cypress.env('STAGE') ?? 'e2e';

const pad = (value: string) => `0${value}`.slice(-2);
export const today = new Date().toISOString().slice(0, 10).replaceAll('-', '');
const date = new Date();
export const currentYear = date.getFullYear().toString();
export const formatedToday = `${pad(date.getDate().toString())}.${pad(
  new Number(date.getMonth() + 1).toString()
)}.${currentYear}`;
export const todayDatePicker = () => {
  const date = new Date();
  const dateValue = `${pad(date.getDate().toString())}.${pad(
    new Number(date.getMonth() + 1).toString()
  )}.${date.getFullYear()}`;
  return dateValue;
};

Cypress.Commands.add('getDataTestId', (dataTestId, options?) => {
  const selector = `[data-testid=${dataTestId}]`;
  cy.get(selector, options);
});

Cypress.Commands.add('login', (userId: string) => {
  cy.visit(`/`, {
    auth: {
      // username: Cypress.env('DEVUSER'),
      // password: Cypress.env('DEVPASSWORD'),
      username: 'osteloff',
      password: 'osteloff',
    },
  });
  cy.wrap(null).then(() => {
    return login(userId).then(() => {});
  });
});

// });

Cypress.Commands.add('startRegistrationWithLink', (doiLink) => {
  cy.getDataTestId(dataTestId.header.newRegistrationLink).click({
    force: true,
  });
  cy.getDataTestId(dataTestId.registrationWizard.new.linkAccordion).click({
    force: true,
  });
  cy.get('[data-testid=new-registration-link-field]').within((linkField) => {
    cy.wrap(linkField).get('input').type(doiLink);
  });
  cy.get('[data-testid=doi-search-button]').click({ force: true });
});

Cypress.Commands.add('startWizardWithLink', (doiLink) => {
  cy.startRegistrationWithLink(doiLink);
  cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').should('be.enabled');
  cy.getDataTestId(dataTestId.registrationWizard.new.startRegistrationButton).filter(':visible').click({ force: true });
});

Cypress.Commands.add('startWizardWithEmptyRegistration', () => {
  cy.getDataTestId(dataTestId.header.newRegistrationLink).first().click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.new.emptyRegistrationAccordion).click();
});

Cypress.Commands.add('openMyRegistrations', () => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
});

Cypress.Commands.add('createPublishedRegistration', (title, category?, fileName?, fileVersion?, fileType?) => {
  cy.startWizardWithEmptyRegistration();
  if (!category || category === 'AcademicArticle') {
    cy.createValidRegistration(fileName, title, fileVersion, fileType);
  } else {
    createValidRegistrationWithType(title, category, fileName, fileVersion, fileType);
  }
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
  cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.publishButton).click();
  cy.getSuccess();
  cy.getSuccessDone();
});

Cypress.Commands.add('createValidRegistration', (fileName, title, fileVersion: FileVersions, fileType?: string) => {
  if (!fileVersion) {
    fileVersion = FileVersions.PUBLISHED;
  }

  // Description
  cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton).click({ force: true });
  cy.get('[data-testid=registration-title-field]').type(title, { delay: 0 });
  cy.getDataTestId(dataTestId.registrationWizard.description.abstractField).type(`Abstract - ${title}`);
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`, formatedToday);

  // Reference
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });

  cy.getDataTestId('resource-type-chip-AcademicArticle').click({
    force: true,
  });
  cy.intercept('/publication-channels-v2/serial-publication?query=Chemical&year=*&size=10', {
    fixture: 'channel_mock_serial.json',
  }).as('serialChannel');
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).click({ force: true }).type('Chemical');
  cy.contains('ACS Chemical Biology').click({ force: true });

  // Contributors
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton, {
    timeOut: 30000,
  }).should('not.exist');

  // Files and reference
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click({ force: true });
  if (fileName) {
    cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
    cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
    if (fileType) {
      cy.contains(fileType).click();
    } else {
      cy.contains('Open file').click();
    }
    if (!fileType || fileType === 'Open file') {
      cy.getDataTestId(dataTestId.registrationWizard.files.version, {
        timeout: 30000,
      }).within(() => {
        if (fileVersion === FileVersions.PUBLISHED) {
          cy.get('input[type=radio]').last().click();
        } else if (fileVersion !== FileVersions.NOT_SET) {
          cy.get('input[type=radio]').first().click();
        }
      });
      if (fileVersion === FileVersions.PUBLISHED) {
        cy.get('[data-testid=uploaded-file-select-license]').scrollIntoView().click({ force: true }).type(' ');
        cy.get('[data-testid=license-item]').first().click({ force: true });
      }
    }
  }
});

Cypress.Commands.add('addContributor', (contributorName: string) => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(contributorName);
  cy.get('[role=dialog]').within(() => {
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor)
      .parent()
      .filter(`:contains(${contributorName})`)
      .first()
      .within(() => {
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
      });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  });
});

Cypress.Commands.add('addUnidentifiedContributor', (contributorName: string) => {
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(contributorName);
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addUnverifiedContributorButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
});

Cypress.Commands.add('getSuccess', () => {
  cy.getDataTestId('snackbar-success');
});

Cypress.Commands.add('getSuccessDone', () => {
  cy.getDataTestId('snackbar-success');
  cy.getDataTestId('snackbar-success').should('not.exist');
});

Cypress.Commands.add('refreshPublish', () => {
  cy.get('body').then(($body) => {
    if (
      $body.find(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton}]`)
        .length > 0
    ) {
      cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
      cy.wait(6000);
      cy.get('body').then(($body) => {
        if (
          $body.find(`[data-testid=${dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton}]`)
            .length > 0
        ) {
          cy.getDataTestId(dataTestId.registrationLandingPage.tasksPanel.refreshPublishingRequestButton).click();
        }
      });
    }
  });
});

Cypress.Commands.add('testDataTestidList', (dataTable, values) => {
  dataTable.raw().forEach((value) => {
    cy.getDataTestId(values[value[0]], { timeout: 30000 });
  });
});

Cypress.Commands.add('selectRegistration', (title, type) => {
  cy.getDataTestId(dataTestId.header.myPageLink).click();
  cy.getDataTestId(dataTestId.myPage.registrationsAccordion).click();
  if (type === 'published') {
    cy.getDataTestId(dataTestId.myPage.myRegistrationsPublishedCheckbox).click();
    cy.getDataTestId(dataTestId.myPage.myRegistrationsUnpublishedCheckbox).click();
  }
  cy.get('[data-testid^=result-list-item]')
    .filter(`:contains(${title})`)
    .first()
    .within(() => {
      cy.get('p > a').first().click();
    });
});

export const NVI_PENDING = 'pending';
export const NVI_ASSIGNED = 'assigned';
export const NVI_APPROVED = 'approved';
export const NVI_REJECTED = 'rejected';
export const NVI_DISPUTE = 'dispute';

Cypress.Commands.add('selectNVIStatus', (status) => {
  cy.getDataTestId('status-filter').click();
  cy.getDataTestId('status-filter').within(() => {
    cy.get(`[data-value=${status}]`).click();
  });
});

Cypress.Commands.add('selectNVICandidate', (title?) => {
  cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).within(() => {
    if (title) {
      cy.get('li')
        .filter(`:contains(${title})`)
        .within(() => {
          cy.get('a').first().click();
        });
    } else {
      cy.get('li')
        .first()
        .within(() => {
          cy.get('a').first().click();
        });
    }
  });
});

// Commands for mocking

Cypress.Commands.add('mockPersonSearch', (userId) => {
  cy.intercept(
    `https://api.${stage}.nva.aws.unit.no/person?feideid=${userId.replace('@', '%40')}`,
    mockPersonFeideIdSearch(userId)
  );
  cy.intercept(
    `https://api.${stage}.nva.aws.unit.no/cristin/person?results=10&page=1&name=*`,
    mockPersonNameSearch(userId)
  );
});

const fillInField = (field: Object) => {
  switch (field['type']) {
    case 'text':
      let value = field['value'];
      if (field['fieldTestId'] === dataTestId.registrationWizard.description.titleField) {
        cy.get('@titleId').then((titleId) => {
          value = `${value} ${titleId}`;
          cy.getDataTestId(field['fieldTestId']).should('be.visible').type(value, { delay: 1 });
        });
      } else {
        cy.getDataTestId(field['fieldTestId']).should('be.visible').type(value, { delay: 1 });
      }
      if (field['fieldTestId'] === dataTestId.registrationWizard.resourceType.externalLinkField) {
        cy.getDataTestId(dataTestId.registrationWizard.resourceType.externalLinkAddButton).click();
      }
      break;
    case 'date':
      cy.chooseDatePicker(`[data-testid=${field['fieldTestId']}]`, todayDatePicker());
      break;
    case 'search':
      if (field['fieldTestId'] == dataTestId.registrationWizard.resourceType.seriesField) {
        cy.intercept('/publication-channels-v2/serial-publication?*', { fixture: 'channel_mock_series.json' }).as(
          'serialChannel'
        );
      } else {
        cy.intercept('/publication-channels-v2/serial-publication?*', { fixture: 'channel_mock_serial.json' }).as(
          'serialChannel'
        );
      }
      cy.getDataTestId(field['fieldTestId']).should('be.visible').type(field['value'], { delay: 1 });
      cy.contains(field['value']).click();
      break;
    case 'file':
      cy.get('input[type=file]')
        .first()
        .selectFile(`cypress/fixtures/${field['value']}`, { force: true, timeout: 30000 });
      cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
      cy.contains('Open file').click();
      cy.get('body').then(($body) => {
        if ($body.find(`[data-testid=${dataTestId.registrationWizard.files.version}]`).length > 0) {
          cy.get('[value=PublishedVersion').click();
          // cy.getDataTestId(dataTestId.registrationWizard.files.version, { timeout: 30000 })
          //   .last()
          //   .within(() => {
          //     cy.get('input[type=radio]').first().click();
          //   });
        }
      });
      break;
    case 'select':
      cy.getDataTestId(field['fieldTestId']).scrollIntoView().should('be.visible').click({ force: true }).type(' ');
      if (
        field['fieldTestId'] === dataTestId.registrationWizard.resourceType.artisticTypeField ||
        field['fieldTestId'] === dataTestId.registrationWizard.resourceType.mediaMedium
      ) {
        cy.get(`[data-value=${field['value']}]`).click();
      } else {
        cy.contains(field['value']).click({ force: true });
      }
      break;
    case 'add':
      cy.getDataTestId(field['fieldTestId']).click();
      if ('fields' in field['add']) {
        Object.keys(field['add']['fields']).forEach((key) => {
          if (key === dataTestId.registrationWizard.resourceType.subtypeField) {
            cy.getDataTestId(key).click();
            cy.get(`[data-value=${field['add']['fields'][key]}]`).click();
          } else if (key === dataTestId.registrationWizard.resourceType.concertAddWork) {
            cy.getDataTestId(key).click();
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.concertProgramTitle}]`)
              .first()
              .type(field['add']['fields'][key]);
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.concertProgramComposer}]`)
              .first()
              .type(field['add']['fields'][key]);
          } else if (key === dataTestId.registrationWizard.resourceType.audioVideoAddTrack) {
            cy.getDataTestId(key).click();
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.audioVideoContentTitle}]`)
              .first()
              .type(field['add']['fields'][key]);
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.audioVideoContentComposer}]`)
              .first()
              .type(field['add']['fields'][key]);
            cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.artisticOutputDuration}]`)
              .first()
              .type('20');
          } else if (
            key === dataTestId.registrationWizard.resourceType.dateFromField ||
            key === dataTestId.registrationWizard.resourceType.dateToField ||
            key === dataTestId.registrationWizard.resourceType.outputInstantDateField
          ) {
            cy.chooseDatePicker(`[data-testid=${key}]`, field['add']['fields'][key]);
          } else {
            cy.getDataTestId(key).type(field['add']['fields'][key]);
          }
        });
      } else {
        if ('select' in field['add']) {
          cy.getDataTestId(field['add']['select']['selectTestId']).click();
          cy.contains(field['add']['select']['value']).click();
        }
        cy.getDataTestId(field['add']['searchFieldTestId']).type(field['add']['searchValue']);
        cy.getDataTestId(field['add']['resultsTestId']).filter(`:contains(${field['value']})`).click({ force: true });
      }
      cy.getDataTestId(field['add']['selectButtonTestId']).click();
      break;
    case 'checkbox':
      switch (field['checkbox']['selected']) {
        case 'first':
          cy.getDataTestId(field['fieldTestId'], { timeout: 30000 }).within(() => {
            cy.get('input').first().click({ force: true });
          });
          break;
        case 'last':
          cy.getDataTestId(field['fieldTestId'], { timeout: 30000 }).within(() => {
            cy.get('input').last().click({ force: true });
          });
          break;
        case 'check':
          if (field['value']) {
            cy.getDataTestId(field['fieldTestId']).click({ force: true });
          }
          break;
      }
      break;
    default:
      break;
  }
};

Cypress.Commands.add('checkField', (field: Object) => {
  const value = field['landingPageValue'] ?? field['value'];
  switch (field['elementType']) {
    case 'input':
      if (field['fieldTestId'] === dataTestId.registrationWizard.resourceType.externalLinkField) {
        cy.contains(value);
      } else {
        if (field['fieldTestId'] === dataTestId.registrationWizard.description.titleField) {
          cy.get('@titleId').then((titleId) => {
            cy.get(`[data-testid=${field['fieldTestId']}] input`).should('have.value', `${value} ${titleId}`);
          });
        } else {
          cy.get(`[data-testid=${field['fieldTestId']}] input`).should('have.value', value);
        }
      }
      break;
    case 'date':
      const dateValue = todayDatePicker();
      cy.get(`[data-testid=${field['fieldTestId']}]`).parent().find('input').should('have.value', dateValue);
      break;
    case 'textArea':
      cy.get(`[data-testid=${field['fieldTestId']}] textArea`).should('contain', value);
      break;
    case 'chip':
      cy.get(`[data-testid=${field['fieldTestId']}] span`).should('contain', value);
      break;
    case 'search':
      if (
        field['fieldTestId'] === dataTestId.registrationWizard.resourceType.relatedRegistrationField ||
        field['fieldTestId'] === dataTestId.registrationWizard.resourceType.compliesWithField
      ) {
        cy.contains(value);
      } else if (field['fieldTestId'] === dataTestId.registrationWizard.description.projectSearchField) {
        cy.getDataTestId(dataTestId.registrationWizard.description.removeProjectButton).parent().contains(value);
      } else {
        cy.get(`[data-testid=${field['fieldTestId']}] div`).should('contain', value);
      }
      break;
    case 'file':
      cy.get('[data-testid=uploaded-file-row]').should('contain', value);
      break;
    case 'radio':
      if (field['checkbox']['selected'] === 'first') {
        cy.get(`[data-testid=${field['fieldTestId']}] span`)
          .parent()
          .first()
          .within(() => {
            cy.get('input').should('be.checked');
            cy.get(`[value=${value}]`);
          });
      } else {
        cy.get(`[data-testid=${field['fieldTestId']}] span`)
          .parent()
          .last()
          .within(() => {
            cy.get('input').should('be.checked');
            cy.get(`[value=${value}]`);
          });
      }
      break;
    case 'checkbox':
      cy.get(`[data-testid=${field['fieldTestId']}] span`)
        .parent()
        .within(() => {
          cy.get('input').should(value ? 'be.checked' : 'not.be.checked');
        });
      break;
    case 'announcement':
      cy.getDataTestId(field['fieldTestId'])
        .parent()
        .parent()
        .within(() => {
          cy.contains(field['value']);
        });
  }
});

Cypress.Commands.add('checkContributors', (contributorRoles) => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  let roleIndex = 0;
  contributorRoles.forEach((role) => {
    roleIndex++;
    const name = `Withauthor ${roleIndex} `;
    if (contributorRoles.length > 5) {
      cy.contains('Search by name')
        .parent()
        .within(() => {
          cy.get('input').clear().type(name, { delay: 1 });
        });
    }
    cy.get(`[value=${role}]`)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.contains(name);
        cy.get(`[value=${role}]`);
      });
  });
});

Cypress.Commands.add('fillInCommonFields', (hasFileVersion) => {
  Object.keys(registrationFields).forEach((key) => {
    cy.getDataTestId(registrationFields[key]['tab']).click();
    Object.keys(registrationFields[key]).forEach((subkey) => {
      const field = registrationFields[key][subkey];
      if (subkey !== 'version' || hasFileVersion) {
        fillInField(field);
      }
    });
  });
});

Cypress.Commands.add('fillInResourceType', (subtype, fields) => {
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
  cy.get(`[data-testid=resource-type-chip-${subtype}]`).click();
  if (subtype === 'DataSet') {
    cy.getDataTestId(dataTestId.confirmDialog.cancelButton).click();
  }
  fields.forEach((field) => {
    fillInField(field);
  });
});

Cypress.Commands.add('fillInContributors', (contributorRoles) => {
  let index = 0;
  contributorRoles.forEach((role) => {
    index++;
    cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectContributorType).click();
    cy.get(`[data-value=${role}]`).click();
    cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`Withauthor ${index}`);
    cy.get('tbody > tr')
      .filter(`:contains('Withauthor ${index} ')`)
      .within(() => {
        cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).click();
      });
    cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  });
});

Cypress.Commands.add('checkLandingPage', () => {
  Object.keys(registrationFields).forEach((key) => {
    Object.keys(registrationFields[key]).forEach((subkey) => {
      const field = registrationFields[key][subkey];
      if (field['landingPageTestId']) {
        if (field['landingPageTestId'] === dataTestId.registrationLandingPage.license) {
          cy.getDataTestId(field.landingPageTestId).get(`[title="${field.value}"]`);
        } else if (field['landingPageTestId'] === dataTestId.registrationLandingPage.title) {
          cy.getDataTestId(dataTestId.registrationLandingPage.editButton).parent().should('contain', field.value);
        } else {
          cy.get(`[data-testid^=${field.landingPageTestId}]`).should('contain', field.value);
        }
      }
    });
  });
});

Cypress.Commands.add('chooseDatePicker', (selector, value) => {
  const selectingYear = value.length === 4;
  let selectDate = '';
  let selectMonth = '';
  let selectMonthName = '';
  let selectYear = value;
  if (!selectingYear) {
    const months = {
      '1': 'Jan',
      '01': 'Jan',
      '2': 'Feb',
      '02': 'Feb',
      '3': 'Mar',
      '03': 'Mar',
      '4': 'Apr',
      '04': 'Apr',
      '5': 'May',
      '05': 'May',
      '6': 'Jun',
      '06': 'Jun',
      '7': 'Jul',
      '07': 'Jul',
      '8': 'Aug',
      '08': 'Aug',
      '9': 'Sep',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec',
    };
    value = value.replaceAll('.', '');
    selectDate = Number(value.substring(0, 2)).toString();
    selectMonth = value.substring(2, 4);
    selectMonthName = !selectMonth ? months['1'] : months[selectMonth];
    selectYear = value.substring(4);
  }

  cy.get(selector)
    .parent()
    .then(($body) => {
      const mobilePickerSelector = `[readonly]`;
      const isMobile = $body.find(mobilePickerSelector).length !== 0;
      if (isMobile) {
        cy.get(selector).click();
        cy.get('[role=dialog]').then(($dialog) => {
          const typableField = !(
            $dialog.find('.MuiPickersDay-today').length > 0 ||
            $dialog.find('.MuiPickersYear-yearButton').length > 0 ||
            $dialog.find('.Mui-selected').length > 0
          );
          if (typableField) {
            cy.get(selector).within(() => {
              cy.get('input').type(value, { force: true });
            });
          } else {
            if (!selectingYear) {
              if (!value) {
                cy.get('.MuiPickersDay-today').click();
                cy.contains('[role="dialog"] button', 'OK').click();
              } else {
                cy.get('.MuiPickersCalendarHeader-labelContainer').within(() => {
                  cy.get('button').first().click();
                });
                cy.get('.MuiPickersYear-yearButton').filter(`:contains(${selectYear})`).click();
                cy.get('.MuiPickersMonth-monthButton').filter(`:contains(${selectMonthName})`).click();
                cy.get('.MuiPickersDay-dayWithMargin').filter(`:contains(${selectDate})`).first().click();
                cy.contains('[role="dialog"] button', 'OK').click();
              }
            } else {
              if (!value) {
                cy.get('.Mui-selected').click();
                cy.contains('[role="dialog"] button', 'OK').click();
              } else {
                cy.get('.MuiPickersYear-yearButton').filter(`:contains(${selectYear})`).click();
                cy.contains('[role="dialog"] button', 'OK').click();
              }
            }
          }
        });
      } else {
        cy.get(selector).type(value);
      }
    });
});

Cypress.Commands.add('setWorkflowRegistratorPublishesAll', () => {
  cy.login(userSecondEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
  cy.getDataTestId(dataTestId.editor.workflowRegistratorPublishesAll).click({
    force: true,
  });
  cy.wait(5000);
});

Cypress.Commands.add('setWorkflowRegistratorPublishesMetadata', () => {
  cy.login(userSecondEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
  cy.getDataTestId(dataTestId.editor.workflowRegistratorPublishesMetadata).click({ force: true });
  cy.wait(5000);
});

Cypress.Commands.add('setWorkflowRegistratorRequiresApproval', () => {
  cy.login(userSecondEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.getDataTestId(dataTestId.editor.publishStrategyLinkButton).click();
  cy.getDataTestId(dataTestId.editor.workflowRegistratorRequiresApproval).click({ force: true });
});

const doiRequests = 'DoiRequests';
const publishingRequests = 'Publishing Requests';
const supportRequests = 'Support Requests';

Cypress.Commands.add('filterMessages', (messageType) => {
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).then(($button) => {
    const publishingRequestFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((publishingRequestFilter && !(messageType === publishingRequests)) ||
      (!publishingRequestFilter && messageType === publishingRequests)) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.publishingButton).click();
  });
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).then(($button) => {
    const doiRequestFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((doiRequestFilter && !(messageType === doiRequests)) || (!doiRequestFilter && messageType === doiRequests)) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.doiButton).click();
  });
  cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).then(($button) => {
    const supportFilter = $button.find('[data-testid=CheckBoxIcon]').length > 0;
    ((supportFilter && !(messageType === supportRequests)) || (!supportFilter && messageType === supportRequests)) &&
      cy.getDataTestId(dataTestId.tasksPage.typeSearch.supportButton).click();
  });
});

Cypress.Commands.add('getWorklistItem', (title) => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get('main').then((doc) => {
    if (doc.find(`[data-testid=${dataTestId.startPage.searchResultItem}]`).length < 1) {
      cy.wait(30000);
      cy.reload();
    }
    if (doc.find(`[data-testid=${dataTestId.startPage.searchResultItem}]`).length < 1) {
      cy.wait(30000);
      cy.reload();
    }
  });
  return cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${title})`);
});

Cypress.Commands.add('getNVIWorklistItem', (title) => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${title}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get('main').then((doc) => {
    if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length < 1) {
      cy.wait(30000);
      cy.reload();
    }
    if (doc.find(`[data-testid=${dataTestId.tasksPage.nvi.candidatesList}]`).length < 1) {
      cy.wait(30000);
      cy.reload();
    }
  });
  return cy.getDataTestId(dataTestId.tasksPage.nvi.candidatesList).filter(`:contains(${title})`);
});

Cypress.Commands.add('editChannelClaims', () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.get('.MuiCircularProgress-root').should('not.exist');
  cy.getDataTestId(dataTestId.editor.settingsAccordion).click();
  cy.get('.MuiCircularProgress-root').should('not.exist');
  cy.getDataTestId(dataTestId.editor.publisherClaimButton).click();
  cy.getDataTestId(dataTestId.editor.addChannelClaimButton);
  cy.get('.MuiCircularProgress-root').should('not.exist');
  cy.get('.MuiSkeleton-root').should('not.exist');
});

Cypress.Commands.add('claimChannel', (searchString: string) => {
  cy.getDataTestId(dataTestId.editor.addChannelClaimButton);
  cy.get('.MuiCircularProgress-root').should('not.exist');
  cy.getDataTestId(dataTestId.editor.addChannelClaimButton).click();
  cy.getDataTestId(dataTestId.editor.channelSearchField).type(searchString);
  cy.get('[data-option-index=0]').click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
});

Cypress.Commands.add('removeChannel', (channelName: string) => {
  cy.get('.MuiCircularProgress-root').should('not.exist');
  cy.get('table').within(() => {
    cy.get('tr')
      .filter(`:contains(${channelName})`)
      .within(() => {
        cy.get('[data-testid^=delete-channel-claim]').first().click();
      });
  });
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.getSuccessDone();
});
