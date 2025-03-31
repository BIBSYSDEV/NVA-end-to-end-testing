import { DataTable } from '@badeball/cypress-cucumber-preprocessor';

declare global {
  namespace Cypress {
    interface Chainable {
      login(userId: string): Chainable<string>;
      getDataTestId(dataTestId: string, options?: any): Chainable<JQuery<HTMLElement>>;

      startRegistrationWithLink(doiLink: string): void;
      startWizardWithLink(doiLink: string): void;
      startWizardWithEmptyRegistration(): void;
      createValidRegistration(fileName: string, title: string, fileVersion?: string, fileType?: string): void;
      createPublishedRegistration(
        title: string,
        category?: string,
        fileName?: string,
        fileVersion?: string,
        fileType?: string
      ): void;

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

      setWorkflowRegistratorPublishesAll(): void;
      setWorkflowRegistratorPublishesMetadata(): void;
      setWorkflowRegistratorRequiresApproval(): void;

      filterMessages(messageType: string): void;
      getWorklistItem(title: string): Chainable<JQuery<HTMLElement>>;
      getNVIWorklistItem(title: string): Chainable<JQuery<HTMLElement>>;

      getSuccess(): void;
      getSuccessDone(): void;
      refreshPublish(): void;
    }
  }
}
