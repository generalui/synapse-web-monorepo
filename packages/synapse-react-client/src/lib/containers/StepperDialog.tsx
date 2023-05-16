import { Alert, Button, Box } from '@mui/material'
import React from 'react'
import { DialogBase } from './DialogBase'
import { SynapseSpinner } from './LoadingScreen'

export type Step = {
  identifier: string
  title: string
  cancelButtonText?: string
  // TODO: Generically type this
  onConfirm?: unknown
  confirmStep?: string
  confirmButtonText?: string
  previousStep?: string
  nextStep?: string
}

export type Steps = Step[]

export type StepperDialogProps = {
  errorMessage: string | undefined
  onCancel: () => void
  onConfirm: () => void
  onStepChange: (arg: string) => void
  open: boolean
  step: Step
  content: React.ReactElement
  loading: boolean
}

/**
 * A stepper dialog built using MUI components.
 */
export const StepperDialog: React.FunctionComponent<StepperDialogProps> = ({
  errorMessage,
  onCancel,
  onConfirm,
  onStepChange,
  open,
  step,
  content,
  loading,
}) => {
  if (!step) return null

  const dialogContent = (
    <Box display="flex" flexDirection="column" gap={1}>
      <>
        {loading ? <SynapseSpinner size={40} /> : content}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </>
    </Box>
  )

  return (
    <DialogBase
      actions={
        <>
          {step?.cancelButtonText && (
            <Button variant="outlined" onClick={() => onCancel()}>
              {step.cancelButtonText}
            </Button>
          )}
          {step?.previousStep && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                step.previousStep ? onStepChange(step.previousStep) : null
              }
            >
              Back
            </Button>
          )}
          {step?.nextStep && (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                step.nextStep ? onStepChange(step.nextStep) : null
              }
            >
              Next
            </Button>
          )}
          {onConfirm && step?.confirmButtonText && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => (onConfirm ? onConfirm() : undefined)}
            >
              {step.confirmButtonText}
            </Button>
          )}
        </>
      }
      content={dialogContent}
      onCancel={onCancel}
      open={open}
      title={step.title}
    />
  )
}
