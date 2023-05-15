import React, { useState } from 'react'
import FullWidthAlert from './FullWidthAlert'
import { Step, StepperDialog } from './StepperDialog'
import { Box, Button } from '@mui/material'
import { Team } from '../../../dist/utils/synapseTypes/Team'
import TextField from './TextField'

type PartialUpdate = {
  [key: string]: string
}

type InviteMembersProps = {
  onChangeInviteMembersInfo: (update: PartialUpdate) => void
  teamName?: string
}

const InviteMembers = ({
  onChangeInviteMembersInfo,
  teamName,
}: InviteMembersProps) => {
  const [memberEmails, setMemberEmails] = useState('')
  const [teamRecruitmentMessage, setTeamRecruitmentMessage] = useState('')

  const handleTeamUpdate = (update: PartialUpdate) => {
    setMemberEmails(update.memberEmails)
    setTeamRecruitmentMessage(update.teamRecruitmentMessage)

    onChangeInviteMembersInfo(update)
  }

  return (
    <>
      {/* TODO: Link out team name to team page */}
      {teamName && (
        <Box>
          You have successfully joined team <b>{teamName}</b>
        </Box>
      )}
      <TextField
        id="teamRecruitmentMessage"
        label="Team Recruitment Message"
        value={memberEmails}
        fullWidth
        onChange={event =>
          handleTeamUpdate({ memberEmails: event.target.value })
        }
        sx={{ height: '94px' }}
      />
      <TextField
        id="teamEmailsToInvite"
        label="Emails of Additional Members to Invite"
        value={teamRecruitmentMessage}
        fullWidth
        onChange={event =>
          handleTeamUpdate({ teamRecruitmentMessage: event.target.value })
        }
        sx={{ height: '42px' }}
      />
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

type RegistrationSuccessfulProps = {
  createdNewTeam: boolean
  teamName: string | undefined
}

const RegistrationSuccessful = ({
  createdNewTeam,
  teamName,
}: RegistrationSuccessfulProps) => {
  if (!teamName) return null

  return (
    <>
      <Box>
        You have successfully {createdNewTeam ? 'created' : 'joined'} team{' '}
        {teamName} and have been added to this challenge.
      </Box>
      <Box>
        Invited team members will be automatically registered for the challenge
        as soon as they accept the team member invitation.
      </Box>
    </>
  )
}

type TeamToCreate = {
  name: string
  description: string
}

type CreateChallengeTeamProps = {
  onChangeTeamInfo: (update: PartialUpdate) => void
}

const CreateChallengeTeam = ({
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

const createSteps = () => ({
  SELECT_YOUR_CHALLENGE_TEAM: {
    identifier: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
    title: 'Select Your Challenge Team',
    nextStep: StepsEnum.INVITE_MEMBERS,
  },
  INVITE_MEMBERS: {
    identifier: StepsEnum.INVITE_MEMBERS,
    title: 'Invite Members',
    previousStep: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
    confirmStep: StepsEnum.REGISTRATION_SUCCESSFUL,
    confirmButtonText: 'Finish Registration',
  },
  REGISTRATION_SUCCESSFUL: {
    identifier: StepsEnum.REGISTRATION_SUCCESSFUL,
    title: 'Registration Successful!',
  },
  CREATE_NEW_TEAM: {
    identifier: StepsEnum.CREATE_NEW_TEAM,
    title: 'Create New Team',
    nextStep: StepsEnum.INVITE_MEMBERS,
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
  const [createdNewTeam, setCreatedNewTeam] = useState<boolean>(false)
  const [newTeam, setNewTeam] = useState<TeamToCreate>({
    name: '',
    description: '',
  })
  const [teamFromApi, setTeamFromApi] = useState<Team | undefined>()

  const steps = createSteps()

  const [step, setStep] = useState<Step>(steps.SELECT_YOUR_CHALLENGE_TEAM)
  const [isShowingSuccessAlert, setIsShowingSuccessAlert] =
    useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleCreateTeam = async () => {
    console.log('Creating new team...')
    try {
      // Mock API call to create / return the team
      const response: { data: Team } = await new Promise(resolve => {
        setTimeout(() => {
          setCreatedNewTeam(true)
          console.log('New team created.', MOCK_TEAM)
          resolve({ data: { ...MOCK_TEAM, name: newTeam.name } })
        }, 2500)
      })

      if (response.data) {
        console.log('Updated team from API: ', response.data)
        setTeamFromApi(response.data)
      }
    } catch (e) {
      // TODO: Verify error response object and parse error codes/messages
      setErrorMessage('Error creating team. Please try again.')
    }
  }

  const handleStepChange = (value?: StepsEnum) => {
    if (!value || !steps[value]) return

    setStep(steps[value])
  }

  const handleInviteMembersInfo = (update: PartialUpdate) => {
    setNewTeam({ ...newTeam, ...update })
  }

  const handleChangeTeamInfo = (update: PartialUpdate) => {
    setNewTeam({ ...newTeam, ...update })
  }

  const handleSelectTeam = (team: Team) => {
    console.log('Selected new team: ', team)
    setTeamFromApi(team)
  }

  const handleFinishRegistration = async () => {
    console.log('Clicking "Finish Registration"')
    try {
      await handleCreateTeam()
      // Mock API call to create / return the team
      await new Promise(() => {
        setTimeout(() => {
          handleStepChange(step.confirmStep as StepsEnum)
        }, 1000)
      })
    } catch (e) {
      // TODO: Verify error response object and parse error codes/messages
      setErrorMessage('Error registering for challenge. Please try again.')
    }
  }

  const hide = () => {
    setErrorMessage(undefined)
    onClose()
  }

  const onConfirmHandlerMap: Record<string, () => Promise<void>> = {
    INVITE_MEMBERS: handleFinishRegistration,
    CREATE_NEW_TEAM: handleCreateTeam,
  }

  const createContent = () => {
    switch (step.identifier) {
      case StepsEnum.SELECT_YOUR_CHALLENGE_TEAM:
        return (
          <SelectChallengeTeam
            onCreateTeam={() => handleStepChange(StepsEnum.CREATE_NEW_TEAM)}
            onSelectTeam={handleSelectTeam}
          />
        )
      case StepsEnum.INVITE_MEMBERS:
        return (
          <InviteMembers
            onChangeInviteMembersInfo={handleInviteMembersInfo}
            teamName={teamFromApi?.name}
          />
        )
      case StepsEnum.REGISTRATION_SUCCESSFUL:
        return (
          <RegistrationSuccessful
            createdNewTeam={createdNewTeam}
            teamName={teamFromApi?.name}
          />
        )
      case StepsEnum.CREATE_NEW_TEAM:
        return <CreateChallengeTeam onChangeTeamInfo={handleChangeTeamInfo} />
      default:
        return <></>
    }
  }

  return (
    <>
      <StepperDialog
        errorMessage={errorMessage}
        onCancel={hide}
        onStepChange={handleStepChange as (arg: string) => void}
        open={isShowingModal}
        onConfirm={
          onConfirmHandlerMap[step.identifier]
            ? onConfirmHandlerMap[step.identifier]
            : () => undefined
        }
        step={step}
        content={createContent()}
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
