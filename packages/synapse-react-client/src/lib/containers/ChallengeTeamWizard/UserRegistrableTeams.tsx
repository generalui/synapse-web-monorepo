import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useInView } from 'react-intersection-observer'
import { PRODUCTION_ENDPOINT_CONFIG } from '../../utils/functions/getEndpoint'
import {
  useGetUserRegistrableTeams,
  useGetUserRegistrableTeamsInfinite,
} from '../../utils/hooks/SynapseAPI/user/useGetUserRegistrableTeams'
import { SkeletonTable } from '../../assets/skeletons/SkeletonTable'
import { useGetTeamList } from '../../utils/hooks/SynapseAPI/team/useTeamList'
import { Team } from '../../utils/synapseTypes/Team'

export type UserRegistrableTeamsProps = {
  challengeId: string
}

export default function UserRegistrableTeams({
  challengeId,
}: UserRegistrableTeamsProps) {
  const [allRows, setAllRows] = useState<Team[]>([])
  const [teamIdList, setTeamIdList] = useState<string[]>([])
  const { data: regTeamIds, isLoading } = useGetUserRegistrableTeams(
    challengeId,
    250,
  )

  const { data: teamsList, isLoading: teamLoading } = useGetTeamList(
    teamIdList,
    { enabled: !!teamIdList.length },
  )

  useEffect(() => {
    const ids = regTeamIds?.results ?? []
    setTeamIdList(ids)
  }, [regTeamIds])

  useEffect(() => {
    const teams = teamsList?.list
    setAllRows(teams ?? [])
  }, [teamsList])

  return (
    <>
      {allRows.length > 0 && (
        <>
          {allRows.map((item: Team) => {
            if (item) {
              // another option would be to use an EntityLink
              return (
                <p key={`user-team-list-item-${item.id}`}>
                  <a
                    target="_self"
                    rel="noopener noreferrer"
                    href={`${PRODUCTION_ENDPOINT_CONFIG.PORTAL}#!Team:${item.name}`}
                  >
                    {item.name}
                  </a>
                </p>
              )
            } else return false
          })}
        </>
      )}
      {!teamLoading && allRows.length == 0 && <div>Empty</div>}
      {teamLoading && <SkeletonTable numRows={5} numCols={1} />}
    </>
  )
}
