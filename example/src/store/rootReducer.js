import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { createReducer } from 'croods'

export default combineReducers({ colors: createReducer('colors'), form })
