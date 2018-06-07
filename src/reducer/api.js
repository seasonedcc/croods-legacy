import { apiPrefix } from '../apiReducer'

import list from './list'

export default (state, action = {}) => {
  switch (apiPrefix(action.type)) {
    case 'LIST': {
      return list(state, action)
    }
    default:
      return state
  }
}
