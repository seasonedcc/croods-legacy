import { combineReducers } from 'redux'
import { createReducer } from 'croods'

export default combineReducers({ todos: createReducer('todos') })
