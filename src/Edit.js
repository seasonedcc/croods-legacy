import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import setOrFetchInfo from './setOrFetchInfo'
import renderIfPresent from './renderIfPresent'

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

  renderLoading() {
    const { renderLoading, info, fetchingInfo } = this.props

    if (renderLoading && (!info || fetchingInfo)) {
      return renderLoading()
    }
  }

  render() {
    const { render, actions, info, renderError, infoError } = this.props
    const { updating, updateError: error, renderUpdated, updated } = this.props
    const { update } = actions

    return (
      renderIfPresent(renderError, infoError) ||
      this.renderLoading() ||
      renderIfPresent(renderUpdated, updated) ||
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
