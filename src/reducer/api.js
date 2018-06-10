import { apiPrefix } from '../apiReducer'

import fetchList from './fetchList'
import fetchInfo from './fetchInfo'
import create from './create'
import update from './update'

const reducers = {
  FETCH_LIST: fetchList,
  FETCH_INFO: fetchInfo,
  CREATE: create,
  UPDATE: update,
}

export default (state, action = {}) => {
  const reducer = reducers[apiPrefix(action.type)]
  return reducer ? reducer(state, action) : state
}
