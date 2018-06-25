import identity from 'lodash/identity'

import { apiPrefix } from '../apiReducer'

import fetchList from './fetchList'
import fetchInfo from './fetchInfo'
import create from './create'
import update from './update'
import destroy from './destroy'

const reducers = {
  FETCH_LIST: fetchList,
  FETCH_INFO: fetchInfo,
  CREATE: create,
  UPDATE: update,
  DESTROY: destroy,
}

export default (state, action = {}) =>
  (reducers[apiPrefix(action.type)] || identity)(state, action)
