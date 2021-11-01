import React from 'react'
import PropTypes from 'prop-types'
import {
  Icon as MuiIcon,
  useTheme,
} from '@material-ui/core'


const Icon = ({ color, ...props }) => {
  if (!color) return <MuiIcon {...props} />

  const theme = useTheme()

  return (
    <span
      style={{
        color: theme.palette.common[color],
        display: 'flex',
      }}>
      <MuiIcon
        {...props}
        color="inherit"
      />
    </span>
  )
}

Icon.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'base1',
    'base2',
    'base3',
    'base4',
    'base5',
    'base6',
    'base7',
    'supportGreen',
    'supportRed',
    'supportOrange',
    'supportBlue',
    'brandYellow',
    'brandBlue0',
    'brandBlue1',
    'brandBlue2',
    'brandBlue3',
    'brandBlue4',
    'pureWhite',
    'overlay',
    'background',
    'facebookButton',
  ]),
}

Icon.defaultProps = {
  color: null,
}

export default Icon
