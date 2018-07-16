import { suffix } from './prefixedReducer'

import initialState from './reducer/initialState'

export default (state = initialState, action = {}) => {
  switch (suffix(action.type)) {
    case 'SET_INFO': {
      return { ...state, info: action.info }
    }
    case 'RESET_CREATED': {
      return { ...state, created: null }
    }
    case 'RESET_CREATE_ERROR': {
      return { ...state, createError: null }
    }
    case 'RESET_UPDATED': {
      return { ...state, updated: null }
    }
    case 'RESET_DESTROYED': {
      return { ...state, destroyed: null }
    }
    default:
      return state
  }
}
