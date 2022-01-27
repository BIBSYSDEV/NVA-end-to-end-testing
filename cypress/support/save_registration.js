import { dataTestId } from './dataTestIds';

export const registrationFields = {
  'description': {
    'tab': dataTestId.registrationWizard.stepper.descriptionStepButton,
    'title': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.titleField,
      landingPageTestId: dataTestId.registrationLandingPage.title,
      value: 'Test registration title',
    },
    'abstract': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.abstractField,
      landingPageTestId: dataTestId.registrationLandingPage.abstractAccordion,
      value: 'Test registration abstract',
    },
    'description': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.descriptionField,
      landingPageTestId: '',
      value: 'Test registration description',
    },
    'keywords': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.tagField,
      landingPageTestId: dataTestId.registrationLandingPage.keywords,
      value: 'Test registration keyword',
    },
    'vocabularies': {
      type: 'search',
      fieldTestId: dataTestId.registrationWizard.description.vocabularyRow('hrcsActivity'),
      landingPageTestId: dataTestId.registrationLandingPage.vocabularies,
      value: 'Underpinning Research',
    },
    'date': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.datePublishedField,
      value: '01.01.2022',
      landingPageTestId: '',
      landingPageValue: '1.1.2022',
    },
    'language': {
      type: 'select',
      fieldTestId: dataTestId.registrationWizard.description.languageField,
      landingPageTestId: dataTestId.registrationLandingPage.primaryLanguage,
      value: 'Spanish',
    },
    'project': {
      type: 'search',
      fieldTestId: dataTestId.registrationWizard.description.projectSearchField,
      landingPageTestId: dataTestId.registrationLandingPage.projectsAccordion,
      value: 'Testprosjekt NVA',
    },
  },
  'files and license': {
    'tab': dataTestId.registrationWizard.stepper.filesStepButton,
    'file': {
      type: 'file',
      fieldTestId: dataTestId.registrationWizard.files.filesAccordion,
      landingPageTestId: dataTestId.registrationLandingPage.filesAccordion,
      value: 'example.txt',
    },
    'version': {
      type: 'checkbox',
      fieldTestId: dataTestId.registrationWizard.files.version,
      landingPageTestId: dataTestId.registrationLandingPage.version,
      value: 'Published version',
      checkbox: {
        selected: 'first',
      },
    },
    'author agreement': {
      type: 'checkbox',
      fieldTestId: dataTestId.registrationWizard.files.administrativeAgreement,
      landingPageTestId: dataTestId.registrationLandingPage.administrativeAgreement,
      value: false,
      checkbox: {
        selected: 'check',
      },
    },
    'date': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.files.embargoDateField,
      landingPageTestId: '',
      value: '01.01.2022',
    },
    'terms of use': {
      type: 'select',
      fieldTestId: dataTestId.registrationWizard.files.selectLicenseField,
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
  Report: {
    publisher: {
      type: 'search',
      fieldTestId: dataTestId.registrationWizard.resourceType.publisherField,
      landingPageTestId: '',
      value: 'Det Kongelige Norske Videnskabers Selskab',
    },
    isbn: {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.resourceType.isbnField,
      landingPageTestId: '',
      value: '9780345300058',
      landingPageValue: '978-0-34-530005-8',
    },
    pages: {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.resourceType.pagesField,
      landingPageTestId: '',
      value: '123',
    },
    seriesTitle: {
      type: 'search',
      fieldTestId: dataTestId.registrationWizard.resourceType.seriesField,
      landingPageTestId: '',
      value: 'ACS Central Science',
    },
    seriesNumber: {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.resourceType.seriesNumber,
      landingPageTestId: '',
      value: '123',
    },
  },
};

const resourceTypeFields = {
  publisher: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.publisherField,
    landingPageTestId: '',
    value: 'Det Kongelige Norske Videnskabers Selskab',
  },
  scientificField: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.scientificSubjectField,
    landingPageTestId: dataTestId.registrationLandingPage.npi,
    value: 'Computer engineering',
  },
  isbn: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.isbnField,
    landingPageTestId: '',
    value: '9780345300058',
    landingPageValue: '978-0-34-530005-8',
  },
  pages: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.pagesField,
    landingPageTestId: '',
    value: '123',
  },
  seriesTitle: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.seriesField,
    landingPageTestId: '',
    value: 'ACS Central Science',
  },
  seriesNumber: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.seriesNumber,
    landingPageTestId: '',
    value: '123',
  },
  bookContent: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.contentField,
    landingPageTestId: '',
    value: 'Academic monograph',
  },
  journalContent: {
    type: 'select',
    fieldTestId: dataTestId.registrationWizard.resourceType.contentField,
    landingPageTestId: '',
    value: 'Research article',
  },
  journal: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.journalField,
    landingPageTestId: '',
    value: 'Academic Research International',
  },
  articleTitle: {
    type: 'search',
    fieldTestId: dataTestId.registrationWizard.resourceType.corrigendumForField,
    landingPageTestId: '',
    value: 'Test article corrigendum',
  },
  volume: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.volumeField,
    landingPageTestId: '',
    value: '111',
  },
  issue: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.issueField,
    landingPageTestId: '',
    value: '222',
  },
  pagesFrom: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.pagesFromField,
    landingPageTestId: '',
    value: '333',
  },
  to: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.pagesToField,
    landingPageTestId: '',
    value: '444',
  },
  articleNumber: {
    type: 'text',
    fieldTestId: dataTestId.registrationWizard.resourceType.articleNumberField,
    landingPageTestId: '',
    value: '555',
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
    ReportResearch: { ...resourceTypesCommon['Report'] },
    ReportPolicy: { ...resourceTypesCommon['Report'] },
    ReportWorkingPaper: { ...resourceTypesCommon['Report'] },
    ReportBasic: { ...resourceTypesCommon['Report'] },
  },
};
