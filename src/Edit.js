import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import setOrFetchInfo from './setOrFetchInfo'

class Edit extends Component {
  constructor(props) {
    super(props)
    setOrFetchInfo(props)
  }

  componentDidUpdate(prevProps) {
    const { actions, updated, id } = this.props
    const { updated: oldUpdated, id: oldId } = prevProps

    if (id.toString() !== oldId.toString()) {
      setOrFetchInfo(this.props)
    }

    if (updated && !oldUpdated) {
      actions.resetUpdated()
    }
  }

  renderError() {
    const { renderError, infoError } = this.props

    if (renderError && infoError) {
      return renderError(infoError)
    }
  }

  renderLoading() {
    const { renderLoading, info, fetchingInfo } = this.props

    if (renderLoading && (!info || fetchingInfo)) {
      return renderLoading()
    }
  }

  renderUpdated() {
    const { renderUpdated, updated } = this.props

    if (renderUpdated && updated) {
      return renderUpdated(updated)
    }
  }

  render() {
    const { render, actions, info } = this.props
    const { updating, updateError: error } = this.props
    const { update } = actions

    return (
      this.renderError() ||
      this.renderLoading() ||
      this.renderUpdated() ||
      render({ info, update, updating, error }, this.props)
    )
  }
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Edit),
)
