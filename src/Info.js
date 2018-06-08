import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'

import createActions from './createActions'
import withOptions from './withOptions'

@withOptions
@connect(
  (state, { name }) => ({ ...state[name] }),
  (dispatch, { name, parseResponse, options }) => ({
    actions: bindActionCreators(
      createActions({ ...options, name, parseResponse }),
      dispatch,
    ),
  }),
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
    const { id, list, actions } = props || this.props

    const item = find(list || {}, item => item.id.toString() === id.toString())

    if (item) {
      actions.setInfo(item)
    } else {
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
