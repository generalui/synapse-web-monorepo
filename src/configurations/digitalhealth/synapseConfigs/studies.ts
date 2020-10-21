import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig, SynapseConfigArray } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { DetailsPageProps } from 'types/portal-util-types'
import { dataDetailPageProps } from './data'
import { toolsDetailPageProps } from './tools'
import { publicationDetailPageProps } from './publications'
import { studySql } from '../resources'

const unitDescription = 'Collections'
const rgbIndex = 9

export const studySchema: GenericCardSchema = {
  type: '',
  title: 'study',
  subTitle: 'investigator',
  description: 'studyDescription',
  secondaryLabels: [
    'collectionType',
    'diagnosis',
    'intervention',
    'numberParticipants',
    'reportedOutcome',
    'deviceType',
    'sensorType',
    'dataCollectionMethod',
    'devicePlatform',
    'deviceLocation',
    'digitalAssessmentCategory',
    'digitalAssessmentDetails',
    'sensorDataType',
    'dataUsed',
    'keywords',
  ],
}

export const studiesCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: studySchema,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Collections/DetailsPage',
    URLColumnName: 'study',
    matchColumnName: 'study',
  },
  labelLinkConfig: [
    {
      matchColumnName: 'dataUsed',
      isMarkdown: true,
    },
  ],
}

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      facet: 'theme',
      link: 'Explore/Collections',
      linkText: 'Explore Collections',
      sql: studySql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      cardConfiguration: studiesCardConfiguration,
      sql: studySql,
      shouldDeepLink: true,
      hideDownload: true,
      name: 'Collections',
      facetAliases,
      facetsToPlot: [
        'collectionType',
        'deviceLocation',
        'devicePlatform',
        'deviceType',
        'diagnosis',
        'digitalAssessmentCategory',
        'intervention',
        'reportedOutcome',
        'sensorType',
      ],
      searchConfiguration: {
        searchable: [
          'diagnosis',
          'digitalAssessmentCategory',
          'digitalAssessmentDetails',
          'intervention',
          'investigator',
          'keywords',
          'reportedOutcome',
          'study',
        ],
      },
    },
  },
}

export const details: DetailsPageProps = {
  sql: studySql,
  synapseConfigArray: [
    {
      name: 'Markdown',
      props: {},
      injectMarkdown: false,
      columnName: 'studyDescriptionLocation',
      title: 'Study Description',
    },
    {
      name: 'Markdown',
      props: {},
      injectMarkdown: true,
      columnName: 'dataAccessInstructions',
      title: 'Data Access',
      className: 'PORTALS-1365',
    },
    {
      name: 'Markdown',
      props: {},
      injectMarkdown: false,
      columnName: 'studyDataDescriptionLocation',
      title: 'Data Description',
    },
    {
      name: 'StandaloneQueryWrapper',
      title: 'Data Files',
      columnName: 'id',
      tableSqlKeys: ['projectId'],
      props: dataDetailPageProps,
    },
    {
      name: 'CardContainerLogic',
      title: 'Suggested Tools',
      columnName: 'id',
      tableSqlKeys: ['suggestedStudies'],
      props: toolsDetailPageProps,
    },
    {
      name: 'CardContainerLogic',
      title: 'Publications',
      columnName: 'id',
      tableSqlKeys: ['synID'],
      props: publicationDetailPageProps,
    },
  ],
}

export const studyDetailPage: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      isAlignToLeftNav: true,
      ...studiesCardConfiguration,
      rgbIndex,
      facetAliases,
      genericCardSchema: {
        ...studySchema,
        title: 'study',
        link: 'id',
      },
      sql: studySql,
    },
  },
  {
    name: 'DetailsPage',
    props: details,
  },
]
