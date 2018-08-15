import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
  actions: PropTypes.object,
  created: PropTypes.object,
  creating: PropTypes.bool,
  renderCreated: PropTypes.func,
  render: PropTypes.func,
  createError: PropTypes.object
}


export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(New),
)
