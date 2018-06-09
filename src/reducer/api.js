import { apiPrefix } from '../apiReducer'

import list from './list'
import info from './info'
import create from './create'

export default (state, action = {}) => {
  switch (apiPrefix(action.type)) {
    case 'LIST': {
      return list(state, action)
    }
    case 'INFO': {
      return info(state, action)
    }
    case 'CREATE': {
      return create(state, action)
    }
    default:
      return state
  }
}
