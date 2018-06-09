import { apiSuffix } from '../apiReducer'

export default (state, action = {}) => {
  switch (apiSuffix(action.type)) {
    case 'REQUEST': {
      return {
        ...state,
        creating: true,
        createError: null,
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        creating: false,
        createError: action.error.message,
      }
    }
    case 'SUCCESS': {
      return {
        ...state,
        creating: false,
        created: action.created,
        info: action.created,
      }
    }
    default:
      return state
  }
}
