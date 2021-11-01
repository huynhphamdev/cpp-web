import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Card as MuiCard,
} from '@material-ui/core'

import styles from './styles'

const useStyles = makeStyles(styles)

const Card = (props) => {
  const classes = useStyles()

  return (
    <MuiCard
      classes={{
        root: classes.rounded,
      }}
      {...props}
    >

    </MuiCard>
  )
}

export default Card
