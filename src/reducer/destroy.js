import filter from 'lodash/filter'
import { apiSuffix } from '../apiReducer'

export default options => (state, action = {}) => {
  switch (apiSuffix(action.type)) {
    case 'REQUEST': {
      return {
        ...state,
        destroying: true,
        destroyError: null,
        info: state.info
          ? state.info.id.toString() === action.id.toString()
            ? { ...state.info, destroying: true }
            : state.info
          : null,
        list: state.list
          ? state.list.map(item => {
              if (item.id.toString() === action.id.toString()) {
                return { ...item, destroying: true }
              }
              return item
            })
          : null,
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        destroying: false,
        destroyError: action.error.message,
        info: state.info
          ? state.info.id.toString() === action.id.toString()
            ? {
                ...state.info,
                destroying: false,
                destroyError: action.error.message,
              }
            : state.info
          : null,
        list: state.list
          ? state.list.map(item => {
              if (item.id.toString() === action.id.toString()) {
                return {
                  ...item,
                  destroying: false,
                  destroyError: action.error.message,
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
        destroying: false,
        destroyed: action.destroyed,
        info: null,
        list: state.list
          ? filter(
              state.list,
              item => item.id.toString() !== action.destroyed.id.toString(),
            )
          : null,
      }
    }
    default:
      return state
  }
}
