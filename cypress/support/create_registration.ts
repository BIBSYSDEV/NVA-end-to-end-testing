import { formatedToday, today } from './commands';
import { CategoryTypes, ContributorTypes, FileVersions } from './constants';
import { dataTestId } from './dataTestIds';
import { v4 as uuid } from 'uuid';

export const createValidRegistrationWithType = (
  title: string,
  type?: string,
  fileName?: string,
  fileVersion?: FileVersions,
  fileType?: string,
  parentTitle?: string
) => {
  // Description
  cy.getDataTestId(dataTestId.registrationWizard.stepper.descriptionStepButton).click({ force: true });
  title = title ? title : `Title ${uuid()}`;
  cy.get('[data-testid=registration-title-field]').type(title, { delay: 1 });
  cy.chooseDatePicker(`[data-testid=${dataTestId.registrationWizard.description.datePublishedField}]`, formatedToday);

  // Reference
  cy.getDataTestId(dataTestId.registrationWizard.stepper.resourceStepButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.resourceType.resourceTypeChip(type)).click();
  addCategoryData(type, parentTitle);

  // Contributors
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click({ force: true });
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addSelfButton).should('not.exist');

  // Files and reference
  cy.getDataTestId(dataTestId.registrationWizard.stepper.filesStepButton).click({ force: true });
  if (fileName) {
    cy.get('input[type=file]').first().selectFile(`cypress/fixtures/${fileName}`, { force: true });
    const accessibilityType = fileType ?? 'Open file';
    if (fileType !== 'None') {
      cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
      cy.contains(accessibilityType).click();
    }
    if (accessibilityType === 'Open file') {
      cy.getDataTestId(dataTestId.registrationWizard.files.version, { timeout: 30000 }).within(() => {
        if (fileVersion === FileVersions.ACCEPTED) {
          cy.get('input[type=radio]').first().click();
        } else if (fileVersion !== FileVersions.NOT_SET) {
          cy.get('input[type=radio]').last().click();
        }
      });
      cy.get('[data-testid=uploaded-file-select-license]').scrollIntoView().click({ force: true }).type(' ');
      cy.get('[data-testid=license-item]').first().click({ force: true });
    }
  }
};

const addCategoryData = (type: string, parentTitle?: string) => {
  switch (type) {
    case CategoryTypes.ACADEMIC_MONOGRAPH:
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type('springer nature', {
        delay: 1,
      });
      cy.contains('Springer Nature').click();
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.scientificSubjectField).click();
      cy.contains('Archaeology and Conservation').click();
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.isbnField).type('978-3-16-148410-0');
      break;
    case CategoryTypes.BOOK_ANTHOLOGY:
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.isbnField).type('978-82-02-89590-7');
    case CategoryTypes.REPORT_BOOK_OF_ABSTRACT:
    case CategoryTypes.RESEARCH_REPORT:
    case CategoryTypes.DATA_MANAGEMENT_PLAN:
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.publisherField).type(
        'academic conferences international',
        {
          delay: 1,
        }
      );
      cy.contains('Academic Conferences International').click();
      break;
    case CategoryTypes.ACADEMIC_ARTICLE:

    case CategoryTypes.ACADEMIC_REWIEW_ARTICLE:
    case CategoryTypes.CONFERENCE_ABSTRACT:
    case CategoryTypes.JOURNAL_REVIEW:
      cy.intercept('GET', 'publication-channels-v2/serial-publication', { fixture: 'channel_mock_serial.json' });
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.journalField).type('acs chemical');
      cy.contains('ACS Chemical Biology').click();
      break;
    case CategoryTypes.JOURNAL_CORRIGENDUM:
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.corrigendumForField).type(
        'original publication for corrigendum'
      );
      cy.contains('Original publication for corrigendum').click();
      break;
    case CategoryTypes.ACADEMIC_CHAPTER:
      const parent = parentTitle ? parentTitle : 'Test Antologi';
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.partOfField).type(parent.toLowerCase());
      cy.contains(parent).click();
      cy.getDataTestId(dataTestId.registrationWizard.resourceType.scientificSubjectField).click();
      cy.contains('Archaeology and Conservation').click();
      break;
  }
};

export const changeContributor = (userFrom: string, userTo: string): void => {
  cy.getDataTestId(dataTestId.registrationLandingPage.editButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.stepper.contributorsStepButton).click();
  cy.getDataTestId(`"${dataTestId.registrationWizard.contributors.removeContributorButton(userFrom)}"`).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).click();
  cy.getDataTestId(dataTestId.confirmDialog.acceptButton).should('not.exist');
  cy.getDataTestId(dataTestId.registrationWizard.contributors.addContributorButton).click();
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
  cy.searchFor(userTo);
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectPersonForContributor).first().click();
  cy.getDataTestId(dataTestId.registrationWizard.contributors.selectUserButton).click();
  cy.getDataTestId(dataTestId.registrationWizard.formActions.saveRegistrationButton).click();
  cy.getSuccess();
};

export enum RegistrationPartTypes {
  ORGANIZATION = 'organization',
  ENTITYDESCRIPTION = 'EntityDescription',
  CONTRIBUTOR = 'Contributor',
  IDENTITY = 'Identity',
  REFERENCE = 'Reference',
}

const baseUrl = 'https://api.e2e.nva.aws.unit.no/';

export const registrationBuilder = (accessToken: string): RegistrationData => {
  const registrationData: RegistrationData = {
    create() {
      console.log(baseUrl);
      cy.request({
        method: 'POST',
        url: `${baseUrl}publication`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        failOnStatusCode: false,
      }).then((response) => {
        console.log(response);
        this.identifier = response.body.identifier;
        this.payload = response.body;
        this.payload.approvedOperations = [
          "doi-request-create",
          "update",
          "delete",
          "publishing-request-create",
          "upload-file",
          "partial-update",
          "support-request-create"
        ];
      });
      return this;
    },
    addEntityDescription(description: EntityDescriptionType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      this.payload.entityDescription = description;
      this.payloadentityDescription.type = RegistrationPartTypes.ENTITYDESCRIPTION;
      return this;
    },
    addContributors(newContributors: ContributorType[]) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      this.payload.contributors = newContributors;
      this.payload.contributors.type = RegistrationPartTypes.CONTRIBUTOR;
      return this;
    },
    addFile(fileName: string) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      return this;
    },
    addProject(project: ProjectType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      return this;
    },
    addReference(reference: ReferenceType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      this.payload.reference = reference;
      this.payload.reference.type = RegistrationPartTypes.REFERENCE;
      return this;
    },
    update() {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      if (!this.payload.entityDescription) throw new Error('Entity description is not defined. Add entity description first.');
      const auth = `Bearer ${accessToken}`;
      const newPayload = this.payload;
      cy.request({
        method: 'PUT',
        url: `${baseUrl}publication/${this.identifier}`,
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'If-ETag': `${this.payload.resourceOwner.owner}:${uuid()}`,
        },

        body: newPayload,
        failOnStatusCode: true,
      }).then((response) => {
        console.log('Update response:');
        console.log(response);
        this.identifier = response.body.identifier;
        this.payload = response.body;
        // return this;
      });
      return this
    },
    publish() {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      return this;
    },
  };
  return registrationData;
}

export type RegistrationData = {
  identifier?: string;
  payload?: string;
  create(): RegistrationData;
  addEntityDescription(description: EntityDescriptionType): RegistrationData;
  addContributors(contributors: ContributorType[]): RegistrationData;
  addFile(fileName: string): RegistrationData;
  addProject(project: ProjectType): RegistrationData;
  addReference(reference: ReferenceType): RegistrationData;
  update(): RegistrationData;
  publish(): RegistrationData;
};

export type ContributorType = {
  name: string;
  role: ContributorTypes;
  affiliation?: string;
};


export type PublicationContextType = {
  type: string;
  seriesId?: string;
  volume?: string;
  issue?: string;
  publisher?: {
    id: string;
    valid: boolean;
  }
  isbnList?: string[];
  additionalIdentifiers?: string[];
};

export type PublicationInstanceType = {
  type: CategoryTypes;
  pages: {
    type: string;
    startPage?: number;
    endPage?: number;
    illustrated?: boolean;
  }

};

export type ReferenceType = {
  publicationContext: PublicationContextType;
  publicationInstance: PublicationInstanceType;
};

export type ProjectType = {
  projectName: string;
  projectDescription?: string;
  startDate: Date;
  endDate?: Date;
  contributors: ContributorType[];
};

export type EntityDescriptionType = {
  type: string;
  mainTitle: string;
  alternativeTitles?: string[];
  publicationDate: {
    day: number;
    month: number;
    year: number;
  }
  contributors: ContributorType[];
  alternativeAbstracts?: string[];
  npiSubjectHeadings: string;
  tags: string[];
  references: ReferenceType;
};

export const createContributor = (name: string, role: ContributorTypes, affiliation?: string): ContributorType => {
  const contributor: ContributorType = {
    name,
    role,
  };
  if (affiliation) {
    contributor.affiliation = affiliation;
  }
  return contributor;
}