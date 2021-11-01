import React from 'react'
import PropTypes from 'prop-types'
import { Observer as MobxObserver } from 'mobx-react'

const Observer = ({ children }) => {
  return (
    <MobxObserver>
      {() => (
        <>{children}</>
      )}
    </MobxObserver>
  )
}

Observer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Observer
