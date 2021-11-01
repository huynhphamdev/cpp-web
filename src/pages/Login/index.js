import React, { useState } from 'react'
import { Box, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'

import styles from './styles'
import logo from '~/images/logo512.png'
import Typography from '~/components/Typography'
import TextField from '~/components/TextField'
import Button from '~/components/Button'
import { APIs } from '~/config'
import { useStores } from '~/hooks'
import { parseJWT } from '~/services/Utils'

const useStyles = makeStyles(styles)

const Login = () => {
  const classes = useStyles()
  const history = useHistory()
  const { userStore } = useStores()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    const response = await APIs.login({ username, password })
    if (!response.ok) return

    userStore.setToken(response.data.data.token)
    const user = parseJWT(response.data.data.token)
    userStore.setUser(user)
    const urlParams = new URLSearchParams(window.location.search)
    const redirectUrl = urlParams.get('redirect-url') || '/admin'
    history.push(decodeURIComponent(redirectUrl))
  }

  return (
    <div className={classes.mainContainer}>
      <div>
        <Paper className={classes.paper}>
          <Box textAlign="center">
            <img src={logo} className={classes.logo} />
            <Typography variant="header">Đăng nhập</Typography>
          </Box>
          <TextField
            className={classes.field}
            value={username}
            label="Tên đăng nhập"
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
          />
          <TextField
            className={classes.field}
            value={password}
            label="Mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
          />
          <Button
            disabled={!username && !password}
            fullWidth
            className={classes.field}
            onClick={onSubmit}
          >
            Đăng nhập
          </Button>
        </Paper>
      </div>
    </div>
  )
}

export default Login
