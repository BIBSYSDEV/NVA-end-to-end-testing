import { dataTestId } from './dataTestIds';

export const mainButtons: Record<string, string> = {
  'New Registration': dataTestId.header.newRegistrationLink,
  'My Registrations': dataTestId.header.myPageLink,
  'My page': dataTestId.header.myPageLink,
  'Worklist': dataTestId.header.tasksLink,
  'Basic data': dataTestId.header.basicDataLink,
};

export const userMenu: Record<string, string> = {
  'Log out': dataTestId.header.logOutLink,
};

export const myRegistrationsTabs: Record<string, string> = {
  'Draft': 'unpublished-button',
  'Published': 'published-button',
};

export const creatorMenu: Record<string, string> = {
  ...userMenu,
};

export const curatorMenu: Record<string, string> = {
  ...userMenu,
};

export const instAdminMenu: Record<string, string> = {
  ...userMenu,
  'Users': dataTestId.header.editorLink,
};

export const adminMenu: Record<string, string> = {
  ...userMenu,
  'Institutions': dataTestId.header.editorLink,
};

export const profilePageFields: Record<string, string> = {
  'Real name': 'user-name',
  'Feide ID': 'user-id',
  'Email': 'user-id',
  'ORCID': 'orcid-line',
  'Roles': 'user-role-creator',
  'Organizations': 'institution-presentation',
  'Language': 'language-button',
};

export const userAdministrationPagination: Record<string, string> = {
  'Administrator': 'Institution-admin',
  'Curator': 'Curator',
  'Editor': 'Editor',
};

export const userAdministrationSections: Record<string, string> = {
  'Administrators': dataTestId.myInstitutionUsersPage.usersAdministrators,
  'Curators': dataTestId.myInstitutionUsersPage.usersCurators,
  'Editors': dataTestId.myInstitutionUsersPage.usersEditors,
};

export const userAdministrationButtons: Record<string, string> = {
  'Add Administrator': 'button-add-institution-admin',
  'Add Curator': 'button-add-curator',
  'Add Editor': 'button-add-editor',
};

export const userAdministrationAddRoleButtons: Record<string, string> = {
  'Add Administrator': 'button-add-role-Institution-admin',
  'Add Curator': 'button-add-role-Curator',
  'Add Editor': 'button-add-role-Editor',
};

export const userAdministrationRemoveRoleButtons: Record<string, string> = {
  'Administrator': 'button-remove-role-Institution-admin',
  'Curator': 'button-remove-role-Curator',
  'Editor': 'button-remove-role-Editor',
};

export const myInstitutionFields: Record<string, string> = {
  'Name in organization registry': dataTestId.organization.searchField,
  'Display name': dataTestId.institutionAdmin.displayNameField,
  'Short display name': dataTestId.institutionAdmin.shortNameField,
  'Archive name': dataTestId.institutionAdmin.archiveNameField,
};

export const myinstitutionfieldsTestvalue: Record<string, string> = {
  'Display name': 'Testinstitusjon',
  'Short display name': 'Testinst',
  'Archive name': 'Testarchive',
};

export const institutionFields: Record<string, string> = {
  ...myInstitutionFields,
  'Feide Organization ID': dataTestId.institutionAdmin.feideField,
};
export const myRegistrations: Record<string, string> = {
  'Title': 'registration-title',
  'Status': 'registration-status',
  'Created': 'registration-created',
};

export const myRegistrationsButtons: Record<string, string> = {
  'Show': 'open-registration',
  'Edit': 'edit-registration',
};

export const resourceTypes: Record<string, string> = {
  'Contribution to journal': 'publication-context-type-Journal',
  'Journal': 'publication-context-type-Journal',
  'Book': 'publication-context-type-Book',
  'Report': 'publication-context-type-Report',
  'Student thesis': 'publication-context-type-Degree',
  'Degree': 'publication-context-type-Degree',
  'Chapter': 'publication-context-type-Chapter',
  'Part of book or report': 'publication-context-type-Chapter',
  'Part of book/report': 'publication-context-type-Chapter',
  'Presentation': 'publication-context-type-Event',
  'Artistic': 'publication-context-type-Artistic',
};

export const journalSubtypes: Record<string, string> = {
  'Journal article': 'resource-type-chip-JournalArticle',
  'Commentary': 'resource-type-chip-JournalLetter',
  'Book review': 'resource-type-chip-JournalReview',
  'Editorial': 'resource-type-chip-JournalLeader',
  'Corrigendum': 'resource-type-chip-JournalCorrigendum',
  'Journal issue': 'resource-type-chip-JournalIssue',
  'Conference abstract': 'resource-type-chip-ConferenceAbstract',
};

export const journalFields: Record<string, string> = {
  'Article number': 'article-number-field',
  'Content': dataTestId.registrationWizard.resourceType.contentField,
  'DOI': 'doi-field',
  'Issue': 'issue-field',
  'Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Pages from': dataTestId.registrationWizard.resourceType.pagesFromField,
  'Pages to': dataTestId.registrationWizard.resourceType.pagesToField,
  'Peer reviewed': 'peer_review-true',
  'Peer reviewed and presents new research': 'peer-review-field',
  'Search box for Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Search-box for Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Search box for "Journal article"': dataTestId.registrationWizard.resourceType.corrigendumForField,
  'Search box for published books': '',
  'Volume': 'volume-field',
};

export const journalContentTypes: Record<string, string> = {
  'Academic article': dataTestId.registrationWizard.resourceType.contentValue('academicarticle'),
  'Academic literature review': dataTestId.registrationWizard.resourceType.contentValue('academicliteraturereview'),
  'Case report': dataTestId.registrationWizard.resourceType.contentValue('casereport'),
  'Study protocol': dataTestId.registrationWizard.resourceType.contentValue('studyprotocol'),
  'Professional article': dataTestId.registrationWizard.resourceType.contentValue('professionalarticle'),
  'Popular science article': dataTestId.registrationWizard.resourceType.contentValue('popularsciencearticle'),
};

export const bookSubtypes: Record<string, string> = {
  'Monograph': 'resource-type-chip-BookMonograph',
  'Anthology': 'resource-type-chip-BookAnthology',
};

export const bookFields: Record<string, string> = {
  'Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
  'Total number of pages': dataTestId.registrationWizard.resourceType.pagesField,
  'NPI discipline': dataTestId.registrationWizard.resourceType.scientificSubjectField,
  'Series title': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
};

export const contentType: Record<string, string> = {
  'Academic Monograph': dataTestId.registrationWizard.resourceType.contentValue('academicmonograph'),
  'Non-fiction Monograph': dataTestId.registrationWizard.resourceType.contentValue('nonfictionmonograph'),
  'Popular Science Monograph': dataTestId.registrationWizard.resourceType.contentValue('popularsciencemonograph'),
  'Textbook': dataTestId.registrationWizard.resourceType.contentValue('textbook'),
  'Encyclopedia': dataTestId.registrationWizard.resourceType.contentValue('encyclopedia'),
  'Exhibition catalog': dataTestId.registrationWizard.resourceType.contentValue('exhibitioncatalog'),
};

export const reportSubtypes: Record<string, string> = {
  'Research report': 'resource-type-chip-ReportResearch',
  'Policy report': 'resource-type-chip-ReportPolicy',
  'Working paper': 'resource-type-chip-ReportWorkingPaper',
  'Abstract collection': 'resource-type-chip-ReportBookOfAbstract',
  'Other type of report': 'resource-type-chip-ReportBasic',
};

export const reportFields: Record<string, string> = {
  'Search box for Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
  'Total number of pages': dataTestId.registrationWizard.resourceType.pagesField,
  'Search box for Series': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
};

export const studentThesisSubtypes: Record<string, string> = {
  'Bachelor thesis': 'resource-type-chip-DegreeBachelor',
  'Master thesis': 'resource-type-chip-DegreeMaster',
  'Doctoral thesis': 'resource-type-chip-DegreePhd',
  'Licentiate thesis': 'resource-type-chip-DegreeLicentiate',
  'Other student thesis': 'resource-type-chip-OtherStudentWork',
};

export const studentThesisFields: Record<string, string> = {
  'Search box for Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'DOI': 'doi-field',
  'Search box for Series': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
  'Total pages': dataTestId.registrationWizard.resourceType.pagesField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
};

export const chapterSubtypes: Record<string, string> = {
  'Chapter of Anthology': 'resource-type-chip-ChapterArticle',
  'Chapter in Anthology': 'resource-type-chip-ChapterArticle',
  'Chapter in Report': 'resource-type-chip-ChapterInReport',
  'Conference abstract': 'resource-type-chip-ChapterConferenceAbstract',
};

export const chapterFields: Record<string, string> = {
  'DOI': 'doi-field',
  'Search box for published Anthologies': 'info-anthology',
  'Search box for published Reports': 'info-anthology',
  'Search box for published Abstract Collections': 'info-anthology',
  'Pages from': dataTestId.registrationWizard.resourceType.pagesFromField,
  'Pages to': dataTestId.registrationWizard.resourceType.pagesToField,
  'Peer reviewed and presents new research': 'peer-review-field',
  'Peer reviewed': 'peer-review-true',
  'NPI discipline': 'npi-search',
};

export const chapterContainerField: Record<string, string> = {
  'Search box for published Anthologies': dataTestId.registrationWizard.resourceType.partOfField,
  'Search box for published Reports': dataTestId.registrationWizard.resourceType.partOfField,
  'Search box for published Abstract Collections': dataTestId.registrationWizard.resourceType.partOfField,
};

export const chapterContentTypes: Record<string, string> = {
  'Academic Chapter': 'content-value-academicchapter',
  'Non-fiction Chapter': 'content-value-nonfictionchapter',
  'Popular Science Chapter': 'content-value-popularsciencechapter',
  'Textbook Chapter': 'content-value-textbookchapter',
  'Encyclopedia Chapter': 'content-value-encyclopediachapter',
  'Introduction': 'content-value-introduction',
  'Exhibition Catalog Chapter': 'content-value-exhibitioncatalogchapter',
};

export const artisticSubtypes: Record<string, string> = {
  'Artistic result - Design': 'resource-type-chip-ArtisticDesign',
  'Artistic result - Architecture': 'resource-type-chip-Architecture',
  'Artistic result - Film': 'resource-type-chip-MovingPicture',
  'Artistic result - Music': 'resource-type-chip-MusicPerformance',
  'Artistic result - Performing art': 'resource-type-chip-PerformingArts',
  'Artistic result - Writing art': 'resource-type-chip-WritingArt',
  'Artistic result - Visual art': 'resource-type-chip-VisualArt',
};

export const architectureTypes: Record<string, string> = {
  'Construction': 'Building',
  'Plan proposal': 'PlanningProposal',
  'Landscape architecture': 'LandscapeArchitecture',
  'Interior': 'Interior',
  'Other': 'Other',
};

export const designTypes: Record<string, string> = {
  'Product': 'ProductDesign',
  'Interior Architecture': 'InteriorDesign',
  'Clothing Design': 'ClothingDesign',
  'Lighting Design': 'LightDesign',
  'Exhibition': 'Exhibition',
  'Graphical Design': 'GraphicDesign',
  'Illustration': 'Illustration',
  'Interaction Design': 'InteractionDesign',
  'Web Design': 'WebDesign',
  'Service Design': 'ServiceDesign',
  'Other': 'Other',
};

export const exhibitionTypes: Record<string, string> = {
  'Competition': 'add-competition-button',
  'Publication or Mention': 'add-mention-in-publication-button',
  'Prize or Award': 'add-award-button',
  'Exhibition': 'add-exhibition-button',
};

export const filmTypes: Record<string, string> = {
  'Film': 'Film',
  'Short film': 'ShortFilm',
  'Serial film': 'SerialFilmProduction',
  'Interactive film': 'InteractiveFilm',
  'AR/VR film': 'AugmentedVirtualRealityFilm',
  'Other': 'Other',
};

export const filmAnnouncements: Record<string, string> = {
  'Broadcast': 'add-tv-web-streaming-button',
  'Cinematic release': 'add-festival-cinema-button',
  'Other release': 'add-other-button',
};

export const musicAwards: Record<string, string> = {
  'Concert': dataTestId.registrationWizard.resourceType.addConcertShowButton,
  'Audio/visual publication': dataTestId.registrationWizard.resourceType.addAudioVideoPublicationButton,
  'Music score': dataTestId.registrationWizard.resourceType.addScoreManuscriptButton,
  'Other performance': dataTestId.registrationWizard.resourceType.addOtherButton,
};

export const musicConcertFields: Record<string, string> = {
  'Place': dataTestId.registrationWizard.resourceType.concertPlace,
  'Date': dataTestId.registrationWizard.resourceType.artisticOutputDate,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
  'Works': dataTestId.registrationWizard.resourceType.concertAddWork,
};

export const musicConcertProgramFields: Record<string, string> = {
  'Title': dataTestId.registrationWizard.resourceType.concertProgramTitle,
  'Composer': dataTestId.registrationWizard.resourceType.concertProgramComposer,
  'Premiere': dataTestId.registrationWizard.resourceType.concertProgramIsPremiere,
  'Works': dataTestId.registrationWizard.resourceType.concertAddWork,
};

export const musicAudioVideoFields: Record<string, string> = {
  'Format': dataTestId.registrationWizard.resourceType.artisticSubtype,
  'Publisher': dataTestId.registrationWizard.resourceType.audioVideoPublisher,
  'Catalogue number': dataTestId.registrationWizard.resourceType.audioVideoCatalogueNumber,
  'Track list': dataTestId.registrationWizard.resourceType.audioVideoAddTrack,
};

export const musicAudioVideoTrackTypes: Record<string, string> = {
  'CD': 'CompactDisc',
  'DVD': 'DVD',
  'Streaming': 'Streaming',
  'Download': 'DigitalFile',
  'LP/EP': 'Vinyl',
  'Other': 'Other',
};

export const musicAudioVideoTrackFields: Record<string, string> = {
  'Title': dataTestId.registrationWizard.resourceType.audioVideoContentTitle,
  'Composer': dataTestId.registrationWizard.resourceType.audioVideoContentComposer,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
};

export const musicScoreFields: Record<string, string> = {
  'Ensemble': dataTestId.registrationWizard.resourceType.scoreEnsemble,
  'Movements': dataTestId.registrationWizard.resourceType.scoreMovements,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
  'Publisher': dataTestId.registrationWizard.resourceType.scorePublisher,
  'ISMN': dataTestId.registrationWizard.resourceType.scoreIsmn,
  'ISRC': dataTestId.registrationWizard.resourceType.scoreIsrc,
};

export const musicOtherFields: Record<string, string> = {
  'Type': dataTestId.registrationWizard.resourceType.otherPerformanceType,
  'Place': dataTestId.registrationWizard.resourceType.otherPerformancePlace,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
  'Other performance': dataTestId.registrationWizard.resourceType.otherPerfomanceAddWork,
};

export const musicOtherWorksField: Record<string, string> = {
  'Title': dataTestId.registrationWizard.resourceType.otherPerformanceWorkTitle,
  'Composer': dataTestId.registrationWizard.resourceType.otherPerformanceWorkComposer,
};

export const musicConcertDetails: Record<string, string> = {
  // 'Part of a series/tour': dataTestId.registrationWizard.resourceType.concertProgramTour,
  'Place': dataTestId.registrationWizard.resourceType.concertPlace,
  'Date': dataTestId.registrationWizard.resourceType.artisticOutputDate,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
  'Works': dataTestId.registrationWizard.resourceType.concertAddWork,
};

export const competitionFields: Record<string, string> = {
  'Name': dataTestId.registrationWizard.resourceType.competitionName,
  'Description': dataTestId.registrationWizard.resourceType.competitionDescription,
  'Date': dataTestId.registrationWizard.resourceType.artisticOutputDate,
};

export const publicationMentionFields: Record<string, string> = {
  'Name': dataTestId.registrationWizard.resourceType.publicationMentionTitle,
  'Issue': dataTestId.registrationWizard.resourceType.publicationMentionIssue,
  'Date': dataTestId.registrationWizard.resourceType.artisticOutputDate,
  'Description': dataTestId.registrationWizard.resourceType.publicationMentionOther,
};

export const awardFields: Record<string, string> = {
  'Name': dataTestId.registrationWizard.resourceType.awardName,
  'Organizer': dataTestId.registrationWizard.resourceType.awardOrganizer,
  'Year': dataTestId.registrationWizard.resourceType.artisticOutputDate,
  'Ranking': dataTestId.registrationWizard.resourceType.awardRanking,
  'Description': dataTestId.registrationWizard.resourceType.awardOther,
};

export const exhibitionFields: Record<string, string> = {
  'Name': dataTestId.registrationWizard.resourceType.exhibitionName,
  'Place': dataTestId.registrationWizard.resourceType.exhibitionPlace,
  'Organizer': dataTestId.registrationWizard.resourceType.exhibitionOrganizer,
  'Date from': dataTestId.registrationWizard.resourceType.dateFromField,
  'Date to': dataTestId.registrationWizard.resourceType.dateToField,
  'Description': dataTestId.registrationWizard.resourceType.exhibitionOther,
};

export const designFields: Record<string, string> = {
  'More information': dataTestId.registrationWizard.resourceType.artisticDescriptionField,
  'Exhibition place': dataTestId.registrationWizard.resourceType.venueNameField,
  'Date from': dataTestId.registrationWizard.resourceType.dateFromField,
  'Date to': dataTestId.registrationWizard.resourceType.dateToField,
};

export const performingArtsFields: Record<string, string> = {
  'More information': dataTestId.registrationWizard.resourceType.artisticDescriptionField,
  'Name': dataTestId.registrationWizard.resourceType.venueNameField,
  'Date start': dataTestId.registrationWizard.resourceType.dateFromField,
  'Date end': dataTestId.registrationWizard.resourceType.dateToField,
};

export const performingArtsWorkTypes: Record<string, string> = {
  'Theater/show': 'TheatricalProduction',
  'TV/film/radio': 'Broadcast',
  'Other': 'Other',
};

export const literaryArtsAnnouncements: Record<string, string> = {
  'Monograph': dataTestId.registrationWizard.resourceType.addBookButton,
  'Web Publication': dataTestId.registrationWizard.resourceType.addWebPublicationButton,
  'Performance': dataTestId.registrationWizard.resourceType.addPerformanceButton,
  'Audio/Visual Publication': dataTestId.registrationWizard.resourceType.addAudioVideoButton,
};

export const literaryArtsBookFields: Record<string, Record<string, string>> = {
  'Publisher': {
    'field': dataTestId.registrationWizard.resourceType.publisherNameField,
    'value': 'Test literary arts book publisher',
  },
  'Year': {
    'field': dataTestId.registrationWizard.resourceType.artisticOutputDate,
    'value': '2022',
  },
  'ISBN': {
    'field': dataTestId.registrationWizard.resourceType.isbnField,
    'value': '9780136091813',
  },
  'Total pages': {
    'field': dataTestId.registrationWizard.resourceType.pagesField,
    'value': '666',
  },
};

export const literaryArtsPerformanceFields: Record<string, Record<string, string>> = {
  'Type of Performance': {
    'field': dataTestId.registrationWizard.resourceType.artisticSubtype,
    'value': 'Reading',
  },
  'Date': {
    'field': dataTestId.registrationWizard.resourceType.artisticOutputDate,
    'value': '01-01-2022',
  },
  'Place': {
    'field': dataTestId.registrationWizard.resourceType.placeField,
    'value': 'Performance place',
  },
};

export const literaryArtsWebFields: Record<string, Record<string, string>> = {
  'Publisher': {
    'field': dataTestId.registrationWizard.resourceType.publisherNameField,
    'value': 'Test literary arts web publisher',
  },
  'Year': {
    'field': dataTestId.registrationWizard.resourceType.artisticOutputDate,
    'value': '2022',
  },
  'Link': {
    'field': dataTestId.registrationWizard.resourceType.linkField,
    'value': 'https://test.no',
  },
};

export const literaryArtsAudioVisualFields: Record<string, Record<string, string>> = {
  'Publisher': {
    'field': dataTestId.registrationWizard.resourceType.publisherNameField,
    'value': 'Test literary arts audio/visual publisher',
  },
  'Year': {
    'field': dataTestId.registrationWizard.resourceType.artisticOutputDate,
    'value': '2022',
  },
  'Type of audio/visual publication': {
    'field': dataTestId.registrationWizard.resourceType.linkField,
    'value': 'Audiobook',
  },
  'ISBN': {
    'field': dataTestId.registrationWizard.resourceType.linkField,
    'value': '9780136091813',
  },
  'Duration': {
    'field': dataTestId.registrationWizard.resourceType.linkField,
    'value': '666',
  },
};

export const presentationSubtypes: Record<string, string> = {
  'Conference lecture': dataTestId.registrationWizard.resourceType.resourceTypeChip('ConferenceLecture'),
  'Conference poster': dataTestId.registrationWizard.resourceType.resourceTypeChip('ConferencePoster'),
  'Lecture': dataTestId.registrationWizard.resourceType.resourceTypeChip('Lecture'),
  'Other presentation': dataTestId.registrationWizard.resourceType.resourceTypeChip('OtherPresentation'),
};

export const persentationFields: Record<string, string> = {
  'Title of event': dataTestId.registrationWizard.resourceType.eventTitleField,
  'Place of event': dataTestId.registrationWizard.resourceType.placeField,
  'Date from': dataTestId.registrationWizard.resourceType.dateFromField,
  'Date to': dataTestId.registrationWizard.resourceType.dateToField,
  'Organizer': dataTestId.registrationWizard.resourceType.eventOrganizerField,
  'Country': dataTestId.registrationWizard.resourceType.eventCountryField,
};

export const mediaSubtypes: Record<string, string> = {
  'Feature Article': 'resource-type-chip-MediaFeatureArticle',
  'Reader Opinion': 'resource-type-chip-MediaReaderOpinion',
  'Interview': 'resource-type-chip-MediaInterview',
  'Blog post': 'resource-type-chip-MediaBlogPost',
  'Podcast': 'resource-type-chip-MediaPodcast',
  'Participation in Radio or TV': 'resource-type-chip-MediaParticipationInRadioOrTv',
};

export const mediaMediumTypes: Record<string, string> = {
  'Newspaper or Journal': 'Journal',
  'Internet': 'Internet',
  'Radio': 'Radio',
  'TV': 'TV',
  'Other': 'Other',
};

export const OTHER_SUBTYPES: Record<string, string> = {};

export const resourceSubTypes: Record<string, string> = {
  ...bookSubtypes,
  ...chapterSubtypes,
  ...journalSubtypes,
  ...reportSubtypes,
  ...studentThesisSubtypes,
};

export const OTHER_FIELDS: Record<string, string> = {};

export const descriptionFields: Record<string, string> = {
  'Title': 'registration-title-field',
  'Abstract': 'registration-abstract-field',
  'Description': 'registration-description-field',
  'Date published': dataTestId.registrationWizard.description.datePublishedField,
  'Keywords': 'registration-tag-field',
  'Vocabularies': dataTestId.registrationWizard.description.addVocabularyButton,
  'Primary language for content': 'registration-language-field',
  'Project association': 'project-search-field',
};

export const resourceTypeFields: Record<string, string> = {
  'Type': 'publication-context-type',
};

export const contributorCreateFields: Record<string, string> = {
  'First name': 'create-contributor-first-name',
  'Last name': 'create-contributor-last-name',
};

export const fileFields: Record<string, string> = {
  'Version': dataTestId.registrationWizard.files.version,
  'Terms of use': dataTestId.registrationWizard.files.selectLicenseField,
};

export const landingPageFields: Record<string, string> = {
  'Title': dataTestId.registrationLandingPage.registrationSubtype,
  'Abstract': dataTestId.registrationLandingPage.abstractAccordion,
  'NPI': dataTestId.registrationLandingPage.npi,
  'Keywords': dataTestId.registrationLandingPage.keywords,
  'Publication date': dataTestId.registrationLandingPage.fileEmbargoDate,
  'Primary language': dataTestId.registrationLandingPage.primaryLanguage,
  'Projects': dataTestId.registrationLandingPage.projectsAccordion,
  'Registration subtype': dataTestId.registrationLandingPage.registrationSubtype,
  'Fields corresponding to subtype': dataTestId.registrationLandingPage.subtypeFields,
  'Contributors': dataTestId.registrationLandingPage.contributors,
  'Files': dataTestId.registrationLandingPage.filesAccordion,
  'DOI link': dataTestId.registrationLandingPage.doiOriginalLink,
  'License': dataTestId.registrationLandingPage.license,
};

export const landingPageButtons: Record<string, string> = {
  'Request a DOI': 'button-toggle-request-doi',
  'Reserve a DOI': 'button-toggle-reserve-doi',
};

export const landingPageShareButtons: Record<string, string> = {
  Email: dataTestId.registrationLandingPage.emailButton,
  Facebook: dataTestId.registrationLandingPage.facebookButton,
  LinkedIn: dataTestId.registrationLandingPage.linkedInButton,
  Twitter: dataTestId.registrationLandingPage.twitterButton,
};
