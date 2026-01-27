import { formatedToday } from './commands';
import { CategoryTypes, ContributorTypes, FileVersions } from './constants';
import { dataTestId } from './dataTestIds';
import { v4 as uuid } from 'uuid';
import { ArticleReference, BookReference, ChapterReference, CorrigendumReference } from './reference';

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

    case CategoryTypes.ACADEMIC_REVIEW_ARTICLE:
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
const personApiUrl = `${baseUrl}cristin/person`;
const publicationApiUrl = `${baseUrl}publication`;

export const registrationBuilder = (): RegistrationData => {
  const accessToken = Cypress.env('accessToken');
  const registrationData: RegistrationData = {
    create() {
      cy.request({
        method: 'POST',
        url: publicationApiUrl,
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
          'doi-request-create',
          'update',
          'delete',
          'publishing-request-create',
          'upload-file',
          'partial-update',
          'support-request-create',
        ];
      });
      return this;
    },
    addEntityDescription(description: EntityDescriptionType) {
      if (!this.payload)
        throw new Error('Payload is not defined. Create registration before adding EntityDescription.');
      this.entityDescription = description;
      return this;
    },
    addContributor(newContributor: ContributorType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      if (!this.entityDescription) throw new Error('Entity description is not defined. Add entity description first.');
      newContributor.sequence = this.entityDescription.contributors.length + 1;
      this.entityDescription.contributors.push(newContributor);
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
      this.reference = reference;
      return this;
    },
    update() {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      if (!this.entityDescription) throw new Error('Entity description is not defined. Add entity description first.');
      const auth = `Bearer ${accessToken}`;
      const newPayload = this.payload;
      this.payload.entityDescription = this.entityDescription;
      if (this.reference) {
        this.payload.entityDescription.reference = this.reference;
      }
      cy.request({
        method: 'PUT',
        url: `${publicationApiUrl}/${this.identifier}`,
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
      return this;
    },
    publish() {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      const auth = `Bearer ${accessToken}`;
      const newPayload = this.payload;
      cy.request({
        method: 'POST',
        url: `${publicationApiUrl}/${this.identifier}/publish`,
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'If-ETag': `${this.payload.resourceOwner.owner}:${uuid()}`,
        },

        body: newPayload,
        failOnStatusCode: true,
      }).then((response) => {});
      return this;
    },
  };
  return registrationData;
};

const parseName = (nameObject: any): string => {
  let name = '';
  const lastName = nameObject[0].type === 'LastName' ? nameObject[0].value : nameObject[1].value;
  const firstName = nameObject[0].type === 'FirstName' ? nameObject[0].value : nameObject[1].value;
  name = `${firstName} ${lastName}`;

  return name;
};

export const findContributorByName = (name: string, role: ContributorTypes): ContributorType => {
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
    url: `${personApiUrl}?name=${name}&page=1&results=10`,
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error searching for ${name}.`);
    }
    if (response.body.hits.length === 0) {
      contributor.identity.id = ``;
      contributor.identity.name = name;
      contributor.identity.verificationStatus = 'NotVerified';
    } else {
      response.body.hits.forEach((hit) => {
        const foundName = parseName(hit.names);
        if (name === foundName) {
          contributor.identity.id = `${personApiUrl}/${hit.identifiers[0].value}`;
          contributor.identity.name = foundName;
          contributor.identity.verificationStatus = 'Verified';
          let index = 0;
          hit.affiliations.forEach((affiliation: any) => {
            const organization: affiliationType = {
              id: affiliation.organization,
              type: RegistrationPartTypes.ORGANIZATION,
            };
            contributor.affiliations.push(organization);
            index++;
          });
        }
      });
    }
  });

  return contributor;
};

export const createEntityDescription = (
  title?: string,
  category?: CategoryTypes,
  subjectHeading?: string,
  nviLevel?: NviLevels,
  seriesLevel?: NviLevels
): EntityDescriptionType => {
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
    reference: createReference(category, nviLevel, seriesLevel),
  };
  return entityDescription;
};

export enum NviLevels {
  LEVEL_0 = 'Level 0',
  LEVEL_1 = 'Level 1',
  LEVEL_2 = 'Level 2',
}

const ArticleTypes = [
  CategoryTypes.ACADEMIC_ARTICLE,
  CategoryTypes.ACADEMIC_REVIEW_ARTICLE,
  CategoryTypes.JOURNAL_REVIEW,
  CategoryTypes.CONFERENCE_ABSTRACT,
  CategoryTypes.COMMENTARY,
  CategoryTypes.JOURNAL_LEADER,
  CategoryTypes.JOURNAL_ISSUE,
  CategoryTypes.CASE_REPORT,
  CategoryTypes.STUDY_PROTOCOL,
  CategoryTypes.PROFESSIONAL_ARTICLE,
  CategoryTypes.POPULAR_SCIENCE_ARTICLE,
];

const BookTypes = [
  CategoryTypes.ACADEMIC_MONOGRAPH,
  CategoryTypes.ACADEMIC_COMMENTARY,
  CategoryTypes.NON_FICTION_BOOK,
  CategoryTypes.POPULAR_SCIENCE_BOOK,
  CategoryTypes.TEXT_BOOK,
  CategoryTypes.ENCYCLOPEDIA,
  CategoryTypes.EXHIBITION_CATALOGUE,
  CategoryTypes.BOOK_ANTHOLOGY,
];

const ChapterTypes = [
  CategoryTypes.ACADEMIC_CHAPTER,
  CategoryTypes.NON_FICTION_CHAPTER,
  CategoryTypes.POPULAR_SCIENCE_CHAPTER,
  CategoryTypes.TEXT_BOOK_CHAPTER,
  CategoryTypes.ENCYCLOPEDIA_CHAPTER,
  CategoryTypes.INTRODUCTION,
  CategoryTypes.EXHIBITION_CATALOGUE_CHAPTER,
  CategoryTypes.CHAPTER_IN_REPORT,
  CategoryTypes.CHAPTER_CONFERENCE_ABSTRACT,
];

const createReference = (category: CategoryTypes, nviLevel?: NviLevels, seriesLevel?: NviLevels): ReferenceType => {
  const level = nviLevel ? nviLevel : NviLevels.LEVEL_1;
  if (ArticleTypes.includes(category)) {
    return ArticleReference(category, level);
  } else if (category === CategoryTypes.JOURNAL_CORRIGENDUM) {
    throw new Error('Corrigendum need parent publication to create reference.');
  } else if (BookTypes.includes(category)) {
    return BookReference(category, level, seriesLevel);
  } else if (ChapterTypes.includes(category)) {
    return ChapterReference(category);
  } else {
    throw new Error(`Category ${category} not supported for reference creation.`);
  }
};

export const createDraftPublicationUsingAPI = (
  title: string,
  category: CategoryTypes,
  creatorName: string,
  nviLevel?: NviLevels,
  seriesLevel?: NviLevels
) => {
  const builder = registrationBuilder().create();
  const entity = createEntityDescription(title, category, '1003', nviLevel, seriesLevel);
  const creator = findContributorByName(creatorName, ContributorTypes.CREATOR);
  cy.then(() => {
    builder.addEntityDescription(entity).addContributor(creator);
    cy.then(() => {
      builder.update();
    });
  });
  return builder;
};

export const createPublicationUsingAPI = (
  title: string,
  category: CategoryTypes,
  creatorName: string,
  nviLevel?: NviLevels,
  seriesLevel?: NviLevels
) => {
  const builder = registrationBuilder().create();
  const entity = createEntityDescription(title, category, '1003', nviLevel, seriesLevel);
  const creator = findContributorByName(creatorName, ContributorTypes.CREATOR);

  cy.then(() => {
    builder.addEntityDescription(entity).addContributor(creator);
    cy.then(() => {
      builder.update();
      cy.then(() => {
        builder.publish();
        cy.wait(1000);
      });
    });
  });
  return builder;
};

export const createChapterInAnthologyUsingAPI = (
  chapterTitle: string,
  anthologyTitle: string,
  creatorName: string,
  nviLevel?: NviLevels
) => {
  const anthologyBuilder = createPublicationUsingAPI(
    anthologyTitle,
    CategoryTypes.BOOK_ANTHOLOGY,
    creatorName,
    nviLevel
  );
  cy.wrap(anthologyBuilder).as('anthologyBuilder');
  cy.get('@anthologyBuilder').then((builder: unknown) => {
    const anthology = builder as RegistrationData;
    cy.wrap(anthology.identifier).as('anthologyIdentifier');
    cy.wrap(anthologyBuilder).as('anthologyBuilder');
    cy.get('@anthologyIdentifier').then((anthologyIdentifier: unknown) => {
      const chapterBuilder = createPublicationUsingAPI(chapterTitle, CategoryTypes.ACADEMIC_CHAPTER, creatorName);
      cy.wrap(chapterBuilder).as('chapterBuilder');
      cy.get('@chapterBuilder').then((builder: unknown) => {
        const chapterBuilder = builder as RegistrationData;
        chapterBuilder.entityDescription.reference.publicationContext.id = `${publicationApiUrl}/${
          anthologyIdentifier as string
        }`;
        chapterBuilder.update();
      });
    });
  });
};

export type RegistrationData = {
  identifier?: string;
  payload?: string;
  reference?: ReferenceType;
  entityDescription?: EntityDescriptionType;
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
  sequence: number;
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
  };
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
  };
  contributors: ContributorType[];
  alternativeAbstracts?: string[];
  npiSubjectHeading: string;
  tags: string[];
  reference: ReferenceType;
};
