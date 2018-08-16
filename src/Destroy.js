import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
  render: PropTypes.func.isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // Subscribe Provider
  path: PropTypes.string,
  baseUrl:  PropTypes.string,
  credentials: PropTypes.string,
  headers: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  parseListResponse: PropTypes.func,
  parseInfoResponse: PropTypes.func,
  parseUpdateResponse: PropTypes.func,
  renderLoading: PropTypes.func,
  renderError: PropTypes.func,
  afterSuccess: PropTypes.func,

}
// INTERNAL PROPS
// actions: object

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Destroy),
)
