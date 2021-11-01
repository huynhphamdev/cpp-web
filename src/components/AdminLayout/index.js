import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import {
  isWidthUp,
  withWidth,
  AppBar,
  Toolbar,
  IconButton,
  Icon,
} from '@material-ui/core'

import styles from './styles'
import DrawerNavigation from './DrawerNavigation'
import Button from '~/components/Button'
import Typography from '~/components/Typography'
import { useStores } from '~/hooks'

const useStyles = makeStyles(styles)

const AdminLayout = ({
  width,
  children,
  title,
  actions,
}) => {
  const classes = useStyles()
  const { userStore } = useStores()
  const history = useHistory()

  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (!userStore.isAuthed) {
      history.replace('/login')
    }
  }, [])

  const displayPermanent = isWidthUp('lg', width)

  return (
    <div>
      <DrawerNavigation
        displayPermanent={displayPermanent}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <div className={classes.mainContainer}>
        <AppBar color="transparent" position="static" elevation={0}>
          <Toolbar>
            {!displayPermanent && (
              <IconButton className={classes.menuIconButton} onClick={() => setDrawerOpen(true)}>
                <Icon className={classes.menuIcon}>menu</Icon>
              </IconButton>
            )}
            <Typography variant="header">
              {title}
            </Typography>
            <div className={classes.actions}>
              {actions && actions.length > 0 && actions.map(({ label, onClick }, index) => (
                <Button key={index} onClick={onClick}>
                  {label}
                </Button>
              ))}
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

AdminLayout.propTypes = {
  width: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default withWidth()(AdminLayout)
