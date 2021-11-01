import React from 'react'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import PropTypes from 'prop-types'
import {
  Dialog as MuiDialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'

import styles from './styles'
import Typography from '~/components/Typography'
import { useIsMobile } from '~/hooks'
import Icon from '~/components/Icon'

const useStyles = makeStyles(styles)

const Dialog = ({
  icon,
  open,
  title,
  subtitle,
  children,
  actions,
  onClose,
  maxWidth,
  fullWidth,
  fullScreenOnMobile,
  headerAlign,
  ...props
}) => {
  const classes = useStyles()
  const isMobile = useIsMobile()

  const isFullScreen = isMobile && fullScreenOnMobile

  return (
    <MuiDialog
      open={open}
      scroll="body"
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={isFullScreen}
      classes={{
        paper: classes.paper,
        paperFullScreen: classes.fullScreenPaper,
      }}
      {...props}
    >
      {!!onClose && (
        <div className={classes.closeContainer}>
          <IconButton onClick={onClose}>
            <Icon color="base7">close</Icon>
          </IconButton>
        </div>
      )}
      {icon && !isFullScreen && (
        <div className={classes.iconContainer}>
          <img
            alt="dialog title"
            src={icon}
            width="100%"
            height="100%"
          />
        </div>
      )}
      {title && (
        <DialogTitle
          className={cx({
            [classes.title]: true,
            [classes.titleWithIcon]: !!icon && !isFullScreen,
            [classes.titleCenter]: headerAlign === 'center',
          })}
        >
          <Typography variant="headline2" color="base7">
            {title}
          </Typography>
          {subtitle && (
            <Typography className={classes.subtitle}>{subtitle}</Typography>
          )}
        </DialogTitle>
      )}
      <DialogContent
        className={cx({
          [classes.content]: true,
          [classes.fullScreenContent]: isFullScreen,
        })}
      >
        {children}
      </DialogContent>
      <div className={isFullScreen ? classes.stickyActions : null}>
        <DialogActions className={classes.actions}>
          {actions}
        </DialogActions>
      </div>

    </MuiDialog>
  )
}

Dialog.propTypes = {
  icon: PropTypes.string,
  open: PropTypes.bool,
  title: PropTypes.string,
  actions: PropTypes.node,
  onClose: PropTypes.func,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  fullScreenOnMobile: PropTypes.bool,
  headerAlign: PropTypes.string,
}

Dialog.defaultProps = {
  icon: null,
  open: false,
  title: null,
  subtitle: null,
  actions: [],
  onClose: null,
  maxWidth: 'sm',
  fullWidth: true,
  fullScreenOnMobile: false,
  headerAlign: 'center',
}

export default Dialog
