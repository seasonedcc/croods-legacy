import React from 'react'
import PropTypes from 'prop-types'
import customPropTypes from './customPropTypes'

import providerProps from './providerProps'
import { Provider as ContextProvider } from './Context'

const Provider = ({ children, ...options }) => (
  <ContextProvider value={options}>{children}</ContextProvider>
)

Provider.propTypes = {
  ...providerProps,
  baseUrl: customPropTypes.url.isRequired, // match http(s)://url
  parseListResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
  parseInfoResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
  parseCreateResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
  parseDestroyResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
  parseUpdateResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
}

Provider.defaultProps = {
  renderLoading: () => <div>Loading...</div>,
  renderError: error => <div style={{ color: 'red' }}>{error}</div>,
}

export default Provider
