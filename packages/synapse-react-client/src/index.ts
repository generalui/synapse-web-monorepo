import { displayToast } from './components/ToastMessage'
import * as SynapseTheme from './theme'
import Palettes from './theme/palette/Palettes'
import {
  SynapseContextConsumer,
  SynapseContextProvider,
  useSynapseContext,
} from './utils/context/SynapseContext'
import FullContextProvider, {
  defaultQueryClientConfig,
} from './utils/context/FullContextProvider'
import * as AppUtils from './utils/AppUtils'
import * as RegularExpressions from './utils/functions/RegularExpressions'
import { SynapseClientError } from './utils/SynapseClientError'
import * as SynapseComponents from './components'
import SynapseClient from './synapse-client'
import * as SynapseQueries from './synapse-queries'
import { SynapseConstants, SynapseUtilityFunctions } from './utils'

export * from './components'
export * from './utils'

const SynapseContextUtils = {
  SynapseContextProvider,
  SynapseContextConsumer,
  useSynapseContext,
  FullContextProvider,
  defaultQueryClientConfig,
}

export {
  SynapseClient,
  SynapseClientError,
  SynapseConstants,
  SynapseComponents,
  SynapseContextUtils,
  SynapseTheme,
  SynapseQueries,
  SynapseUtilityFunctions,
  Palettes,
  AppUtils,
  RegularExpressions,
  displayToast,
}
