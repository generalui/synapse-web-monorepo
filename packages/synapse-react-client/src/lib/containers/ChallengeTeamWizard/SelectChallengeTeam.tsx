import { Box, Button } from '@mui/material'
import React from 'react'
import { Team } from '../../../../dist/utils/synapseTypes/Team'

type SelectChallengeTeamProps = {
  onCreateTeam: () => void
  onSelectTeam: (team: Team) => void
}

export const SelectChallengeTeam = ({
  onCreateTeam,
  onSelectTeam,
}: SelectChallengeTeamProps) => {
  const PARTICIPATION_CRITERIA =
    'To participate in a challenge, you need to create a new Team or join an existing one. By default, the participant who crates a team is the "Team Captain" and has the ability to invite and remove members. All team members will need a Synapse account so that they can login and accept the team invitation.'
  return (
    <>
      <Box>{PARTICIPATION_CRITERIA}</Box>
      <Box>
        <Box>(select new team list would go here)</Box>
        <Button variant="outlined" onClick={onCreateTeam}>
          Create New Team
        </Button>
      </Box>
    </>
  )
}
