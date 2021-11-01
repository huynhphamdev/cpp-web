import React from 'react'
import { TextField as MuiTextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const TextField = ({
  variant,
  InputProps,
  ...props
}) => {
  const classes = useStyles()

  const inputProps = {...InputProps}
  if (variant === 'filled') {
    inputProps.disableUnderline = true
  }

  return (
    <MuiTextField
      variant={variant}
      InputProps={inputProps}
      classes={{ root: classes.root }}
      {...props}
    />
  )
}


export default TextField
