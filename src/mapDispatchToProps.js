import { bindActionCreators } from 'redux'

import createActions from './createActions'

export default (dispatch, { options, ...props }) => ({
  actions: bindActionCreators(
    createActions({ ...options, ...props }),
    dispatch,
  ),
})
