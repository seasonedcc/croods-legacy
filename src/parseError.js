import humps from 'lodash-humps'

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

  return parseObject(error)
}

export default parseError
