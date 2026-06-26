import { formatedToday } from './commands';
import { CategoryTypes, ContributorTypes, FileVersions } from './constants';
import { dataTestId } from './dataTestIds';
import { v4 as uuid } from 'uuid';
import {
  ArticleReference,
  BookReference,
  ChapterReference,
  CorrigendumReference,
  DegreeReference,
  ReportReference,
} from './reference';

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
    const fileSelect = {
      ['Open file']: FileTypes.PENDING_OPEN,
      ['Internal file']: FileTypes.PENDING_INTERNAL,
    };

    if (fileType !== 'None') {
      cy.getDataTestId(dataTestId.registrationWizard.files.fileTypeSelect).click();
      cy.get(`[data-value=${fileSelect[accessibilityType]}]`).click();
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
  cy.getDataTestId(dataTestId.startPage.searchField).type(`${userTo}{enter}`);
  cy.getDataTestId(dataTestId.common.skeleton).should('not.exist');
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
const nviApiUrl = `${baseUrl}scientific-index/candidate`;

export const registrationBuilder = () => {
  const accessToken = Cypress.env('accessToken');
  const registrationData: RegistrationData = {
    associatedArtifacsts: [],
    projects: [],
    create() {
      return new Cypress.Promise<RegistrationData>((resolve, reject) => {
        cy.request({
          method: 'POST',
          url: publicationApiUrl,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          failOnStatusCode: true,
        }).then((response) => {
          this.identifier = response.body.identifier;
          this.payload = response.body;
          this.payload.allowedOperations = [
            'doi-request-create',
            'update',
            'delete',
            'publishing-request-create',
            'upload-file',
            'partial-update',
            'support-request-create',
          ];
          resolve(this);
        });
      });
    },
    addEntityDescription(description: EntityDescriptionType) {
      if (!this.payload)
        throw new Error('Payload is not defined. Create registration before adding EntityDescription.');
      this.entityDescription = description;
      this.payload.entityDescription = description;
      return this;
    },
    addContributor(newContributor: ContributorType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      if (!this.entityDescription) throw new Error('Entity description is not defined. Add entity description first.');
      newContributor.sequence = this.entityDescription.contributors.length + 1;
      this.entityDescription.contributors.push(newContributor);
      this.payload.entityDescription = this.entityDescription;
      return this;
    },
    addFile(file: FileType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      this.payload.associatedArtifacts.push(file);
      this.associatedArtifacsts.push(file);
      return this;
    },
    addProject(project: ProjectType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      this.projects.push(project);
      this.payload.projects = this.projects;
      return this;
    },
    addReference(reference: ReferenceType) {
      if (!this.payload) throw new Error('Payload is not defined. Create registration first.');
      if (!this.payload.entityDescription)
        throw new Error('Entity description is not defined. Add entity description first.');
      this.reference = reference;
      this.payload.entityDescription.reference = reference;
      return this;
    },
    update() {
      return new Cypress.Promise<RegistrationData>((resolve, reject) => {
        if (!this.payload) reject('Payload is not defined. Create registration first.');
        if (!this.entityDescription) reject('Entity description is not defined. Add entity description first.');
        const auth = `Bearer ${accessToken}`;
        this.payload.entityDescription = this.entityDescription;
        this.payload.associatedArtifacts = this.associatedArtifacsts;
        if (this.reference) {
          this.payload.entityDescription.reference = this.reference;
        }
        const newPayload = this.payload;
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
          resolve(this);
        });
      });
    },
    publish() {
      return new Cypress.Promise<RegistrationData>((resolve, reject) => {
        if (!this.payload) reject('Payload is not defined. Create registration first.');
        const auth = `Bearer ${accessToken}`;
        this.payload.entityDescription = this.entityDescription;
        this.payload.associatedArtifacts = this.associatedArtifacsts;
        if (this.reference) {
          this.payload.entityDescription.reference = this.reference;
        }
        cy.request({
          method: 'POST',
          url: `${publicationApiUrl}/${this.identifier}/publish`,
          headers: {
            'Authorization': auth,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'If-ETag': `${this.payload.resourceOwner.owner}:${uuid()}`,
          },

          body: this.payload,
          failOnStatusCode: true,
        }).then((response) => {
          resolve(this);
        });
      });
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

export const findContributorByName = (name: string, role: ContributorTypes, isUnverified?: boolean) => {
  return new Cypress.Promise<ContributorType | null>((resolve, reject) => {
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
        reject(`Error searching for ${name}.`);
      }
      if (response.body.hits.length === 0) {
        contributor.identity.id = ``;
        contributor.identity.name = name;
        contributor.identity.verificationStatus = 'NotVerified';
      } else {
        response.body.hits.forEach((hit) => {
          const foundName = parseName(hit.names);
          if (name === foundName) {
            contributor.identity.id = isUnverified ? '' : `${personApiUrl}/${hit.identifiers[0].value}`;
            contributor.identity.name = foundName;
            contributor.identity.verificationStatus = isUnverified ? 'NotVerified' : 'Verified';
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
      resolve(contributor);
    });
  });
};

export const createEntityDescription = (
  title?: string,
  category?: CategoryTypes,
  subjectHeading?: string,
  nviLevel?: NviLevels,
  seriesLevel?: NviLevels,
  corrigendumFor?: string
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
    reference: createReference(category, nviLevel, seriesLevel, corrigendumFor),
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

const ReportTypes = [
  CategoryTypes.REPORT_BASIC,
  CategoryTypes.REPORT_WORKING_PAPER,
  CategoryTypes.RESEARCH_REPORT,
  CategoryTypes.POLICY_REPORT,
  CategoryTypes.CONFERENCE_REPORT,
  CategoryTypes.REPORT_BOOK_OF_ABSTRACT,
];

const DegreeTypes = [
  CategoryTypes.DEGREE_BACHELOR,
  CategoryTypes.DEGREE_MASTER,
  CategoryTypes.DEGREE_PHD,
  CategoryTypes.DEGREE_LICENTIATE,
  CategoryTypes.OTHER_STUDENT_WORK,
];

const createReference = (
  category: CategoryTypes,
  nviLevel?: NviLevels,
  seriesLevel?: NviLevels,
  corrigendumFor?: string
): ReferenceType => {
  const level = nviLevel ? nviLevel : NviLevels.LEVEL_0;
  if (ArticleTypes.includes(category)) {
    return ArticleReference(category, level);
  } else if (category === CategoryTypes.JOURNAL_CORRIGENDUM) {
    if (!corrigendumFor) throw new Error('Corrigendum need parent publication to create reference.');
    return CorrigendumReference(`${publicationApiUrl}/${corrigendumFor}`, nviLevel);
  } else if (BookTypes.includes(category)) {
    return BookReference(category, level, seriesLevel);
  } else if (ChapterTypes.includes(category)) {
    return ChapterReference(category);
  } else if (ReportTypes.includes(category)) {
    return ReportReference(category);
  } else if (DegreeTypes.includes(category)) {
    return DegreeReference(category, level, seriesLevel);
  } else {
    throw new Error(`Category ${category} not supported for reference creation.`);
  }
};

const PUBLISHING_REQUEST = 'PublishingRequest';
export const publishFile = (registrationId: string, file: FileType) => {
  return new Cypress.Promise((resolve, reject) => {
    const accessToken = Cypress.env('accessToken');
    cy.request({
      method: 'GET',
      url: `${publicationApiUrl}/${registrationId}/tickets`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }).then((response) => {
      const tickets = response.body.tickets;
      const ticketTypes = [];
      tickets.forEach((ticket) => {
        ticketTypes.push(ticket.type);
      });

      if (!ticketTypes.includes(PUBLISHING_REQUEST)) {
        reject('No publishing request found');
      }

      tickets.forEach((ticket) => {
        if (ticket.type === PUBLISHING_REQUEST) {
          const tickedId = ticket.identifier;
          cy.request({
            method: 'PUT',
            url: `${publicationApiUrl}/${registrationId}/ticket/${tickedId}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/json',
            },
            body: { status: 'Completed' },
          }).then(() => {
            resolve(null);
          });
        }
      });
    });
  });
};

export const unpublishPublication = (registrationId: string) => {
  return new Cypress.Promise((resolve, reject) => {
    const accessToken = Cypress.env('accessToken');
    cy.request({
      method: 'PUT',
      url: `${publicationApiUrl}/${registrationId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      body: { type: 'UnpublishPublicationRequest', comment: 'Comment' },
    }).then(() => {
      resolve(null);
    });
  });
};

export const deletePublication = (registrationId: string) => {
  return new Cypress.Promise((resolve, reject) => {
    const accessToken = Cypress.env('accessToken');
    cy.request({
      method: 'PUT',
      url: `${publicationApiUrl}/${registrationId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      body: { type: 'DeletePublicationRequest' },
    }).then(() => {
      resolve(null);
    });
  });
};

export const listNviCandidates = (institution: string, year: string, size?: string, offset?: string) => {
  return new Cypress.Promise((resolve, reject) => {
    const accessToken = Cypress.env('accessToken');
    const url =
      `${nviApiUrl}?affiliations=${institution}&year=${year}` +
      (size ? `&size=${size}` : '') +
      (offset ? `&offset=${offset}` : '');
    cy.request({
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }).then((response) => {
      resolve(response.body);
    });
  });
};

export enum NviStatus {
  ASSIGNED = 'Assigned',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export const assignNVICandidate = (registrationId: string, institution: string, cristinId: string) => {
  return new Cypress.Promise((resolve, reject) => {
    const accessToken = Cypress.env('accessToken');
    cy.request({
      method: 'PUT',
      url: `${nviApiUrl}/${registrationId}/assignee`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      body: { institutionId: institution, assignee: cristinId },
    }).then(() => {
      resolve(null);
    });
  });
};

export const updateNVICandidate = (registrationId: string, institution: string, status: NviStatus) => {
  return new Cypress.Promise((resolve, reject) => {
    const accessToken = Cypress.env('accessToken');
    cy.request({
      method: 'PUT',
      url: `${nviApiUrl}/${registrationId}/status`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      body: { status: status, institutionId: institution, reason: 'Test reason' },
    }).then(() => {
      resolve(null);
    });
  });
};

export const openNviPeriod = (year: string) => {
  return new Cypress.Promise((resolve, rejectsponse) => {
    const nextYear = new Date().getFullYear() + 1;
    const periodPayload = {
      'type': 'NviPeriod',
      'id': `https://api.e2e.nva.aws.unit.no/scientific-index/period/${year}`,
      'publishingYear': `${year}`,
      'startDate': `${year}-01-01T00:00:00Z`,
      'reportingDate': `${nextYear}-01-01T00:00:00.000Z`,
    };
    const accessToken = Cypress.env('accessToken');

    cy.request({
      method: 'PUT',
      url: `${baseUrl}scientific-index/period`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      body: periodPayload,
    }).then(() => {
      resolve(null);
    });
  });
};

export const closeNviPeriod = (year: string) => {
  return new Cypress.Promise((resolve, reject) => {
    const periodPayload = {
      'type': 'NviPeriod',
      'id': `https://api.e2e.nva.aws.unit.no/scientific-index/period/${year}`,
      'publishingYear': `${year}`,
      'startDate': `${year}-01-01T00:00:00Z`,
      'reportingDate': `${year}-12-31T00:00:00Z`,
    };
    const accessToken = Cypress.env('accessToken');

    cy.request({
      method: 'PUT',
      url: `${baseUrl}scientific-index/period`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      body: periodPayload,
    }).then(() => {
      resolve(null);
    });
  });
};

export enum FileTypes {
  PENDING_OPEN = 'PendingOpenFile',
  PENDING_INTERNAL = 'PendingInternalFile',
  HIDDEN = 'HiddenFile',
  OPEN = 'OpenFile',
  INTERNAL = 'InternalFile',
}

export const uploadFileToRegistration = (
  registrationId: string,
  fileName: string,
  type?: string,
  mimeType?: string,
  embargoDate?: string
) => {
  return new Cypress.Promise<FileType | null>((resolve, reject) => {
    const accessToken = Cypress.env('accessToken');

    cy.fixture(fileName).then((fileContent) => {
      const fileSize = fileContent.length;
      const lastModified = new Date().getTime();
      cy.request({
        method: 'POST',
        url: `${publicationApiUrl}/${registrationId}/file-upload/create`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: {
          filename: fileName,
          size: fileSize,
          lastmodified: lastModified,
          mimetype: mimeType ? mimeType : 'text/plain',
        },
        failOnStatusCode: true,
      }).then((response) => {
        const uploadID = response.body.uploadId;
        const key = response.body.key;
        cy.request({
          method: 'POST',
          url: `${publicationApiUrl}/${registrationId}/file-upload/prepare`,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: {
            number: 1,
            uploadId: uploadID,
            body: fileContent,
            key: key,
          },
          failOnStatusCode: true,
        }).then((uploadResponse) => {
          const presignedUrl = uploadResponse.body.url;
          cy.request({
            method: 'PUT',
            url: presignedUrl,
            headers: {
              'Accept': 'application/pdf',
            },
            body: {
              data: fileContent,
            },
            failOnStatusCode: true,
          }).then((presignedResponse) => {
            const eTag = presignedResponse.headers.etag;
            cy.request({
              method: 'POST',
              url: `${publicationApiUrl}/${registrationId}/file-upload/complete`,
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              body: {
                uploadId: uploadID,
                key: key,
                type: 'InternalCompleteUpload',
                parts: [
                  {
                    etag: `${eTag}`,
                    partNumber: 1,
                  },
                ],
              },
              failOnStatusCode: true,
            }).then((completeResponse) => {
              const file: FileType = {
                ...completeResponse.body,
                type: type ? type : FileTypes.PENDING_OPEN,
                allowedOperations: ['delete', 'set-primary', 'update-metadata'],
                embargoDate: embargoDate ? embargoDate : null,
                license: 'https://creativecommons.org/licenses/by/4.0/',
                publisherVersion: 'AcceptedVersion',
              };
              resolve(file);
            });
          });
        });
      });
    });
  });
};

export const createDraftPublicationUsingAPI = (
  title: string,
  category: CategoryTypes,
  creatorName: string,
  nviLevel?: NviLevels,
  seriesLevel?: NviLevels
) => {
  return new Cypress.Promise<RegistrationData>((resolve, reject) => {
    registrationBuilder()
      .create()
      .then((builder) => {
        const entity = createEntityDescription(title, category, '1003', nviLevel, seriesLevel);
        findContributorByName(creatorName, ContributorTypes.CREATOR).then((creator) => {
          builder
            .addEntityDescription(entity)
            .addContributor(creator)
            .update()
            .then((builder) => {
              resolve(builder);
            });
        });
      });
  });
};

export const createPublicationUsingAPI = (
  title: string,
  category: CategoryTypes,
  creatorName: string,
  nviLevel: NviLevels,
  seriesLevel?: NviLevels,
  corrigendumFor?: string
) => {
  return new Cypress.Promise<RegistrationData>((resolve, reject) => {
    registrationBuilder()
      .create()
      .then((builder) => {
        const entity = createEntityDescription(title, category, '1003', nviLevel, seriesLevel, corrigendumFor);
        findContributorByName(creatorName, ContributorTypes.CREATOR).then((creator) => {
          builder
            .addEntityDescription(entity)
            .addContributor(creator)
            .update()
            .then(() => {
              builder.publish().then((builder) => {
                cy.wait(1000);
                resolve(builder);
              });
            });
        });
      });
  });
};

export const createCorrigendumUsingAPI = (
  corrigendumTitle: string,
  corrigendumFor: string,
  creatorName: string,
  nviLevel: NviLevels
) => {
  createPublicationUsingAPI(corrigendumFor, CategoryTypes.ACADEMIC_ARTICLE, creatorName, nviLevel).then((builder) => {
    createPublicationUsingAPI(
      corrigendumTitle,
      CategoryTypes.JOURNAL_CORRIGENDUM,
      creatorName,
      nviLevel,
      null,
      builder.identifier
    );
  });
};

export const createChapterInAnthologyUsingAPI = (
  chapterTitle: string,
  anthologyTitle: string,
  creatorName: string,
  nviLevel: NviLevels,
  seriesLevel?: NviLevels
) => {
  createPublicationUsingAPI(anthologyTitle, CategoryTypes.BOOK_ANTHOLOGY, creatorName, nviLevel, seriesLevel).then(
    (anthologyBuilder) => {
      cy.wrap(anthologyBuilder.identifier).as('anthologyIdentifier');
      cy.wrap(anthologyBuilder).as('anthologyBuilder');
      anthologyBuilder.entityDescription.contributors[0].role.type = ContributorTypes.EDITOR;
      anthologyBuilder.update().then();
      createPublicationUsingAPI(chapterTitle, CategoryTypes.ACADEMIC_CHAPTER, creatorName, nviLevel, seriesLevel).then(
        (chapterBuilder) => {
          cy.wrap(chapterBuilder).as('chapterBuilder');
          chapterBuilder.entityDescription.reference.publicationContext.id = `${publicationApiUrl}/${
            anthologyBuilder.identifier as string
          }`;
          chapterBuilder.update().then();
        }
      );
    }
  );
};

export const createProject = (name?: string, id?: string): ProjectType => {
  return !name
    ? {
        type: 'ResearchProject',
        name: "Project for testing 20230512'",
        id: 'https://api.e2e.nva.aws.unit.no/cristin/project/2745236',
        approvals: [],
      }
    : {
        type: 'ResearchProject',
        name: name,
        id: id,
        approvals: [],
      };
};

/**
 * Creates a DOI request ticket for a published registration via the API.
 * @param identifier - The registration's identifier.
 * @param message - Optional message to attach to the request.
 */
export const requestDoi = (identifier: string, message?: string): Cypress.Chainable<Cypress.Response<unknown>> => {
  const accessToken = Cypress.env('accessToken');

  const body = message?.trim()
    ? { type: 'DoiRequest', messages: [{ type: 'Message', text: message.trim() }] }
    : { type: 'DoiRequest' };

  return cy.request({
    method: 'POST',
    url: `${publicationApiUrl}/${identifier}/ticket`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body,
    failOnStatusCode: true,
  });
};

/**
 * Approves a registration's most recent DOI request by completing its ticket.
 * Looks up the latest DoiRequest ticket and throws if none exists.
 * @param identifier - The registration's identifier.
 */
export const approveDoi = (identifier: string): Cypress.Chainable<Cypress.Response<unknown>> => {
  const accessToken = Cypress.env('accessToken');
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  return cy
    .request({
      method: 'GET',
      url: `${publicationApiUrl}/${identifier}/tickets`,
      headers,
      failOnStatusCode: true,
    })
    .then((response) => {
      const doiTicket = response.body.tickets?.findLast((ticket) => ticket.type === 'DoiRequest');
      if (!doiTicket) {
        throw new Error(`No DoiRequest ticket found for registration ${identifier}`);
      }

      // ticket.id is a full URL, so PUT directly to it
      return cy.request({
        method: 'PUT',
        url: doiTicket.id,
        headers,
        body: { status: 'Completed' },
        failOnStatusCode: true,
      });
    });
};
export type RegistrationData = {
  associatedArtifacsts: Record<string, string>[];
  identifier?: string;
  payload?: string;
  reference?: ReferenceType;
  entityDescription?: EntityDescriptionType;
  projects?: [];
  create(): Promise<RegistrationData>;
  addEntityDescription(description: EntityDescriptionType): RegistrationData;
  addContributor(contributors: ContributorType): RegistrationData;
  addFile(file: FileType): RegistrationData;
  addProject(project: ProjectType): RegistrationData;
  addReference(reference: ReferenceType): RegistrationData;
  update(): Promise<RegistrationData>;
  publish(): Promise<RegistrationData>;
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
  course?: {
    type: string;
    code: string;
  };
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
  type: 'ResearchProject';
  id: string;
  name: string;
  approvals: [];
};

export type EntityDescriptionType = {
  type: RegistrationPartTypes.ENTITYDESCRIPTION;
  mainTitle: string;
  alternativeTitles?: string[];
  abstract?: string;
  alternativeAbstracts?: string[];
  language?: string;
  publicationDate: {
    type: RegistrationPartTypes.PUBLICATIONDATE;
    day: number;
    month: number;
    year: number;
  };
  contributors: ContributorType[];
  npiSubjectHeading: string;
  tags: string[];
  reference: ReferenceType;
};

export type FileType = {
  allowedOperations: ['delete', 'download', 'write-metadata'];
  embargoDate?: null;
  identifier: string;
  license: string;
  mimeType: string;
  name: string;
  size: number;
  type: string;
  publisherVersion?: string;
  uploadDetails: {
    type: 'UserUploadDetails';
    uploadedBy: string;
    uploadedDate: string;
  };
  rightsRetentionStrategy: {
    type: 'NullRightsRetentionStrategy';
    configuredType: 'NullRightsRetentionStrategy';
  };
};
