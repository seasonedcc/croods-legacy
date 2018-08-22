import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import customPropTypes from './customPropTypes'
import providerProps from './providerProps'
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
  id: customPropTypes.id.isRequired,
  name: customPropTypes.name.isRequired,
  attributes: PropTypes.object.isRequired, // properties to be updated
  render: PropTypes.func.isRequired, // (update = (), props) -> Html
  parentId: customPropTypes.id,
  path: customPropTypes.path,

  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Update),
)
