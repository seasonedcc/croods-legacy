import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import providerProps from './providerProps'
import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import renderIfPresent from './renderIfPresent'

class New extends Component {
  constructor(props) {
    super(props)
    const { createError, actions } = props

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
      renderIfPresent(renderCreated, created) ||
      render({ create, creating, error }, this.props)
    )
  }
}

New.propTypes = {
  name: PropTypes.string.isRequired, // match foo.bar
  render: PropTypes.func.isRequired, // ({ info = {}, update = (id, ...attributes), updating = bool, error }, props) -> Html
  renderCreated: PropTypes.func, // (created = {}) -> Html
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  path: PropTypes.string, // match /foo/bar-_12?&=
  parseCreateResponse: PropTypes.func, // (json, response, requestAttributes) -> Object

  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(New),
)
