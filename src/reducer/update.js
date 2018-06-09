import map from 'lodash/map'
import { apiSuffix } from '../apiReducer'

export default (state, action = {}) => {
  switch (apiSuffix(action.type)) {
    case 'REQUEST': {
      return {
        ...state,
        updating: true,
        updateError: null,
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        updating: false,
        updateError: action.error.message,
      }
    }
    case 'SUCCESS': {
      return {
        ...state,
        updating: false,
        updated: action.updated,
        info: action.updated,
        list: state.list
          ? map(state.list, item => {
              if (item.id.toString() === action.updated.id.toString()) {
                return action.updated
              }
              return item
            })
          : null,
      }
    }
    default:
      return state
  }
}
