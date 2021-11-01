import React from 'react'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import {
  Typography as MuiTypography, useTheme,
} from '@material-ui/core'

import styles from './styles'

const useStyles = makeStyles(styles)

const Typography = ({
  variant,
  className,
  color,
  style,
  ...props
}) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <MuiTypography
      variant="body1"
      className={cx(classes.base, className, classes[variant])}
      style={{
        ...style,
        color: theme.palette.common[color] || color,
      }}
      {...props}
    />
  )
}

export default Typography
