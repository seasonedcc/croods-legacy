import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

@withOptions
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class extends Component {
  constructor(props) {
    super(props)
    const { id, actions, updated } = props

    if (updated && updated.id.toString() === id.toString()) {
      actions.resetUpdated()
    }
  }

  componentDidUpdate(prevProps) {
    const { id, actions, updated } = this.props
    const { updated: oldUpdated } = prevProps

    if (updated && !oldUpdated && updated.id.toString() === id.toString()) {
      actions.resetUpdated()
    }
  }

  render() {
    const { render, id, attributes, actions } = this.props
    const update = () => actions.update({ id, ...attributes })

    return render(update)
  }
}
