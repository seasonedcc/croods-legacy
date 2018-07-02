import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import renderIfPresent from './renderIfPresent'

class List extends Component {
  constructor(props) {
    super(props)

    const { list, parentId, actions } = props

    if (!list || parentId) {
      actions.fetchList()
    }
  }

  componentDidUpdate(prevProps) {
    const { parentId, actions } = this.props
    const { parentId: oldId } = prevProps

    if (parentId && parentId.toString() !== oldId.toString()) {
      actions.fetchList()
    }
  }

  renderLoading() {
    const { renderLoading, list, fetchingList } = this.props

    if (renderLoading && (!list || fetchingList)) {
      return renderLoading()
    }
  }

  render() {
    const { render, list, listError, renderError } = this.props

    return (
      renderIfPresent(renderError, listError) ||
      this.renderLoading() ||
      render(list, this.props)
    )
  }
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(List),
)
