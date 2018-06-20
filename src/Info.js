import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import setOrFetchInfo from './setOrFetchInfo'

class Info extends Component {
  constructor(props) {
    super(props)
    setOrFetchInfo(props)
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props
    const { id: oldId } = prevProps

    if (id.toString() !== oldId.toString()) {
      setOrFetchInfo(this.props)
    }
  }

  render() {
    const { render, info, fetchingInfo, infoError } = this.props
    const { renderLoading, renderError } = this.props

    if (renderError && infoError) {
      return renderError(infoError)
    }

    if (renderLoading && (!info || fetchingInfo)) {
      return renderLoading()
    }

    return render(info, this.props)
  }
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Info),
)
