import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';

const fileName = 'example.txt';
const dlrLink = 'https://dlr.unit.no/resources/66888570-3504-4d12-81a4-c3ffe0605945';
const dcIdentifierLink = 'https://loar.kb.dk/handle/1902/1674?show=full';
const dcTermLink = 'https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/2638973';
const openGraphLink = 'https://www.nrk.no/norge/klimakur-2030_-mer-strom-og-mindre-kjott-kan-fa-norge-i-mal-1.14883788';
const highwireLink = 'https://link.springer.com/article/10.1007/s13201-020-01350-9';
const schemaLink = 'https://e24.no/boers-og-finans/i/AdyrPM/syv-av-tangens-11-referanser-deltok-paa-luksusseminaret';

// Feature: Creator begins registering a Registration

// Common steps
Given('Creator begins registering a Registration', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.get('[data-testid=new-registration]').click({ force: true });
});
// End common steps

//   @443
//   Scenario Outline: Creator begins registering a Registration in the Wizard
And('they have selected {string} for starting the Wizard', (method) => {
  cy.wrap(method).as('registrationMethod');
  if (method === 'Link to registration') {
    cy.get('[data-testid=new-registration-link]').click({ force: true });
    cy.get('[data-testid=new-registration-link-input]').type(dlrLink);
    cy.get('[data-testid=doi-search-button]').click({ force: true });
  } else if (method === 'Upload file') {
    cy.get('[data-testid=new-registration-file]').click({ force: true });
    cy.get('input[type=file]').attachFile(fileName);
  }
});
When('they click Start', () => {
  cy.get('@registrationMethod').then((method) => {
    if (method === 'Link to registration') {
      cy.get('[data-testid=registration-link-next-button]').should('be.enabled').click({ force: true });
    } else if (method === 'Upload file') {
      cy.get('[data-testid=registration-file-start-button]').should('be.enabled').click({ force: true });
    }
  });
});
Then('they see the Wizard', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.visible');
});
// Examples:
//   | Method               |
//   | Link to registration |
//   | Upload file          |

//   @226
//   Scenario: Creator begins registering a Registration
Given('that the user is logged in', () => {});
And('they have Role Creator', () => {});
And('they are on the Start page', () => {
  cy.login(USER_WITH_AUTHOR);
});
When('they click the New Registration button', () => {
  cy.get('[data-testid=new-registration]').click({ force: true });
});
Then('they are redirected to the New Registration page', () => {
  cy.location('pathname').should('contain', '/registration');
});
And('they see an Expansion panel for Upload file', () => {
  cy.get('[data-testid=new-registration-file]').should('be.visible');
});
And('they see an Expansion panel for Link to resource', () => {
  cy.get('[data-testid=new-registration-link]').should('be.visible');
});

//   @385
//   Scenario: Creator begins registration by uploading a file
When('they click Upload file', () => {
  cy.get('[data-testid=new-registration-file]').click({ force: true });
});
And('they upload a file', () => {
  cy.get('input[type=file]').attachFile(fileName);
});
Then('they see the file name', () => {
  cy.get('[data-testid=uploaded-file]').within((fileElement) => {
    cy.wrap(fileElement).contains(fileName);
  });
});
And('they see the file size', () => {
  // TODO file size is not implemented yet
});
And('they see the Remove button', () => {
  cy.get('[data-testid=button-remove-file]').should('be.visible');
});
And('they see the Start button is enabled', () => {
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
});

// Common steps for @228, @439, @440, @441, @442, @2208, @2370
And('they expand the Expansion panel for Link to resource', () => {
  cy.get('[data-testid=new-registration-link]').click({ force: true });
});
When('they enter {string} from {string}', (link, source) => {
    cy.get('[data-testid=new-registration-link-input]').type(link);
  });
And('they click Search', () => {
  cy.get('[data-testid=doi-search-button]').click({ force: true });
});
Then('they see metadata about the Link in the Expansion panel', () => {});

// //   @228
// //   Scenario: Creator begins registering with a Link with direct data from Datacite/Crossref
// And('they enter a DOI or a fully qualified DOI URL', () => {
//   cy.get('[data-testid=new-registration-link-input]').type(dlrLink);
// });

// //   @439
// //   Scenario: Creator begins registering with a Link with data from Datacite/Crossref from citation_doi meta tag (DOI)
// And('they enter {string}', () => {
//   cy.get('[data-testid=new-registration-link-input]').type(dlrLink);
// });

// //   @440
// //   Scenario: Creator begins registering with a Link with data from dc:identifier meta tag
// And('they enter {string}', () => {
//   cy.get('[data-testid=new-registration-link-input]').type(dcIdentifierLink);
// });

// //   @441
// //   Scenario: Creator begins registering with a Link with data from DC and DCTERMS meta tags
// And('they enter {string}', () => {
//   cy.get('[data-testid=new-registration-link-input]').type(dcTermLink);
// });

// //   @442
// //   Scenario: Creator begins registering with a Link with data from Open Graph tag
// And('they enter {string}', () => {
//   cy.get('[data-testid=new-registration-link-input]').type(openGraphLink);
// });

// //   @2208
// //   Scenario: Creator begins registering with a Link with data from Highwire tag
// When('they enter {string}', () => {
//   cy.get('[data-testid=new-registration-link-input]').type(highwireLink);
// });

// //   @2370
// //   Scenario: Creator begins registering with a Link with data from schema.org
// When('they enter {string}', () => {
//   cy.get('[data-testid=new-registration-link-input]').type(schemaLink);
// });

