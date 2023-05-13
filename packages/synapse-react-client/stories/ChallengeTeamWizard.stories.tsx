import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ChallengeTeamWizard } from '../src/lib/containers/ChallengeTeamWizard'

const meta = {
  title: 'Synapse/ChallengeTeamWizard',
  component: ChallengeTeamWizard,
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    isShowingModal: true,
  },
}
