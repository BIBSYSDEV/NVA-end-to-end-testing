import { dataTestId } from './dataTestIds';

export const registrationFields = {
  'description': {
    'tab': dataTestId.registrationWizard.stepper.descriptionStepButton,
    'title': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.titleField,
      elementType: 'input',
      landingPageTestId: dataTestId.registrationLandingPage.title,
      value: 'Test registration title',
    },
    'abstract': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.abstractField,
      elementType: 'textArea',
      landingPageTestId: dataTestId.registrationLandingPage.abstractAccordion,
      value: 'Test registration abstract',
    },
    'description': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.descriptionField,
      elementType: 'textArea',
      landingPageTestId: '',
      value: 'Test registration description',
    },
    'keywords': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.tagField,
      elementType: 'chip',
      landingPageTestId: dataTestId.registrationLandingPage.keywords,
      value: 'Test registration keyword',
    },
    'vocabularies': {
      type: 'search',
      fieldTestId: dataTestId.registrationWizard.description.vocabularyRow('hrcsActivity'),
      elementType: 'chip',
      landingPageTestId: dataTestId.registrationLandingPage.vocabularies,
      value: 'Underpinning Research',
    },
    'date': {
      type: 'date',
      fieldTestId: dataTestId.registrationWizard.description.datePublishedField,
      value: '11.11.2021',
      elementType: 'input',
      landingPageTestId: '',
    },
    'language': {
      type: 'select',
      fieldTestId: dataTestId.registrationWizard.description.languageField,
      elementType: 'search',
      landingPageTestId: dataTestId.registrationLandingPage.primaryLanguage,
      value: 'Spanish',
    },
    'project': {
      type: 'search',
      fieldTestId: dataTestId.registrationWizard.description.projectSearchField,
      elementType: 'search',
      landingPageTestId: dataTestId.registrationLandingPage.projectsAccordion,
      value: 'Testprosjekt NVA',
    },
  },
  'files and license': {
    'tab': dataTestId.registrationWizard.stepper.filesStepButton,
    'file': {
      type: 'file',
      fieldTestId: dataTestId.registrationWizard.files.filesAccordion,
      elementType: 'file',
      landingPageTestId: dataTestId.registrationLandingPage.filesAccordion,
      value: 'example.json',
    },
    'version': {
      type: 'checkbox',
      fieldTestId: dataTestId.registrationWizard.files.version,
      elementType: 'radio',
      landingPageTestId: dataTestId.registrationLandingPage.version,
      value: 'Accepted',
      checkbox: {
        selected: 'first',
      },
    },
    'author agreement': {
      type: 'checkbox',
      fieldTestId: dataTestId.registrationWizard.files.administrativeAgreement,
      elementType: 'checkbox',
      landingPageTestId: dataTestId.registrationLandingPage.administrativeAgreement,
      value: false,
      checkbox: {
        selected: 'check',
      },
    },
    // 'date': {
    //   type: 'date',
    //   fieldTestId: dataTestId.registrationWizard.files.embargoDateField,
    //   elementType: 'input',
    //   landingPageTestId: '',
    //   value: '11.11.2021',
    // },
    'terms of use': {
      type: 'select',
      fieldTestId: dataTestId.registrationWizard.files.selectLicenseField,
      elementType: 'search',
      landingPageTestId: dataTestId.registrationLandingPage.license,
      value: 'CC BY',
    },
  },
};

export const contributorsCommon = {
  'author': {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton,
    landingPageTestId: dataTestId.registrationLandingPage.authorLink(''),
    value: 'Withauthor TestUser',
    add: {
      searchFieldTestId: 'search-field',
      searchValue: 'TestUser',
      resultsTestId: dataTestId.registrationWizard.contributors.authorRadioButton,
      selectButtonTestId: dataTestId.registrationWizard.contributors.selectUserButton,
    },
  },
  'contributors': {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton,
    landingPageTestId: dataTestId.registrationLandingPage.contributors,
    value: 'Withauthor TestUser',
    add: {
      select: {
        selectTestId: 'select-contributor-type',
        value: 'Other',
      },
      searchFieldTestId: 'search-field',
      searchValue: 'TestUser',
      resultsTestId: dataTestId.registrationWizard.contributors.authorRadioButton,
      selectButtonTestId: dataTestId.registrationWizard.contributors.selectUserButton,
    },
  },
};

export const resourceTypeFields = {
  publisher: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.publisherField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Det Kongelige Norske Videnskabers Selskab',
  },
  scientificField: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.scientificSubjectField,
    elementType: 'search',
    landingPageTestId: dataTestId.registrationLandingPage.npi,
    value: 'Computer engineering',
  },
  isbn: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.isbnField,
    elementType: 'input',
    landingPageTestId: '',
    value: '9781234567897',
    landingPageValue: '978-12-345-6789-7',
  },
  pages: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.pagesField,
    elementType: 'input',
    landingPageTestId: '',
    value: '123',
  },
  seriesTitle: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.seriesField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'ACS Central Science',
  },
  seriesNumber: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.seriesNumber,
    elementType: 'input',
    landingPageTestId: '',
    value: '123',
  },
  journalContent: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.contentField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Academic article',
  },
  chapterContent: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.contentField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Academic chapter',
  },
  journal: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.journalField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Academic Research International',
  },
  articleTitle: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.corrigendumForField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Test article corrigendum',
  },
  volume: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.volumeField,
    elementType: 'input',
    landingPageTestId: '',
    value: '111',
  },
  issue: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.issueField,
    elementType: 'input',
    landingPageTestId: '',
    value: '222',
  },
  pagesFrom: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.pagesFromField,
    elementType: 'input',
    landingPageTestId: '',
    value: '333',
  },
  pagesTo: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.pagesToField,
    elementType: 'input',
    landingPageTestId: '',
    value: '444',
  },
  articleNumber: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.articleNumberField,
    elementType: 'input',
    landingPageTestId: '',
    value: '555',
  },
  peerReview: {
    type: 'checkbox',
    fieldTestId: dataTestId.registrationWizard.resourceType.peerReviewed,
    elementType: 'radio',
    landingPageTestId: '',
    value: 'Yes',
    checkbox: {
      selected: 'first',
    },
  },
  partOf: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.partOfField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Antologi',
  },
  titleOfEvent: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.eventTitleField,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Test event title',
  },
  eventOrganizer: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.eventOrganizerField,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Test event organizer',
  },
  eventPlace: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.placeField,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Test event place',
  },
  eventCountry: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.eventCountryField,
    elementType: 'input',
    landingPageTestId: '',
    value: 'American Samoa',
  },
  eventDateFrom: {
    type: 'date',
    fieldTestId: dataTestId.registrationWizard.resourceType.dateFromField,
    elementType: 'input',
    landingPageTestId: '',
    value: '11.11.2021',
  },
  eventDateTo: {
    type: 'date',
    fieldTestId: dataTestId.registrationWizard.resourceType.dateToField,
    elementType: 'input',
    landingPageTestId: '',
    value: '11.11.2021',
  },
  artisticType: (artisticType) => {
    return {
      type: 'select',
      fieldTestId: dataTestId.registrationWizard.resourceType.artisticTypeField,
      elementType: 'input',
      landingPageTestId: '',
      value: artisticType,
      landingPageValue: artisticType,
    };
  },
  artisticDescription: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.artisticDescriptionField,
    elementType: 'textArea',
    landingPageTestId: '',
    value: 'Test artistic description',
  },
  competition: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addCompetitionButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test competition',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.competitionName]: 'Test competition',
        [dataTestId.registrationWizard.resourceType.competitionDescription]: 'Test competition description',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '11.11.2021',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  mentionPublication: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addMentionInPublicationButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test publication/mention',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.publicationMentionTitle]: 'Test publication/mention',
        [dataTestId.registrationWizard.resourceType.publicationMentionIssue]: 'Test mention issue',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '11.11.2021',
        [dataTestId.registrationWizard.resourceType.publicationMentionOther]: 'Test mention other',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  prizeAward: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addAwardButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test prize/award',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.awardName]: 'Test prize/award',
        [dataTestId.registrationWizard.resourceType.awardOrganizer]: 'Test award organizer',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '11.11.2021',
        [dataTestId.registrationWizard.resourceType.awardRanking]: 'Test award ranking',
        [dataTestId.registrationWizard.resourceType.awardOther]: 'Test award other',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  exhibition: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addExhibitionButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test exhibition',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.exhibitionName]: 'Test exhibition',
        [dataTestId.registrationWizard.resourceType.exhibitionPlace]: 'Test exhibition place',
        [dataTestId.registrationWizard.resourceType.exhibitionOrganizer]: 'Test exhibition organizer',
        [dataTestId.registrationWizard.resourceType.dateFromField]: '11.11.2021',
        [dataTestId.registrationWizard.resourceType.dateToField]: '11.11.2021',
        [dataTestId.registrationWizard.resourceType.exhibitionOther]: 'Test exhibition other',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  exhibitionPlace: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addVenueButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test exhibition place',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.venueNameField]: 'Test exhibition place',
        [dataTestId.registrationWizard.resourceType.dateFromField]: '11.11.2021',
        [dataTestId.registrationWizard.resourceType.dateToField]: '11.11.2021',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  concert: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addConcertShowButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test concert/show',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.concertPlace]: 'Test concert/show',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '11.11.2021',
        [dataTestId.registrationWizard.resourceType.artisticOutputDuration]: '11',
        [dataTestId.registrationWizard.resourceType.concertAddWork]: 'Test work',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  audioVideoPublication: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addAudioVideoPublicationButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test audio/video publisher',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.artisticSubtype]: 'CompactDisc',
        [dataTestId.registrationWizard.resourceType.audioVideoPublisher]: 'Test audio/video publisher',
        [dataTestId.registrationWizard.resourceType.audioVideoCatalogueNumber]: '11',
        [dataTestId.registrationWizard.resourceType.audioVideoAddTrack]: 'Test track',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  literaryAudioVideoPublication: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addAudioVideoButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test audio/video publisher',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.artisticSubtype]: 'Audiobook',
        [dataTestId.registrationWizard.resourceType.publisherNameField]: 'Test audio/video publisher',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '2021',
        [dataTestId.registrationWizard.resourceType.isbnField]: '9781234567897',
        [dataTestId.registrationWizard.resourceType.artisticOutputDuration]: '20',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  literaryPerformance: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addPerformanceButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test literary performance place',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.artisticSubtype]: 'Reading',
        [dataTestId.registrationWizard.resourceType.placeField]: 'Test literary performance place',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '11.11.2021',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  literaryWebPublicatrion: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addWebPublicationButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test literary web publication publisher',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.linkField]: 'http://test.no',
        [dataTestId.registrationWizard.resourceType.publisherNameField]: 'Test literary web publication publisher',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '2021',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  bookPrintedMatter: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addBookButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test book publisher',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.publisherNameField]: 'Test book publisher',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '2021',
        [dataTestId.registrationWizard.resourceType.isbnField]: '9781234567897',
        [dataTestId.registrationWizard.resourceType.pagesField]: '20',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  tvWebStreaming: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addTvWebStreamingButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test streaming publisher',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.broadcastPublisher]: 'Test streaming publisher',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '11.11.2021',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  festivalCinema: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addFestivalCinemaButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test festival place',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.cinemaPlace]: 'Test festival place',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '11.11.2021',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  otherFilmAnnouncement: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addOtherButton,
    elementType: 'announcement',
    landingPageTestId: '',
    value: 'Test festival place',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.otherReleaseType]: 'Test other type',
        [dataTestId.registrationWizard.resourceType.otherReleasePlace]: 'Test other place',
        [dataTestId.registrationWizard.resourceType.otherReleasePublisher]: 'Test other publisher',
        [dataTestId.registrationWizard.resourceType.artisticOutputDate]: '11.11.2021',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.artisticOutputSaveButton,
    },
  },
  mediaMedium: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.mediaMedium,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Journal',
  },
  mediaFormat: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.mediaFormat,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Text',
  },
  mediaChannel: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.mediaChannel,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Test channel',
  },
  mediaSeries: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.mediaSeries,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Test series',
  },
  mediaIssue: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.mediaIssue,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Test issue',
  },
  relatedRegistrations: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.relatedRegistrationField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Test Antologi',
  },
  relatedDMPs: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.compliesWithField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Test registration DMP',
  },
  externalLink: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.externalLinkField,
    elementType: 'input',
    landingPageTestId: '',
    value: 'https://test.no',
  },
  geographicDescription: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.geographicDescriptionField,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Test geographic description',
  },
};
