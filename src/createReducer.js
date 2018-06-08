import apiReducer from './apiReducer'
import prefixedReducer, { suffix } from './prefixedReducer'

import initialState from './reducer/initialState'
import api from './reducer/api'

const reducer = (state = initialState, action = {}) => {
  switch (suffix(action.type)) {
    case 'SET_INFO': {
      return {
        ...state,
        info: action.info,
      }
    }
    default:
      return state
  }
}

export default name =>
  prefixedReducer({
    prefix: `@${name}`,
    reducer: apiReducer({ api, reducer }),
  })
