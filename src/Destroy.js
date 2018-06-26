import { Component } from 'react'
import { connect } from 'react-redux'

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

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Destroy),
)
