import { version } from 'chai';
import { formatedToday, today } from './commands';
import { CategoryTypes, ContributorTypes, FileVersions } from './constants';
import { dataTestId } from './dataTestIds';
import { v4 as uuid } from 'uuid';
import { ReferenceConstants } from './reference';

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
      // cy.intercept('GET', 'publication-channels-v2/serial-publication', { fixture: 'channel_mock_serial.json' });
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
  PUBLICATIONDATE = 'PublicationDate',
  ORGANIZATION = 'Organization',
  ENTITYDESCRIPTION = 'EntityDescription',
  CONTRIBUTOR = 'Contributor',
  IDENTITY = 'Identity',
  REFERENCE = 'Reference',
}

const baseUrl = 'https://api.e2e.nva.aws.unit.no/';

export const registrationBuilder = (accessToken: string): RegistrationData => {
  const registrationData: RegistrationData = {
    create() {
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
      return this;
    },
    addContributor(newContributor: ContributorType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      if (!this.payload.entityDescription) throw new Error('Entity description is not defined. Add entity description first.');
      this.payload.entityDescription.contributors.push(newContributor);
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
        this.identifier = response.body.identifier;
        this.payload = response.body;
      });
      return this
    },
    publish() {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      const auth = `Bearer ${accessToken}`;
      const newPayload = this.payload;
      cy.request({
        method: 'POST',
        url: `${baseUrl}publication/${this.identifier}/publish`,
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'If-ETag': `${this.payload.resourceOwner.owner}:${uuid()}`,
        },

        body: newPayload,
        failOnStatusCode: true,
      }).then((response) => {
      });
      return this
    },
  };
  return registrationData;
}

export const findContributorByName = (accessToken: string, name: string, role: ContributorTypes): ContributorType => {
  let contributor: ContributorType = {
    identity: {
      type: RegistrationPartTypes.IDENTITY,
      id: '',
      name: '',
    },
    role: {
      type: role,
    },
    affiliations: [],
    correspondingAuthor: false,
    sequence: 1,
    type: RegistrationPartTypes.CONTRIBUTOR,
  };
  cy.request({
    method: 'GET',
    url: `${baseUrl}cristin/person?name=${name}&page=1&results=10`,
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`User with name ${name} does not exist.`);
    }
    contributor.identity.id = `https://api.e2e.nva.aws.unit.no/cristin/person/${response.body.hits[0].identifiers[0].value}`;
    contributor.identity.name = `${response.body.hits[0].names[1].value} ${response.body.hits[0].names[0].value}`;
    contributor.identity.verificationStatus = 'Verified';
    let index = 0;
    response.body.hits[0].affiliations.forEach((affiliation: any) => {
      const organization: affiliationType = {
        id: affiliation.organization,
        type: RegistrationPartTypes.ORGANIZATION,
      };
      contributor.affiliations.push(organization);
      index++;
    });
  });
  return contributor;
};

export const createEntityDescription = (title?: string, category?: CategoryTypes, subjectHeading?: string): EntityDescriptionType => {
  const entityDescription: EntityDescriptionType = {
    type: RegistrationPartTypes.ENTITYDESCRIPTION,
    mainTitle: !title ? '' : title,
    publicationDate: {
      type: RegistrationPartTypes.PUBLICATIONDATE,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
    contributors: [],
    npiSubjectHeading: subjectHeading,
    tags: [],
    reference: createReference(category),
  }
  return entityDescription;
}

const createReference = (category: CategoryTypes): ReferenceType => {

  return ReferenceConstants[category];
};

export type RegistrationData = {
  identifier?: string;
  payload?: string;
  create(): RegistrationData;
  addEntityDescription(description: EntityDescriptionType): RegistrationData;
  addContributor(contributors: ContributorType): RegistrationData;
  addFile(fileName: string): RegistrationData;
  addProject(project: ProjectType): RegistrationData;
  addReference(reference: ReferenceType): RegistrationData;
  update(): RegistrationData;
  publish(): RegistrationData;
};

export type ContributorType = {
  identity: IdentityType;
  role: {
    type: ContributorTypes;
  };
  affiliations: affiliationType[];
  correspondingAuthor: false;
  sequence: 1;
  type: RegistrationPartTypes.CONTRIBUTOR;
};

export type affiliationType = {
  id: string;
  type: RegistrationPartTypes.ORGANIZATION;
};

export type IdentityType = {
  type: RegistrationPartTypes.IDENTITY;
  id: string;
  name: string;
  orcid?: string;
  verificationStatus?: string;
};

export type PublicationContextType = {
  type: string;
  id?: string;
  seriesId?: string;
  volume?: string;
  issue?: string;
  publisher?: {
    type: string;
    id: string;
    valid: boolean;
  }
  series?: {
    type: string;
    id?: string;
  };
  seriesNumber?: string;
  isbnList?: string[];
  additionalIdentifiers?: string[];
};

export type PublicationInstanceType = {
  type: CategoryTypes;
  pages: {
    type: string;
    begin?: number;
    end?: number;
    pages?: string;
    illustrated?: boolean;
  };
  volume?: string;
  issue?: string;
  corrigendumFor?: string;
};

export type ReferenceType = {
  type: RegistrationPartTypes.REFERENCE;
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
  type: RegistrationPartTypes.ENTITYDESCRIPTION;
  mainTitle: string;
  alternativeTitles?: string[];
  publicationDate: {
    type: RegistrationPartTypes.PUBLICATIONDATE;
    day: number;
    month: number;
    year: number;
  }
  contributors: ContributorType[];
  alternativeAbstracts?: string[];
  npiSubjectHeading: string;
  tags: string[];
  reference: ReferenceType;
};

