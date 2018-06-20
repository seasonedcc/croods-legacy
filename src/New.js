import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

class New extends Component {
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

    if (created) {
      return renderCreated(created)
    }

    return render({ create, creating, error })
  }
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(New),
)
