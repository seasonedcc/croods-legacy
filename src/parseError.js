import humps from 'lodash-humps'
import isArray from 'lodash/isArray'
import head from 'lodash/head'
import uniq from 'lodash/uniq'
import lowerCase from 'lodash/lowerCase'

import snakeCase from './snakeCase'

const parseJSError = error => {
  const { name, message } = error

  if (message.match(/NetworkError/)) {
    return {
      id: 'NetworkError',
      message:
        'Não foi possível se contectar ao servidor. Tente novamente em alguns minutos.',
    }
  }

  return {
    id: humps(name),
    message,
  }
}

const parseObject = error => {
  const { id, message } = error

  if (!message) {
    return {
      id: 'unknownError',
      message: 'Ooops, there was an error.',
    }
  }

  if (!id) {
    return { id: message, message }
  }

  return error
}

const parseErrorArray = error => {
  const messages = error.errors.fullMessages || error.errors
  const message = isArray(messages) ? head(uniq(messages)) : messages
  return {
    id: error.id || error.errors.id || snakeCase(lowerCase(message)),
    message,
    error,
  }
}

const parseError = error => {
  if (error instanceof Error) {
    return parseJSError(error)
  }

  if (typeof error === 'string') {
    return {
      id: error,
      message: error,
    }
  }

  if (error.errors) {
    return parseErrorArray(error)
  }

  return parseObject(error)
}

export default parseError
