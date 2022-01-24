import { dataTestId } from './dataTestIds';

export const registrationFields = {
  'description': {
    'tab': dataTestId.registrationWizard.stepper.descriptionStepButton,
    'title': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.registrationTitleField,
      landingPageTestId: dataTestId.registrationLandingPage.title,
      value: 'Test registration title',
    },
    'abstract': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.registrationAbstractField,
      landingPageTestId: dataTestId.registrationLandingPage.abstractAccordion,
      value: 'Test registration abstract',
    },
    'description': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.registrationDescriptionField,
      landingPageTestId: '',
      value: 'Test registration description',
    },
    'keywords': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.registrationTagField,
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
      fieldTestId: dataTestId.registrationWizard.description.registrationLanguageField,
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
  'contributors': {
    'tab': dataTestId.registrationWizard.stepper.contributorsStepButton,
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

export const resourceTypesCommon = {
  Book: {
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
  },
};

export const resourceTypes = {
  Book: {
    BookMonograph: {
      ...resourceTypesCommon['Book'],
      content: {
        type: 'select',
        fieldTestId: dataTestId.registrationWizard.resourceType.contentField,
        landingPageTestId: '',
        value: 'Academic monograph',
      },
    },
    BookAnthology: { ...resourceTypesCommon['Book'] },
  },
};
