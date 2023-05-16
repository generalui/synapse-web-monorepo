import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { LoginAwareButton } from '../src/lib/containers/widgets/LoginAwareButton'
import {
  SynapseContextConsumer,
  SynapseContextProvider,
} from '../src/lib/utils/SynapseContext'

const meta: Meta = {
  title: 'UI/LoginAwareButton',
  component: LoginAwareButton,
  parameters: {
    backgrounds: {
      default: 'Challenge Header',
      values: [{ name: 'Challenge Header', value: '#3E68AA' }],
    },
  },
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

export const Register: Story = {
  args: {
    isAuthenticated: false,
    children: 'Register for this Challenge',
    to: '/pathName?key=value#fragment',
    href: '',
    disableElevation: true,
    variant: 'contained',
    color: 'secondary',
    sx: {
      fontSize: '1.12em',
      textTransform: 'none',
      padding: '4px 18px',
      fontWeight: 400,
    },
    replace: false,
  },
}

export const Leave: Story = {
  args: {
    isAuthenticated: true,
    children: 'Leave Challenge',
    onClick: () => {
      alert('Leave Challenge Clicked')
    },
    endIcon: <ExitToAppIcon />,
    variant: 'outlined',
    sx: {
      borderColor: 'white',
      color: 'white',
      fontSize: '1.12em',
      textTransform: 'none',
      padding: '4px 18px',
      fontWeight: 400,
      ':hover': {
        color: '#172430',
        borderColor: '#172430',
      },
    },
    replace: false,
  },
}
