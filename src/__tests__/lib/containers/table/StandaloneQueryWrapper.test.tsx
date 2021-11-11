import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { createWrapper } from '../../../../lib/testutils/TestingLibraryUtils'
import { QueryResultBundle } from '../../../../lib/utils/synapseTypes'
import syn20337467Json from '../../../../mocks/query/syn20337467.json'
import { SynapseContextType } from '../../../../lib/utils/SynapseContext'
import StandaloneQueryWrapper, { StandaloneQueryWrapperProps } from '../../../../lib/containers/table/StandaloneQueryWrapper'

const SynapseClient = require('../../../../lib/utils/SynapseClient')

const defaultProps: StandaloneQueryWrapperProps = {
  sql: 'select * from syn123',
  rgbIndex: 7,
}

function renderComponent(
  propOverrides?: Partial<StandaloneQueryWrapperProps>,
  wrapperProps?: SynapseContextType,
) {
  return render(<StandaloneQueryWrapper {...defaultProps} {...propOverrides} />, {
    wrapper: createWrapper(wrapperProps),
  })
}

describe('StandaloneQueryWrapper rendering tests', () => {
  it('renders a stacked bar chart', async () => {
    const data = syn20337467Json as QueryResultBundle
    SynapseClient.getQueryTableResults = jest.fn(() =>
      Promise.resolve(data),
    )

    renderComponent({
      rgbIndex:7,
      unitDescription:'Tools',
      link:'Explore/Computational Tools',
      linkText:'Explore Computational Tools',
      facet:'softwareType',
      sql:'SELECT * FROM syn20337467',
    })

    await waitFor(() => {
      expect(screen.getAllByTestId('StackedBarChart').length).toBe(1)
    })
  })
})
