import React, { useState } from 'react'
import { Box } from '@mui/material'
import { PartialUpdate } from './ChallengeTeamWizard'
import TextField from '../TextField'

type CreateChallengeTeamProps = {
  onChangeTeamInfo: (update: PartialUpdate) => void
}

export const CreateChallengeTeam = ({
  onChangeTeamInfo,
}: CreateChallengeTeamProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleTeamUpdate = (update: PartialUpdate) => {
    setName(update.name)
    setDescription(update.description)

    onChangeTeamInfo(update)
  }

  return (
    <>
      <TextField
        id="teamName"
        label="Team Name *"
        value={name}
        fullWidth
        onChange={event => handleTeamUpdate({ name: event.target.value })}
      />
      <Box display="flex">
        <TextField
          id="teamDescription"
          label={
            // TODO: Add <HelpPopover>
            <Box display="flex" gap={2}>
              <Box>Description</Box>
            </Box>
          }
          value={description}
          fullWidth
          onChange={event =>
            handleTeamUpdate({ description: event.target.value })
          }
        />
      </Box>
    </>
  )
}
