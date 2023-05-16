import React, { useState } from 'react'
import FullWidthAlert from '../FullWidthAlert'
import { Step, StepperDialog } from '../StepperDialog'

import { InviteMembers } from './InviteMembers'
import { Team } from '../../../../dist/utils/synapseTypes/Team'
import { CreateChallengeTeam } from './CreateChallengeTeam'
import { SelectChallengeTeam } from './SelectChallengeTeam'
import { RegistrationSuccessful } from './RegistrationSuccessful'

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
  const steps = createSteps()
  const [step, setStep] = useState<Step>(steps.SELECT_YOUR_CHALLENGE_TEAM)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [teamFromApi, setTeamFromApi] = useState<Team | undefined>()
  const [createdNewTeam, setCreatedNewTeam] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  // TODO: Show success alert and clear (if we need to use the success component at all)
  const [isShowingSuccessAlert, setIsShowingSuccessAlert] =
    useState<boolean>(false)
  const [newTeam, setNewTeam] = useState<TeamToCreate>({
    name: '',
    description: '',
  })

  const handleStepChange = (value?: StepsEnum) => {
    if (!value || !steps[value]) return
    if (value === StepsEnum.SELECT_YOUR_CHALLENGE_TEAM) setCreatedNewTeam(false)
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
        setTeamFromApi(response.data)
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
