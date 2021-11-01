import React from 'react'
import { LinearProgress as MuiLinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const LinearProgress = ({ height, ...props }) => {
  const classes = useStyles({ height })
  return (
    <MuiLinearProgress
      classes={{
        root: classes.root,
        bar: classes.bar,
        colorPrimary: classes.primaryColor,
      }}
      {...props}
    />
  )
}

export default LinearProgress
