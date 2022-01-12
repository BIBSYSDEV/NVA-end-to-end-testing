import { dataTestId } from './dataTestIds';

const registration_fields = {
  'description': {
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
      type: 'select',
      fieldTestId: dataTestId.registrationWizard.description.addVocabularyButton,
      landingPageTestId: dataTestId.registrationLandingPage.vocabularies,
      value: 'Underpinning research',
    },
    'date': {
      type: 'text',
      fieldTestId: dataTestId.registrationWizard.description.datePublishedField,
      landingPageTestId: dataTestId.registrationLandingPage.publicationDate,
      value: '01.01.2022',
    },
    'language': {
      type: 'select',
      fieldTestId: dataTestId.registrationWizard.description.registrationLanguageField,
      landingPageTestId: dataTestId.registrationLandingPage.primaryLanguage,
      value: 'English',
    },
    'project': {
      type: 'search',
      fieldTestId: dataTestId.registrationWizard.description.projectSearchField,
      landingPageTestId: dataTestId.registrationLandingPage.projectsAccordion,
      value: '',
    },
  },
  'contributors': {
    'author': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton,
      landingPageTestId: dataTestId.registrationLandingPage.contributors,
      value: 'Save First Testuser',
    },
    'contributors': {
      type: 'add',
      fieldTestId: dataTestId.registrationLandingPage.title,
      landingPageTestId: dataTestId.registrationLandingPage.title,
      value: 'Save Second Testuser',
    },
  },
  'files and license': {
    'file': {
      type: 'file',
      fieldTestId: '',
      landingPageTestId: dataTestId.registrationLandingPage.filesAccordion,
      value: '',
    },
    'version': {
      type: 'checkbox',
      fieldTestId: dataTestId.registrationWizard.files.version,
      landingPageTestId: dataTestId.registrationLandingPage.version,
      value: '',
    },
    'author agreement': {
      type: 'checkbox',
      fieldTestId: dataTestId.registrationWizard.files.administrativeAgreement,
      landingPageTestId: dataTestId.registrationLandingPage.administrativeAgreement,
      value: '',
    },
    'date': {
      type: 'text',
      fieldTestId: '',
      landingPageTestId: '',
      value: '',
    },
    'terms of use': {
      type: 'select',
      fieldTestId: '',
      landingPageTestId: dataTestId.registrationLandingPage.title,
      value: '',
    },
  },
  'resource type': {
    type: 'text',
    fieldTestId: dataTestId.registrationLandingPage.title,
    landingPageTestId: dataTestId.registrationLandingPage.title,
    value: '',
  },
};
