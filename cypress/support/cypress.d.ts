import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { FileVersions } from './constants';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login to Cognito
       * @param userId
       * @example cy.login('test-user-with-author@test.no')
       */
      login(userId: string): Chainable<string>;
      getNvaUserName(): String;
      /**
       * Get element by data-testid
       *
       * @param dataTestId
       * @param options
       */
      getDataTestId(dataTestId: string, options?: any): Chainable<JQuery<HTMLElement>>;
      safeClick(locator: string): any;

      startRegistrationWithLink(doiLink: string): void;
      startWizardWithLink(doiLink: string): void;
      startWizardWithEmptyRegistration(): void;
      createValidRegistration(fileName: string, title: string, fileVersion?: FileVersions, fileType?: string): void;
      createPublishedRegistration(
        title: string,
        category?: string,
        fileName?: string,
        fileVersion?: FileVersions,
        fileType?: string
      ): void;
      createPublishedChapter(title: string, anthology: string): void;
      addContributor(contributorName: string): void;
      addUnidentifiedContributor(contributorName: string): void;

      openNVIWorklist(): void;
      selectNVIStatus(status: string): void;
      selectNVICandidate(title?: string, status?: string): void;

      openMyRegistrations(): void;
      chooseDatePicker(selector: string, date: string): void;

      selectRegistration(title: string, type: string): void;
      testDataTestidList(table: DataTable, values: Object): void;
      mockPersonSearch(userId: string): void;

      checkField(field: Object): void;
      checkContributors(contributorRoles: string[]): void;
      fillInCommonFields(hasFileVersion?: boolean): void;
      fillInResourceType(subtype: string, fields: any[]): void;
      fillInContributors(contributorRoles: any): void;
      checkLandingPage(): void;

      // setWorkflowRegistratorPublishesAll(): void;
      // setWorkflowRegistratorPublishesMetadata(): void;
      // setWorkflowRegistratorRequiresApproval(): void;

      filterMessages(messageType: string): void;
      /**
       * Search for a term by clearing the search field first and typing the search term
       * @param searchTerm - The term to search for
       * @example cy.searchFor('My Publication')
       */
      searchFor(searchTerm: string): void;
      /**
       * Create a registration via API using cy.request for faster test data setup
       * @param title - Registration title
       * @param category - Publication category type (defaults to ACADEMIC_ARTICLE)
       * @param status - Registration status: 'DRAFT' or 'PUBLISHED' (defaults to 'PUBLISHED')
       * @example cy.createRegistrationViaApi('My Article', CategoryTypes.ACADEMIC_ARTICLE, 'PUBLISHED')
       */
      createRegistrationViaApi(title: string, category?: string, status?: 'DRAFT' | 'PUBLISHED'): Chainable<any>;
      getWorklistItem(title: string): Chainable<JQuery<HTMLElement>>;
      getNVIWorklistItem(title: string): Chainable<JQuery<HTMLElement>>;

      getSuccess(): void;
      getSuccessDone(): void;
      refreshPublish(): void;

      editChannelClaims(): void;
      claimChannel(searchString: string): void;
      removeChannel(searchString: string): void;
    }
  }
}
