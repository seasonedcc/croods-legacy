import concat from 'lodash/concat'
import { apiSuffix } from '../apiReducer'

export default ({ addCreatedToTop }) => (state, action = {}) => {
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
        list: state.list
          ? addCreatedToTop
            ? concat([action.created], state.list)
            : concat(state.list, [action.created])
          : null,
      }
    }
    default:
      return state
  }
}
