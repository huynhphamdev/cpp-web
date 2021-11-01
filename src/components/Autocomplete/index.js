import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import Paper from '@material-ui/core/Paper'
import { MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'
import DebouncedTextField from '../DebouncedTextField/index'

const useStyles = makeStyles(styles)

const AutoComplete = ({
  value,
  onChange,
  onDebounce,
  onSelect,
  items,
  ...others
}) => {
  const classes = useStyles()
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)

  useEffect(() => {
    if (items && items.length > 0 && !selectedValue) {
      setShowSuggestion(true)
    }
  }, [items])

  const onChangeManually = (e) => {
    setShowSuggestion(false)
    setSelectedValue(null)
    onChange(e)
  }

  const onCancel = () => {
    setShowSuggestion(false)
  }

  const onSelectItem = (item) => {
    setSelectedValue(item)
    onSelect(item)
    onCancel()
  }

  return (
    <OutsideClickHandler onOutsideClick={onCancel}>
      <div className={classes.mainContainer}>
        <DebouncedTextField
          value={(selectedValue && selectedValue.value) || value}
          onChange={onChangeManually}
          onDebounce={onDebounce}
          {...others}
        />
        <Paper
          square
          className={classes.suggestionList}
        >
          {showSuggestion && items && items.length > 0 && items.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => onSelectItem(item)}
            >
              {item.value}
            </MenuItem>
          ))}
        </Paper>
      </div>
    </OutsideClickHandler>
  )
}

AutoComplete.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDebounce: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
}

export default AutoComplete
