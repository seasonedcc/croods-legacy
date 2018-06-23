import parseError from '../parseError'

describe('with a string', () => {
  it('returns an object', () => {
    expect(parseError('fooBar')).toEqual({ id: 'fooBar', message: 'fooBar' })
  })
})

describe('with an error object', () => {
  describe('without message', () => {
    it('returns unknownError', () => {
      const error = { id: 123 }
      expect(parseError(error)).toEqual({
        id: 'unknownError',
        message: 'Ooops, there was an error.',
      })
    })
  })

  describe('without id', () => {
    it('returns an object with id = message', () => {
      const error = { message: 'fooBar' }
      expect(parseError(error)).toEqual({ id: 'fooBar', message: 'fooBar' })
    })
  })

  describe('with id and message', () => {
    it('returns an object with id and message', () => {
      const error = { id: 123, message: 'fooBar' }
      expect(parseError(error)).toEqual({ id: 123, message: 'fooBar' })
    })
  })
})

describe('with an error object that contains an errors object', () => {
  describe('with fullMessages', () => {
    it('returns an error object', () => {
      const error = { errors: { fullMessages: 'fooBar' } }
      expect(parseError(error)).toEqual({
        error,
        id: 'foo bar',
        message: 'fooBar',
      })
    })
  })

  describe('without fullMessages', () => {
    it('returns an error object', () => {
      const error = { errors: 'fooBar' }
      expect(parseError(error)).toEqual({
        error,
        id: 'foo bar',
        message: 'fooBar',
      })
    })
  })

  describe('with an array of messages', () => {
    it('returns the head of the array', () => {
      const error = { errors: ['fooBar', 'barfoo'] }
      expect(parseError(error)).toEqual({
        error,
        id: 'foo bar',
        message: 'fooBar',
      })
    })
  })
})

describe('with network error', () => {
  it('returns the correct error', () => {
    const error = new TypeError('NetworkError Foo bar')
    expect(parseError(error)).toEqual({
      id: 'NetworkError',
      message:
        'Não foi possível se contectar ao servidor. Tente novamente em alguns minutos.',
    })
  })
})

describe('with an unrecognized error object', () => {
  it('returns an object with id and message', () => {
    const error = new TypeError('Foo bar')
    expect(parseError(error)).toEqual({ id: 'TypeError', message: 'Foo bar' })
  })
})
