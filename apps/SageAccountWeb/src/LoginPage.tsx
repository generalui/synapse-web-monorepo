import React from 'react'
import { Box, Typography } from '@mui/material'
import {
  preparePostSSORedirect,
  redirectAfterSSO,
  StandaloneLoginForm,
  SynapseConstants,
  SystemUseNotification,
  useApplicationSessionContext,
} from 'synapse-react-client'
import { SourceAppDescription, SourceAppLogo } from './components/SourceApp.js'
import {
  StyledInnerContainer,
  StyledOuterContainer,
} from './components/StyledComponents.js'
import { useHistory } from 'react-router-dom'
import { backButtonSx } from './components/BackButton.js'

export type LoginPageProps = {
  returnToUrl?: string
}

function LoginPage(props: LoginPageProps) {
  const { returnToUrl } = props
  const { refreshSession, twoFactorAuthSSOErrorResponse } =
    useApplicationSessionContext()
  const history = useHistory()
  return (
    <StyledOuterContainer>
      <StyledInnerContainer>
        <Box
          sx={{
            py: 10,
            px: 8,
            height: '100%',
            position: 'relative',
            [`.${SynapseConstants.LOGIN_BACK_BUTTON_CLASS_NAME}`]: backButtonSx,
          }}
        >
          <Box
            sx={{
              minHeight: '600px',
            }}
          >
            <div className={'panel-logo'}>
              <SourceAppLogo />
            </div>
            <Box sx={{ my: 4 }}>
              <StandaloneLoginForm
                sessionCallback={() => {
                  redirectAfterSSO(history, returnToUrl)
                  // If we didn't redirect, refresh the session
                  refreshSession()
                }}
                registerAccountUrl={'/register1'}
                resetPasswordUrl={'/resetPassword'}
                onBeginOAuthSignIn={() => {
                  // save current route (so that we can go back here after SSO)
                  preparePostSSORedirect()
                }}
                twoFactorAuthenticationRequired={twoFactorAuthSSOErrorResponse}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background:
              "url('https://s3.amazonaws.com/static.synapse.org/images/login-panel-bg.svg') no-repeat right bottom 20px",
          }}
        >
          <Typography
            className="headline"
            variant="headline2"
            sx={{ marginTop: '95px' }}
          >
            Sign in to your account
          </Typography>
          <SourceAppDescription />
          <SystemUseNotification />
        </Box>
      </StyledInnerContainer>
    </StyledOuterContainer>
  )
}

export default LoginPage
