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
      value: 'test',
    },
  },
  'contributors': {
    'tab': dataTestId.registrationWizard.stepper.contributorsStepButton,
    'author': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('Creator'),
      landingPageTestId: dataTestId.registrationLandingPage.authorLink(''),
      value: 'Save First Testuser',
    },
    'contributors': {
      type: 'add',
      fieldTestId: dataTestId.registrationWizard.contributors.addContributorButton('Other'),
      landingPageTestId: dataTestId.registrationLandingPage.contributors,
      value: 'Save Second Testuser',
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
      fieldTestId: dataTestId.registrationWizard.files.embargoDateField,
      landingPageTestId: '',
      value: '',
    },
    'terms of use': {
      type: 'select',
      fieldTestId: dataTestId.registrationWizard.files.selectLicenseField,
      landingPageTestId: dataTestId.registrationLandingPage.license,
      value: '',
    },
  },
};
