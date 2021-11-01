import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/styles'
import { observer } from 'mobx-react'

import AuthButtons from '~/components/AuthButtons'
import Button from '~/components/Button'
import Typography from '~/components/Typography'

import styles from './styles'
import { useStores } from '~/hooks'
import { APIs, GATEWAY_APIs } from '~/config'
import { handleErrorResponse } from '~/services/Utils'

const useStyles = makeStyles(styles)

const LoginButtons = () => {
  const intl = useIntl()
  const classes = useStyles()
  const { userStore } = useStores()

  const [loading, setLoading] = useState('')

  const onRequest = async () => {
    const response = await GATEWAY_APIs.getUserInfo()
    userStore.setIP(response.ok ? response.data.ip : '')
  }

  const render = ({
    type,
    icon,
    color,
    colorText,
    loading: loadingProps,
    onClick: onClickProp,
  }) => {
    const onClick = (e) => {
      onClickProp(e)
      setLoading(type)
    }

    return (
      <Button
        className={classes.button}
        color={color}
        variant="contained"
        loading={loadingProps || loading === type}
        onClick={onClick}
        fullWidth
      >
        <img src={icon} alt="logo" width={20} height={20} className={classes.icon} />
        <Typography variant="button" color={colorText}>
          {intl.formatMessage({ id: 'login.continueWith'})} {type}
        </Typography>
      </Button>
    )
  }

  const onError = (response) => {
    setLoading('')
    handleErrorResponse(response)

  }

  const onSuccess = async ({ token, session }) => {
    userStore.setToken(token)
    userStore.setSession(session)

    const userResponse = await APIs.getCurrentUser()
    setLoading('')
    if (userResponse.ok) {
      userStore.setUser(userResponse.data.data)
    } else {
      onError(userResponse)
    }
    userStore.setAuthDialogOpen(false)
  }

  const onAuth = async ({
    portal_id,
    type,
    name,
    email,
    avatar_url,
    registration_payload,
  }) => {
    const signInPayload = {
      ip: userStore.ip,
      type,
      portal_id,
      registration_payload,
    }

    // try sign in
    const signInResponse = await APIs.signIn(signInPayload)
    if (signInResponse.ok) {
      await onSuccess(signInResponse.data.data)
    } else {
      const errorCode = signInResponse.data.meta.code
      if (errorCode === '30006') { // not found => sign up
        const signUpResponse = await APIs.signUp({
          name,
          email,
          avatar_url,
          platform: 'web',
          referral_id: userStore.referralId > 0 ? userStore.referralId : null,
          referral_source: userStore.referralSource !== '' ? userStore.referralSource : null,
          oauth: {
            portal_id,
            name,
            type,
            email,
            registration_payload,
          },
        })

        if (signUpResponse.ok) {
          const reTrySignInResponse = await APIs.signIn(signInPayload)
          if (reTrySignInResponse.ok) {
            await onSuccess(reTrySignInResponse.data.data)
          } else {
            onError(reTrySignInResponse)
          }
        } else {
          onError(signUpResponse)
        }
      } else {
        onError(signInResponse)
      }
    }
  }

  const onCancel = () => {
    setLoading('')
  }

  return (
    <AuthButtons
      render={render}
      onSuccess={onAuth}
      onRequest={onRequest}
      onCancel={onCancel}
    />
  )
}

export default observer(LoginButtons)
