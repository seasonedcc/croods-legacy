import { Component } from 'react'
import { connect } from 'react-redux'
import find from 'lodash/find'

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
    this.setOrFechInfo()
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps
    const { id: oldId } = this.props

    if (id.toString() !== oldId.toString()) {
      this.setOrFechInfo(nextProps)
    }
  }

  setOrFechInfo(props) {
    const { id, info, list, actions } = props || this.props

    const item = find(list || {}, item => item.id.toString() === id.toString())

    if (item) {
      actions.setInfo(item)
    } else if (!info || info.id.toString() !== id.toString()) {
      actions.fetchInfo(id)
    }
  }

  render() {
    const { options, ...props } = this.props
    const { render, info, fetchingInfo, infoError } = props
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
