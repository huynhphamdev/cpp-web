import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '../TextField'

const DebouncedTextField = ({
  minLength,
  onDebounce,
  ...props
}) => {
  const [timing, setTiming] = useState(null)

  useEffect(() => {
    if (timing != null) {
      clearTimeout(timing)
    }

    setTiming(setTimeout(() => {
      if (props.value.length >= minLength) {
        onDebounce()
      }
      setTiming(null)
    }, 300))
  }, [props.value])

  return (
    <TextField {...props} />
  )
}

DebouncedTextField.propTypes = {
  value: PropTypes.string.isRequired,
  onDebounce: PropTypes.func.isRequired,
  minLength: PropTypes.number,
}

DebouncedTextField.defaultProps = {
  minLength: 2,
}

export default DebouncedTextField
