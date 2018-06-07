import { apiSuffix } from '../apiReducer'

export default (state, action = {}) => {
  switch (apiSuffix(action.type)) {
    case 'REQUEST': {
      return {
        ...state,
        listing: true,
        listError: null,
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        listing: false,
        listError: action.error.message,
      }
    }
    case 'SUCCESS': {
      return {
        ...state,
        listing: false,
        list: action.list,
      }
    }
    default:
      return state
  }
}
