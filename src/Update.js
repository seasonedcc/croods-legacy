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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  render: PropTypes.func.isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  attributes: PropTypes.object,
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
  )(Update),
)
