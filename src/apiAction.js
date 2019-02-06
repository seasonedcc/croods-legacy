import humps from 'lodash-humps'

import snakeCase from './snakeCase'
import parseError from './parseError'
import requestLogger from './requestLogger'

const fetchOptions = async ({
  method = 'get',
  params,
  credentials,
  headers = {},
}) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const customHeaders = await (typeof headers === 'function'
    ? headers(defaultHeaders)
    : headers)

  const options = {
    method,
    credentials,
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
  }

  if (params) {
    options.body = JSON.stringify(snakeCase(params))
  }

  return options
}

const jsonResponse = async response => {
  const body = await response.text()
  const contentType = response.headers.get('content-type')

  let json
  if (contentType && contentType.match(/application\/json/)) {
    json = humps(JSON.parse(body))
  } else {
    json = {
      id: `${response.status}`,
      message: body,
    }
  }

  return json
}

const dispatchError = (dispatch, options) => async response => {
  const { parentId, prefix, requestAttributes } = options

  const json = await jsonResponse(response)

  dispatch({
    parentId,
    type: `${prefix}_FAILURE`,
    ...requestAttributes,
    error: parseError(json),
  })
}

const dispatchResponse = (dispatch, options) => async response => {
  const { parentId, prefix, parseResponse, requestAttributes } = options
  const { afterCreate, afterSuccess, afterFailure, afterResponse } = options

  const json = await jsonResponse(response)

  if (response.ok) {
    const parsedResponse = parseResponse && (await parseResponse(json, response, requestAttributes))
    dispatch({
      parentId,
      type: `${prefix}_SUCCESS`,
      ...parsedResponse,
    })
    afterSuccess && (await afterSuccess(response, json))
    prefix.includes('/CREATE') && afterCreate && (await afterCreate(parsedResponse || json))
  } else {
    dispatch({
      parentId,
      type: `${prefix}_FAILURE`,
      ...requestAttributes,
      error: parseError(json),
    })
    afterFailure && (await afterFailure(response, json))
  }
  afterResponse && (await afterResponse(response, json))
}

const dispatchAction = async (dispatch, { debugRequests, ...options }) => {
  const { baseUrl, path, parentId, prefix, requestAttributes } = options

  dispatch({ parentId, type: `${prefix}_REQUEST`, ...requestAttributes })

  const url = `${baseUrl}${path}`
  const fetchParams = await fetchOptions(options)

  debugRequests && requestLogger(url, fetchParams)

  return fetch(url, fetchParams).then(
    dispatchResponse(dispatch, options),
    dispatchError(dispatch, options),
  )
}

const apiAction = options => dispatch => dispatchAction(dispatch, options)

export default apiAction
