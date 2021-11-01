import React from 'react'
import {
  Hidden as MuiHidden,
} from '@material-ui/core'

const Hidden = ({ children, ...props }) => {
  return children ? (
    <MuiHidden {...props}>{children}</MuiHidden>
  ) : null
}

export default Hidden
