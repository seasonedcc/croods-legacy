import { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import customPropTypes from './customPropTypes'
import providerProps from './providerProps'
import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

const Destroy = props => {
  const { render, id, actions, destroyed } = props
  useEffect(() => {
    destroyed && destroyed.id === id && actions.resetDestroyed()
  }, [destroyed])
  return render(() => actions.destroy(id), props)
}

Destroy.propTypes = {
  /** Ex: 1234 or '1234' */
  id: customPropTypes.id.isRequired,
  /** Defines the deep properties used in the component. Ex: foo.bar */
  name: customPropTypes.name.isRequired,
  /** A function returning a React Node. Ex: (destroy, props) -> < JSX /> */
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
  )(Destroy),
)
