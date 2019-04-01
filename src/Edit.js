import { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useDidUpdate } from './hooks'
import customPropTypes from './customPropTypes'
import providerProps from './providerProps'
import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import setOrFetchInfo from './setOrFetchInfo'
import renderIfPresent from './renderIfPresent'
import renderInfoLoading from './renderInfoLoading'

const Edit = props => {
  const { id, render, actions, info, renderError, infoError } = props
  const { updating, updateError: error, renderUpdated, updated } = props
  const { update } = actions

  useEffect(() => {
    setOrFetchInfo(props)
  }, [id])
  useDidUpdate(() => {
    actions.resetUpdated()
  }, [updated])

  return (
    renderIfPresent(renderError, infoError) ||
    renderInfoLoading(props) ||
    renderIfPresent(renderUpdated, updated) ||
    render({ info, update, updating, error }, props)
  )
}

Edit.propTypes = {
  /** Ex: 1234 or '1234' */
  id: customPropTypes.id.isRequired,
  /** Defines the deep properties used in the component. Ex: foo.bar */
  name: customPropTypes.name.isRequired,
  /** A function returning a React Node. Ex: ({ info = {}, update = (id, ...attributes), updating = bool, error }, props) -> < JSX /> */
  render: PropTypes.func.isRequired,
  /** A function returning a React Node. Ex: (updated = {}) -> < JSX /> */
  renderUpdated: PropTypes.func,
  /**  Parent element's Id, for more specificity in changes.  */
  parentId: customPropTypes.id,
  /**  Ex: /foo/bar-_12?&= */
  path: customPropTypes.path,

  /** Parse specific responses to adjust the API to croods patterns. Ex: (json, response, requestAttributes) -> Object */
  parseInfoResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
  parseUpdateResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Edit),
)
