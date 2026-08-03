// Feature: Scenarios for Result portifolio

import {
  CategoryTypes,
  userName,
  userUnitCurator,
  userUnitEditor,
  userUnitWithAuthor,
} from '../../../support/constants';
import { dataTestId } from '../../../support/dataTestIds';
import { v4 as uuid } from 'uuid';
import { Given, When, Then, Before, DataTable, BeforeAll } from '@badeball/cypress-cucumber-preprocessor';
import {
  createPublicationUsingAPI,
  deletePublication,
  NviLevels,
  RegistrationData,
  unpublishPublication,
} from '../../../support/create_registration';
import { build } from 'esbuild';

const portifolios = new Map([
  ['Published Results', dataTestId.editor.resultsPortfolioPublishedCheckbox],
  ['Unpublished Results', dataTestId.editor.resultsPortfolioUnpublishedCheckbox],
  ['Deleted Results', dataTestId.editor.resultsPortfolioDeletedCheckbox],
]);

const fileName = 'example.txt';

const selectPortifolio = (portifolio: string) => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');

  cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).within(() => {
    cy.get(':checkbox').uncheck();
  });

  switch (portifolio) {
    case 'Published Results':
      cy.getDataTestId(dataTestId.editor.resultsPortfolioPublishedCheckbox).within(() => {
        cy.get(':checkbox').check();
      });
      break;
    case 'Unpublished Results':
      cy.getDataTestId(dataTestId.editor.resultsPortfolioUnpublishedCheckbox).within(() => {
        cy.get(':checkbox').check();
      });
      break;
    case 'Deleted Results':
      cy.getDataTestId(dataTestId.editor.resultsPortfolioDeletedCheckbox).within(() => {
        cy.get(':checkbox').check();
      });
      break;
  }
};

BeforeAll(() => {
  cy.login(userUnitEditor).then(() => {
    const publishedTitle = `Published registration ${uuid()}`;
    createPublicationUsingAPI(
      publishedTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_0
    );

    const unpublishedTitle = `Unpublished registration ${uuid()}`;
    createPublicationUsingAPI(
      unpublishedTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_0
    ).then((builder: unknown) => {
      const publicationBuilder = builder as RegistrationData;
      unpublishPublication(publicationBuilder.identifier).then(() => {});
    });

    const deletedTitle = `Deleted registration ${uuid()}`;
    createPublicationUsingAPI(
      deletedTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_0
    ).then((builder: unknown) => {
      const publicationBuilder = builder as RegistrationData;
      cy.wrap(unpublishPublication(publicationBuilder.identifier)).then(() => {
        deletePublication(publicationBuilder.identifier).then(() => {});
      });
    });
  });
});

// Scenario: Editor views Result portifolio
Given('an Editor', () => {
  cy.login(userUnitEditor);
});
When('they view the Result portifolio', () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();
});
Then('they can see:', (table: DataTable) => {
  table.raw().forEach((data) => {
    selectPortifolio(data[0]);
    cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
    cy.getDataTestId(dataTestId.startPage.searchResultItem).should('have.length.above', 0);
  });
});
// | Published Results   |
// | Unpublished Results |
// | Deleted Results     |

const publishedTitle = `Portfolio published result ${uuid()}`;

// Scenario: Published Result is added to portifolio
Given('a User publishes a Result', () => {
  cy.login(userUnitWithAuthor).then(() => {
    createPublicationUsingAPI(
      publishedTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_0
    );
  });
});
When('an Editor views the Result portifolio for Published Results', () => {
  cy.login(userUnitEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();
  selectPortifolio('Published Results');
});
Then('they can see the published Result', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${publishedTitle}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get('body').then(($body) => {
    if ($body.find(`[data-testid=${dataTestId.startPage.searchResultItem}]`).length === 0) {
      cy.wait(10000);
      cy.reload();
      selectPortifolio('Published Results');
    }
  });
  cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${publishedTitle})`);
});

const unpublishedTitle = `Portfolio unpublished result ${uuid()}`;

// Scenario: Unublished Result is added to portifolio
Given('a User unpublish a Result', () => {
  cy.login(userUnitWithAuthor).then(() => {
    createPublicationUsingAPI(
      unpublishedTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_0
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      cy.wrap(unpublishPublication(registrationBuilder.identifier)).then(() => {});
    });
  });
});
When('an Editor views the Result portifolio for Unpublished Results', () => {
  cy.login(userUnitEditor);
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();
  selectPortifolio('Unpublished Results');
});
Then('they can see the unpublished Result', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${unpublishedTitle}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get('body').then(($body) => {
    if ($body.find(`[data-testid=${dataTestId.startPage.searchResultItem}]`).length === 0) {
      cy.wait(10000);
      cy.reload();
      selectPortifolio('Unpublished Results');
    }
  });
  cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${unpublishedTitle})`);
});

const deletedTitle = `Portfolio unpublished result ${uuid()}`;

// Scenario: Deleted Result is added to portifolio
Given('a User deletes an unpublished Result', () => {
  cy.login(userUnitWithAuthor).then(() => {
    createPublicationUsingAPI(
      deletedTitle,
      CategoryTypes.ACADEMIC_ARTICLE,
      userName[userUnitWithAuthor],
      NviLevels.LEVEL_0
    ).then((builder: unknown) => {
      const registrationBuilder = builder as RegistrationData;
      cy.wrap(registrationBuilder.identifier).as('identifier');
      cy.wrap(unpublishPublication(registrationBuilder.identifier)).then(() => {});
    });
  });

  cy.login(userUnitEditor).then(() => {
    cy.get('@identifier').then((identifier: unknown) => {
      cy.wrap(deletePublication(identifier as string)).then(() => {});
    });
  });
});
When('an Editor views the Result portifolion for Deleted Results', () => {
  cy.getDataTestId(dataTestId.header.editorLink).click();
  cy.getDataTestId(dataTestId.editor.resultsPortfolioAccordion).click();
  selectPortifolio('Deleted Results');
});
Then('they can see the deleted Result', () => {
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${deletedTitle}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.get('body').then(($body) => {
    if ($body.find(`[data-testid=${dataTestId.startPage.searchResultItem}]`).length === 0) {
      cy.wait(10000);
      cy.reload();
      selectPortifolio('Deleted Results');
    }
  });

  cy.getDataTestId(dataTestId.startPage.searchResultItem).filter(`:contains(${deletedTitle})`);
});
