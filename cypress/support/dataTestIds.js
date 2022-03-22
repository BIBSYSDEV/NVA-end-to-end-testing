export const dataTestId = {
  organization: {
    searchField: 'organization-search-field',
    subSearchField: 'sub-organization-search-field',
  },
  editor: {
    hrcsActivityButtonGroup: 'hrcs-activity-button-group',
    hrcsCategoryButtonGroup: 'hrcs-category-button-group',
  },
  header: {
    aboutLink: 'about-link',
    adminUsersLink: 'admin-users-link',
    adminInstitutionLink: 'admin-institution-link',
    adminInstitutionsLink: 'admin-institutions-link',
    editorLink: 'editor-link',
    generalMenuButton: 'general-menu-button',
    languageButton: 'language-button',
    languageMenu: 'language-menu',
    logInButton: 'log-in-link',
    logOutLink: 'log-out-link',
    menuButton: 'menu-button',
    messagesLink: 'messages-link',
    myProfileLink: 'my-profile-link',
    myRegistrationsLink: 'my-registrations-link',
    newRegistrationLink: 'new-registration',
    privacyLink: 'privacy-link',
    worklistLink: 'worklist-link',
  },
  institutionAdmin: {
    archiveNameField: 'archive-field',
    displayNameField: 'display-name-field',
    feideField: 'feide-field',
    nameField: 'institution-name-field',
    saveButton: 'save-button',
    shortNameField: 'short-name-field',
  },
  startPage: {
    orderBySelect: 'order-by-select',
    readMoreButton: 'button-read-more',
    searchButton: 'search-button',
    searchField: 'search-field',
    searchPagination: 'search-pagination',
    searchResultItem: 'result-list-item',
  },
  projectLandingPage: {
    generalInfoBox: 'general-info',
    participantsAccordion: 'participants-accordion',
    resultsAccordion: 'results-accordion',
    scientificSummaryAccordion: 'scientific-summary-accordion',
  },
  registrationLandingPage: {
    abstractAccordion: 'abstract-accordion',
    authorLink: (id) => `presentation-author-link-${id}`,
    backToWizard: 'back-to-wizard-button',
    contributors: 'public-registration-contributors',
    createDoiButton: 'button-create-doi',
    doiLink: 'public-registration-doi-link',
    doiMessageField: 'request-doi-message',
    editButton: 'button-edit-registration',
    emailButton: 'email-button',
    facebookButton: 'facebook-button',
    file: 'file',
    fileEmbargoDate: 'file-embargo-date',
    fileName: 'file-name',
    filePreview: 'file-preview',
    fileSize: 'file-size',
    fileVersion: 'file-version',
    filesAccordion: 'files-accordion',
    generalInfo: 'public-registration-general-info',
    keywords: 'public-registration-keywords',
    license: 'public-registration-license',
    linkedInButton: 'linkedin-button',
    npi: 'public-registration-npi',
    openFileButton: 'open-file-button',
    primaryLanguage: 'public-registration-primary-language',
    projectsAccordion: 'projects-accordion',
    projectTitle: 'project-title',
    publicationDate: 'public-registration-publication-date',
    publishButton: 'button-publish-registration',
    registrationSubtype: 'public-registration-registration-subtype',
    rejectDoiButton: 'button-reject-doi',
    relatedRegistrationsAccordion: 'related-registrations-accordion',
    requestDoiButton: 'button-toggle-request-doi',
    reserveDoiButton: 'button-toggle-reserve-doi',
    requestDoiModal: 'request-doi-modal',
    sendDoiButton: 'button-send-doi-request',
    status: 'public-registration-status',
    subtypeFields: 'public-registration-subtype-fields',
    title: 'public-registration-title',
    twitterButton: 'twitter-button',
  },
  registrationWizard: {
    contributors: {
      addAffiliationButton: 'button-add-affiliation',
      addContributorButton: (role) => `add-${role}`,
      addSelfButton: 'add-self-button',
      addUnverifiedContributorButton: 'add-unverified-contributor-button',
      authorRadioButton: 'author-radio-button',
      correspondingCheckbox: 'author-corresponding-checkbox',
      verifyAffiliationButton: 'button-set-unverified-affiliation',
      verifyContributorButton: (name) => `button-set-unverified-contributor-${name}`,
      removeAffiliationButton: 'button-remove-affiliation',
      removeContributorButton: (name) => `button-remove-contributor-${name}`,
      searchField: 'search-field',
      selectContributorType: 'select-contributor-type',
      selectUserButton: 'select-user-button',
    },
    description: {
      addVocabularyButton: 'add-vocabulary-button',
      datePublishedField: 'date-published-field',
      projectForm: {
        contributorsSearchField: 'project-contributors-search-field',
        endDateField: 'project-end-date-field',
        roleField: 'project-participant-role-field',
        startDateField: 'project-start-date-field',
        titleField: 'project-title-field',
      },
      projectSearchField: 'project-search-field',
      abstractField: 'registration-abstract-field',
      descriptionField: 'registration-description-field',
      languageField: 'registration-language-field',
      tagField: 'registration-tag-field',
      titleField: 'registration-title-field',
      vocabularyMenuItem: (vocabulary) => `vocabulary-menu-item-${vocabulary}`,
      vocabularyRow: (vocabulary) => `vocabulary-row-${vocabulary}`,
    },
    files: {
      administrativeAgreement: 'administrative-agreement-checkbox',
      embargoDateField: 'embargo-date-field',
      fileCard: 'uploaded-file-card',
      licenseHelpButton: 'license-help-button',
      licenseItem: 'license-item',
      licenseModal: 'license-modal',
      removeFileButton: 'button-remove-file',
      selectLicenseField: 'uploaded-file-select-license',
      version: 'version-radios',
    },
    new: {
      emptyRegistrationAccordion: 'new-registration-empty',
      fileAccordion: 'new-registration-file',
      linkAccordion: 'new-registration-link',
      linkMetadata: 'link-metadata',
      startRegistrationButton: 'registration-start-button',
    },
    resourceType: {
      addCompetitionButton: 'add-competition-button',
      addExhibitionButton: 'add-exhibition-button',
      addMentionInPublicationButton: 'add-mention-in-publication-button',
      addAwardButton: 'add-award-button',
      addVenueButton: 'add-venue-button',
      articleNumberField: 'article-number-field',
      artisticTypeField: 'artistic-type-field',
      artisticDescriptionField: 'artistic-description-field',
      artisticOtherTypeField: 'artistic-other-type-field',
      contentField: 'content-field',
      contentValue: (value) => `content-value-${value.toLowerCase().replaceAll(' ', '-')}`,
      corrigendumForField: 'corrigendum-for-field',
      eventCountryField: 'event-country-field',
      dateFromField: 'date-from-field',
      dateToField: 'date-to-field',
      eventOrganizerField: 'event-organizer-field',
      eventPlaceField: 'event-place-field',
      eventTitleField: 'event-title-field',
      isbnField: 'isbn-field',
      issueField: 'issue-field',
      journalChip: 'journal-chip',
      journalField: 'journal-search-field',
      nviFailed: 'not-nvi-applicable',
      nviSuccess: 'nvi-applicable',
      pagesField: 'pages-field',
      pagesFromField: 'pages-from-field',
      pagesToField: 'pages-to-field',
      partOfField: 'part-of-field',
      peerReviewed: 'peer-review-field',
      publisherChip: 'publisher-chip',
      publisherField: 'publisher-search-field',
      removePublisherButton: 'remove-publisher-button',
      saveVenueButton: 'save-venue-button',
      scientificSubjectField: 'scientific-subject-field',
      seriesChip: 'series-chip',
      seriesField: 'series-search-field',
      seriesNumber: 'series-number-field',
      venueNameField: 'venue-name-field',
      volumeField: 'volume-field',
    },
    stepper: {
      contributorsStepButton: 'nav-tabpanel-contributors',
      descriptionStepButton: 'nav-tabpanel-description',
      errorStep: 'error-tab',
      filesStepButton: 'nav-tabpanel-files-and-license',
      resourceStepButton: 'nav-tabpanel-resource-type',
    },
  },
  myInstitutionUsersPage: {
    areaOfResponsibilityField: 'area-of-responsibility-field',
    usersAdministrators: 'users-administrators',
    usersCurators: 'users-curators',
    usersEditors: 'users-editors',
    usersCreators: 'users-creators',
  },
};
