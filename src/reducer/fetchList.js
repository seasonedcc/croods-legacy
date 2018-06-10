import { apiSuffix } from '../apiReducer'

export default (state, action = {}) => {
  switch (apiSuffix(action.type)) {
    case 'REQUEST': {
      return {
        ...state,
        fetchingList: true,
        listError: null,
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        fetchingList: false,
        listError: action.error.message,
      }
    }
    case 'SUCCESS': {
      return {
        ...state,
        fetchingList: false,
        list: action.list,
      }
    }
    default:
      return state
  }
}
