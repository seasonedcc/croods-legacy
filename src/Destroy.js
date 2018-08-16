import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired, // match foo.bar
  render: PropTypes.func.isRequired, // (destroy, props) -> Html
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  path: PropTypes.string, // match /foo/bar-_12?&=
  parseDestroyResponse: PropTypes.func, // (json, response, requestAttributes) -> Object

  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Destroy),
)
