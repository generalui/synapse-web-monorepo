import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'
import { SynapseClient } from '../../..'
import { SynapseClientError } from '../../../SynapseClientError'
import { useSynapseContext } from '../../../SynapseContext'
import { PaginatedIds } from '../../../synapseTypes/PaginatedIds'

export function useGetUserRegistrableTeamsInfinite(
  challengeId: string,
  limit?: number,
  options?: UseInfiniteQueryOptions<
    PaginatedIds,
    SynapseClientError,
    PaginatedIds
  >,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  const perPage = limit ?? 10

  return useInfiniteQuery<PaginatedIds, SynapseClientError>(
    keyFactory.getUserRegistrableTeamsQueryKey(challengeId),
    async context => {
      return SynapseClient.getUserRegistrableTeams(
        accessToken,
        challengeId,
        context.pageParam, // pass the context.pageParam for the new offset
        perPage, // limit
      )
    },
    {
      ...options,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.results.length > 0)
          return pages.length * perPage //set the new offset to (page * limit)
        else return undefined
      },
    },
  )
}
