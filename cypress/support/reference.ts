import { CategoryTypes } from './constants';
import { NviLevels, ReferenceType, RegistrationPartTypes } from './create_registration';

export const ArticleReference = (category: CategoryTypes, nviLevel: NviLevels): ReferenceType => {
  const reference: ReferenceType = {
    type: RegistrationPartTypes.REFERENCE,
    publicationContext: {
      type: 'Journal',
      id: NVI_CHANNELS[category][nviLevel],
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

export const BookReference = (category: CategoryTypes, nviLevel: NviLevels, seriesLevel?: NviLevels): ReferenceType => {
  const reference: ReferenceType = {
    type: RegistrationPartTypes.REFERENCE,
    publicationContext: {
      type: 'Book',
      series: {
        type: seriesLevel ? 'Series' : 'UnconfirmedSeries',
        id: seriesLevel ? SERIES[seriesLevel] : '',
      },
      publisher: {
        type: 'Publisher',
        id: NVI_CHANNELS[category][nviLevel],
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

  if (seriesLevel) {
    reference.publicationContext.series.id = SERIES[seriesLevel];
  }
  return reference;
};

export const ReportReference = (category: CategoryTypes): ReferenceType => {
  const reference: ReferenceType = {
    type: RegistrationPartTypes.REFERENCE,
    publicationContext: {
      type: 'Report',
      series: {
        type: 'UnconfirmedSeries',
        id: SINTEF_SERIES,
      },
      publisher: {
        type: 'Publisher',
        id: SINTEF_AKADEMSIK_FORLAG_URI,
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
}

export const ChapterReference = (category: CategoryTypes): ReferenceType => {
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

export const CorrigendumReference = (corrigendumFor: string, nviLevel: NviLevels): ReferenceType => {
  const reference: ReferenceType = {
    type: RegistrationPartTypes.REFERENCE,
    publicationContext: {
      type: 'Journal',
      id: NVI_CHANNELS[CategoryTypes.ACADEMIC_ARTICLE][nviLevel]
    },
    publicationInstance: {
      type: CategoryTypes.JOURNAL_CORRIGENDUM,
      corrigendumFor: corrigendumFor,
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

const currentYear = new Date().getFullYear();

const UNDER_DUSKEN_URI = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/0FBEE806-981D-4E4C-A7AC-5511153D198C/${currentYear}`;
const ACM_JOURNAL_OF_DATA_AND_INFORMATION_QUALITY_URI = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/7ECF363E-84A8-4328-B8D0-38A9BF93E356/${currentYear}`;
const ACM_CHEMICAL_BIOLOGY_URI = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/1864A370-80CA-4BE5-9CB7-40B0CCEF23CA/${currentYear}`;
const SINTEF_AKADEMSIK_FORLAG_URI = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/D4AA649E-CB53-4CA0-89EC-F68FB02CFB96/${currentYear}`;
const SPRINGER_NATURE_URI = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/DC752087-7122-4D3A-9E4F-382AA2F39D2C/${currentYear}`;
const HARVARD_UNIVERSITY_PRESS_URI = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/publisher/2C26EB7E-B93B-45B8-A5CE-AACBE2B86448/${currentYear}`;
const SINTEF_SERIES = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/01F85FBB-B084-43E5-9C67-E8F3D629CE73/${currentYear}`;
const GEOSCIENTIFIC_INSTRUMENTATION = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/DC26EADA-5DA7-42C7-8C70-4250E9C93C64/${currentYear}`;
const GEOSCIENTIFIC_MODEL_DEVELOPMENT = `https://api.e2e.nva.aws.unit.no/publication-channels-v2/serial-publication/8C757DB5-8205-4A28-A6D5-BABD2DF32180/${currentYear}|`;

const SERIES = {
  [NviLevels.LEVEL_0]: SINTEF_SERIES,
  [NviLevels.LEVEL_1]: GEOSCIENTIFIC_INSTRUMENTATION,
  [NviLevels.LEVEL_2]: GEOSCIENTIFIC_MODEL_DEVELOPMENT,
};

const NVI_CHANNELS = {
  [CategoryTypes.ACADEMIC_ARTICLE]: {
    [NviLevels.LEVEL_0]: UNDER_DUSKEN_URI,
    [NviLevels.LEVEL_1]: ACM_JOURNAL_OF_DATA_AND_INFORMATION_QUALITY_URI,
    [NviLevels.LEVEL_2]: ACM_CHEMICAL_BIOLOGY_URI,
  },
  [CategoryTypes.ACADEMIC_REVIEW_ARTICLE]: {
    [NviLevels.LEVEL_0]: UNDER_DUSKEN_URI,
    [NviLevels.LEVEL_1]: ACM_JOURNAL_OF_DATA_AND_INFORMATION_QUALITY_URI,
    [NviLevels.LEVEL_2]: ACM_CHEMICAL_BIOLOGY_URI,
  },
  [CategoryTypes.JOURNAL_REVIEW]: {
    [NviLevels.LEVEL_0]: UNDER_DUSKEN_URI,
    [NviLevels.LEVEL_1]: ACM_JOURNAL_OF_DATA_AND_INFORMATION_QUALITY_URI,
    [NviLevels.LEVEL_2]: ACM_CHEMICAL_BIOLOGY_URI,
  },
  [CategoryTypes.ACADEMIC_MONOGRAPH]: {
    [NviLevels.LEVEL_0]: SINTEF_AKADEMSIK_FORLAG_URI,
    [NviLevels.LEVEL_1]: SPRINGER_NATURE_URI,
    [NviLevels.LEVEL_2]: HARVARD_UNIVERSITY_PRESS_URI,
  },
  [CategoryTypes.BOOK_ANTHOLOGY]: {
    [NviLevels.LEVEL_0]: SINTEF_AKADEMSIK_FORLAG_URI,
    [NviLevels.LEVEL_1]: SPRINGER_NATURE_URI,
    [NviLevels.LEVEL_2]: HARVARD_UNIVERSITY_PRESS_URI,
  },
  [CategoryTypes.ACADEMIC_COMMENTARY]: {
    [NviLevels.LEVEL_0]: SINTEF_AKADEMSIK_FORLAG_URI,
    [NviLevels.LEVEL_1]: SPRINGER_NATURE_URI,
    [NviLevels.LEVEL_2]: HARVARD_UNIVERSITY_PRESS_URI,
  },
};

