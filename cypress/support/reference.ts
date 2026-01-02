import { CategoryTypes } from "./constants";
import { ReferenceType, RegistrationPartTypes } from "./create_registration";

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
        }
    }
    return reference;
}

const BookReference = (category: CategoryTypes): ReferenceType => {
    const reference: ReferenceType = {
        type: RegistrationPartTypes.REFERENCE,
        publicationContext: {
            type: 'Book',
            series: {
                type: 'UnconfirmedSeries',
                id: 'https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/5280A6B7-4504-4208-A38B-BECBDAC66A7E/2025'
            },
            publisher: {
                type: 'Publisher',
                id: 'https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/DC752087-7122-4D3A-9E4F-382AA2F39D2C/2025',
                valid: true
            },
            isbnList: [
                "9783161484100"
            ],
        },
        publicationInstance: {
            type: category,
            pages: {
                type: "MonographPages",
                pages: '150',
                illustrated: false
            },
        }
    }
    return reference;
}

export const ReferenceConstants = {
    [CategoryTypes.ACADEMIC_ARTICLE]: ArticleReference(CategoryTypes.ACADEMIC_ARTICLE),
    [CategoryTypes.JOURNAL_REVIEW]: ArticleReference(CategoryTypes.JOURNAL_REVIEW),
    [CategoryTypes.ACADEMIC_REWIEW_ARTICLE]: ArticleReference(CategoryTypes.ACADEMIC_REWIEW_ARTICLE),
    [CategoryTypes.COMMENTARY]: ArticleReference(CategoryTypes.COMMENTARY),
    [CategoryTypes.JOURNAL_LEADER]: ArticleReference(CategoryTypes.JOURNAL_LEADER),
    [CategoryTypes.JOURNAL_ISSUE]: ArticleReference(CategoryTypes.JOURNAL_ISSUE),
    [CategoryTypes.CONFERENCE_ABSTRACT]: ArticleReference(CategoryTypes.CONFERENCE_ABSTRACT),
    [CategoryTypes.CASE_REPORT]: ArticleReference(CategoryTypes.CASE_REPORT),
    [CategoryTypes.STUDY_PROTOCOL]: ArticleReference(CategoryTypes.STUDY_PROTOCOL),
    [CategoryTypes.PROFESSIONAL_ARTICLE]: ArticleReference(CategoryTypes.PROFESSIONAL_ARTICLE),
    [CategoryTypes.POPULAR_SCIENCE_ARTICLE]: ArticleReference(CategoryTypes.POPULAR_SCIENCE_ARTICLE),
    [CategoryTypes.ACADEMIC_MONOGRAPH]: BookReference(CategoryTypes.ACADEMIC_MONOGRAPH),
    [CategoryTypes.ACADEMIC_COMMENTARY]: BookReference(CategoryTypes.ACADEMIC_COMMENTARY),
    [CategoryTypes.NON_FICTION_BOOK]: BookReference(CategoryTypes.NON_FICTION_BOOK),
    [CategoryTypes.POPULAR_SCIENCE_BOOK]: BookReference(CategoryTypes.POPULAR_SCIENCE_BOOK),
    [CategoryTypes.TEXT_BOOK]: BookReference(CategoryTypes.TEXT_BOOK),
    [CategoryTypes.ENCYCLOPEDIA]: BookReference(CategoryTypes.ENCYCLOPEDIA),
    [CategoryTypes.EXHIBITION_CATALOGUE]: BookReference(CategoryTypes.EXHIBITION_CATALOGUE),
    [CategoryTypes.BOOK_ANTHOLOGY]: BookReference(CategoryTypes.BOOK_ANTHOLOGY),
};


