import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired, // match foo.bar
  attributes: PropTypes.object.isRequired, // properties to be updated
  render: PropTypes.func.isRequired, // (update = (id, ...attributes), props) -> Html
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  path: PropTypes.string, // match /foo/bar-_12?&=
  parseUpdateResponse: PropTypes.func, // (json, response, requestAttributes) -> Object

  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Update),
)
