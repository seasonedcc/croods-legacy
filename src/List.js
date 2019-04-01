import { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useDidUpdate } from './hooks'
import customPropTypes from './customPropTypes'
import providerProps from './providerProps'
import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import renderIfPresent from './renderIfPresent'

const List = props => {
  const { render, list, listError, renderError } = props
  const { actions, renderLoading, fetchingList } = props
  const { parentId, path, listPath, disableCache } = props

  useEffect(() => {
    if (!list || parentId || path !== listPath || disableCache) {
      actions.fetchList(path)
    }
  }, [])
  useDidUpdate(() => {
    actions.fetchList(path)
  }, [parentId, path])

  return renderIfPresent(renderError, listError) ||
    (renderLoading && (!list || fetchingList))
    ? renderLoading({})
    : render(list, props)
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

  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(List),
)
