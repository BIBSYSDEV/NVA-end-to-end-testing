import { dataTestId } from './dataTestIds';

export const mainButtons = {
  'New Registration': dataTestId.header.newRegistrationLink,
  'My Registrations': dataTestId.header.myPageLink,
  'My page': dataTestId.header.myPageLink,
  'Worklist': dataTestId.header.tasksLink,
  'Basic data': dataTestId.header.basicDataLink,
};

export const userMenu = {
  'Log out': dataTestId.header.logOutLink,
};

export const myRegistrationsTabs = {
  'Draft': 'unpublished-button',
  'Published': 'published-button',
};

export const creatorMenu = {
  ...userMenu,
};

export const curatorMenu = {
  ...userMenu,
};

export const instAdminMenu = {
  ...userMenu,
  'Users': dataTestId.header.adminUsersLink,
  'My institution': dataTestId.header.adminInstitutionLink,
};

export const adminMenu = {
  ...userMenu,
  'Institutions': dataTestId.header.adminInstitutionsLink,
};

export const profilePageFields = {
  'Real name': 'full-name-field',
  'Feide ID': 'cristin-id-field',
  'Email': 'user-id',
  'ORCID': 'orcid-line',
  'Roles': 'user-role-creator',
  'Organizations': 'institution-presentation',
  'Language': 'language-button',
};

export const userAdministrationPagination = {
  'Administrator': 'Institution-admin',
  'Curator': 'Curator',
  'Editor': 'Editor',
};

export const userAdministrationSections = {
  'Administrators': dataTestId.myInstitutionUsersPage.usersAdministrators,
  'Curators': dataTestId.myInstitutionUsersPage.usersCurators,
  'Editors': dataTestId.myInstitutionUsersPage.usersEditors,
};

export const userAdministrationButtons = {
  'Add Administrator': 'button-add-institution-admin',
  'Add Curator': 'button-add-curator',
  'Add Editor': 'button-add-editor',
};

export const userAdministrationAddRoleButtons = {
  'Add Administrator': 'button-add-role-Institution-admin',
  'Add Curator': 'button-add-role-Curator',
  'Add Editor': 'button-add-role-Editor',
};

export const userAdministrationRemoveRoleButtons = {
  'Administrator': 'button-remove-role-Institution-admin',
  'Curator': 'button-remove-role-Curator',
  'Editor': 'button-remove-role-Editor',
};

export const myInstitutionFields = {
  'Name in organization registry': dataTestId.organization.searchField,
  'Display name': dataTestId.basicData.institutionAdmin.displayNameField,
  'Short display name': dataTestId.basicData.institutionAdmin.shortNameField,
  'Archive name': dataTestId.basicData.institutionAdmin.archiveNameField,
};

export const myinstitutionfieldsTestvalue = {
  'Display name': 'Testinstitusjon',
  'Short display name': 'Testinst',
  'Archive name': 'Testarchive',
};

export const institutionFields = {
  ...myInstitutionFields,
  'Feide Organization ID': dataTestId.basicData.institutionAdmin.feideField,
  'ROR ID': dataTestId.basicData.institutionAdmin.rorField,
};
export const myRegistrations = {
  'Title': 'registration-title',
  'Status': 'registration-status',
  'Created': 'registration-created',
};

export const myRegistrationsButtons = {
  'Show': 'open-registration',
  'Edit': 'edit-registration',
};

export const resourceTypes = {
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

export const journalSubtypes = {
  'Academic article': 'resource-type-chip-AcademicArticle',
  'Academic literature review': 'resource-type-chip-AcademicLiteratureReview',
  'Case report': 'resource-type-chip-CaseReport',
  'Study protocol': 'resource-type-chip-StudyProtocol',
  'Professional article': 'resource-type-chip-ProfessionalArticle',
  'Popular science article': 'resource-type-chip-PopularScienceArticle',
  'Commentary': 'resource-type-chip-JournalLetter',
  'Book review': 'resource-type-chip-JournalReview',
  'Editorial': 'resource-type-chip-JournalLeader',
  'Corrigendum': 'resource-type-chip-JournalCorrigendum',
  'Journal issue': 'resource-type-chip-JournalIssue',
  'Conference abstract': 'resource-type-chip-ConferenceAbstract',
};

export const journalFields = {
  'Article number': 'article-number-field',
  'Content': dataTestId.registrationWizard.resourceType.contentField,
  'DOI': 'doi-field',
  'Issue': 'issue-field',
  'Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Pages from': dataTestId.registrationWizard.resourceType.pagesFromField,
  'Pages to': dataTestId.registrationWizard.resourceType.pagesToField,
  'Peer reviewed': 'peer_review-true',
  'Peer reviewed and presents new research': 'peer-review-field',
  'Search field for Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Search-box for Journal': dataTestId.registrationWizard.resourceType.journalField,
  'Search field for Journal article': dataTestId.registrationWizard.resourceType.corrigendumForField,
  'Search box for published books': '',
  'Volume': 'volume-field',
};

export const bookSubtypes = {
  'Academic Monograph': 'resource-type-chip-AcademicMonograph',
  'Anthology': 'resource-type-chip-BookAnthology',
  'Non-fiction Monograph': 'resource-type-chip-NonFictionMonograph',
  'Popular Science Monograph': 'resource-type-chip-PopularScienceMonograph',
  'Textbook': 'resource-type-chip-Textbook',
  'Encyclopedia': 'resource-type-chip-Encyclopedia',
  'Exhibition catalog': 'resource-type-chip-ExhibitionCatalog',
};

export const bookFields = {
  'Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'NPI discipline': dataTestId.registrationWizard.resourceType.scientificSubjectField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
  'Total number of pages': dataTestId.registrationWizard.resourceType.pagesField,
  'Series': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
};

export const reportSubtypes = {
  'Research report': 'resource-type-chip-ReportResearch',
  'Policy report': 'resource-type-chip-ReportPolicy',
  'Working paper': 'resource-type-chip-ReportWorkingPaper',
  'Abstract collection': 'resource-type-chip-ReportBookOfAbstract',
  'Other type of report': 'resource-type-chip-ReportBasic',
};

export const reportFields = {
  'Search box for Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
  'Total number of pages': dataTestId.registrationWizard.resourceType.pagesField,
  'Search box for Series': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
};

export const studentThesisSubtypes = {
  'Bachelor thesis': 'resource-type-chip-DegreeBachelor',
  'Master thesis': 'resource-type-chip-DegreeMaster',
  'Doctoral thesis': 'resource-type-chip-DegreePhd',
  'Licentiate thesis': 'resource-type-chip-DegreeLicentiate',
  'Other student thesis': 'resource-type-chip-OtherStudentWork',
};

export const studentThesisFields = {
  'Search box for Publisher': dataTestId.registrationWizard.resourceType.publisherField,
  'DOI': 'doi-field',
  'Search box for Series': dataTestId.registrationWizard.resourceType.seriesField,
  'Series number': dataTestId.registrationWizard.resourceType.seriesNumber,
  'Total pages': dataTestId.registrationWizard.resourceType.pagesField,
  'ISBN': dataTestId.registrationWizard.resourceType.isbnField,
};

export const chapterSubtypes = {
  'Chapter of Anthology': 'resource-type-chip-AcademicChapter',
  'Chapter in Anthology': 'resource-type-chip-AcademicChapter',
  'Chapter in Report': 'resource-type-chip-ChapterInReport',
  'Conference abstract': 'resource-type-chip-ChapterConferenceAbstract',
};

export const chapterFields = {
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

export const chapterContainerField = {
  'Search box for published Anthologies': dataTestId.registrationWizard.resourceType.partOfField,
  'Search box for published Reports': dataTestId.registrationWizard.resourceType.partOfField,
  'Search box for published Abstract Collections': dataTestId.registrationWizard.resourceType.partOfField,
};

export const artisticSubtypes = {
  'Artistic result - Design': 'resource-type-chip-ArtisticDesign',
  'Artistic result - Architecture': 'resource-type-chip-Architecture',
  'Artistic result - Film': 'resource-type-chip-MovingPicture',
  'Artistic result - Music': 'resource-type-chip-MusicPerformance',
  'Artistic result - Performing art': 'resource-type-chip-PerformingArts',
  'Artistic result - Writing art': 'resource-type-chip-WritingArt',
  'Artistic result - Visual art': 'resource-type-chip-VisualArt',
};

export const architectureTypes = {
  'Construction': 'Building',
  'Plan proposal': 'PlanningProposal',
  'Landscape architecture': 'LandscapeArchitecture',
  'Interior': 'Interior',
  'Other': 'ArchitectureOther',
};

export const designTypes = {
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
  'Other': 'ArtisticDesignOther',
};

export const exhibitionTypes = {
  'Competition': 'add-competition-button',
  'Publication or Mention': 'add-mention-in-publication-button',
  'Prize or Award': 'add-award-button',
  'Exhibition': 'add-exhibition-button',
};

export const filmTypes = {
  'Film': 'Film',
  'Short film': 'ShortFilm',
  'Serial film': 'SerialFilmProduction',
  'Interactive film': 'InteractiveFilm',
  'AR/VR film': 'AugmentedVirtualRealityFilm',
  'Other': 'MovingPictureOther',
};

export const filmAnnouncements = {
  'Broadcast': 'add-tv-web-streaming-button',
  'Cinematic release': 'add-festival-cinema-button',
  'Other release': 'add-other-button',
};

export const musicAwards = {
  'Concert': dataTestId.registrationWizard.resourceType.addConcertShowButton,
  'Audio/visual publication': dataTestId.registrationWizard.resourceType.addAudioVideoPublicationButton,
  'Music score': dataTestId.registrationWizard.resourceType.addScoreManuscriptButton,
  'Other performance': dataTestId.registrationWizard.resourceType.addOtherButton,
};

export const musicConcertFields = {
  'Place': dataTestId.registrationWizard.resourceType.placeField,
  'Date': dataTestId.registrationWizard.resourceType.outputInstantDateField,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
  'Works': dataTestId.registrationWizard.resourceType.concertAddWork,
};

export const musicConcertProgramFields = {
  'Title': dataTestId.registrationWizard.resourceType.concertProgramTitle,
  'Composer': dataTestId.registrationWizard.resourceType.concertProgramComposer,
  'Premiere': dataTestId.registrationWizard.resourceType.concertProgramIsPremiere,
  'Works': dataTestId.registrationWizard.resourceType.concertAddWork,
};

export const musicAudioVideoFields = {
  'Format': dataTestId.registrationWizard.resourceType.subtypeField,
  'Publisher': dataTestId.registrationWizard.resourceType.audioVideoPublisher,
  'Catalogue number': dataTestId.registrationWizard.resourceType.audioVideoCatalogueNumber,
  'ISRC': dataTestId.registrationWizard.resourceType.scoreIsrc,
  'Track list': dataTestId.registrationWizard.resourceType.audioVideoAddTrack,
};

export const musicAudioVideoTrackTypes = {
  'CD': 'CompactDisc',
  'DVD': 'DVD',
  'Streaming': 'Streaming',
  'Download': 'DigitalFile',
  'LP/EP': 'Vinyl',
  'Other': 'MusicMediaOther',
};

export const musicAudioVideoTrackFields = {
  'Title': dataTestId.registrationWizard.resourceType.audioVideoContentTitle,
  'Composer': dataTestId.registrationWizard.resourceType.audioVideoContentComposer,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
};

export const musicScoreFields = {
  'Ensemble': dataTestId.registrationWizard.resourceType.scoreEnsemble,
  'Movements': dataTestId.registrationWizard.resourceType.scoreMovements,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
  'Publisher': dataTestId.registrationWizard.resourceType.scorePublisher,
  'ISMN': dataTestId.registrationWizard.resourceType.scoreIsmn,
  'ISRC': dataTestId.registrationWizard.resourceType.scoreIsrc,
};

export const musicOtherFields = {
  'Type': dataTestId.registrationWizard.resourceType.otherPerformanceType,
  'Place': dataTestId.registrationWizard.resourceType.placeField,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
  'Other performance': dataTestId.registrationWizard.resourceType.otherPerfomanceAddWork,
};

export const musicOtherWorksField = {
  'Title': dataTestId.registrationWizard.resourceType.otherPerformanceWorkTitle,
  'Composer': dataTestId.registrationWizard.resourceType.otherPerformanceWorkComposer,
};

export const musicConcertDetails = {
  // 'Part of a series/tour': dataTestId.registrationWizard.resourceType.concertProgramTour,
  'Place': dataTestId.registrationWizard.resourceType.placeField,
  'Date': dataTestId.registrationWizard.resourceType.concertDate,
  'Extent': dataTestId.registrationWizard.resourceType.artisticOutputDuration,
  'Works': dataTestId.registrationWizard.resourceType.concertAddWork,
};

export const competitionFields = {
  'Name': dataTestId.registrationWizard.resourceType.competitionName,
  'Description': dataTestId.registrationWizard.resourceType.competitionDescription,
  'Date': dataTestId.registrationWizard.resourceType.outputInstantDateField,
};

export const publicationMentionFields = {
  'Name': dataTestId.registrationWizard.resourceType.outputJournalBookMediumField,
  'Issue': dataTestId.registrationWizard.resourceType.outputIssueField,
  'Date': dataTestId.registrationWizard.resourceType.outputInstantDateField,
  'Description': dataTestId.registrationWizard.resourceType.outputDescriptionField,
};

export const awardFields = {
  'Name': dataTestId.registrationWizard.resourceType.awardName,
  'Organizer': dataTestId.registrationWizard.resourceType.awardOrganizer,
  'Year': dataTestId.registrationWizard.resourceType.outputInstantDateField,
  'Ranking': dataTestId.registrationWizard.resourceType.awardRanking,
  'Description': dataTestId.registrationWizard.resourceType.awardOther,
};

export const exhibitionFields = {
  'Name': dataTestId.registrationWizard.resourceType.exhibitionName,
  'Place': dataTestId.registrationWizard.resourceType.placeField,
  'Organizer': dataTestId.registrationWizard.resourceType.exhibitionOrganizer,
  'Date from': dataTestId.registrationWizard.resourceType.dateFromField,
  'Date to': dataTestId.registrationWizard.resourceType.dateToField,
  'Description': dataTestId.registrationWizard.resourceType.exhibitionOther,
};

export const designFields = {
  'More information': dataTestId.registrationWizard.resourceType.artisticDescriptionField,
  'Exhibition place': dataTestId.registrationWizard.resourceType.venueNameField,
  'Date from': dataTestId.registrationWizard.resourceType.dateFromField,
  'Date to': dataTestId.registrationWizard.resourceType.dateToField,
};

export const performingArtsFields = {
  'More information': dataTestId.registrationWizard.resourceType.artisticDescriptionField,
  'Name': dataTestId.registrationWizard.resourceType.venueNameField,
  'Date start': dataTestId.registrationWizard.resourceType.dateFromField,
  'Date end': dataTestId.registrationWizard.resourceType.dateToField,
};

export const performingArtsWorkTypes = {
  'Theater/show': 'TheatricalProduction',
  'TV/film/radio': 'Broadcast',
  'Other': 'PerformingArtsOther',
};

export const literaryArtsAnnouncements = {
  'Monograph': dataTestId.registrationWizard.resourceType.addBookButton,
  'Web Publication': dataTestId.registrationWizard.resourceType.addWebPublicationButton,
  'Performance': dataTestId.registrationWizard.resourceType.addPerformanceButton,
  'Audio/Visual Publication': dataTestId.registrationWizard.resourceType.addAudioVideoButton,
};

export const literaryArtsBookFields = {
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

export const literaryArtsPerformanceFields = {
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

export const literaryArtsWebFields = {
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

export const literaryArtsAudioVisualFields = {
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

export const presentationSubtypes = {
  'Conference lecture': dataTestId.registrationWizard.resourceType.resourceTypeChip('ConferenceLecture'),
  'Conference poster': dataTestId.registrationWizard.resourceType.resourceTypeChip('ConferencePoster'),
  'Lecture': dataTestId.registrationWizard.resourceType.resourceTypeChip('Lecture'),
  'Other presentation': dataTestId.registrationWizard.resourceType.resourceTypeChip('OtherPresentation'),
};

export const persentationFields = {
  'Title of event': dataTestId.registrationWizard.resourceType.eventTitleField,
  'Place of event': dataTestId.registrationWizard.resourceType.placeField,
  'Date from': dataTestId.registrationWizard.resourceType.dateFromField,
  'Date to': dataTestId.registrationWizard.resourceType.dateToField,
  'Organizer': dataTestId.registrationWizard.resourceType.eventOrganizerField,
  'Country': dataTestId.registrationWizard.resourceType.eventCountryField,
};

export const mediaSubtypes = {
  'Feature Article': 'resource-type-chip-MediaFeatureArticle',
  'Reader Opinion': 'resource-type-chip-MediaReaderOpinion',
  'Interview': 'resource-type-chip-MediaInterview',
  'Blog post': 'resource-type-chip-MediaBlogPost',
  'Podcast': 'resource-type-chip-MediaPodcast',
  'Participation in Radio or TV': 'resource-type-chip-MediaParticipationInRadioOrTv',
};

export const mediaMediumTypes = {
  'Newspaper or Journal': 'Journal',
  'Internet': 'Internet',
  'Radio': 'Radio',
  'TV': 'TV',
  'Other': 'MediaTypeOther',
};

export const OTHER_SUBTYPES = {};

export const resourceSubTypes = {
  ...bookSubtypes,
  ...chapterSubtypes,
  ...journalSubtypes,
  ...reportSubtypes,
  ...studentThesisSubtypes,
};

export const OTHER_FIELDS = {};

export const descriptionFields = {
  'Title': 'registration-title-field',
  'Abstract': 'registration-abstract-field',
  'Description': 'registration-description-field',
  'Date published': dataTestId.registrationWizard.description.datePublishedField,
  'Keywords': 'registration-tag-field',
  'Vocabularies': dataTestId.registrationWizard.description.addVocabularyButton,
  'Primary language for content': 'registration-language-field',
  'Project association': 'project-search-field',
};

export const resourceTypeFields = {
  'Type': 'publication-context-type',
};

export const contributorCreateFields = {
  'First name': 'create-contributor-first-name',
  'Last name': 'create-contributor-last-name',
};

export const fileFields = {
  'Version': dataTestId.registrationWizard.files.version,
  'Terms of use': dataTestId.registrationWizard.files.selectLicenseField,
};

export const landingPageFields = {
  'Title': dataTestId.registrationLandingPage.registrationSubtype,
  'Abstract': dataTestId.registrationLandingPage.abstractAccordion,
  'NPI': dataTestId.registrationLandingPage.npi,
  'Keywords': dataTestId.registrationLandingPage.keywords,
  'Publication date': dataTestId.registrationLandingPage.publicationDate,
  'Primary language': dataTestId.registrationLandingPage.primaryLanguage,
  'Projects': dataTestId.registrationLandingPage.projectsAccordion,
  'Registration subtype': dataTestId.registrationLandingPage.registrationSubtype,
  'Fields corresponding to subtype': dataTestId.registrationLandingPage.subtypeFields,
  'Contributors': dataTestId.registrationLandingPage.contributors,
  'Files': dataTestId.registrationLandingPage.filesAccordion,
  'DOI link': dataTestId.registrationLandingPage.doiOriginalLink,
  'License': dataTestId.registrationLandingPage.license,
};

export const landingPageButtons = {
  'Request a DOI': 'button-toggle-request-doi',
  'Reserve a DOI': 'button-toggle-reserve-doi',
};

export const landingPageShareButtons = {
  Email: dataTestId.registrationLandingPage.emailButton,
  Facebook: dataTestId.registrationLandingPage.facebookButton,
  LinkedIn: dataTestId.registrationLandingPage.linkedInButton,
  Twitter: dataTestId.registrationLandingPage.twitterButton,
};

export const contributorTypes = {
  'Author': 'Creator',
  'Editor': 'Editor',
  'Contact person': 'ContactPerson',
  'Rights holder': 'RightsHolder',
  'Other': 'RoleOther',
  'Supervisor': 'Supervisor',
  'Designer': 'Designer',
  'Curator/Organizer': 'CuratorOrganizer',
  'Consultant': 'Consultant',
  'Architect': 'Architect',
  'Landscape architect': 'LandscapeArchitect',
  'Interior architect': 'InteriorArchitect',
  'Architectural planner': 'ArchitecturalPlanner',
  'Dancer': 'Dancer',
  'Actor': 'Actor',
  'Choreographer': 'Choreographer',
  'Director': 'Director',
  'Scenographer': 'Scenographer',
  'Costume designer': 'CostumeDesigner',
  'Producer': 'Producer',
  'Artistic director': 'ArtisticDirector',
  'Dramatist': 'Dramatist',
  'Librettist': 'Librettist',
  'Dramaturge': 'Dramaturge',
  'Sound designer': 'SoundDesigner',
  'Light designer': 'LightDesigner',
  'Screenwriter': 'Screenwriter',
  'Photographer': 'Photographer',
  'Production designer': 'ProductionDesigner',
  'Video editor': 'VideoEditor',
  'Sound design': 'SoundDesigner',
  'VFX Supervisor': 'VfxSupervisor',
  'Soloist': 'Soloist',
  'Conductor': 'Conductor',
  'Musician': 'Musician',
  'Composer': 'Composer',
  'Organizer': 'Organizer',
  'Writer': 'Writer',
  'Translator': 'TranslatorAdapter',
  'Artist': 'Artist',
  'Curator': 'Curator',
  'Journalist': 'Journalist',
  'Interviewee': 'InterviewSubject',
  'Program host': 'ProgrammeLeader',
  'Participant': 'ProgrammeParticipant',
  'Data collector': 'DataCollector',
  'Data curator': 'DataCurator',
  'Data manager': 'DataManager',
  'Distributor': 'Distributor',
  'Related person': 'RelatedPerson',
  'Researcher': 'Researcher',
}