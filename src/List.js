import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import customPropTypes from './customPropTypes'
import providerProps from './providerProps'
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
  /** Defines the deep properties used in the component. Ex: foo.bar */
  name: customPropTypes.name.isRequired,
  /** A function returning a React Node. Ex: (list, props) -> < JSX /> */
  render: PropTypes.func.isRequired,
  /**  Parent element's Id, for more specificity in changes.  */
  parentId: customPropTypes.id,
  /**  Ex: /foo/bar-_12?&= */
  path: customPropTypes.path,
  /** Parse responses to adjust the API to croods patterns. Ex: (json, response, requestAttributes) -> Object */
  parseResponse: PropTypes.func,

  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(List),
)
