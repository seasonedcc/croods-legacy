import apiReducer from './apiReducer'
import prefixedReducer, { suffix } from './prefixedReducer'

import initialState from './reducer/initialState'
import api from './reducer/api'

const reducer = (state = initialState, action = {}) => state

export default name => prefixedReducer({
  prefix: name,
  reducer: apiReducer({ api, reducer }),
})
