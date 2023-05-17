import { useQuery, UseQueryOptions } from 'react-query'
import { SynapseClient } from '../../..'
import { SynapseClientError } from '../../../SynapseClientError'
import { useSynapseContext } from '../../../SynapseContext'
import { TeamList } from '../../../SynapseClient'

export function useGetTeamList(
  teamIds: string[] | number[],
  options?: UseQueryOptions<TeamList, SynapseClientError>,
) {
  const { accessToken, keyFactory } = useSynapseContext()

  return useQuery<TeamList, SynapseClientError>(
    keyFactory.getTeamListQueryKey(teamIds),
    () => SynapseClient.getTeamList(teamIds, accessToken),
    options,
  )
}
