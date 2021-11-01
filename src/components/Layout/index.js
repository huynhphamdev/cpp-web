import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Icon,
  IconButton,
  isWidthUp,
  withWidth,
} from '@material-ui/core'

import styles from './styles'
import DrawerNavigation from './DrawerNavigation'

const useStyles = makeStyles(styles)

const Layout = ({
  width,
  children,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles()

  const displayPermanent = isWidthUp('lg', width)

  return (
    <div>
      <DrawerNavigation
        displayPermanent={displayPermanent}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      {!displayPermanent && (
        <IconButton className={classes.menuIconButton} onClick={() => setDrawerOpen(true)}>
          <Icon className={classes.menuIcon}>menu</Icon>
        </IconButton>
      )}
      <div className={classes.mainContainer}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  width: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default withWidth()(Layout)
