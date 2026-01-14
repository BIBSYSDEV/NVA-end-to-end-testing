import { CategoryTypes } from './constants';
import { ReferenceType, RegistrationPartTypes } from './create_registration';

const ArticleReference = (category: CategoryTypes): ReferenceType => {
  const reference: ReferenceType = {
    type: RegistrationPartTypes.REFERENCE,
    publicationContext: {
      type: 'Journal',
      id: 'https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/1864A370-80CA-4BE5-9CB7-40B0CCEF23CA/2025',
      volume: '15',
      issue: '3',
    },
    publicationInstance: {
      type: category,
      pages: {
        type: 'Range',
        begin: 10,
        end: 20,
        illustrated: false,
      },
      volume: '15',
      issue: '3',
    },
  };
  return reference;
};

const BookReference = (category: CategoryTypes): ReferenceType => {
  const reference: ReferenceType = {
    type: RegistrationPartTypes.REFERENCE,
    publicationContext: {
      type: 'Book',
      series: {
        type: 'UnconfirmedSeries',
        id: 'https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/5280A6B7-4504-4208-A38B-BECBDAC66A7E/2025',
      },
      publisher: {
        type: 'Publisher',
        id: 'https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/DC752087-7122-4D3A-9E4F-382AA2F39D2C/2025',
        valid: true,
      },
      isbnList: ['9783161484100'],
    },
    publicationInstance: {
      type: category,
      pages: {
        type: 'MonographPages',
        pages: '150',
        illustrated: false,
      },
    },
  };
  return reference;
};

const ChapterReference = (category: CategoryTypes): ReferenceType => {
  const reference: ReferenceType = {
    type: RegistrationPartTypes.REFERENCE,
    publicationContext: {
      type: 'Anthology',
      id: '',
    },
    publicationInstance: {
      type: category,
      pages: {
        type: 'Range',
        begin: 1,
        end: 20,
        illustrated: false,
      },
    },
  };
  return reference;
};

const CorrigendumReference = (category: CategoryTypes): ReferenceType => {
  const reference: ReferenceType = {
    type: RegistrationPartTypes.REFERENCE,
    publicationContext: {
      type: 'UnconfirmedJournal',
    },
    publicationInstance: {
      type: category,
      corrigendumFor: '',
      pages: {
        type: 'Range',
        begin: 1,
        end: 10,
        illustrated: false,
      },
    },
  };
  return reference;
};

export const ReferenceConstants = {
  [CategoryTypes.ACADEMIC_ARTICLE]: ArticleReference(CategoryTypes.ACADEMIC_ARTICLE),
  [CategoryTypes.JOURNAL_REVIEW]: ArticleReference(CategoryTypes.JOURNAL_REVIEW),
  [CategoryTypes.ACADEMIC_REVIEW_ARTICLE]: ArticleReference(CategoryTypes.ACADEMIC_REVIEW_ARTICLE),
  [CategoryTypes.COMMENTARY]: ArticleReference(CategoryTypes.COMMENTARY),
  [CategoryTypes.JOURNAL_LEADER]: ArticleReference(CategoryTypes.JOURNAL_LEADER),
  [CategoryTypes.JOURNAL_ISSUE]: ArticleReference(CategoryTypes.JOURNAL_ISSUE),
  [CategoryTypes.CONFERENCE_ABSTRACT]: ArticleReference(CategoryTypes.CONFERENCE_ABSTRACT),
  [CategoryTypes.CASE_REPORT]: ArticleReference(CategoryTypes.CASE_REPORT),
  [CategoryTypes.STUDY_PROTOCOL]: ArticleReference(CategoryTypes.STUDY_PROTOCOL),
  [CategoryTypes.PROFESSIONAL_ARTICLE]: ArticleReference(CategoryTypes.PROFESSIONAL_ARTICLE),
  [CategoryTypes.POPULAR_SCIENCE_ARTICLE]: ArticleReference(CategoryTypes.POPULAR_SCIENCE_ARTICLE),
  [CategoryTypes.JOURNAL_CORRIGENDUM]: CorrigendumReference(CategoryTypes.JOURNAL_CORRIGENDUM),
  [CategoryTypes.ACADEMIC_MONOGRAPH]: BookReference(CategoryTypes.ACADEMIC_MONOGRAPH),
  [CategoryTypes.ACADEMIC_COMMENTARY]: BookReference(CategoryTypes.ACADEMIC_COMMENTARY),
  [CategoryTypes.NON_FICTION_BOOK]: BookReference(CategoryTypes.NON_FICTION_BOOK),
  [CategoryTypes.POPULAR_SCIENCE_BOOK]: BookReference(CategoryTypes.POPULAR_SCIENCE_BOOK),
  [CategoryTypes.TEXT_BOOK]: BookReference(CategoryTypes.TEXT_BOOK),
  [CategoryTypes.ENCYCLOPEDIA]: BookReference(CategoryTypes.ENCYCLOPEDIA),
  [CategoryTypes.EXHIBITION_CATALOGUE]: BookReference(CategoryTypes.EXHIBITION_CATALOGUE),
  [CategoryTypes.BOOK_ANTHOLOGY]: BookReference(CategoryTypes.BOOK_ANTHOLOGY),
  [CategoryTypes.ACADEMIC_CHAPTER]: ChapterReference(CategoryTypes.ACADEMIC_CHAPTER),
  [CategoryTypes.CHAPTER_IN_REPORT]: ChapterReference(CategoryTypes.CHAPTER_IN_REPORT),
  [CategoryTypes.ENCYCLOPEDIA_CHAPTER]: ChapterReference(CategoryTypes.ENCYCLOPEDIA_CHAPTER),
  [CategoryTypes.NON_FICTION_CHAPTER]: ChapterReference(CategoryTypes.NON_FICTION_CHAPTER),
  [CategoryTypes.POPULAR_SCIENCE_CHAPTER]: ChapterReference(CategoryTypes.POPULAR_SCIENCE_CHAPTER),
  [CategoryTypes.TEXT_BOOK_CHAPTER]: ChapterReference(CategoryTypes.TEXT_BOOK_CHAPTER),
  [CategoryTypes.INTRODUCTION]: ChapterReference(CategoryTypes.INTRODUCTION),
  [CategoryTypes.EXHIBITION_CATALOGUE_CHAPTER]: ChapterReference(CategoryTypes.EXHIBITION_CATALOGUE_CHAPTER),
  [CategoryTypes.CHAPTER_CONFERENCE_ABSTRACT]: ChapterReference(CategoryTypes.CHAPTER_CONFERENCE_ABSTRACT),
};
