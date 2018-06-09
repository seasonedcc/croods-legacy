import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

@withOptions
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class extends Component {
  componentWillMount() {
    const { actions } = this.props
    actions.new()
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
