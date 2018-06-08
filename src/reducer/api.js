import { apiPrefix } from '../apiReducer'

import list from './list'
import info from './info'

export default (state, action = {}) => {
  switch (apiPrefix(action.type)) {
    case 'LIST': {
      return list(state, action)
    }
    case 'INFO': {
      return info(state, action)
    }
    default:
      return state
  }
}
