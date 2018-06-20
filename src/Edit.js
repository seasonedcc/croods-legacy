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

  render() {
    const { render, renderUpdated, actions, info, fetchingInfo } = this.props
    const { infoError, updated, updating, updateError: error } = this.props
    const { renderLoading, renderError } = this.props
    const { update } = actions

    if (renderError && infoError) {
      return renderError(infoError)
    }

    if (renderLoading && (!info || fetchingInfo)) {
      return renderLoading()
    }

    if (renderUpdated && updated) {
      return renderUpdated(updated)
    }

    return render({ info, update, updating, error }, this.props)
  }
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Edit),
)
