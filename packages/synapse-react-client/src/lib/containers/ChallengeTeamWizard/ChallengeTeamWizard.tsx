import React, { useState } from 'react'
import FullWidthAlert from '../FullWidthAlert'
import { Step, StepperDialog } from '../StepperDialog'

import { InviteMembers } from './InviteMembers'
import { Team } from '../../utils/synapseTypes/Team'
import { CreateChallengeTeam } from './CreateChallengeTeam'
import { SelectChallengeTeam } from './SelectChallengeTeam'
import { RegistrationSuccessful } from './RegistrationSuccessful'
import { useSynapseContext } from '../../utils/SynapseContext'
import { createMembershipRequest } from '../../utils/SynapseClient'
import { Box } from '@mui/system'
import { JoinRequestForm } from './JoinRequestForm'
import { resolve } from 'path'

// TODO: Organize / move types to proper location
export type PartialUpdate = {
  [key: string]: string
}

type TeamToCreate = {
  name: string
  description: string
}

// TODO: Remove mock data
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
  JOIN_REQUEST_FORM = 'JOIN_REQUEST_FORM',
  JOIN_REQUEST_SENT = 'JOIN_REQUEST_SENT',
  INVITE_MEMBERS = 'INVITE_MEMBERS',
  REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL',
  CREATE_NEW_TEAM = 'CREATE_NEW_TEAM',
}

interface StepList {
  [key: string]: Step
}
const createSteps = (): StepList => ({
  SELECT_YOUR_CHALLENGE_TEAM: {
    id: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
    title: 'Select Your Challenge Team',
    nextStep: StepsEnum.JOIN_REQUEST_FORM,
    nextEnabled: false,
  },
  JOIN_REQUEST_FORM: {
    id: StepsEnum.JOIN_REQUEST_FORM,
    title: 'Request Team Membership',
    previousStep: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
    confirmStep: StepsEnum.JOIN_REQUEST_SENT,
    confirmButtonText: 'Send Request',
  },
  JOIN_REQUEST_SENT: {
    id: StepsEnum.JOIN_REQUEST_SENT,
    title: 'Request Sent',
    confirmButtonText: 'Close',
  },
  INVITE_MEMBERS: {
    id: StepsEnum.INVITE_MEMBERS,
    title: 'Invite Members',
    previousStep: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
    confirmStep: StepsEnum.REGISTRATION_SUCCESSFUL,
    confirmButtonText: 'Finish Registration',
    nextEnabled: false,
  },
  REGISTRATION_SUCCESSFUL: {
    id: StepsEnum.REGISTRATION_SUCCESSFUL,
    title: 'Registration Successful!',
    nextEnabled: false,
  },
  CREATE_NEW_TEAM: {
    id: StepsEnum.CREATE_NEW_TEAM,
    title: 'Create New Team',
    nextStep: StepsEnum.INVITE_MEMBERS,
    previousStep: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
    nextEnabled: false,
  },
})

export type ChallengeTeamWizardProps = {
  userId: string
  challengeId: string
  isShowingModal?: boolean
  onClose: () => void
}

export const ChallengeTeamWizard: React.FunctionComponent<
  ChallengeTeamWizardProps
> = ({ userId, challengeId, isShowingModal = false, onClose }) => {
  const { accessToken } = useSynapseContext()
  const steps = createSteps()
  const [step, setStep] = useState<Step>(steps.SELECT_YOUR_CHALLENGE_TEAM)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>()
  const [createdNewTeam, setCreatedNewTeam] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  // TODO: Show success alert and clear (if we need to use the success component at all)
  const [isShowingSuccessAlert, setIsShowingSuccessAlert] =
    useState<boolean>(false)
  const [newTeam, setNewTeam] = useState<TeamToCreate>({
    name: '',
    description: '',
  })
  const [joinMesage, setJoinMessage] = useState<string>('')

  const handleStepChange = (value?: StepsEnum) => {
    if (!value || !steps[value]) return
    // if (value === StepsEnum.SELECT_YOUR_CHALLENGE_TEAM) setCreatedNewTeam(false)
    console.log('handleStepChange', value)
    switch (value) {
      case StepsEnum.SELECT_YOUR_CHALLENGE_TEAM:
        console.log('handleStepChange', StepsEnum.SELECT_YOUR_CHALLENGE_TEAM)
        setCreatedNewTeam(false)
        break
    }
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
    // If team is public, send request immediately
    if (team) {
      setSelectedTeam(team)
      if (!step.nextEnabled) setStep({ ...step, nextEnabled: true })
      // on next
      /*
      if (team.canPublicJoin) {
        createMembershipRequest(
          team.id,
          userId,
          undefined,
          undefined,
          accessToken,
        )
          .then(response => {
            console.log({ response })
          })
          .catch(err => {
            console.error({ err })
          })
      }
      */
    }
  }

  const handleRequestMembership = async () => {
    if (userId && selectedTeam) {
      setStep({ ...step, nextEnabled: false })
      await createMembershipRequest(
        selectedTeam.id,
        userId,
        joinMesage,
        undefined,
        accessToken,
      )
        .then(response => {
          console.log({ response })
          // request successful, advance to next step
          setStep(steps[StepsEnum.JOIN_REQUEST_SENT])
        })
        .catch(err => {
          console.error({ err })
        })
    }
  }

  const handleCreateTeam = async () => {
    // TODO: Validate input/state values before making any calls
    console.log('Creating new team...')
    try {
      // Mock API call to create / return the team
      const response: { data: Team } = await new Promise(resolve => {
        setTimeout(() => {
          setCreatedNewTeam(true)
          console.log('New team created.', MOCK_TEAM)
          resolve({ data: { ...MOCK_TEAM, name: newTeam.name } })
        }, 750)
      })

      if (response.data) {
        console.log('Updated team from API: ', response.data)
        setSelectedTeam(response.data)
      }
    } catch (e) {
      // TODO: Verify error response object and parse error codes/messages
      setErrorMessage('Error creating team. Please try again.')
    }
  }

  const handleFinishRegistration = async () => {
    // TODO: Validate input/state values before making any calls
    console.log('Clicking "Finish Registration"', step.confirmStep)
    setLoading(true)
    try {
      await handleCreateTeam()
      // Mock API call of registering for challenge
      await new Promise(() => {
        setTimeout(() => {
          console.log(
            'API call finished, moving to confirmStep',
            step.confirmStep,
          )
          handleStepChange(step.confirmStep as StepsEnum)
          setLoading(false)
        }, 750)
      })
    } catch (e) {
      // TODO: Verify error response object and parse error codes/messages
      setErrorMessage('Error registering for challenge. Please try again.')
    }
  }

  const hide = () => {
    setErrorMessage(undefined)
    setCreatedNewTeam(false)
    onClose()
  }

  const onConfirmHandlerMap: Record<string, () => Promise<void>> | void = {
    INVITE_MEMBERS: handleFinishRegistration,
    CREATE_NEW_TEAM: handleCreateTeam,
    JOIN_REQUEST_FORM: handleRequestMembership,
  }

  const createContent = () => {
    switch (step.id) {
      case StepsEnum.SELECT_YOUR_CHALLENGE_TEAM:
        return (
          accessToken && (
            <SelectChallengeTeam
              challengeId={challengeId}
              onCreateTeam={() => handleStepChange(StepsEnum.CREATE_NEW_TEAM)}
              onSelectTeam={handleSelectTeam}
            />
          )
        )
      case StepsEnum.INVITE_MEMBERS:
        return (
          <InviteMembers
            onChangeInviteMembersInfo={handleInviteMembersInfo}
            teamName={selectedTeam?.name}
          />
        )
      case StepsEnum.JOIN_REQUEST_FORM:
        return (
          <JoinRequestForm
            team={selectedTeam}
            joinMessageChange={setJoinMessage}
          />
        )

      case StepsEnum.JOIN_REQUEST_SENT:
        return (
          <Box>
            Team Manager(s) have received your request. Check your Synapse email
            address for status of your request.
          </Box>
        )
      case StepsEnum.REGISTRATION_SUCCESSFUL:
        return (
          <RegistrationSuccessful
            createdNewTeam={createdNewTeam}
            teamName={selectedTeam?.name}
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
          onConfirmHandlerMap[step.id]
            ? onConfirmHandlerMap[step.id]
            : () => undefined
        }
        step={step}
        content={createContent()}
        loading={loading}
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
