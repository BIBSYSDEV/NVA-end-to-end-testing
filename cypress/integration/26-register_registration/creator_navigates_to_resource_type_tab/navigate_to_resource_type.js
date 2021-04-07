import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { USER_WITH_AUTHOR } from '../../../support/constants';
import {
  JOURNAL_SUBTYPES,
  RESOURCE_TYPE_FIELDS,
  REPORT_SUBTYPES,
  STUDENT_THESIS_SUBTYPES,
  REPORT_FIELDS,
  BOOK_FIELDS,
} from '../../../support/data_testid_constants';

const fileName = 'example.json';

// Feature: Creator navigates to Resource Type tab

// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  cy.startRegistrationWithFile(fileName);
  cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
  cy.get('[data-testid=registration-file-start-button]').click({ force: true });
});
When('they navigate to the Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type').click({ force: true });
});
Then('they see a list of subtypes:', (dataTable) => {
  const step = window.testState.currentScenario.name;
  let subtypes = {};
  switch (step) {
    case 'Creator navigates to the Resource Type tab and selects Resource type "Contribution to journal"':
      subtypes = JOURNAL_SUBTYPES;
      break;
    case 'Creator navigates to the Resource Type tab and selects Resource type "Report"':
      subtypes = REPORT_SUBTYPES;
      break;
    case 'Creator navigates to the Resource Type tab and selects Resource type "Student thesis"':
      subtypes = STUDENT_THESIS_SUBTYPES;
      break;
  }
  cy.get('[data-testid=publication-instance-type]').type(' ').click({ force: true });
  cy.testDataTestidList(dataTable, subtypes);
});

//   @274
//   Scenario: Creator navigates to the Resource Type tab and selects Resource type "Contribution to journal"
And('they select the Resource type "Contribution to journal"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Journal]').click({ force: true });
});
//   | Journal article      |
//   | Short communication  |
//   | Feature article      |
//   | Letter to the Editor |
//   | Book review          |
//   | Editorial            |
//   | Corrigendum          |

//   @453
//   Scenario: Creator navigates to Resource Type tab
Then('they see the field for Type', () => {
  cy.get('[data-testid=publication-context-type]').should('be.visible');
});
And('they see the tab Description is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-description]').should('be.enabled');
});
And('they see the tab Resource Type is selected', () => {
  cy.get('[data-testid=nav-tabpanel-description]').get('[tabindex=0]');
});
And('they see the tab Contributors is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-contributors]').should('be.visible');
});
And('they see the tab Files and License is clickable', () => {
  cy.get('[data-testid=nav-tabpanel-files-and-license]').should('be.visible');
});
And('they see Previous is enabled', () => {
  cy.get('[data-testid=button-previous-tab]').should('be.enabled');
});
And('they see Next is enabled', () => {
  cy.get('[data-testid=button-next-tab]').should('be.enabled');
});
And('they see Save is enabled', () => {
  cy.get('[data-testid=button-save-registration').should('be.enabled');
});

//   Scenario: Creator sees that fields are validated on Resource Type tab
And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
});
Then('they can see "Mandatory" error messages for fields:', (dataTable) => {
  dataTable.rawTable.forEach((value) => {
    cy.get(`[data-testid=${RESOURCE_TYPE_FIELDS[value[0]]}]`).within((field) => {
      cy.wrap(field).contains('Mandatory');
    });
  });
});
//   | Type |

//   @393
//   Scenario: Creator navigates to the Resource Type tab and selects Resource type "Report"
And('they select the Resource type "Report"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
//   | Research report      |
//   | Policy report        |
//   | Working paper        |
//   | Other type of report |

//   @392
//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Anthology"
And('they select Resource type Book', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
});
And('they select Resource subtype "Anthology" from the list', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookAnthology]').click({ force: true });
});
Then('they see a Search box for "Publisher name"', () => {
  cy.get('[data-testid=publisher-search-field]').should('be.visible');
});
And('they see a checkbox for "Is this a textbook?"', () => {
  cy.get('[data-testid=is-textbook-checkbox]').should('be.visible');
});
And('they see fields for', (dataTable) => {
  cy.testDataTestidList(dataTable, BOOK_FIELDS);
});
//   | ISBN                  |
//   | Total number of pages |
//   | NPI discipline        |
And('they see a Search box for "Title of the Series"', () => {
  cy.get('[data-testid=series-search-field]').should('be.visible');
});
And('they see a preselected value for Peer review "Not peer reviewed"', () => {
  cy.get('[data-testid=peer_review-false]').within((checkbox) => {
    cy.wrap(checkbox).get('input').should('be.checked');
  });
});

// @394
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Student thesis"
And('they select the Resource type "Student thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
});
//   | Bachelor thesis      |
//   | Master thesis        |
//   | Doctoral thesis      |
//   | Other student thesis |

// @395
// Scenario: Creator sees fields for Resource subtype "Chapter in book"
And('they select the Resource Type', (dataTable) => {});
// | Part of book/report |
And('they select the Registration Subtype "Chapter in book"', () => {});
Then('they see an information box describing that a Container book must be published first', () => {});
And('they see fields:', (dataTable) => {});
//   | DOI                            |
//   | Search box for published books |
//   | Pages from                     |
//   | Pages to                       |
//   | Peer reviewed                  |
And('they see the Norwegian Science Index \\(NVI) evaluation status', () => {});

// @1409
// Scenario Outline: Creator selects Contribution to Journal and Peer Review Details are hidden
And('they select type Contribution to Journal', () => {});
When('they select {string}', (subType) => {});
Then('they see that the Peer Review Details are hidden', () => {});
// Examples:
//   | Subtype              |
//   | Editorial            |
//   | Letter to the Editor |
//   | Book review          |

// @1624
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Other publication"
And('they select the Resource type "Other publication"', () => {});
Then('they see a list of subtypes:', (dataTable) => {});
//   | Feature article   |
//   | Map               |
//   | Musical notation  |
//   | Other publication |

// @1625
// Scenario: Creator sees fields for Resource subtype "Corrigendum"
And('they select the Resource type "Contribution to journal"', () => {});
And('they select the Resource subtype "Corrigendum"', () => {});
Then('they see fields:', () => {});
// | Search box for "Journal article" |
// | DOI                              |
// | Volume                           |
// | Issue                            |
// | Pages from                       |
// | Pages to                         |
// | Article number                   |
And('they see a disabled field for Journal based on selected Journal article', () => {});

// Scenario: Creator sees that fields for Resource subtype "Corrigendum" are validated
And('they select the Resource type "Contribution to journal"', () => {});
And('they select the Resource subtype "Corrigendum"', () => {});
And('they enter an invalid value in fields:', () => {});
// | Volume         |
// | Issue          |
// | Pages from     |
// | Pages to       |
// | Article number |
When('they click the Save button', () => {});
Then('they can see "Mandatory" error message for fields:', () => {});
// | Search box for "Journal article" |
And('they can see "Invalid format" error message for fields:', () => {});
// | Volume         |
// | Issue          |
// | Pages from     |
// | Pages to       |
// | Article number |

// @1631
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Map"
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Map"', () => {});
Then('they see fields', () => {});
// | Search box for Publisher |
// | Original version         |

// @1632
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Musical notation"
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Musical notation"', () => {});
Then('they see fields', () => {});
// | Search box for Publisher |
// | Original version         |
// | Pages from               |
// | Pages to                 |
// | ISMN                     |

// @1633
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Other publication"
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Other publication"', () => {});
Then('they see fields', () => {});
// | Original version            |
// | Search box for Published in |
// | Search box for Publisher    |
// | Pages from                  |
// | Pages to                    |
// | Total number of pages       |

// @1656
// Scenario Outline: Creator sees fields for Norwegian Science Index (NVI) compatible Resource subtype
And('they select the Resource type "Contribution to journal"', () => {});
And('they select Resource subtype "<Subtype>"', () => {});
And('they see fields:', () => {});
// | Search-box for Journal |
// | DOI                    |
// | Volume                 |
// | Issue                  |
// | Pages from             |
// | Pages to               |
// | Article number         |
// | Peer reviewed          |
And('they see the Norwegian Science Index (NVI) evaluation status', () => {});
// Examples:
//   | Subtype             |
//   | Journal article     |
//   | Short communication |

// Scenario Outline: Creator sees that fields for Norwegian Science Index (NVI) compatible Resource subtype are validated
And('they select the Resource type "Contribution to journal"', () => {});
And('they select Resource subtype {string}', () => {});
And('they enter an invalid value in fields:', () => {});
// | Volume         |
// | Issue          |
// | Pages from     |
// | Pages to       |
// | Article number |
When('they click the Save button', () => {});
Then('they can see "Mandatory" error message for fields:', () => {});
// | Search box for Journal |
And('they can see "Invalid format" error message for fields:', () => {});
//   | Volume         |
//   | Issue          |
//   | Pages from     |
//   | Pages to       |
//   | Article number |
// Examples:
//   | Subtype             |
//   | Journal article     |
//   | Short communication |

// @1659
// Scenario Outline: Creator sees fields for Norwegian Science Index (NVI) incompatible Resource subtype
And('they select the Resource type "Contribution to journal"', () => {});
And('they select Resource subtype {string}', () => {});
Then('they see fields:', () => {});
//   | Search box for Journal |
//   | DOI                    |
//   | Volume                 |
//   | Issue                  |
//   | Pages from             |
//   | Pages to               |
//   | Article number         |
// Examples:
//   | Subtype              |
//   | Letter to the Editor |
//   | Book review          |
//   | Editorial            |
//   | Feature article      |

// Scenario Outline: Creator sees that fields for Norwegian Science Index (NVI) incompatible Resource subtype are validated
And('they select the Resource type "Contribution to journal"', () => {});
And('they select Resource subtype {string}', () => {});
And('they enter an invalid value in fields:', () => {});
// | Volume         |
// | Issue          |
// | Pages from     |
// | Pages to       |
// | Article number |
When('they click the Save button', () => {});
Then('they can see "Mandatory" error messages for fields:', () => {});
// | Search box for Journal |
And('they can see "Invalid format" error message for fields:', () => {});
//   | Volume         |
//   | Issue          |
//   | Pages from     |
//   | Pages to       |
//   | Article number |
// Examples:
//   | Subtype              |
//   | Feature article      |
//   | Letter to the Editor |
//   | Book review          |
//   | Editorial            |
//   | Feature article      |

// @1669
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Feature article"
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Feature article"', () => {});
Then('they see fields', () => {});
// | Original version            |
// | Search box for Published in |
// | Volume                      |
// | Issue                       |
// | Pages from                  |
// | Pages to                    |

// @1693
// Scenario Outline: Creator sees fields for Resource subtypes for "Report"
And('they select the Resource type "Report"', () => {});
And('they select the subtype {string}:', () => {});
Then('they see fields:', () => {});
//   | Search box for Publisher |
//   | ISBN                     |
//   | Total number of pages    |
//   | Search box for Series    |
// Examples:
//   | Subtype              |
//   | Research report      |
//   | Policy report        |
//   | Working paper        |
//   | Other type of report |

// Scenario Outline: Creator sees that fields are validated for Resource subtypes for "Report"
And('they select the Resource type "Report"', () => {});
And('they select the subtype {string}:', () => {});
And('they enter an invalid value in fields:', () => {});
// | ISBN                  |
// | Total number of pages |
Then('they can see the "Invalid ISBN" error message', () => {});
When('they click the Save button', () => {});
Then('they can see "Mandatory" error messages for fields:', () => {});
// | Search box for Publisher |
And('they can see "Invalid format" error message for fields:', () => {});
//   | Total number of pages |
// Examples:
//   | Subtype              |
//   | Research report      |
//   | Policy report        |
//   | Working paper        |
//   | Other type of report |

// @1694
// Scenario Outline: Creator sees fields for Resource subtypes for "Student thesis"
And('they select the Resource type "Student thesis"', () => {});
And('they select {string}:', () => {});
Then('they see fields:', () => {});
//   | Search box for Publisher |
//   | DOI                      |
//   | Search box for Series    |
// Examples:
//   | Subtype              |
//   | Bachelor thesis      |
//   | Master thesis        |
//   | Doctoral thesis      |
//   | Other student thesis |

// Scenario Outline: Creator sees that fields are validated for Resource subtypes for "Student thesis"
And('they select the Resource type "Student thesis"', () => {});
And('they select {string}:', () => {});
When('they click the Save button', () => {});
Then('they can see "Mandatory" error messages for fields:', () => {});
//   | Search box for Publisher |
// Examples:
//   | Subtype              |
//   | Bachelor thesis      |
//   | Master thesis        |
//   | Doctoral thesis      |
//   | Other student thesis |

// @1963
// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Monograph"
And('they select Resource type Book', () => {});
And('they select Resource subtype "Monograph" from the list', () => {});
Then('they see a Search box for "Publisher name"', () => {});
And('they see a checkbox for "Is this a textbook?"', () => {});
And('they see fields for', () => {});
// | ISBN                  |
// | Total number of pages |
// | NPI discipline        |
And('they see a Search box for "Title of the Series"', () => {});
And('they see a preselected value for Peer review "Not peer reviewed"', () => {});
And('they see the Norwegian Science Index (NVI) evaluation status', () => {});

// @2021
// Scenario: Creator sees fields for Resource subtype "Chapter in report"
And('they select the Resource Type "Part of book/report"', () => {});
And('they select the Registration Subtype "Chapter in report"', () => {});
Then('they see an information box describing that a Container report must be published first', () => {});
And('they see fields:', () => {});
// | DOI                              |
// | Search box for published reports |
// | Pages from                       |
// | Pages to                         |

// @2229
// Scenario: Creator sees that fields for Book are validated on Resource Type tab
And('they select Resource type "Book"', () => {});
And('they select Resource subtype "<BookType>" from the list', () => {});
And('they click the Save button', () => {});
Then('they can see "Mandatory" error messages for fields:', () => {});
//   | Publisher      |
//   | NPI discipline |
// Examples:
//   | BookType  |
//   | Anthology |
//   | Monograph |
