import PropTypes from 'prop-types'

import customPropTypes from './customPropTypes'

export default {
  baseUrl: customPropTypes.url,
  credentials: PropTypes.string,
  headers: PropTypes.oneOfType([PropTypes.func, PropTypes.object]), // ({ Accept, 'Content-Type' }) -> Object
  renderLoading: PropTypes.func, // undefined -> Html
  renderError: PropTypes.func, // error -> Html
  afterSuccess: PropTypes.func, // (response, json)

  /** Logs requests parameters to the console: method, credentials and headers */
  debugRequests: PropTypes.bool,


  /** Parse responses to adjust the API to croods patterns */
  parseResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
}
