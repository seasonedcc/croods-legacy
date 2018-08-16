import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import providerProps from './providerProps'
import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import setOrFetchInfo from './setOrFetchInfo'
import renderIfPresent from './renderIfPresent'
import renderInfoLoading from './renderInfoLoading'

class Edit extends Component {
  constructor(props) {
    super(props)
    setOrFetchInfo(props)
  }

  componentDidUpdate(prevProps) {
    const { actions, updated, id } = this.props
    const { updated: oldUpdated, id: oldId } = prevProps

    if (id.toString() !== oldId.toString()) {
      setOrFetchInfo(this.props)
    }

    if (updated && !oldUpdated) {
      actions.resetUpdated()
    }
  }

  render() {
    const { render, actions, info, renderError, infoError } = this.props
    const { updating, updateError: error, renderUpdated, updated } = this.props
    const { update } = actions

    return (
      renderIfPresent(renderError, infoError) ||
      renderInfoLoading(this.props) ||
      renderIfPresent(renderUpdated, updated) ||
      render({ info, update, updating, error }, this.props)
    )
  }
}

Edit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired, // match foo.bar
  render: PropTypes.func.isRequired, // ({ info = {}, update = (id, ...attributes), updating = bool, error }, props) -> Html
  renderUpdated: PropTypes.func, // (updated = {}) -> Html
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  path: PropTypes.string, // match /foo/bar-_12?&=
  parseUpdateResponse: PropTypes.func, // (json, response, requestAttributes) -> Object

  ...providerProps,
}

export default withOptions(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Edit),
)
