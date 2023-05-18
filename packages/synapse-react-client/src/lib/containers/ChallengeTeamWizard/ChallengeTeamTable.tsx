import React, { useEffect, useState } from 'react'
import { SkeletonTable } from '../../assets/skeletons/SkeletonTable'
import {
  useGetChallengeTeamList,
  useGetTeamList,
} from '../../utils/hooks/SynapseAPI/team/useTeamList'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatDate } from '../../utils/functions/DateFormatter'
import dayjs from 'dayjs'
import { RadioOption } from '../widgets/RadioGroup'
import { Team } from '../../utils/synapseTypes/Team'

export type ChallengeTeamTableProps = {
  challengeId: string
  onSelectTeam: (team: Team) => void
}

type ChallengeTeamRow = {
  id: string
  name: string
  created: string
  description: string
}

export default function ChallengeTeamTable({
  challengeId,
  onSelectTeam,
}: ChallengeTeamTableProps) {
  const [allRows, setAllRows] = useState<ChallengeTeamRow[]>([])
  const [teamIdList, setTeamIdList] = useState<string[]>([])
  const [teamsById, setTeamsById] = useState<Record<string, Team>>({})
  const { data: regTeams } = useGetChallengeTeamList(challengeId, 0, 500)
  const [selectedTeam, setSelectedTeam] = useState<
    string | number | undefined
  >()

  const { data: teamsList, isLoading } = useGetTeamList(teamIdList, {
    enabled: !!teamIdList.length,
  })

  const teamChangeHandler = (value: string | number) => {
    setSelectedTeam(value)
    onSelectTeam(teamsById[value])
  }

  useEffect(() => {
    const ids = regTeams?.results.map(team => team.teamId) ?? []
    setTeamIdList(ids)
  }, [regTeams])

  useEffect(() => {
    const teams = teamsList?.list ?? []
    const row: ChallengeTeamRow[] = []
    const teamRecords = {}
    teams.forEach(team => {
      row.push({
        id: team.id,
        name: team.name,
        created: formatDate(dayjs(team.createdOn), 'MM/DD/YY'),
        description: team.description,
      })
      teamRecords[team.id] = team
    })
    setAllRows(row)
    setTeamsById(teamRecords)
  }, [teamsList])

  const columns: GridColDef[] = [
    {
      field: 'radiobutton',
      headerName: '',
      width: 25,
      sortable: false,
      renderCell: params => {
        return (
          <RadioOption
            value={params.id}
            currentValue={selectedTeam}
            onChange={teamChangeHandler}
            label=""
            groupId="radiogroup"
          />
        )
      },
    },
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
