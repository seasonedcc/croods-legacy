import identity from 'lodash/identity'

import { apiPrefix } from '../apiReducer'

import fetchList from './fetchList'
import fetchInfo from './fetchInfo'
import create from './create'
import update from './update'
import destroy from './destroy'

const reducers = options => ({
  FETCH_LIST: fetchList(options),
  FETCH_INFO: fetchInfo(options),
  CREATE: create(options),
  UPDATE: update(options),
  DESTROY: destroy(options),
})

export default options => (state, action = {}) =>
  (reducers(options)[apiPrefix(action.type)] || identity)(state, action)
