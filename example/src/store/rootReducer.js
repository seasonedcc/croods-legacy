import { combineReducers } from 'redux'
import { createReducer } from 'croods'

export default combineReducers({ colors: createReducer('colors') })
