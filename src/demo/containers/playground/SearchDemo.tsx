import * as React from 'react'
import QueryWrapper from 'lib/containers/QueryWrapper'
import Search, { Searchable } from 'lib/containers/Search'
import { SynapseConstants } from 'lib'
import { GenericCardSchema } from 'lib/containers/GenericCard'
import { CommonCardProps } from 'lib/containers/CardContainerLogic'
import CardContainer from 'lib/containers/CardContainer';

export const SearchDemo:React.SFC = () => {
  const sql = "SELECT * FROM syn20337467" 
  const facetAliases = {
    contributor: 'Contributor',
    diagnosis: 'Diagnosis',
  }
  const searchable: Searchable = [
    {
      columnName: 'contributor', 
      hintText: 'Jane'
    },
    {
      columnName: 'diagnosis',
      hintText: 'LOAD'
    },
    {
      columnName: 'modelType',
      hintText: 'hint'
    },
  ]
  const genericCardSchema: GenericCardSchema = {
    title: 'Title',
    type: 'Generic Tool',
    subTitle: 'softwareType',
    description: 'summary',
    icon: 'icon',
    secondaryLabels: {
      0: { key: 'contributor', alias: 'Contributor' },
      1: { key: 'diagnosis', alias: 'Diagnosis' },
      2: { key: 'program', alias: 'Program' }
    }
  }
  const commonCardProps: CommonCardProps = {
    type: SynapseConstants.GENERIC_CARD,
    genericCardSchema,
  }
  return (
    <div className="col-xs-8 col-xs-offset-2">
      <QueryWrapper
        facetAliases={facetAliases}
        initQueryRequest={{
          concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
          partMask: SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
            SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
            SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
            SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
            SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
          query: {
            sql,
            limit: 25,
            offset: 0
          }
        }}
        showBarChart={false}
        unitDescription={'studies'}
        >
        <Search
          searchable={searchable}
        />
        <CardContainer
          {...commonCardProps}
        />
      </QueryWrapper>
    </div>
  )
}

export default SearchDemo