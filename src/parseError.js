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

const parseError = error => {
  if (error instanceof Error) {
    return parseJSError(error)
  }
  return error
}

export default parseError
