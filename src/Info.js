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

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps
    const { id: oldId } = this.props

    if (id.toString() !== oldId.toString()) {
      setOrFetchInfo(nextProps)
    }
  }

  render() {
    const { render, info, fetchingInfo, infoError, options } = this.props
    const { renderLoading, renderError } = options

    if (infoError) {
      return renderError(infoError)
    }

    if (!info || fetchingInfo) {
      return renderLoading()
    }

    return render(info)
  }
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Info),
)
