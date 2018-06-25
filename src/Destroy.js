import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

class Update extends Component {
  constructor(props) {
    super(props)
    const { id, actions, destroyed } = props

    if (destroyed && destroyed.id.toString() === id.toString()) {
      actions.resetDestroyed()
    }
  }

  componentDidUpdate(prevProps) {
    const { id, actions, destroyed } = this.props
    const { destroyed: oldUpdated } = prevProps

    if (destroyed && !oldUpdated && destroyed.id.toString() === id.toString()) {
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
  )(Update),
)