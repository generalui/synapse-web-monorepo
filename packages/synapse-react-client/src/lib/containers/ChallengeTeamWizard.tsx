import React, { useEffect, useState } from 'react'
import FullWidthAlert from './FullWidthAlert'
import { Step, StepperDialog } from './StepperDialog'
import { Box, Button } from '@mui/material'
import { Team } from '../../../dist/utils/synapseTypes/Team'
import TextField from './TextField'

type InviteMembersProps = {
  teamName: string | undefined
}

const InviteMembers = ({ teamName }: InviteMembersProps) => {
  return (
    <>
      <Box>You have successfully joined team {teamName}</Box>
    </>
  )
}

type SelectChallengeTeamProps = {
  onCreateTeam: () => void
  onSelectTeam: (team: Team) => void
}

const SelectChallengeTeam = ({
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

type TeamUpdate = {
  [key: string]: string
}

type TeamToCreate = {
  name: string
  description: string
}

type CreateChallengeTeamProps = {
  newTeam: TeamToCreate
  onChangeTeamInfo: (update: TeamUpdate) => void
}

const CreateChallengeTeam = ({
  onChangeTeamInfo,
}: CreateChallengeTeamProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    onChangeTeamInfo({ name, description })
  }, [onChangeTeamInfo])

  return (
    <>
      <TextField
        id="teamName"
        label="Team Name *"
        value={name}
        fullWidth
        onChange={event => setName(event.target.value)}
      />
      <Box display="flex">
        <TextField
          id="teamDescription"
          label={
            // TODO: Add HelpPopover
            <Box display="flex" gap={2}>
              <Box>Description</Box>
            </Box>
          }
          value={description}
          fullWidth
          onChange={event => setDescription(event.target.value)}
        />
      </Box>
    </>
  )
}

const MOCK_TEAM: Team = {
  id: '123',
  name: 'Mock Team',
  description: 'Mock Team description',
  icon: 'Some icon',
  canPublicJoin: false,
  etag: 'Some etag',
  createdOn: 'Created timestamp',
  modifiedOn: 'Modified timestamp',
  createdBy: 'Created by user ID',
  modifiedBy: 'Modified by user ID',
}

enum StepsEnum {
  SELECT_YOUR_CHALLENGE_TEAM = 'SELECT_YOUR_CHALLENGE_TEAM',
  INVITE_MEMBERS = 'INVITE_MEMBERS',
  REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL',
  CREATE_NEW_TEAM = 'CREATE_NEW_TEAM',
}

const createSteps = (
  handleChangeTeamInfo: (update: TeamUpdate) => void,
  handleCreateTeam: () => Promise<void>,
  handleFinishRegistration: () => Promise<unknown>,
  handleSelectTeam: (team: Team) => void,
  handleStepChange: (step: StepsEnum) => void,
  newTeam: TeamToCreate,
  teamName: string | undefined,
) => ({
  SELECT_YOUR_CHALLENGE_TEAM: {
    title: 'Select Your Challenge Team',
    content: (
      <SelectChallengeTeam
        onCreateTeam={() => handleStepChange(StepsEnum.CREATE_NEW_TEAM)}
        onSelectTeam={handleSelectTeam}
      />
    ),
    nextStep: StepsEnum.INVITE_MEMBERS,
  },
  INVITE_MEMBERS: {
    title: 'Invite Members',
    content: <InviteMembers teamName={teamName} />,
    previousStep: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
    onConfirm: handleFinishRegistration,
    confirmStep: StepsEnum.REGISTRATION_SUCCESSFUL,
    confirmButtonText: 'Finish Registration',
  },
  REGISTRATION_SUCCESSFUL: {
    title: 'Registration Successful!',
    content: <>You have successfully registered for the challenge</>,
  },
  CREATE_NEW_TEAM: {
    title: 'Create New Team',
    content: (
      <CreateChallengeTeam
        onChangeTeamInfo={handleChangeTeamInfo}
        newTeam={newTeam}
      />
    ),
    onConfirm: handleCreateTeam,
    confirmStep: StepsEnum.INVITE_MEMBERS,
    confirmButtonText: 'Next',
    previousStep: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
  },
})

export type ChallengeTeamWizardProps = {
  isShowingModal?: boolean
  onClose: () => void
}

export const ChallengeTeamWizard: React.FunctionComponent<
  ChallengeTeamWizardProps
> = ({ isShowingModal = false, onClose }) => {
  const [newTeam, setNewTeam] = useState<TeamToCreate>({
    name: '',
    description: '',
  })
  const [teamFromApi, setTeamFromApi] = useState<Team | undefined>()

  const steps = createSteps(
    handleChangeTeamInfo,
    handleCreateTeam,
    handleFinishRegistration,
    handleSelectTeam,
    handleStepChange,
    newTeam,
    teamFromApi?.name,
  )

  const [step, setStep] = useState<Step>(steps.SELECT_YOUR_CHALLENGE_TEAM)
  const [isShowingSuccessAlert, setIsShowingSuccessAlert] =
    useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  function handleStepChange(value: StepsEnum) {
    setStep(steps[value])
  }

  function handleChangeTeamInfo(update: Partial<TeamUpdate>) {
    console.log('Updating team info: ', update)
    setNewTeam({ ...newTeam, ...update })
  }

  async function handleCreateTeam() {
    console.log('Creating new team...')
    // Mock API call to create / return the team
    const response: { data: Team } = await new Promise(resolve => {
      setTimeout(() => {
        console.log('New team created.', MOCK_TEAM)
        resolve({ data: MOCK_TEAM })
        if (step.confirmStep) handleStepChange(step.confirmStep as StepsEnum)
      }, 1500)
    })

    if (response.data) setTeamFromApi(response.data)
  }

  function handleSelectTeam(team: Team) {
    console.log('Selected new team: ', team)
    setTeamFromApi(team)
  }

  async function handleFinishRegistration() {
    console.log('Clicking "Finish Registration"')
    // Mock API call to create / return the team
    await new Promise(() => {
      setTimeout(() => {
        setStep(steps.REGISTRATION_SUCCESSFUL)
      }, 1500)
    })
  }

  const hide = () => {
    setErrorMessage(undefined)
    onClose()
  }

  return (
    <>
      <StepperDialog
        errorMessage={errorMessage}
        onCancel={hide}
        onConfirm={() => step.onConfirm?.()}
        onStepChange={handleStepChange as (arg: string) => void}
        open={isShowingModal}
        step={step}
      />
      <FullWidthAlert
        show={isShowingSuccessAlert}
        variant="info"
        title="Project created"
        description=""
        autoCloseAfterDelayInSeconds={10}
        onClose={() => {
          setIsShowingSuccessAlert(false)
        }}
      />
    </>
  )
}
