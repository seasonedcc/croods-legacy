import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import renderIfPresent from './renderIfPresent'

class List extends Component {
  constructor(props) {
    super(props)

    const { list, parentId, path, listPath, actions } = props

    if (!list || parentId || path !== listPath) {
      actions.fetchList(path)
    }
  }

  componentDidUpdate(prevProps) {
    const { parentId, path, actions } = this.props
    const { parentId: oldId, path: oldPath } = prevProps

    const parentChanged = parentId && parentId.toString() !== oldId.toString()
    const pathChanged = path && path.toString() !== oldPath.toString()

    if (parentChanged || pathChanged) {
      actions.fetchList(path)
    }
  }

  renderLoading() {
    const { renderLoading, list, fetchingList } = this.props

    if (renderLoading && (!list || fetchingList)) {
      return renderLoading({})
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

List.propTypes = {
  render: PropTypes.func.isRequired,
  list: PropTypes.array,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renderError: PropTypes.func,
  renderLoading: PropTypes.func,
}

// INTERNAL PROPS
// listError: object,
// actions: object
// path: string
// listPath: string
// fetchingList: bool

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(List),
)
