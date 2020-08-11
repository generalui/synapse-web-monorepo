import * as React from 'react'
import UpsetPlot from 'lib/containers/UpsetPlot'

export const UpsetPlotDemo = () => {
  return (
    <UpsetPlot
      entityId='syn20821313'
      sql='SELECT distinct individualID, assay FROM syn20821313 where individualID is not null'
      // maxBarCount={20}
      setName='Individuals (#) per Assay'
      combinationName='Individuals (#) '
    />
  )
}