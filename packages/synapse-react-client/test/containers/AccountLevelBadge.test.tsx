import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  AccountLevelBadge,
  accountLevelCertifiedLabel,
  accountLevelRegisteredLabel,
  accountLevelVerifiedLabel,
} from '../../src/components/AccountLevelBadge/AccountLevelBadge'
import { createWrapper } from '../testutils/TestingLibraryUtils'
import { UserBundle } from '@sage-bionetworks/synapse-types'

const SynapseClient = require('../../src/synapse-client/SynapseClient')

const mockRegistered: UserBundle = {
  userId: '345424',
  isCertified: false,
  isVerified: false,
}
const mockCertified: UserBundle = {
  userId: '345424',
  isCertified: true,
  isVerified: false,
}
const mockVerified: UserBundle = {
  userId: '345424',
  isCertified: true,
  isVerified: true,
}

describe('basic functionality', () => {
  const props = {
    userId: '1234',
  }

  function renderComponent() {
    return render(<AccountLevelBadge {...props} />, {
      wrapper: createWrapper(),
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('registered user', async () => {
    SynapseClient.getUserBundle = jest
      .fn()
      .mockResolvedValueOnce(mockRegistered)

    renderComponent()

    // find account level label
    await screen.findByText(accountLevelRegisteredLabel)
    expect(SynapseClient.getUserBundle).toHaveBeenCalledTimes(1)
  })

  it('certified user', async () => {
    SynapseClient.getUserBundle = jest.fn().mockResolvedValueOnce(mockCertified)

    renderComponent()

    // find account level label
    await screen.findByText(accountLevelCertifiedLabel)
    expect(SynapseClient.getUserBundle).toHaveBeenCalledTimes(1)
  })

  it('verified user', async () => {
    SynapseClient.getUserBundle = jest.fn().mockResolvedValueOnce(mockVerified)

    renderComponent()

    // find account level label
    await screen.findByText(accountLevelVerifiedLabel)
    expect(SynapseClient.getUserBundle).toHaveBeenCalledTimes(1)
  })
})
