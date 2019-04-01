import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { usePrevious } from './hooks'
import customPropTypes from './customPropTypes'
import providerProps from './providerProps'
import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import renderIfPresent from './renderIfPresent'

const New = props => {
  const { render, renderCreated, actions, created, creating } = props
  const { createError: error } = props
  const { create } = actions
  const prevCreated = usePrevious(created)

  useEffect(() => {
    if ((prevCreated === undefined && error) || (created && prevCreated)) {
      actions.resetCreateError()
    }
  }, [created])

  return (
    <>
      {renderIfPresent(renderCreated, created)}
      {render({ create, creating, error }, props)}
    </>
  )
}

New.propTypes = {
  /** It must be equal to the reducer name defined in your `rootReducer.js`. It can use dot notation for deep properties used in the component. Ex: foo.bar */
  name: customPropTypes.name.isRequired,
  /** A function returning a React Node. Ex: ({ create, creating = bool, error }, props) -> < JSX /> */
  render: PropTypes.func.isRequired,
  /** A function returning a React Node. Ex: (created = {}) -> < JSX /> */
  renderCreated: PropTypes.func,
  /**  Parent element's Id, for more specificity in changes.  */
  afterCreate: PropTypes.func,
  /**  A function that receives the created data once it is executed.  */
  parentId: customPropTypes.id,
  /**  Ex: /foo/bar-_12?&= */
  path: customPropTypes.path,

  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(New),
)
