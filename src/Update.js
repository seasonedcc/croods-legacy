import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import resetIfChanged from './resetIfChanged'

class Update extends Component {
  constructor(props) {
    super(props)
    resetIfChanged({ props, prevProps: {}, name: 'updated' })
  }

  componentDidUpdate(prevProps) {
    resetIfChanged({ props: this.props, prevProps, name: 'updated' })
  }

  render() {
    const { render, id, attributes, actions } = this.props
    const update = () => actions.update({ id, ...attributes })

    return render(update, this.props)
  }
}

Update.propTypes = {
  render: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  attributes: PropTypes.object,
  actions: PropTypes.object
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Update),
)
