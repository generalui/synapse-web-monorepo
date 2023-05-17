import { Box, Button } from '@mui/material'
import React from 'react'
import { Team } from '../../utils/synapseTypes/Team'
import UserRegistrableTeams from './UserRegistrableTeams'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { padding } from '@mui/system'

type SelectChallengeTeamProps = {
  challengeId: string
  onCreateTeam: () => void
  onSelectTeam: (team: Team) => void
}

export const SelectChallengeTeam = ({
  challengeId,
  onCreateTeam,
  onSelectTeam,
}: SelectChallengeTeamProps) => {
  const PARTICIPATION_CRITERIA =
    'To participate in a challenge, you need to create a new Team or join an existing one. \
    By default, the participant who creates a team is the "Team Captain" and has the ability to invite and remove members. \
    All team members will need a Synapse account so that they can login and accept the team invitation.'
  return (
    <>
      <Box>{PARTICIPATION_CRITERIA}</Box>
      <Box>
        <Box>
          <UserRegistrableTeams challengeId={challengeId} />
        </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={onCreateTeam}
          startIcon={<ControlPointIcon />}
          sx={{ padding: '6px 18px' }}
        >
          Create New Team
        </Button>
      </Box>
    </>
  )
}
