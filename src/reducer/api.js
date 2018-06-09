import { apiPrefix } from '../apiReducer'

import list from './list'
import info from './info'
import create from './create'
import update from './update'

const reducers = {
  LIST: list,
  INFO: info,
  CREATE: create,
  UPDATE: update,
}

export default (state, action = {}) => {
  const reducer = reducers[apiPrefix(action.type)]
  return reducer ? reducer(state, action) : state
}
