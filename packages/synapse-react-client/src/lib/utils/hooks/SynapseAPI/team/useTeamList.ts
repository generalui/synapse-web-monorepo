import { useQuery, UseQueryOptions } from 'react-query'
import { SynapseClient } from '../../..'
import { SynapseClientError } from '../../../SynapseClientError'
import { useSynapseContext } from '../../../SynapseContext'
import { TeamList } from '../../../SynapseClient'
import { PaginatedResults } from '../../../synapseTypes'
import { ChallengeTeam } from '../../../synapseTypes/ChallengePagedResults'

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

export function useGetChallengeTeamList(
  challengeId: string,
  offset?: number,
  limit?: number,
  options?: UseQueryOptions<
    PaginatedResults<ChallengeTeam>,
    SynapseClientError
  >,
) {
  const { accessToken, keyFactory } = useSynapseContext()

  return useQuery<PaginatedResults<ChallengeTeam>, SynapseClientError>(
    keyFactory.getChallengeTeamListQueryKey(challengeId),
    () =>
      SynapseClient.getChallengeTeams(accessToken, challengeId, offset, limit),
    options,
  )
}
