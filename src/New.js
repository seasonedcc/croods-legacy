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
  render: PropTypes.func.isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renderCreated: PropTypes.func,
  // Subscribe Provider
  path: PropTypes.string,
  baseUrl:  PropTypes.string,
  credentials: PropTypes.string,
  headers: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  parseListResponse: PropTypes.func,
  parseInfoResponse: PropTypes.func,
  parseUpdateResponse: PropTypes.func,
  renderLoading: PropTypes.func,
  renderError: PropTypes.func,
  afterSuccess: PropTypes.func,
}

// INTERNAL PROPS
// actions: object
// created: object
// creating: bool
// createError: object

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(New),
)
