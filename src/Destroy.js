import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

class Destroy extends Component {
  constructor(props) {
    super(props)
    const { id, actions, destroyed } = props

    if (destroyed && destroyed.id.toString() === id.toString()) {
      actions.resetDestroyed()
    }
  }

  componentDidUpdate(prevProps) {
    const { id, actions, destroyed } = this.props
    const { destroyed: old } = prevProps

    if (destroyed && !old && destroyed.id.toString() === id.toString()) {
      actions.resetDestroyed()
    }
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
