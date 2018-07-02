import { apiSuffix } from '../apiReducer'

export default options => (state, action = {}) => {
  switch (apiSuffix(action.type)) {
    case 'REQUEST': {
      return {
        ...state,
        fetchingInfo: true,
        infoError: null,
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        fetchingInfo: false,
        infoError: action.error.message,
      }
    }
    case 'SUCCESS': {
      return {
        ...state,
        fetchingInfo: false,
        info: action.info,
      }
    }
    default:
      return state
  }
}
