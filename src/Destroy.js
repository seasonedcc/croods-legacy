import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import customPropTypes from './customPropTypes'
import providerProps from './providerProps'
import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import resetIfChanged from './resetIfChanged'

class Destroy extends Component {
  constructor(props) {
    super(props)
    resetIfChanged({ props, prevProps: {}, name: 'destroyed' })
  }

  componentDidUpdate(prevProps) {
    resetIfChanged({ props: this.props, prevProps, name: 'destroyed' })
  }

  render() {
    const { render, id, actions } = this.props
    const destroy = () => actions.destroy(id)

    return render(destroy, this.props)
  }
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
