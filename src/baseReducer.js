import identity from 'lodash/identity'

import initialState from './reducer/initialState'
import { suffix } from './prefixedReducer'

const reducers = {
  SET_INFO: (state, action) => ({ ...state, info: action.info }),
  RESET_CREATED: (state, action) => ({ ...state, created: null }),
  RESET_CREATE_ERROR: (state, action) => ({ ...state, createError: null }),
  RESET_UPDATED: (state, action) => ({ ...state, updated: null }),
  RESET_DESTROYED: (state, action) => ({ ...state, destroyed: null }),
}

export default (state = initialState, action = {}) =>
  (reducers[suffix(action.type)] || identity)(state, action)
