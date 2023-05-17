import React, { useEffect, useState } from 'react'
import { SkeletonTable } from '../../assets/skeletons/SkeletonTable'
import {
  useGetChallengeTeamList,
  useGetTeamList,
} from '../../utils/hooks/SynapseAPI/team/useTeamList'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatDate } from '../../utils/functions/DateFormatter'
import dayjs from 'dayjs'

export type UserRegistrableTeamsProps = {
  challengeId: string
}

type ChallengeTeamDisplay = {
  id: string
  name: string
  created: string
  description: string
}

export default function UserRegistrableTeams({
  challengeId,
}: UserRegistrableTeamsProps) {
  const [allRows, setAllRows] = useState<ChallengeTeamDisplay[]>([])
  const [teamIdList, setTeamIdList] = useState<string[]>([])
  const { data: regTeams } = useGetChallengeTeamList(challengeId, 0, 500)

  const { data: teamsList, isLoading } = useGetTeamList(teamIdList, {
    enabled: !!teamIdList.length,
  })

  useEffect(() => {
    const ids = regTeams?.results.map(team => team.teamId) ?? []
    setTeamIdList(ids)
  }, [regTeams])

  useEffect(() => {
    const teams = teamsList?.list ?? []
    // const count = Array(teams?.length)
    const tmp = teams?.map((team, i) => {
      return {
        id: team.id,
        name: team.name,
        created: formatDate(dayjs(team.createdOn), 'MM/DD/YY'),
        description: team.description,
      }
    })
    console.log({ tmp })
    setAllRows(tmp)
  }, [teamsList])

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Team Name', flex: 1 },
    { field: 'created', headerName: 'Created On', width: 100 },
    { field: 'description', headerName: 'Description', flex: 1 },
  ]

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
