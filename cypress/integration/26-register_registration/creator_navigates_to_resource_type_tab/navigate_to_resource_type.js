import { USER_WITH_AUTHOR } from '../../../support/constants';
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import {
  RESOURCE_TYPE_FIELDS,
  JOURNAL_SUBTYPES,
  JOURNAL_FIELDS,
  REPORT_SUBTYPES,
  STUDENT_THESIS_SUBTYPES,
  REPORT_FIELDS,
  BOOK_SUBTYPES,
  BOOK_FIELDS,
  RESOURCE_TYPES,
  STUDENT_THESIS_FIELDS,
  CHAPTER_FIELDS,
  OTHER_SUBTYPES,
} from '../../../support/data_testid_constants';

const doiLink = 'https://doi.org/10.1126/science.169.3946.635';
const filename = 'example.txt';

// Feature: Creator navigates to Resource Type tab

// Common steps
Given('Creator begins registering a Registration in the Wizard', () => {
  cy.login(USER_WITH_AUTHOR);
  let scenario = '';
  if (window.testState.currentScenario.tags && window.testState.currentScenario.tags.length > 0) {
    scenario = window.testState.currentScenario.tags[0].name;
  } else {
    scenario = window.testState.currentScenario.name;
    if (scenario.includes('(example')) {
      scenario = scenario.substring(0, scenario.indexOf('(example')).trim();
    }
  }

  cy.log(scenario);

  switch (scenario) {
    case '@395':
    case '@1625':
    case '@1656':
    case '@1659':
    case '@1694':
    case '@2021':
    case 'Creator sees fields for Norwegian Science Index (NVI) incompatible Resource subtype':
      cy.startRegistrationWithLink(doiLink);
      cy.get('[data-testid=registration-link-next-button]').should('be.enabled');
      cy.get('[data-testid=registration-link-next-button]').click({ force: true });
      break;
    default:
      cy.startRegistrationWithFile(filename);
      cy.get('[data-testid=registration-file-start-button]').should('be.enabled');
      cy.get('[data-testid=registration-file-start-button]').click({ force: true });
  }
});
When('they navigate to the Resource Type tab', () => {
  cy.get('[data-testid=nav-tabpanel-resource-type').click({ force: true });
});
And('they click the Save button', () => {
  cy.get('[data-testid=button-save-registration]').click({ force: true });
  cy.get('[data-testid=button-save-registration]').should('be.enabled');
  cy.get('[data-testid=button-next-tab]').click({ force: true });
  cy.get('[data-testid=button-previous-tab]').click({ force: true });
});
And('they select the Resource type "Contribution to journal"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Journal]').click({ force: true });
});
And('they select Resource type Book', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
});
Then('they see a Search box for "Publisher name"', () => {
  cy.get('[data-testid=publisher-search-field]').should('be.visible');
});
And('they see a checkbox for "Is this a textbook?"', () => {
  cy.get('[data-testid=is-textbook-checkbox]').should('be.visible');
});
And('they select the Resource Type', (dataTable) => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${RESOURCE_TYPES[dataTable.rawTable[0]]}]`).click({ force: true });
});
And('they select Resource subtype {string}', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${JOURNAL_SUBTYPES[subtype]}]`).click({ force: true });
});

// end common steps

//   @274
//   Scenario: Creator navigates to the Resource Type tab and selects Resource type "Contribution to journal"
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
//   | Type |

//   @393
//   Scenario: Creator navigates to the Resource Type tab and selects Resource type "Report"
// And('they select the Resource type "Report"', () => {
//   cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
//   cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
// });
//   | Research report      |
//   | Policy report        |
//   | Working paper        |
//   | Other type of report |

//   @392
//   Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Anthology"
And('they select Resource subtype "Anthology" from the list', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookAnthology]').click({ force: true });
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
// | Part of book/report |
And('they select the Registration Subtype "Chapter in book"', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-ChapterArticle]').click({ force: true });
  cy.wrap('Chapter in book').as('subType');
});
Then('they see an information box describing that a Container book must be published first', () => {
  // cy.get('[data-testid=info-anthology]').should('be.visible');
});
//   | DOI                            |
//   | Search box for published books |
//   | Pages from                     |
//   | Pages to                       |
//   | Peer reviewed                  |
// And('they see the Norwegian Science Index \\(NVI) evaluation status', () => {
//   cy.get('[data-testid=nvi-chapter]').should('be.visible');
// });

// @1409
// Scenario Outline: Creator selects Contribution to Journal and Peer Review Details are hidden
And('they select type Contribution to Journal', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Journal]').click({ force: true });
});
Then('they see that the Peer Review Details are hidden', () => {
  cy.get('[data-testid=peer-review]').should('not.exist');
  cy.get('[data-testid=peer_review-true]').should('not.exist');
  cy.get('[data-testid=peer_review-false]').should('not.exist');
});
// Examples:
//   | Subtype              |
//   | Editorial            |
//   | Letter to the Editor |
//   | Book review          |

// @1624
// Scenario: Creator navigates to the Resource Type tab and selects Resource type "Other publication"
// TODO not implemented
And('they select the Resource type "Other publication"', () => {});
//   | Feature article   |
//   | Map               |
//   | Musical notation  |
//   | Other publication |

// @1625
// Scenario: Creator sees fields for Resource subtype "Corrigendum"
And('they select the Resource subtype "Corrigendum"', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=publication-instance-type-JournalCorrigendum]`).click({ force: true });
});
// | Search box for "Journal article" |
// | DOI                              |
// | Volume                           |
// | Issue                            |
// | Pages from                       |
// | Pages to                         |
// | Article number                   |
And('they see a disabled field for Journal based on selected Journal article', () => {});

// Scenario: Creator sees that fields for Resource subtype "Corrigendum" are validated
// | Volume         |
// | Issue          |
// | Pages from     |
// | Pages to       |
// | Article number |
// Then('they can see "Mandatory" error message for fields:', (dataTable) => {
//   dataTable.rawTable.forEach((field) => {
//     cy.get(`[data-testid=${JOURNAL_FIELDS[field[0]]}]`).within((field) => {
//       cy.wrap(field).contains('Journal is required');
//     });
//   });
// });
// | Search box for "Journal article" |
// | Volume         |
// | Issue          |
// | Pages from     |
// | Pages to       |
// | Article number |

// @1631
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Map"
// TODO not implemented
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Map"', () => {});
// | Search box for Publisher |
// | Original version         |

// @1632
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Musical notation"
// TODO not implemented
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Musical notation"', () => {});
// | Search box for Publisher |
// | Original version         |
// | Pages from               |
// | Pages to                 |
// | ISMN                     |

// @1633
// Scenario: Creator selects Resource type "Other publication" and selects subtype "Other publication"
// TODO not implemented
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Other publication"', () => {});
// | Original version            |
// | Search box for Published in |
// | Search box for Publisher    |
// | Pages from                  |
// | Pages to                    |
// | Total number of pages       |

// @1656
// Scenario Outline: Creator sees fields for Norwegian Science Index (NVI) compatible Resource subtype
// | Search-box for Journal |
// | DOI                    |
// | Volume                 |
// | Issue                  |
// | Pages from             |
// | Pages to               |
// | Article number         |
// | Peer reviewed          |
// And('they see the Norwegian Science Index (NVI) evaluation status', () => {
//   cy.get('[data-testid^=peer_review]');
// });
// Examples:
//   | Subtype             |
//   | Journal article     |
//   | Short communication |

// Scenario Outline: Creator sees that fields for Norwegian Science Index (NVI) compatible Resource subtype are validated
// And('they enter an invalid value in fields:', () => {});
// | Volume         |
// | Issue          |
// | Pages from     |
// | Pages to       |
// | Article number |
// | Search box for Journal |
// And('they can see "Invalid format" error message for fields:', () => {});
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
And('they select Resource subtype {string}', () => {});
// And('they enter an invalid value in fields:', () => {});
// | Volume         |
// | Issue          |
// | Pages from     |
// | Pages to       |
// | Article number |
// | Search box for Journal |
// And('they can see "Invalid format" error message for fields:', () => {});
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
// TODO not implemented
And('they select the Resource type "Other publication"', () => {});
And('they select the subtype "Feature article"', () => {});
// | Original version            |
// | Search box for Published in |
// | Volume                      |
// | Issue                       |
// | Pages from                  |
// | Pages to                    |

// @1693
// Scenario Outline: Creator sees fields for Resource subtypes for "Report"
And('they select the Resource type "Report"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Report]').click({ force: true });
});
And('they select the subtype {string}:', (subtype) => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get(`[data-testid=${REPORT_SUBTYPES[subtype]}]`).click({ force: true });
});
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
// And('they select the Resource type "Report"', () => {});
And('they select the subtype {string}:', (subtype) => {});
// And('they enter an invalid value in fields:', () => {});
// | ISBN                  |
// | Total number of pages |
Then('they can see the "Invalid ISBN" error message', () => {
  cy.get('[data-testid=isbn-field] input').type('invalid').focus().blur();
  cy.get('[data-testid=snackbar-warning]').contains('invalid');
});
// | Search box for Publisher |
// And('they can see "Invalid format" error message for fields:', () => {});
//   | Total number of pages |
// Examples:
//   | Subtype              |
//   | Research report      |
//   | Policy report        |
//   | Working paper        |
//   | Other type of report |

// @1694
// Scenario Outline: Creator sees fields for Resource subtypes for "Student thesis"
And('they select the Resource type "Student thesis"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Degree]').click({ force: true });
});
// And('they select {string}:', () => {});
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
// And('they select {string}:', () => {});
//   | Search box for Publisher |
// Examples:
//   | Subtype              |
//   | Bachelor thesis      |
//   | Master thesis        |
//   | Doctoral thesis      |
//   | Other student thesis |

// @1963
// Scenario: Creator navigates to the Resource Type tab and selects Resource subtype "Monograph"
And('they select Resource subtype "Monograph" from the list', () => {
  cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-instance-type-BookMonograph]').click({ force: true });
});
// And('they see fields for', () => {});
// | ISBN                  |
// | Total number of pages |
// | NPI discipline        |
// And('they see a Search box for "Title of the Series"', () => {});
// And('they see a preselected value for Peer review "Not peer reviewed"', () => {});
// And('they see the Norwegian Science Index (NVI) evaluation status', () => {});

// @2021
// Scenario: Creator sees fields for Resource subtype "Chapter in report"
// TODO not implemented

// And('they select the Resource Type "Part of book/report"', () => {});
// And('they select the Registration Subtype "Chapter in report"', () => {
// });
// Then('they see an information box describing that a Container report must be published first', () => {});
// | DOI                              |
// | Search box for published reports |
// | Pages from                       |
// | Pages to                         |

// @2229
// Scenario: Creator sees that fields for Book are validated on Resource Type tab
And('they select Resource type "Book"', () => {
  cy.get('[data-testid=publication-context-type]').click({ force: true }).type(' ');
  cy.get('[data-testid=publication-context-type-Book]').click({ force: true });
});
And('they select Resource subtype "<BookType>" from the list', (dataTable) => {
  dataTable.rawTable.forEach((type) => {
    cy.get('[data-testid=publication-instance-type]').click({ force: true }).type(' ');
    cy.get(`[data-testid=publication-instance-type-${type[0]}]`).click({ force: true });
  });
});
//   | Publisher      |
//   | NPI discipline |
// Examples:
//   | BookType  |
//   | Anthology |
//   | Monograph |
