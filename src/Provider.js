import React from 'react'
import PropTypes from 'prop-types'

import { Provider as ContextProvider } from './Context'

const Provider = ({ children, ...options }) => (
  <ContextProvider value={options}>{children}</ContextProvider>
)

Provider.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  credentials: PropTypes.string,
  headers: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  renderLoading: PropTypes.func,
  renderError: PropTypes.func,
  afterSuccess: PropTypes.func,
}

Provider.defaultProps = {
  renderLoading: () => <div>Loading...</div>,
  renderError: error => <div style={{ color: 'red' }}>{error}</div>,
}

export default Provider
