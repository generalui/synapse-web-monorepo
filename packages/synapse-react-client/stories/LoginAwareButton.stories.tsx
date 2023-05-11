import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { LoginAwareButton } from '../src/lib/containers/widgets/LoginAwareButton'
import {
  SynapseContextConsumer,
  SynapseContextProvider,
} from '../src/lib/utils/SynapseContext'

const meta: Meta = {
  title: 'UI/LoginAwareButton',
  component: LoginAwareButton,
  argTypes: {
    isAuthenticated: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
  },
  render: args => {
    const isAuthenticated = args.isAuthenticated
    delete args.isAuthenticated
    return (
      <SynapseContextConsumer>
        {context => (
          <SynapseContextProvider
            synapseContext={{
              ...context,
              accessToken: isAuthenticated
                ? context.accessToken ?? 'fake token'
                : undefined,
            }}
          >
            <LoginAwareButton {...args} />
          </SynapseContextProvider>
        )}
      </SynapseContextConsumer>
    )
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    isAuthenticated: false,
    children: 'Register for this Challenge',
    to: '/pathName?key=value#fragment',
    href: '',
    variant: 'contained',
    color: 'secondary',
    sx: {
      color: 'white',
      fontWeight: 400,
      ':hover': { color: 'white' },
      ':active': { color: 'white' },
      ':visited': { color: 'white' },
    },
    replace: false,
  },
}
