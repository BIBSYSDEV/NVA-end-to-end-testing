export const dataTestId = {
  aggregations: {
    categoryFacets: 'category-facets',
    collaboardationTypeFacets: 'collaboration-type-facets',
    contributorFacets: 'contributor-facets',
    coordinatingFacets: 'coordinating-facets',
    facetItem: (value) => `facet-item-${value}`,
    filesFacets: 'files-facets',
    fundingFacets: 'funding-facets',
    fundingSourceFacets: 'funding-source-facets',
    healthProjectFacets: 'health-project-facets',
    journalFacets: 'journal-facets',
    participantFacets: 'participant-facets',
    participantOrgFacets: 'participant-org-facets',
    publisherFacets: 'publisher-facets',
    responsibleFacets: 'responsible-facets',
    scientificIndexFacet: 'scientific-index-facet',
    sectorFacets: 'sector-facets',
    seriesFacets: 'series-facets',
    typeFacets: 'type-facets',
    institutionFacets: 'institution-facets',
  },
  basicData: {
    addCustomerLink: 'add-customer-link',
    addEmployeeLink: 'add-employee-link',
    addNviPeriodLink: 'add-nvi-period-link',
    adminInstitutionsLink: 'admin-institutions-link',
    centralImportLink: 'central-import-link',
    centralImport: {
      checkboxAuthor: 'duplicate-search-author-checkbox',
      checkboxDoi: 'duplicate-search-doi-checkbox',
      checkboxIssn: 'duplicate-search-issn-checkbox',
      checkboxTitle: 'duplicate-search-title-checkbox',
      checkboxYear: 'duplicate-search-year-checkbox',
      filter: {
        importedRadio: 'imported-radio',
        notImportedRadio: 'not-imported-radio',
        notApplicableRadio: 'not-applicable-radio',
        publicationYearSelect: 'publication-year-select',
      },
      importCandidateButton: 'import-candidate-button',
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
      editInstitutionButton: (id) => `edit-institution-button-${id}`,
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
      inactiveCheckbox: 'inactive-checkbox',
      nameField: 'institution-name-field',
      nviInstitutionCheckbox: 'nvi-institution-checkbox',
      rboInstitutionCheckbox: 'rbo-institution-checkbox',
      rorField: 'ror-field',
      saveButton: 'save-button',
      sectorChip: (sector) => `sector-chip-${sector}`,
      sectorField: 'sector-field',
    },
    nationalIdentityNumberField: 'national-identity-number-field',
    nviPeriod: {
      nviPeriodDialog: 'nvi-period-dialog',
      nviPeriodYear: 'nvi-period-year',
      nviPeriodStartDate: 'nvi-period-start-date',
      nviPeriodEndDate: 'nvi-period-end-date',
    },
    nviPeriodsLink: 'nvi-periods-link',
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
    personRegisterSearchBar: 'person-register-search-bar',
  },
  common: {
    cancel: 'cancel',
    exportButton: 'export-button',
    pagination: 'pagination',
    save: 'save',
    showMoreButton: 'show-more-button',
    previousButton: 'previous-button',
    nextButton: 'next-button',
    doubleNextButton: 'double-next-button',
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
    addCuratorButton: (id) => `add-curator-button-${id}`,
    categoriesLinkButton: 'categories-link-button',
    curatorsOverviewLinkButton: 'curators-overview-link-button',
    curatorsSettingsLinkButton: 'curators-settings-link-button',
    curatorsSearchForPersonField: 'curators-search-for-person-field',
    editUserButton: 'edit-user-button',
    institutionsNameLinkButton: 'institutions-name-link-button',
    institutionSupportInputField: 'institution-support-input-field',
    doiLinkButton: 'doi-link-button',
    organizationAccordion: (id) => `organization-accordion-${id}`,
    organizationOverviewLinkButton: 'organization-overview-link-button',
    organizationOverviewSearchField: 'organization-overview-search-field',
    overviewAccordion: 'overview-accordion',
    publishStrategyLinkButton: 'publishing-strategy-link-button',
    publishStrategyOverviewLinkButton: 'publishing-strategy-overview-link-button',
    resultsPortfolioAccordion: 'results-portfolio-accordion',
    resultsPortfolioDeletedCheckbox: 'results-portfolio-deleted-checkbox',
    resultsPortfolioPublishedCheckbox: 'results-portfolio-published-checkbox',
    resultsPortfolioUnpublishedCheckbox: 'results-portfolio-unpublished-checkbox',
    settingsAccordion: 'settings-accordion',
    vocabularyLinkButton: 'vocabulary-link-button',
    vocabularyOverviewLinkButton: 'vocabulary-overview-link-button',
    hrcsActivityButtonGroup: 'hrcs-activity-button-group',
    hrcsCategoryButtonGroup: 'hrcs-category-button-group',
    rrs: 'rrs',
    rrsLink: 'rrs-link',
    rrsOverride: 'rrs-override',
    rrsSaveButton: 'rrs-save-button',
    supportLinkButton: 'institution-support-link-button',
    vocabularyDisabled: 'vocabulary-disabled',
    vocabularyAllowed: 'vocabulary-allowed',
    vocabularyDefault: 'vocabulary-default',
    workflowRegistratorPublishesAll: 'workflow-registrator-publishes-all',
    workflowRegistratorPublishesMetadata: 'workflow-registrator-publishes-metadata',
    workflowRegistratorRequiresApproval: 'workflow-registrator-requires-approval',
  },
  footer: {
    aboutLink: 'about-link',
    aboutSikt: 'about-sikt',
    availabilityStatement: 'availability-statement',
    becomeCustomer: 'become-customer',
    helpPage: 'help-page',
    newsLink: 'news-link',
    privacyLink: 'privacy-link',
    systemStatusLink: 'system-status-link',
    technicalSupportLink: 'technical-support-link',
  },
  header: {
    basicDataLink: 'basic-data-link',
    editorLink: 'editor-link',
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
    advancedSearch: {
      activateFilterButton: 'activate-filter-button',
      addFilterButton: 'add-filter-button',
      advancedFieldSelect: 'advanced-field-select',
      advancedValueField: 'advanced-value-field',
      courseField: 'course-field',
      downloadResultsButton: 'download-results-button',
      fileStatusSelect: 'file-status-select',
      fundingSourceField: 'funding-source-field',
      journalField: 'journal-field',
      publicationLanguageField: 'publication-language-field',
      publisherField: 'publisher-field',
      removeFacetButton: 'remove-facet-button',
      removeFilterButton: 'remove-filter-button',
      scientificIndexStatusCheckbox: 'scientific-index-status-checkbox',
      scientificValueLevels: {
        levelOneCheckbox: 'level-one-checkbox',
        levelTwoCheckbox: 'level-two-checkbox',
        levelZeroCheckbox: 'level-zero-checkbox',
      },
      searchButton: 'search-button',
      selectCategoryChip: 'select-category-chip',
      seriesField: 'series-field',
      vocabularyField: 'vocabulary-field',
    },
    advancedSearchAccordion: 'advanced-search-accordion',
    filterAccordion: 'filter-accordion',
    orderBySelect: 'order-by-select',
    personSearchButton: 'person-search-button',
    projectSearchButton: 'project-search-button',
    projectStatusFilter: 'project-status-filter',
    publicationDateFilter: 'publication-date-filter',
    reportsClinicalTreatmentStudiesButton: 'reports-clinical-treatment-studies-button',
    reportsInternationalWorkButton: 'reports-international-work-button',
    reportsNviButton: 'reports-nvi-button',
    reportsOverviewButton: 'reports-overview-button',
    reportsAccordion: 'reports-accordion',
    resultSearchButton: 'result-search-button',
    readMoreButton: 'button-read-more',
    searchButton: 'search-button',
    searchField: 'search-field',
    searchResultItem: 'result-list-item',
  },
  projectForm: {
    startDateField: 'project-start-date-field',
    endDateField: 'project-end-date-field',
    keywordsField: 'keywords-field',
    popularScienceSummaryEnglishField: 'popular-science-summary-english-field',
    popularScienceSummaryNorwegianField: 'popular-science-summary-norwegian-field',
    scientificSummaryEnglishField: 'scientific-summary-english-field',
    scientificSummaryNorwegianField: 'scientific-summary-norwegian-field',
    titleField: 'project-title-field',
    addUnidentifiedContributorButton: 'add-unidentified-contributor-button',
    addUnidentifiedProjectManagerButton: 'add-unidentified-project-manager-button',
    selectContributorButton: 'select-contributor-button',
    addProjectManagerButton: 'add-project-manager-button',
    addAffiliationButton: 'button-add-affiliation',
    addParticipantButton: 'add-participant-button',
    removeContributorButton: 'remove-contributor-button',
    cancelNewProjectButton: 'cancel-new-project-button',
    cancelAddParticipantButton: 'cancel-add-participant-button',
  },
  newProjectPage: {
    titleInput: 'project-title-input',
    startEmptyProjectButton: 'start-empty-project-button',
    createEmptyProjectAccordion: 'create-empty-project-accordion',
    createNFRProjectAccordion: 'create-nfr-project-accordion',
    nrfProjectSearchInput: 'nrf-project-search-input',
    startNfrProjectButton: 'start-nfr-project-button',
  },
  projectLandingPage: {
    editProjectButton: 'edit-project-button',
    generalInfoBox: 'general-info',
    participantsAccordion: 'participants-accordion',
    relatedProjectsAccordion: 'related-projects-accordion',
    resultsAccordion: 'results-accordion',
    scientificSummaryAccordion: 'scientific-summary-accordion',
  },
  projectWizard: {
    stepper: {
      projectDescriptionStepButton: 'nav-tabpanel-project-description',
      projectDetailsStepButton: 'nav-tabpanel-project-details',
      projectErrorStep: 'project-error-tab',
      projectContributorsStepButton: 'nav-tabpanel-project-contributors',
      projectConnectionsStepButton: 'nav-tabpanel-project-connections',
    },
    formActions: {
      previousTabButton: 'previous-tab-button',
      cancelEditProjectButton: 'cancel-edit-project-button',
      saveProjectButton: 'save-project-button',
      nextTabButton: 'next-tab-button',
    },
    selectContributorType: 'select-contributor-type',
    descriptionPanel: {
      titleField: 'project-title-field',
      scientificSummaryNorwegianField: 'scientific-summary-norwegian-field',
      scientificSummaryEnglishField: 'scientific-summary-english-field',
      popularScienceSummaryNorwegianField: 'popular-science-summary-norwegian-field',
      popularScienceSummaryEnglishField: 'popular-science-summary-english-field',
      keywordsField: 'keywords-field',
      startDateField: 'project-start-date-field',
      endDateField: 'project-end-date-field',
    },
    detailsPanel: {
      projectCategoryField: 'project-category-field',
      fundingIdField: 'funding-id-field',
      fundingLinkButton: 'funding-link-button',
      fundingNfrProjectSearchField: 'funding-nfr-project-search-field',
      fundingRemoveButton: 'funding-remove-button',
      addFundingButton: 'add-funding-button',
    },
    contributorsPanel: {
      verifyContributorButton: (name) => `button-set-unverified-contributor-${name}`,
      editAffiliationButton: 'edit-affiliation-button',
      deleteAffiliationButton: 'delete-affiliation-button',
    },
    connectionsPanel: {},
  },
  registrationLandingPage: {
    abstractAccordion: 'abstract-accordion',
    addLinkOrFilesButton: 'add-link-or-files-button',
    authorLink: (id) => `presentation-author-link-${id}`,
    contributors: 'public-registration-contributors',
    dmpAccordion: 'dmp-accordion',
    doiLink: 'doi-link',
    doiMessageField: 'request-doi-message',
    doiOriginalLink: 'doi-original-link',
    duplicateRegistrationLink: 'duplicate-registration-link',
    editButton: 'button-edit-registration',
    externalLinksAccordion: 'external-links-accordion',
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
    noLinkOrFilesWarning: 'no-link-or-files-warning-typhography',
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
    subjectAndClassificationAccordion: 'subject-and-classification-accordion',
    tasksPanel: {
      assigneeButton: 'assignee-button',
      assigneeIndicator: 'assignee-indicator',
      assigneeSearchField: 'assignee-search-field',
      backToWizard: 'back-to-wizard-button',
      cancelRejectionButton: 'cancel-rejection-button',
      createDoiButton: 'button-create-doi',
      deleteMessageButton: 'delete-message-button',
      doiRequestAccordion: 'doi-request-accordion',
      duplicateRegistrationLink: 'duplicate-registration-link',
      messageOptionsButton: 'message-options-button',
      messageSender: 'message-author',
      messageText: 'message-text',
      messageTimestamp: 'message-timestamp',
      morePublishingActionsButton: 'more-publishing-actions-button',
      panelRoot: 'tasks-panel',
      publishButton: 'button-publish-registration',
      publishingRequestAcceptButton: 'publishing-request-accept-button',
      publishingRequestAccordion: 'publishing-request-accordion',
      publishingRequestEditButton: 'publishing-request-edit-button',
      publishingRequestRejectButton: 'publishing-request-reject-button',
      publishingRequestRejectionMessageTextField: 'publishing-request-rejection-message-textfield',
      refreshDoiRequestButton: 'refresh-doi-button',
      rejectionDialogConfirmButton: 'rejection-dialog-confirm-button',
      refreshPublishingRequestButton: 'refresh-publishing-request-button',
      republishRegistrationButton: 'republish-registration-button',
      reserveDoiButton: 'button-toggle-reserve-doi',
      requestDoiButton: 'button-toggle-request-doi',
      requestDoiModal: 'request-doi-modal',
      sendDoiButton: 'button-send-doi-request',
      showMoreDoiActionsButton: 'show-more-doi-actions-button',
      supportAccordion: 'support-accordion',
      tabPanelLog: 'tab-panel-log',
      tabPanelTasks: 'tab-panel-tasks',
      terminateRegistrationButton: 'terminate-registration-button',
    },
    duplicateRegistrationModal: {
      duplicationModal: 'duplication-modal',
      duplicateRegistrationLink: 'duplicate-registration-modal-link',
    },
    title: 'public-registration-title',
  },
  registrationWizard: {
    contributors: {
      addAffiliationButton: 'button-add-affiliation',
      addContributorButton: 'add-contributor',
      addSelectedAffiliationButton: 'add-selected-affiliation-button',
      addSelfButton: 'add-self-button',
      addUnverifiedContributorButton: 'add-unverified-contributor-button',
      contributorSearchField: 'contributor-search-field',
      correspondingCheckbox: 'author-corresponding-checkbox',
      editAffiliationButton: 'edit-affiliation-button',
      verifyAffiliationButton: 'button-set-unverified-affiliation',
      verifyContributorButton: (name) => `button-set-unverified-contributor-${name}`,
      removeAffiliationButton: 'button-remove-affiliation',
      removeContributorButton: (name) => `button-remove-contributor-${name}`,
      searchField: 'search-field',
      selectAffiliationForContributor: 'select-affiliation-for-contributor',
      selectContributorType: 'select-contributor-type',
      selectPersonForContributor: 'select-person-for-contributor',
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
      createProjectModal: 'create-project-modal',
      datePublishedField: 'date-published-field',
      fundingModal: 'funding-modal',
      fundingSourceSearchField: 'funding-source-search-field',
      fundingProjectField: 'funding-project-field',
      fundingIdField: 'funding-id-field',
      fundingSumField: 'funding-sum-field',
      fundingLinkButton: 'funding-link-button',
      fundingNfrProjectSearchField: 'funding-nfr-project-search-field',
      fundingRemoveButton: 'funding-remove-button',
      nfrProjectLink: (id) => `nfr-project-link-${id}`,
      nfrProjectSearchField: 'nfr-project-search-field',
      projectForm: {
        addProjectManagerButton: 'add-project-manager-button',
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
      projectLink: (id) => `project-link-${id}`,
      projectModal: 'project-modal',
      projectSearchField: 'project-search-field',
      projectSearchOption: (id) => `project-option-${id}`,
      abstractField: 'registration-abstract-field',
      alternativeAbstractField: 'registration-alternative-abstract-field',
      alternativeTitleField: 'registration-alternative-title-field',
      descriptionField: 'registration-description-field',
      languageField: 'registration-language-field',
      removeProjectButton: 'remove-project-button',
      tagField: 'registration-tag-field',
      titleField: 'registration-title-field',
      vocabularyMenuItem: (vocabulary) => `vocabulary-menu-item-${vocabulary}`,
      vocabularyRow: (vocabulary) => `vocabulary-row-${vocabulary}`,
    },
    files: {
      addFilesOrLinksButton: 'add-files-or-links-button',
      deleteFile: 'delete-file-button',
      embargoDateField: 'embargo-date-field',
      expandFileRowButton: 'expand-file-row-button',
      fileRow: 'uploaded-file-row',
      legalNoteField: 'legal-note-field',
      licenseHelpButton: 'license-help-button',
      licenseItem: 'license-item',
      licenseItemShowOlderVersion: 'license-item-show-older-versions',
      licenseModal: 'license-modal',
      linkToResourceField: 'link-to-resource-field',
      removeFileButton: 'button-remove-file',
      selectLicenseField: 'uploaded-file-select-license',
      toPublishCheckbox: 'to-publish-checkbox',
      version: 'version-radios',
      versionHelpButton: 'version-help-button',
      versionModal: 'version-modal',
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
      addRelatedButton: 'add-related-button',
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
      courseCodeField: 'course-code-field',
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
      resourceTypeNviHighlightChipButton: 'resource-nvi-highlighted-chip-button',
      revisionField: 'revision-field',
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
    addPromotedPublicationButton: 'edit-promoted-publication-button',
    messagesAccordion: 'messages-accordion',
    myMessages: {
      ticketStatusField: 'ticket-status-field',
      ticketFilterFromDatePicker: 'ticket-filter-from-date-picker',
      ticketFilterToDatePicker: 'ticket-filter-to-date-picker',
    },
    myProfileLink: 'my-profile-link',
    myProfile: {
      cristinIdField: 'cristin-id-field',
      deleteProfilePictureButton: 'delete-profile-picture-button',
      editPreferredNameButton: 'edit-preferred-name-button',
      emailField: 'email-field',
      fullNameField: 'full-name-field',
      noActiveEmploymentsText: 'no-active-employments-text',
      preferredFirstNameField: 'preferred-first-name-field',
      preferredLastNameField: 'preferred-last-name-field',
      saveProfileChangesButton: 'save-profile-changes-button',
      showFullNinButton: 'show-full-nin-button',
      telephoneField: 'telephone-field',
      updateProfilePictureButton: 'update-profile-picture-button',
      uploadProfilePictureButton: 'update-profile-picture-button',
      removeProfilePictureDialog: 'confirm-remove-profile-picture-dialog',
      webPageField: 'web-page-field',
    },
    myFieldAndBackgroundLink: 'my-field-and-background-link',
    myProfileAccordion: 'my-profile-accordion',
    myProjectRegistrationsLink: 'my-project-registrations-link',
    myProjectsLink: 'my-projects-link',
    myRegistrationsLink: 'my-registrations-link',
    myRegistrationsPublishedCheckbox: 'my-registrations-published-checkbox',
    myRegistrationsUnpublishedCheckbox: 'my-registrations-unpublished-checkbox',
    myResultsLink: 'my-publications-link',
    newRegistrationLink: 'new-registration-link',
    projectRegistrationsAccordion: 'project-registrations-accordion',
    registrationsAccordion: 'registrations-accordion',
    researchProfileAccordion: 'research-profile-accordion',
    researchProfileLink: 'research-profile-link',
    userRolesAndHelp: {
      institutionHelpPage: 'institution-help-page',
      applicationHelpPage: 'application-help-page',
    },
    userRolesAndHelpLink: 'user-roles-and-help-link',
  },
  tasksPage: {
    areaOfResponsibilitySelector: 'area-of-responsibility-selector',
    correctionList: {
      anthologyWithApplicableChapterButton: 'anthology-with-applicable-chapter-button',
      anthologyWithoutChapterButton: 'anthology-without-chapter-button',
      booksWithLessThan50PagesButton: 'books-with-less-than-50-pages-button',
      applicableCategoriesWithNonApplicableChannelButton: 'applicable-categories-with-non-applicable-channel-button',
      correctionListAccordion: 'correction-list-accordion',
      correctionListRadioButton: 'correction-list-radio-button',
      nonApplicableCategoriesWithApplicableChannelButton: 'non-applicable-categories-with-applicable-channel-button',
    },
    curatorSelector: 'curator-selector',
    dialoguesWithoutCuratorButton: 'dialogues-without-curator-button',
    messageField: 'message-field',
    messageSendButton: 'send-note-button',
    nvi: {
      approveButton: 'approve-button',
      candidatesList: 'nvi-candidates-list',
      deleteNoteButton: 'delete-note-button',
      nextCandidateButton: 'next-candidate-button',
      noteOptionsButton: 'note-options-button',
      previousCandidateButton: 'previous-nvi-candidate-button',
      rejectButton: 'reject-button',
      rejectionModalCancelButton: 'rejection-modal-cancel-button',
      rejectionModalRejectButton: 'rejection-modal-reject-button',
      rejectionModalTextField: 'rejection-modal-text-field',
      statusFilter: {
        approvedRadio: 'approved-radio',
        approvedCollaborationRadio: 'approved-collaboration-radio',
        assignedRadio: 'assigned-radio',
        assignedCollaborationRadio: 'assigned-collaboration-radio',
        disputeRadio: 'dispute-radio',
        pendingRadio: 'pending-radio',
        pendingCollaborationRadio: 'pending-collaboration-radio',
        rejectedRadio: 'rejected-radio',
        rejectedCollaborationRadio: 'rejected-collaboration-radio',
      },
      toggleStatusLink: 'toggle-status-button',
      yearSelect: 'year-select',
    },
    nviAccordion: 'nvi-accordion',
    resultRegistrationsAccordion: 'result-registrations-accordion',
    scope: {
      addOrganizationScopeButton: 'add-organization-scope-button',
      organizationSearchField: 'organization-search-field',
      removeOrganizationScopeButton: 'remove-organization-scope-button',
    },
    searchMode: {
      allTasksButton: 'all-tasks-button',
      myTasksButton: 'my-tasks-button',
    },
    statusSearch: {
      closedCheckbox: 'closed-status-checkbox',
      completedCheckbox: 'completed-status-checkbox',
      newCheckbox: 'new-status-checkbox',
      pendingCheckbox: 'pending-status-checkbox',
    },
    typeSearch: {
      doiButton: 'doi-button',
      publishingButton: 'publishing-request-button',
      supportButton: 'support-button',
    },
    unreadSearchCheckbox: 'unread-search-checkbox',
    userDialogAccordion: 'user-dialog-accordion',
  },
  unpublishActions: {
    openUnpublishModalButton: 'open-unpublish-modal-button',
    unpublishJustificationTextField: 'unpublish-registration-justification-textfield',
  },
};
