import map from 'lodash/map'
import { apiSuffix } from '../apiReducer'

export default (state, action = {}) => {
  switch (apiSuffix(action.type)) {
    case 'REQUEST': {
      return {
        ...state,
        updating: true,
        updateError: null,
        list: state.list
          ? map(state.list, item => {
              if (item.id.toString() === action.id.toString()) {
                return { ...item, updating: true }
              }
              return item
            })
          : null,
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        updating: false,
        updateError: action.error.message,
        list: state.list
          ? map(state.list, item => {
              if (item.id.toString() === action.id.toString()) {
                return {
                  ...item,
                  updating: false,
                  updateError: action.error.message,
                }
              }
              return item
            })
          : null,
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
