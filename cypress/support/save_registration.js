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
      type: 'text',
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
      value: 'Accepted version',
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
    'date': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.files.embargoDateField,
      elementType: 'input',
      landingPageTestId: '',
      value: '01.01.2022',
    },
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
    fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('Creator'),
    landingPageTestId: dataTestId.registrationLandingPage.authorLink(''),
    value: 'TestUser, Withauthor',
    add: {
      searchFieldTestId: 'search-field',
      searchValue: 'TestUser, Withauthor{enter}',
      resultsTestId: 'author-radio-button',
      selectButtonTestId: 'connect-author-button',
    },
  },
  'contributors': {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('OtherContributor'),
    landingPageTestId: dataTestId.registrationLandingPage.contributors,
    value: 'TestUser, Withauthor',
    add: {
      select: {
        selectTestId: 'select-contributor-type',
        value: 'Other',
      },
      searchFieldTestId: 'search-field',
      searchValue: 'TestUser, Withauthor{enter}',
      resultsTestId: 'author-radio-button',
      selectButtonTestId: 'connect-author-button',
    },
  },
};

export const contributors = {
  BookAnthology: {
    'author': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('Editor'),
      landingPageTestId: dataTestId.registrationLandingPage.authorLink(''),
      value: 'TestUser, Withauthor',
      add: {
        searchFieldTestId: 'search-field',
        searchValue: 'TestUser, Withauthor{enter}',
        resultsTestId: 'author-radio-button',
        selectButtonTestId: 'connect-author-button',
      },
    },
    'contributors': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('OtherContributor'),
      landingPageTestId: dataTestId.registrationLandingPage.contributors,
      value: 'TestUser, Withauthor',
      add: {
        select: {
          selectTestId: 'select-contributor-type',
          value: 'Other',
        },
        searchFieldTestId: 'search-field',
        searchValue: 'TestUser, Withauthor{enter}',
        resultsTestId: 'author-radio-button',
        selectButtonTestId: 'connect-author-button',
      },
    },
  },
  Degree: {
    'author': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('Creator'),
      landingPageTestId: dataTestId.registrationLandingPage.authorLink(''),
      value: 'TestUser, Withauthor',
      add: {
        searchFieldTestId: 'search-field',
        searchValue: 'TestUser, Withauthor{enter}',
        resultsTestId: 'author-radio-button',
        selectButtonTestId: 'connect-author-button',
      },
    },
    'supervisor': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('Supervisor'),
      landingPageTestId: dataTestId.registrationLandingPage.authorLink(''),
      value: 'TestUser, Withauthor',
      add: {
        searchFieldTestId: 'search-field',
        searchValue: 'TestUser, Withauthor{enter}',
        resultsTestId: 'author-radio-button',
        selectButtonTestId: 'connect-author-button',
      },
    },
    'contributors': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('OtherContributor'),
      landingPageTestId: dataTestId.registrationLandingPage.contributors,
      value: 'TestUser, Withauthor',
      add: {
        select: {
          selectTestId: 'select-contributor-type',
          value: 'Other',
        },
        searchFieldTestId: 'search-field',
        searchValue: 'TestUser, Withauthor{enter}',
        resultsTestId: 'author-radio-button',
        selectButtonTestId: 'connect-author-button',
      },
    },
  },
  Artistic: {
    'contributors': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('OtherContributor'),
      landingPageTestId: dataTestId.registrationLandingPage.contributors,
      value: 'TestUser, Withauthor',
      add: {
        select: {
          selectTestId: 'select-contributor-type',
          value: 'Other',
        },
        searchFieldTestId: 'search-field',
        searchValue: 'TestUser, Withauthor{enter}',
        resultsTestId: 'author-radio-button',
        selectButtonTestId: 'connect-author-button',
      },
    },
  },
};

const resourceTypeFields = {
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
  bookContent: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.contentField,
    elementType: 'search',
    landingPageTestId: '',
    value: 'Academic monograph',
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
  to: {
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
    value: 'Anthology',
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
    fieldTestId: dataTestId.registrationWizard.resourceType.eventPlaceField,
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
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.dateFromField,
    elementType: 'input',
    landingPageTestId: '',
    value: '11.11.2021',
  },
  eventDateTo: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.dateToField,
    elementType: 'input',
    landingPageTestId: '',
    value: '11.11.2021',
  },
  artisticType: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.artisticTypeField,
    elementType: 'input',
    landingPageTestId: '',
    value: 'Product design',
    landingPageValue: 'ProductDesign',
  },
  artisticDescription: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.artisticDescriptionField,
    elementType: 'textArea',
    landingPageTestId: '',
    value: 'Test artistic description',
  },
  exhibitionPlace: {
    type: 'add',
    fieldTestId: dataTestId.registrationWizard.resourceType.addVenueButton,
    elementType: 'place',
    landingPageTestId: '',
    value: 'Test exhibition place',
    add: {
      fields: {
        [dataTestId.registrationWizard.resourceType.venueNameField]: 'Test exhibition place',
        [dataTestId.registrationWizard.resourceType.dateFromField]: '11.11.2021',
        [dataTestId.registrationWizard.resourceType.dateToField]: '11.11.2021',
      },
      selectButtonTestId: dataTestId.registrationWizard.resourceType.saveVenueButton,
    },
  },
};

export const resourceTypesCommon = {
  Book: {
    publisher: resourceTypeFields.publisher,
    scientificField: resourceTypeFields.scientificField,
    isbn: resourceTypeFields.isbn,
    pages: resourceTypeFields.pages,
    seriesTitle: resourceTypeFields.seriesTitle,
    seriesNumber: resourceTypeFields.seriesNumber,
  },
  Report: {
    publisher: resourceTypeFields.publisher,
    isbn: resourceTypeFields.isbn,
    pages: resourceTypeFields.pages,
    seriesTitle: resourceTypeFields.seriesTitle,
    seriesNumber: resourceTypeFields.seriesNumber,
  },
  Journal: {
    volume: resourceTypeFields.volume,
    issue: resourceTypeFields.issue,
    pagesFrom: resourceTypeFields.pagesFrom,
    to: resourceTypeFields.to,
    articleNumber: resourceTypeFields.articleNumber,
  },
  Degree: {
    publisher: resourceTypeFields.publisher,
    isbn: resourceTypeFields.isbn,
    pages: resourceTypeFields.pages,
  },
  Chapter: {
    partOf: resourceTypeFields.partOf,
    pagesFrom: resourceTypeFields.pagesFrom,
    pagesTo: resourceTypeFields.to,
    content: resourceTypeFields.chapterContent,
    peerReview: resourceTypeFields.peerReview,
  },
  Event: {
    titleOfEvent: resourceTypeFields.titleOfEvent,
    eventOrganizer: resourceTypeFields.eventOrganizer,
    eventPlace: resourceTypeFields.eventPlace,
    eventCountry: resourceTypeFields.eventCountry,
    eventDateFrom: resourceTypeFields.eventDateFrom,
    eventDateTo: resourceTypeFields.eventDateTo,
  },
  Artistic: {
    artisticTypeWork: resourceTypeFields.artisticType,
    artisticDescription: resourceTypeFields.artisticDescription,
    exhibitionPlace: resourceTypeFields.exhibitionPlace,
  },
};

export const resourceTypes = {
  Book: {
    BookMonograph: {
      ...resourceTypesCommon.Book,
      content: resourceTypeFields.bookContent,
    },
    BookAnthology: { ...resourceTypesCommon.Book },
  },
  Report: {
    ReportResearch: { ...resourceTypesCommon.Report },
    ReportPolicy: { ...resourceTypesCommon.Report },
    ReportWorkingPaper: { ...resourceTypesCommon.Report },
    ReportBasic: { ...resourceTypesCommon.Report },
  },
  Journal: {
    JournalArticle: {
      ...resourceTypesCommon.Journal,
      journal: resourceTypeFields.journal,
      content: resourceTypeFields.journalContent,
    },
    JournalCorrigendum: {
      ...resourceTypesCommon.Journal,
      articleTitle: resourceTypeFields.articleTitle,
    },
    FeatureArticle: {
      ...resourceTypesCommon.Journal,
      journal: resourceTypeFields.journal,
    },
    JournalLetter: {
      ...resourceTypesCommon.Journal,
      journal: resourceTypeFields.journal,
    },
    JournalReview: {
      ...resourceTypesCommon.Journal,
      journal: resourceTypeFields.journal,
    },
    JournalLeader: {
      ...resourceTypesCommon.Journal,
      journal: resourceTypeFields.journal,
    },
  },
  Report: {
    ReportResearch: { ...resourceTypesCommon.Report },
    ReportPolicy: { ...resourceTypesCommon.Report },
    ReportWorkingPaper: { ...resourceTypesCommon.Report },
    ReportBasic: { ...resourceTypesCommon.Report },
  },
  Degree: {
    DegreeBachelor: { ...resourceTypesCommon.Degree },
    DegreeMaster: { ...resourceTypesCommon.Degree },
    DegreePhd: {
      ...resourceTypesCommon.Degree,
      publisher: resourceTypeFields.publisher,
    },
    OtherStudentWork: { ...resourceTypesCommon.Degree },
  },
  Chapter: {
    ChapterArticle: { ...resourceTypesCommon.Chapter },
  },
  Event: {
    ConferenceLecture: { ...resourceTypesCommon.Event },
    ConferencePoster: { ...resourceTypesCommon.Event },
    Lecture: { ...resourceTypesCommon.Event },
    OtherPresentation: { ...resourceTypesCommon.Event },
  },
  Artistic: {
    ArtisticDesign: { ...resourceTypesCommon.Artistic },
  },
};
