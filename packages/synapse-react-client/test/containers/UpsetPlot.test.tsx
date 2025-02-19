import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import UpsetPlot, { UpsetPlotProps } from '../../src/components/Plot/UpsetPlot'
import { createWrapper } from '../testutils/TestingLibraryUtils'
import SynapseClient from '../../src/synapse-client'
import { QueryResultBundle } from '@sage-bionetworks/synapse-types'
import syn16787123Json from '../../mocks/query/syn16787123.json'
import * as UpSetJsModule from '@upsetjs/react'

const data = syn16787123Json as QueryResultBundle

function renderComponent(props: UpsetPlotProps) {
  return render(<UpsetPlot {...props} />, {
    wrapper: createWrapper(),
  })
}

describe('UpsetPlot', () => {
  const props: UpsetPlotProps = {
    rgbIndex: 0,
    sql: 'select * from syn16787123',
  }

  beforeEach(() => {
    // Getting an OOM error when rendering the plot component, so let's just mock it.
    jest
      .spyOn(UpSetJsModule.default, 'render')
      .mockImplementation(() => <div role="figure" />)

    jest
      .spyOn(SynapseClient, 'getFullQueryTableResults')
      .mockResolvedValue(data)
  })

  it('displays plot', async () => {
    renderComponent(props)
    await waitFor(
      () => {
        screen.getByRole('figure')
        expect(SynapseClient.getFullQueryTableResults).toHaveBeenCalled()
      },
      { timeout: 10000 },
    )
  })
})
