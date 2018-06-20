import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

class List extends Component {
  componentWillMount() {
    const { list, actions } = this.props

    if (!list) {
      actions.fetchList()
    }
  }

  render() {
    const { render, list, fetchingList, listError, renderLoading } = this.props
    const { renderError } = this.props

    if (renderError && listError) {
      return renderError(listError)
    }

    if (renderLoading && (!list || fetchingList)) {
      return renderLoading()
    }

    return render(list, this.props)
  }
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(List),
)
