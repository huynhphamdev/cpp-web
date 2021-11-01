import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid as MuiGrid,
} from '@material-ui/core'

const Cell = (props) => {
  return (
    <MuiGrid
      item
      {...props}
    />
  )
}

Cell.propTypes = {
  xs: PropTypes.number,
}

Cell.defaultProps = {
  xs: 12,
}

export default Cell
