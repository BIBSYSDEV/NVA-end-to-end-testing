// const fillInField = (field) => {
//   switch (field['type']) {
//     case 'text':
//       cy.getDataTestId(field['fieldTestId']).should('be.visible').type(field['value'], { delay: 1 });
//       if (field.fieldTestId === dataTestId.registrationWizard.resourceType.externalLinkField) {
//         cy.getDataTestId(dataTestId.registrationWizard.resourceType.externalLinkAddButton).click();
//       }
//       break;
//     case 'date':
//       cy.chooseDatePicker(`[data-testid=${field['fieldTestId']}]`, todayDatePicker());
//       break;
//     case 'search':
//       cy.getDataTestId(field['fieldTestId']).should('be.visible').type(field['value'], { delay: 1 });
//       cy.contains(field['value']).click();
//       break;
//     case 'file':
//       cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${field['value']}`, { force: true });
//       break;
//     case 'select':
//       cy.getDataTestId(field['fieldTestId']).scrollIntoView().should('be.visible').click({ force: true }).type(' ');
//       if (
//         field.fieldTestId === dataTestId.registrationWizard.resourceType.artisticTypeField ||
//         field.fieldTestId === dataTestId.registrationWizard.resourceType.mediaMedium
//       ) {
//         cy.get(`[data-value=${field['value']}]`).click();
//       } else {
//         cy.contains(field['value']).click({ force: true });
//       }
//       break;
//     case 'add':
//       cy.getDataTestId(field['fieldTestId']).click();
//       if ('fields' in field['add']) {
//         Object.keys(field['add']['fields']).forEach((key) => {
//           if (key === dataTestId.registrationWizard.resourceType.subtypeField) {
//             cy.getDataTestId(key).click();
//             cy.get(`[data-value=${field['add']['fields'][key]}]`).click();
//           } else if (
//             key === dataTestId.registrationWizard.resourceType.outputInstantDateField ||
//             key === dataTestId.registrationWizard.resourceType.dateFromField ||
//             key === dataTestId.registrationWizard.resourceType.dateToField
//           ) {
//             cy.log(field);
//             if (field == resourceTypeFields['bookPrintedMatter']) {
//               cy.log('book/printed matter');
//               cy.getDataTestId(key).type(field['add']['fields'][key]);
//             } else {
//               cy.chooseDatePicker(`[data-testid=${key}]`, todayDatePicker());
//             }
//           } else if (key === dataTestId.registrationWizard.resourceType.concertAddWork) {
//             cy.getDataTestId(key).click();
//             cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.concertProgramTitle}]`)
//               .first()
//               .type(field['add']['fields'][key]);
//             cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.concertProgramComposer}]`)
//               .first()
//               .type(field['add']['fields'][key]);
//           } else if (key === dataTestId.registrationWizard.resourceType.audioVideoAddTrack) {
//             cy.getDataTestId(key).click();
//             cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.audioVideoContentTitle}]`)
//               .first()
//               .type(field['add']['fields'][key]);
//             cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.audioVideoContentComposer}]`)
//               .first()
//               .type(field['add']['fields'][key]);
//             cy.get(`[data-testid^=${dataTestId.registrationWizard.resourceType.artisticOutputDuration}]`)
//               .first()
//               .type('20');
//           } else {
//             cy.getDataTestId(key).type(field['add']['fields'][key]);
//           }
//         });
//       } else {
//         if ('select' in field['add']) {
//           cy.getDataTestId(field['add']['select']['selectTestId']).click();
//           cy.contains(field['add']['select']['value']).click();
//         }
//         cy.getDataTestId(field['add']['searchFieldTestId']).type(field['add']['searchValue']);
//         cy.getDataTestId(field['add']['resultsTestId']).filter(`:contains(${field['value']})`).click({ force: true });
//       }
//       cy.getDataTestId(field['add']['selectButtonTestId']).click();
//       break;
//     case 'checkbox':
//       switch (field['checkbox']['selected']) {
//         case 'first':
//           cy.getDataTestId(field['fieldTestId'], { timeout: 30000 }).within(() => {
//             cy.get('input').first().click({ force: true });
//           });
//           break;
//         case 'check':
//           if (field['value']) {
//             cy.getDataTestId(field['fieldTestId']).click({ force: true });
//           }
//           break;
//       }
//       break;
//     default:
//       break;
//   }
// };

// export const checkField = (field) => {
//   const value = field['landingPageValue'] ?? field['value'];
//   switch (field['elementType']) {
//     case 'input':
//       if (field.fieldTestId === dataTestId.registrationWizard.resourceType.externalLinkField) {
//         cy.contains(value);
//       } else {
//         cy.get(`[data-testid=${field['fieldTestId']}] input`).should('have.value', value);
//       }
//       break;
//     case 'date':
//       const dateValue = todayDatePicker();
//       cy.get(`[data-testid=${field['fieldTestId']}]`).parent().find('input').should('have.value', dateValue);
//       break;
//     case 'textArea':
//       cy.get(`[data-testid=${field['fieldTestId']}] textArea`).should('contain', value);
//       break;
//     case 'chip':
//       cy.get(`[data-testid=${field['fieldTestId']}] span`).should('contain', value);
//       break;
//     case 'search':
//       if (
//         field.fieldTestId === dataTestId.registrationWizard.resourceType.relatedRegistrationField ||
//         field.fieldTestId === dataTestId.registrationWizard.resourceType.compliesWithField
//       ) {
//         cy.contains(value);
//       } else {
//         cy.get(`[data-testid=${field['fieldTestId']}] div`).should('contain', value);
//       }
//       break;
//     case 'file':
//       cy.get('[data-testid=uploaded-file-row]').should('contain', value);
//       break;
//     case 'radio':
//       cy.get(`[data-testid=${field['fieldTestId']}] span`)
//         .parent()
//         .first()
//         .within(() => {
//           cy.contains(value);
//           cy.get('input').should('be.checked');
//         });
//       break;
//     case 'checkbox':
//       cy.get(`[data-testid=${field['fieldTestId']}] span`)
//         .parent()
//         .within(() => {
//           cy.get('input').should(value ? 'be.checked' : 'not.be.checked');
//         });
//       break;
//     case 'announcement':
//       cy.getDataTestId(field['fieldTestId'])
//         .parent()
//         .parent()
//         .within(() => {
//           cy.contains(field['value']);
//         });
//   }
// }

// export const checkContributors = (contributorRoles) => {
//   cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
//   let roleIndex = 0;
//   contributorRoles.forEach((role) => {
//     roleIndex++;
//     const name = `Withauthor ${roleIndex} `;
//     if (contributorRoles.length > 5) {
//       cy.contains('Search by name')
//         .parent()
//         .within(() => {
//           cy.get('input').clear().type(name, { delay: 1 });
//         });
//     }
//     cy.get(`[value=${role}]`)
//       .parent()
//       .parent()
//       .parent()
//       .parent()
//       .parent()
//       .within(() => {
//         cy.contains(name);
//         cy.get(`[value=${role}]`);
//       });
//   });
// }

// export const fillInCommonFields = (hasFileVersion) => {
//   Object.keys(registrationFields).forEach((key) => {
//     cy.getDataTestId(registrationFields[key]['tab']).click();
//     Object.keys(registrationFields[key]).forEach((subkey) => {
//       const field = registrationFields[key][subkey];
//       if (subkey !== 'version' || hasFileVersion) {
//         fillInField(field);
//       }
//     });
//   });
// }

// export const fillInResourceType = (subtype, fields) => {
//   cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click();
//   cy.get(`[data-testid=resource-type-chip-${subtype}]`).click();
//   if (subtype === 'DataSet') {
//     cy.getDataTestId(dataTestId.confirmDialog.cancelButton).click();
//   }
//   fields.forEach((field) => {
//     fillInField(field);
//   });
// }

// export const fillInContributors = (contributorRoles) => {
//   let index = 0;
//   contributorRoles.forEach((role) => {
//     index++;
//     cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
//     cy.getDataTestId(dataTestId.registrationWizard.contributors.selectContributorType).click();
//     cy.get(`[data-value=${role}]`).click();
//     cy.getDataTestId(dataTestId.registrationWizard.contributors.searchField).type(`Withauthor ${index}`);
//     cy.getDataTestId(dataTestId.registrationWizard.contributors.selectEverythingForContributor)
//       .filter(`:contains('Withauthor ${index} ')`)
//       .first()
//       .click();
//     cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
//   });
// }

// export const checkLandingPage = () => {
//   Object.keys(registrationFields).forEach((key) => {
//     Object.keys(registrationFields[key]).forEach((subkey) => {
//       const field = registrationFields[key][subkey];
//       if (field['landingPageTestId']) {
//         if (field['landingPageTestId'] === dataTestId.registrationLandingPage.license) {
//           cy.getDataTestId(field.landingPageTestId).get(`[title="${field.value}"]`);
//         } else if (field['landingPageTestId'] === dataTestId.registrationLandingPage.title) {
//           cy.getDataTestId(dataTestId.registrationLandingPage.registrationSubtype)
//             .parent()
//             .should('contain', field.value);
//         } else {
//           cy.get(`[data-testid^=${field.landingPageTestId}]`).should('contain', field.value);
//         }
//       }
//     });
//   });
// }
