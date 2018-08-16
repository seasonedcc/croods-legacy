import PropTypes from 'prop-types'

export default {
  baseUrl: PropTypes.string, // match http(s)://url
  credentials: PropTypes.string,
  headers: PropTypes.oneOfType([PropTypes.func, PropTypes.object]), // ({ Accept, 'Content-Type' }) -> Object
  renderLoading: PropTypes.func, // undefined -> Html
  renderError: PropTypes.func, // error -> Html
  afterSuccess: PropTypes.func, // (response, json)
  parseResponse: PropTypes.func, // (json, response, requestAttributes) -> Object
}
