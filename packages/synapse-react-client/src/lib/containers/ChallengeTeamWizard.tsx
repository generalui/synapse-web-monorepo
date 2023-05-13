import React, { useState } from 'react'
import FullWidthAlert from './FullWidthAlert'
import { Step, StepperDialog } from './StepperDialog'
import { Box, Button } from '@mui/material'

const InviteMembers = () => {
  return (
    <>
      <Box>Invite members inputs here</Box>
    </>
  )
}

type SelectChallengeTeamProps = {
  onCreateTeam: () => void
}

const SelectChallengeTeam = ({ onCreateTeam }: SelectChallengeTeamProps) => {
  const PARTICIPATION_CRITERIA =
    'To participate in a challenge, you need to create a new Team or join an existing one. By default, the participant who crates a team is the "Team Captain" and has the ability to invite and remove members. All team members will need a Synapse account so that they can login and accept the team invitation.'
  return (
    <>
      <Box>{PARTICIPATION_CRITERIA}</Box>
      <Box>
        <Button variant="outlined" onClick={onCreateTeam}>
          Create New Team
        </Button>
      </Box>
    </>
  )
}

enum StepsEnum {
  SELECT_YOUR_CHALLENGE_TEAM = 'SELECT_YOUR_CHALLENGE_TEAM',
  INVITE_MEMBERS = 'INVITE_MEMBERS',
  REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL',
  CREATE_NEW_TEAM = 'CREATE_NEW_TEAM',
}

const createSteps = (
  handleCreateTeam: () => void,
  handleFinishRegistration: () => void,
) => ({
  SELECT_YOUR_CHALLENGE_TEAM: {
    title: 'Select Your Challenge Team',
    content: <SelectChallengeTeam onCreateTeam={handleCreateTeam} />,
    nextStep: StepsEnum.INVITE_MEMBERS,
  },
  INVITE_MEMBERS: {
    title: 'Invite Members',
    content: <InviteMembers />,
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
    content: <>Create a new team inputs here</>,
    previousStep: StepsEnum.SELECT_YOUR_CHALLENGE_TEAM,
    nextStep: StepsEnum.INVITE_MEMBERS,
  },
})

export type ChallengeTeamWizardProps = {
  isShowingModal?: boolean
  onClose: () => void
}

export const ChallengeTeamWizard: React.FunctionComponent<
  ChallengeTeamWizardProps
> = ({ isShowingModal = false, onClose }) => {
  const steps = createSteps(handleCreateTeam, handleFinishRegistration)
  const [step, setStep] = useState<Step>(steps.SELECT_YOUR_CHALLENGE_TEAM)
  const [isShowingSuccessAlert, setIsShowingSuccessAlert] =
    useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleStepChange = (value: StepsEnum) => {
    setStep(steps[value])
  }

  function handleCreateTeam() {
    console.log('Clicked Create New Team')
    setStep(steps.CREATE_NEW_TEAM)
  }
  function handleFinishRegistration() {
    console.log('Clicking "Finish Registration"')
    setStep(steps.REGISTRATION_SUCCESSFUL)
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
        onConfirm={() => console.log('Clicked onConfirm')}
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
