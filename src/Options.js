import { Component } from 'react'

import withOptions from './withOptions'

class Options extends Component {
  render() {
    const { render } = this.props

    return render(this.props)
  }
}

export default withOptions(Options)
