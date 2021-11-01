import React from 'react'
import Proptypes from 'prop-types'
import { Box, Drawer, Icon, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import cx from 'classnames'

import styles from './styles'
import Logo from '~/images/logo192.png'
import DeveloperOutline from '~/images/developer_outline.png'
import { useStores } from '~/hooks'
import Typography from '~/components/Typography'

const useStyles = makeStyles(styles)

const DrawerNavigation = ({
  displayPermanent,
  drawerOpen,
  setDrawerOpen,
}) => {
  const { userStore } = useStores()
  const history = useHistory()
  const theme = useTheme()

  const classes = useStyles()

  const signOut = () => {
    userStore.setToken(null)
    userStore.setUser(null)
    history.push('/login')
  }

  const items = [
    {
      to: '/admin/lessons',
      label: 'Bài học',
      icon: 'local_library',
    },
    {
      to: '/admin/categories',
      label: 'Chương',
      icon: 'bookmark_border',
    },
    {
      to: '/admin/exercises',
      label: 'Bài tập',
      icon: 'lightbulb_outlined',
    },
    {
      to: '/admin/searches',
      label: 'Tra cứu',
      icon: 'search',
    },
    {
      to: '',
      label: 'Đăng xuất',
      onClick: signOut,
      icon: 'logout',
    },
  ]

  const path = window.location.pathname

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
        paperAnchorDockedLeft: classes.dock,
      }}
      open={drawerOpen || displayPermanent}
      onClose={() => setDrawerOpen(false)}
      variant={displayPermanent ? 'permanent' : 'temporary'}
    >
      <div className={classes.mainContainer}>
        <div>
          <Link
            to="/"
            className={classes.logoContainer}
          >
            <img
              className={classes.logo}
              src={Logo}
              alt="logo"
            />
          </Link>
          <div className={classes.navItems}>
            {items.map(({ to, label, icon, onClick }, index) => {
              const color = path === to ? 'primary' : 'black1'
              return (
                <Link
                  key={index}
                  to={to}
                  onClick={onClick}
                  className={cx({
                    [classes.link]: true,
                    [classes.selected]: path === to,
                  })}
                >
                  {icon && (
                    <span style={{ color: theme.palette.common[color] }}>
                      <Icon color="inherit" className={classes.icon}>{icon}</Icon>
                    </span>
                  )}
                  <Typography variant="label" color={color}>
                    {label}
                  </Typography>
                </Link>
              )
            })}
          </div>
        </div>
        <Box textAlign="center">
          <img src={DeveloperOutline} width="80%" />
        </Box>
      </div>
    </Drawer>
  )
}

DrawerNavigation.propTypes = {
  displayPermanent: Proptypes.bool.isRequired,
  drawerOpen: Proptypes.bool.isRequired,
  setDrawerOpen: Proptypes.func.isRequired,
}

export default DrawerNavigation
