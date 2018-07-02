import apiReducer from './apiReducer'
import prefixedReducer from './prefixedReducer'
import reducer from './baseReducer'

import api from './reducer/api'

export default (name, options = {}) =>
  prefixedReducer({
    prefix: `@${name}`,
    reducer: apiReducer(api(options), reducer),
  })
