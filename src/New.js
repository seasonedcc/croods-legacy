import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import customPropTypes from './customPropTypes'
import providerProps from './providerProps'
import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import renderIfPresent from './renderIfPresent'

class New extends Component {
  constructor(props) {
    super(props)
    const { createError, actions, renderCreated } = props
    if (renderCreated) {
      console.warn(
        'renderCreated is deprecated and will be removed in future versions of Croods. Please, update your code to use afterCreate function instead. [Docs at: https://croods-docz.netlify.com/new]',
      )
    }

    createError && actions.resetCreateError()
  }

  componentDidUpdate(prevProps) {
    const { actions, created } = this.props
    const { created: oldCreated } = prevProps

    if (created && !oldCreated) {
      actions.resetCreated()
    }
  }

  render() {
    const { render, renderCreated, actions, created, creating } = this.props
    const { createError: error } = this.props
    const { create } = actions

    return (
      <Fragment>
        {renderIfPresent(renderCreated, created)}
        {render({ create, creating, error }, this.props)}
      </Fragment>
    )
  }
}

New.propTypes = {
  /** Defines the deep properties used in the component. Ex: foo.bar */
  name: customPropTypes.name.isRequired,
  /** A function returning a React Node. Ex: ({ create, creating = bool, error }, props) -> < JSX /> */
  render: PropTypes.func.isRequired,
  /** A function returning a React Node. Ex: (created = {}) -> < JSX /> */
  renderCreated: PropTypes.func,
  /**  Parent element's Id, for more specificity in changes.  */
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
