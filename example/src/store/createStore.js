import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const isDev = () => process.env.NODE_ENV === 'development'
const logger = createLogger({ predicate: isDev })

const enhancer = composeWithDevTools(applyMiddleware(thunk, logger))

const createStore = rootReducer => reduxCreateStore(rootReducer, enhancer)

export default createStore
