import React, { useEffect, useState } from 'react'
import { PRODUCTION_ENDPOINT_CONFIG } from '../../utils/functions/getEndpoint'
import { useGetUserRegistrableTeams } from '../../utils/hooks/SynapseAPI/user/useGetUserRegistrableTeams'
import { SkeletonTable } from '../../assets/skeletons/SkeletonTable'
import { useGetTeamList } from '../../utils/hooks/SynapseAPI/team/useTeamList'
import { Team } from '../../utils/synapseTypes/Team'
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid'
import { alpha, makeStyles, styled } from '@mui/material/styles'
import { Theme } from '@mui/system'

export type UserRegistrableTeamsProps = {
  challengeId: string
}

type ChallengeTeam = {
  id: string
  name: string
  count: number
}

export default function UserRegistrableTeams({
  challengeId,
}: UserRegistrableTeamsProps) {
  const [allRows, setAllRows] = useState<ChallengeTeam[]>([])
  const [teamIdList, setTeamIdList] = useState<string[]>([])
  const { data: regTeamIds } = useGetUserRegistrableTeams(challengeId, 250)

  const { data: teamsList, isLoading } = useGetTeamList(teamIdList, {
    enabled: !!teamIdList.length,
  })

  useEffect(() => {
    const ids = regTeamIds?.results ?? []
    setTeamIdList(ids)
  }, [regTeamIds])

  useEffect(() => {
    const teams = teamsList?.list ?? []
    // const count = Array(teams?.length)
    const tmp = teams?.map((team, i) => {
      return { id: team.id, name: team.name, count: 0 }
    })
    console.log({ tmp })
    setAllRows(tmp)
  }, [teamsList])

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Team Name', flex: 1 },
    { field: 'count', headerName: 'Members', width: 75 },
  ]

  const data = allRows.map(team => {
    return { id: team.id, name: team.name }
  })

  return (
    <div style={{ height: 200, width: '100%', padding: '10px 0' }}>
      {!isLoading && (
        <DataGrid
          rows={allRows}
          columns={columns}
          checkboxSelection
          hideFooter
          density="compact"
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#F1F3F5',
            },
            '& .Mui-odd': {
              backgroundColor: '#FBFBFC',
            },
          }}
          getRowClassName={params =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
          }
        />
      )}
      {isLoading && <SkeletonTable numRows={8} numCols={1} />}
    </div>
  )
}
