export const dataTestId = {
  basicData: {
    addCustomerLink: 'add-customer-link',
    addEmployeeLink: 'add-employee-link',
    adminInstitutionsLink: 'admin-institutions-link',
    centralImportLink: 'central-import-link',
    centralImport: {
      checkboxAuthor: 'duplicate-search-author-checkbox',
      checkboxDoi: 'duplicate-search-doi-checkbox',
      checkboxIssn: 'duplicate-search-issn-checkbox',
      checkboxTitle: 'duplicate-search-title-checkbox',
      checkboxYear: 'duplicate-search-year-checkbox',
      searchPagination: 'search-pagination',
      resetButton: 'duplicate-search-reset-button',
      resultItem: 'central-import-result-item',
      searchButton: 'duplicate-search-retry-button',
      textFieldAuthor: 'duplicate-search-author-textfield',
      textFieldDoi: 'duplicate-search-doi-textfield',
      textFieldIssn: 'duplicate-search-issn-textfield',
      textFieldTitle: 'duplicate-search-title-textfield',
      textFieldYear: 'duplicate-search-year-textfield',
    },
    centralImportAccordion: 'central-import-accordion',
    customers: {
      customerList: 'customer-institutions-list',
      editInstitutionButton: (name) => `edit-institution-button-${name.toLowerCase().replaceAll(' ', '-')}`,
    },
    institutionsAccordion: 'institutions-accordion',
    institutionAdmin: {
      archiveNameField: 'archive-field',
      canAssignDoiCheckbox: 'can-assign-doi-checkbox',
      displayNameField: 'display-name-field',
      doiUsernameField: 'doi-username-field',
      doiPasswordField: 'doi-password-field',
      doiPrefixField: 'doi-prefix-field',
      doiUrlField: 'doi-url-field',
      feideField: 'feide-field',
      nameField: 'institution-name-field',
      nviInstitutionCheckbox: 'nvi-institution-checkbox',
      rorField: 'ror-field',
      saveButton: 'save-button',
      sectorChip: (sector) => `sector-chip-${sector}`,
      shortNameField: 'short-name-field',
    },
    nationalIdentityNumberField: 'national-identity-number-field',
    personAdmin: {
      cristinId: (id) => `cristin-id-${id}`,
      employments: (id) => (id ? `employments-${id}` : 'employments'),
      firstName: 'first-name',
      institution: 'institution',
      lastName: 'last-name',
      name: (id) => `name-${id}`,
      nin: (id) => (id ? `nin-${id}` : 'nin'),
      personSearchField: 'person-search-field',
      position: 'position',
      positionPercent: 'position-percent',
      removeEmployment: 'remove-employment',
      roleSelector: 'role-selector',
      startDate: 'start-date',
      endDate: 'end-date',
    },
    personRegisterAccordion: 'person-register-accordion',
    personRegisterLink: 'person-register-link',
  },
  confirmDialog: {
    acceptButton: 'accept-button',
    cancelButton: 'cancel-button',
  },
  organization: {
    searchField: 'organization-search-field',
    subSearchField: 'sub-organization-search-field',
  },
  editor: {
    areaOfResponsibilityLinkButton: 'area-of-responsibility-link-button',
    institutionsNameLinkButton: 'institutions-name-link-button',
    doiLinkButton: 'doi-link-button',
    overviewAccordion: 'overview-accordion',
    publishStrategyLinkButton: 'publishing-strategy-link-button',
    settingsAccordion: 'settings-accordion',
    vocabularyLinkButton: 'vocabulary-link-button',
    hrcsActivityButtonGroup: 'hrcs-activity-button-group',
    hrcsCategoryButtonGroup: 'hrcs-category-button-group',
    vocabularyDisabled: 'vocabulary-disabled',
    vocabularyAllowed: 'vocabulary-allowed',
    vocabularyDefault: 'vocabulary-default',
    workflowRegistratorPublishesAll: 'workflow-registrator-publishes-all',
    workflowRegistratorPublishesMetadata: 'workflow-registrator-publishes-metadata',
    workflowRegistratorRequiresApproval: 'workflow-registrator-requires-approval',
  },
  footer: {
    availabilityStatement: 'availability-statement',
    privacyLink: 'privacy-link',
  },
  header: {
    aboutLink: 'about-link',
    basicDataLink: 'basic-data-link',
    editorLink: 'editor-link',
    generalMenuButton: 'general-menu-button',
    languageButton: 'language-button',
    languageMenu: 'language-menu',
    logInButton: 'log-in-link',
    logOutLink: 'log-out-link',
    menuButton: 'menu-button',
    myPageLink: 'my-page-link',
    newRegistrationLink: 'new-registration',
    tasksLink: 'tasks-link',
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
    editProjectButton: 'edit-project-button',
    generalInfoBox: 'general-info',
    participantsAccordion: 'participants-accordion',
    relatedProjectsAccordion: 'related-projects-accordion',
    resultsAccordion: 'results-accordion',
    scientificSummaryAccordion: 'scientific-summary-accordion',
  },
  registrationLandingPage: {
    abstractAccordion: 'abstract-accordion',
    authorLink: (id) => `presentation-author-link-${id}`,
    contributors: 'public-registration-contributors',
    dmpAccordion: 'dmp-accordion',
    doiLink: 'doi-link',
    doiMessageField: 'request-doi-message',
    doiOriginalLink: 'doi-original-link',
    editButton: 'button-edit-registration',
    emailButton: 'email-button',
    externalLinksAccordion: 'external-links-accordion',
    facebookButton: 'facebook-button',
    file: 'file',
    fileEmbargoDate: 'file-embargo-date',
    fileName: 'file-name',
    filePreview: 'file-preview',
    filePreviewHeader: 'file-preview-header',
    fileSize: 'file-size',
    fileVersion: 'file-version',
    filesAccordion: 'files-accordion',
    fundingsAccordion: 'fundings-accordion',
    generalInfo: 'public-registration-general-info',
    geographicAccordion: 'geographic-accordion',
    handleLink: 'handle-link',
    keywords: 'public-registration-keywords',
    license: 'public-registration-license',
    linkedInButton: 'linkedin-button',
    npi: 'public-registration-npi',
    openFileButton: 'open-file-button',
    primaryLanguage: 'public-registration-primary-language',
    projectsAccordion: 'projects-accordion',
    projectTitle: 'project-title',
    publicationsUsingDatasetAccordion: 'publications-using-dataset-accordion',
    registrationSubtype: 'public-registration-registration-subtype',
    rejectDoiButton: 'button-reject-doi',
    relatedPublicationsAccordion: 'related-publications-accordion',
    relatedRegistrationsAccordion: 'related-registrations-accordion',
    subtypeFields: 'public-registration-subtype-fields',
    tasksPanel: {
      backToWizard: 'back-to-wizard-button',
      createDoiButton: 'button-create-doi',
      doiRequestAccordion: 'doi-request-accordion',
      messageSender: 'message-author',
      messageText: 'message-text',
      messageTimestamp: 'message-timestamp',
      panelRoot: 'tasks-panel',
      publishButton: 'button-publish-registration',
      publishingRequestAcceptButton: 'publishing-request-accept-button',
      publishingRequestAccordion: 'publishing-request-accordion',
      publishingRequestRejectButton: 'publishing-request-reject-button',
      refreshDoiRequestButton: 'refresh-doi-button',
      refreshPublishingRequestButton: 'refresh-publishing-request-button',
      reserveDoiButton: 'button-toggle-reserve-doi',
      requestDoiButton: 'button-toggle-request-doi',
      requestDoiModal: 'request-doi-modal',
      sendDoiButton: 'button-send-doi-request',
      supportAccordion: 'support-accordion',
    },
    title: 'public-registration-title',
    twitterButton: 'twitter-button',
  },
  registrationWizard: {
    contributors: {
      addAffiliationButton: 'button-add-affiliation',
      addContributorButton: 'add-contributor',
      addSelectedAffiliationButton: 'add-selected-affiliation-button',
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
      unverifiedAuthor: (initials) => `unverified-author-${initials}`,
      unverifiedContributorName: 'unverified-contributor-name',
      verifiedAuthor: (initials) => `verified-author-${initials}`,
      verifiedAuthorNoAffiliation: (initials) => `verified-author-no-affiliation-${initials}`,
    },
    description: {
      addFundingButton: 'add-funding-button',
      addVocabularyButton: 'add-vocabulary-button',
      createProjectButton: 'create-project-button',
      datePublishedField: 'date-published-field',
      fundingSourceSearchField: 'funding-source-search-field',
      fundingProjectField: 'funding-project-field',
      fundingIdField: 'funding-id-field',
      fundingSumField: 'funding-sum-field',
      fundingLinkButton: 'funding-link-button',
      fundingNfrProjectSearchField: 'funding-nfr-project-search-field',
      fundingRemoveButton: 'funding-remove-button',
      nfrProjectSearchField: 'nfr-project-search-field',
      projectForm: {
        addParticipantButton: 'add-participant-button',
        contributorAffiliationField: 'contributor-affiliation-field',
        contributorsSearchField: 'project-contributors-search-field',
        coordinatingInstitutionField: 'coordinating-institution-field',
        endDateField: 'project-end-date-field',
        keywordsField: 'keywords-field',
        panel1Button: 'panel-1-button',
        panel2Button: 'panel-2-button',
        popularScienceSummaryEnglishField: 'popular-science-summary-english-field',
        popularScienceSummaryNorwegianField: 'popular-science-summary-norwegian-field',
        projectCategoryField: 'project-category-field',
        relatedProjectsSearchField: 'related-projects-search-form',
        removeContributorButton: 'remove-contributor-button',
        roleField: 'project-participant-role-field',
        scentificSummaryEnglishField: 'scientific-summary-english-field',
        scentificSummaryNorwegianField: 'scientific-summary-norwegian-field',
        saveProjectButton: 'save-project-button',
        startCreateProjectButton: 'start-create-project-button',
        startDateField: 'project-start-date-field',
        startWithEmptyProjectButton: 'start-with-empty-project-button',
        titleField: 'project-title-field',
      },
      projectSearchField: 'project-search-field',
      projectSearchOption: (id) => `project-option-${id}`,
      abstractField: 'registration-abstract-field',
      alternativeAbstractField: 'registration-alternative-abstract-field',
      alternativeTitleField: 'registration-alternative-title-field',
      descriptionField: 'registration-description-field',
      languageField: 'registration-language-field',
      tagField: 'registration-tag-field',
      titleField: 'registration-title-field',
      vocabularyMenuItem: (vocabulary) => `vocabulary-menu-item-${vocabulary}`,
      vocabularyRow: (vocabulary) => `vocabulary-row-${vocabulary}`,
    },
    files: {
      addFilesOrLinksButton: 'add-files-or-links-button',
      administrativeAgreement: 'administrative-agreement-checkbox',
      embargoDateField: 'embargo-date-field',
      fileRow: 'uploaded-file-row',
      noFilesOrLinksButton: 'no-files-or-links-button',
      noFilesOrLinksWarning: 'no-files-or-links-warning',
      licenseHelpButton: 'license-help-button',
      licenseItem: 'license-item',
      licenseModal: 'license-modal',
      linkToResourceField: 'link-to-resource-field',
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
    formActions: {
      nextTabButton: 'next-tab-button',
      openSupportButton: 'open-support-button',
      previousTabButton: 'previous-tab-button',
      saveRegistrationButton: 'save-registration-button',
      supportModal: 'support-modal',
    },
    resourceType: {
      addAudioVideoButton: 'add-audio-video-button',
      addCompetitionButton: 'add-competition-button',
      addExhibitionBasicButton: 'add-exhibition-basic-button',
      addExhibitionCatalogButton: 'add-exhibition-catalog-button',
      addExhibitionOtherPresentationButton: 'add-exhibition-other-presentation-button',
      addExhibitionButton: 'add-exhibition-button',
      addMentionInPublicationButton: 'add-mention-in-publication-button',
      addAwardButton: 'add-award-button',
      addVenueButton: 'add-venue-button',
      addTvWebStreamingButton: 'add-tv-web-streaming-button',
      addFestivalCinemaButton: 'add-festival-cinema-button',
      addOtherButton: 'add-other-button',
      addPerformanceButton: 'add-performance-button',
      addPublicationMentionButton: 'add-publication-mention-button',
      addBookButton: 'add-book-button',
      addConcertShowButton: 'add-concert-show-button',
      addAudioVideoPublicationButton: 'add-audio-video-publication-button',
      addScoreManuscriptButton: 'add-score-manuscript-button',
      addWebPublicationButton: 'add-web-publication-button',
      articleNumberField: 'article-number-field',
      artisticTypeField: 'artistic-type-field',
      artisticDescriptionField: 'artistic-description-field',
      artisticOutputDuration: 'artistic-output-duration',
      artisticOutputSaveButton: 'artistic-output-save-button',
      artisticSubtype: 'artistic-subtype',
      artisticSubtypeDescription: 'artistic-subtype-description',
      audioVideoAddTrack: 'audio-video-add-track',
      audioVideoPublisher: 'audio-video-publisher',
      audioVideoCatalogueNumber: 'audio-video-catalogue-number',
      audioVideoContentTitle: 'audio-video-content-title',
      audioVideoContentComposer: 'audio-video-content-composer',
      audioVideoContentRemove: 'audio-video-content-remove',
      awardName: 'artistic-award-name',
      awardOrganizer: 'artistic-award-organizer',
      awardOther: 'artistic-award-other',
      awardRanking: 'artistic-award-ranking',
      broadcastPublisher: 'artistic-broadcast-publisher',
      closeResourceTypeSelectorButton: 'close-resource-type-selector-button',
      competitionDescription: 'artistic-competition-description',
      competitionName: 'artistic-competition-name',
      compliesWithField: 'complies-with-field',
      concertAddWork: 'concert-add-work',
      concertSeriesCheckbox: 'concert-series-checkbox',
      concertSeriesDescriptionField: 'concert-series-description-field',
      concertPlace: 'concert-place',
      concertProgramTitle: 'concert-program-title',
      concertProgramComposer: 'concert-program-composer',
      concertProgramIsPremiere: 'concert-program-is-premiere',
      concertProgramRemove: 'concert-program-remove',
      confirmDatasetTypeDialog: 'research-data-confirm-dialog',
      corrigendumForField: 'corrigendum-for-field',
      eventCountryField: 'event-country-field',
      exhibitionBasicNameField: 'exhibition-basic-name-field',
      exhibitionCatalogSearchField: 'exhibition-catalog-search-field',
      exhibitionName: 'artistic-exhibition-name',
      exhibitionOrganizer: 'artistic-exhibition-organizer',
      exhibitionOther: 'artistic-exhibition-other',
      exhibitionOtherPresentationTypeField: 'exhibitionOtherPresentationTypeField',
      externalLinkField: 'external-link-field',
      externalLinkAddButton: 'external-link-add-button',
      externalLink: 'external-link',
      geographicDescriptionField: 'geographic-description-field',
      dateFromField: 'date-from-field',
      dateToField: 'date-to-field',
      eventOrganizerField: 'event-organizer-field',
      eventTitleField: 'event-title-field',
      isbnField: 'isbn-field',
      issueField: 'issue-field',
      journalChip: 'journal-chip',
      journalField: 'journal-search-field',
      linkField: 'link-field',
      mediaMedium: 'media-medium',
      mediaFormat: 'media-format',
      mediaChannel: 'media-channel',
      mediaSeries: 'media-series',
      mediaIssue: 'media-issue',
      nviFailed: 'not-nvi-applicable',
      nviSuccess: 'nvi-applicable',
      otherReleasePublisher: 'artistic-other-release-publisher',
      otherPerfomanceAddWork: 'music-other-performance-add-work',
      otherPerformanceType: 'music-other-performance-type',
      otherPerformanceWorkTitle: 'music-other-work-title',
      otherPerformanceWorkComposer: 'music-other-work-composer',
      otherPerformanceWorkRemove: 'music-other-work-remove',
      outputDescriptionField: 'description-field',
      outputInstantDateField: 'output-instant-date-field',
      outputIssueField: 'output-issue-field',
      outputJournalBookMediumField: 'output-journal-book-medium-field',
      outputTypeField: 'output-type-field',
      pagesField: 'pages-field',
      pagesFromField: 'pages-from-field',
      pagesToField: 'pages-to-field',
      partOfField: 'part-of-field',
      placeField: 'place-field',
      publisherChip: 'publisher-chip',
      publisherField: 'publisher-search-field',
      publisherNameField: 'publisher-name-field',
      relatedRegistrationField: 'related-registration-field',
      relatedRegistrationLink: (value) => `related-registration-link-${value}`,
      removePublisherButton: 'remove-publisher-button',
      removeRelationButton: (value) => (value ? `remove-relation-button-${value}` : 'remove-relation-button'),
      resourceTypeChip: (type) => `resource-type-chip-${type}`,
      resourceTypeSearchField: 'resource-type-search-field',
      scientificSubjectField: 'scientific-subject-field',
      scoreEnsemble: 'score-ensemble',
      scoreMovements: 'score-movements',
      scorePublisher: 'score-publisher',
      scoreIsmn: 'score-ismn',
      scoreIsrc: 'score-isrc',
      seriesChip: 'series-chip',
      seriesField: 'series-search-field',
      seriesNumber: 'series-number-field',
      subtypeDescriptionField: 'subtype-description-field',
      subtypeField: 'subtype-field',
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
  myPage: {
    createProjectButton: 'create-project-button',
    messagesAccordion: 'messages-accordion',
    myProfileLink: 'my-profile-link',
    myProfile: {
      cristinIdField: 'cristin-id-field',
      editPreferredNameButton: 'edit-preferred-name-button',
      fullNameField: 'full-name-field',
      noActiveEmploymentsText: 'no-active-employments-text',
      preferredFirstNameField: 'preferred-first-name-field',
      preferredLastNameField: 'preferred-last-name-field',
      saveProfileChangesButton: 'save-profile-changes-button',
      showFullNinButton: 'show-full-nin-button',
      telephoneField: 'telephone-field',
    },
    myProfileAccordion: 'my-profile-accordion',
    myProjectRegistrationsLink: 'my-project-registrations-link',
    myProjectsLink: 'my-projects-link',
    myRegistrationsLink: 'my-registrations-link',
    myResultsLink: "my-publications'link",
    newRegistrationLink: 'new-registration-link',
    projectRegistrationsAccordion: 'project-registrations-accordion',
    registrationsAccordion: 'registrations-accordion',
    researchProfileAccordion: 'research-profile-accordion',
    researchProfileLink: 'research-profile-link',
  },
  tasksPage: {
    userDialogAccordion: 'user-dialog-accordion',
    searchMode: {
      allUserDialogsButton: 'all-user-dialogs-button',
      myUserDialogsButton: 'my-user-dialogs-button',
      newUserDialogsButton: 'new-user-dialogs-button',
    },
    statusSearch: {
      closedCheckbox: 'new-status-checkbox',
      completedCheckbox: 'new-status-checkbox',
      newCheckbox: 'new-status-checkbox',
      pendingCheckbox: 'pending-status-checkbox',
    },
    typeSearch: {
      doiButton: 'doi-button',
      publishingButton: 'publishing-request-button',
      supportButton: 'support-button',
    },
  },
};
