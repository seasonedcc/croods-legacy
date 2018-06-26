import action from '../action'

jest.mock('../../apiAction', () => props => props)

it('returns the correct action', () => {
  const options = { name: 'foo', prefix: 'bar' }

  expect(action(options)).toEqual({
    name: 'foo',
    parseResponse: undefined,
    path: '/foo',
    prefix: '@foo/bar',
  })
})

describe('with path', () => {
  it('sets path', () => {
    const options = { name: 'foo', prefix: 'bar', path: '/foopath/bar' }

    expect(action(options)).toEqual({
      name: 'foo',
      parseResponse: undefined,
      path: '/foopath/bar',
      prefix: '@foo/bar',
    })
  })
})

describe('without path', () => {
  describe('without id', () => {
    it('sets path with name', () => {
      const options = { name: 'foo', prefix: 'bar' }

      expect(action(options)).toEqual({
        name: 'foo',
        parseResponse: undefined,
        path: '/foo',
        prefix: '@foo/bar',
      })
    })
  })

  describe('with id', () => {
    it('sets path with name and id', () => {
      const options = { name: 'foo', id: 123, prefix: 'bar' }

      expect(action(options)).toEqual({
        id: 123,
        name: 'foo',
        parseResponse: undefined,
        path: '/foo/123',
        prefix: '@foo/bar',
      })
    })
  })
})

describe('with parseResponse functions', () => {
  describe('with customParse', () => {
    it('returns parseResponse with customParse', () => {
      const customParse = () => 'foo'
      const parseResponse = () => 'bar'
      const defaultParse = () => 'baz'
      const options = {
        name: 'foo',
        prefix: 'bar',
        customParse,
        parseResponse,
        defaultParse,
      }

      expect(action(options)).toEqual({
        name: 'foo',
        parseResponse: customParse,
        customParse,
        defaultParse,
        path: '/foo',
        prefix: '@foo/bar',
      })
    })
  })

  describe('without customParse with parseResponse', () => {
    it('returns parseResponse with parseResponse', () => {
      const parseResponse = () => 'bar'
      const defaultParse = () => 'baz'
      const options = {
        name: 'foo',
        prefix: 'bar',
        parseResponse,
        defaultParse,
      }

      expect(action(options)).toEqual({
        name: 'foo',
        defaultParse,
        parseResponse,
        path: '/foo',
        prefix: '@foo/bar',
      })
    })
  })

  describe('without customParse without parseResponse', () => {
    it('returns defaultParse', () => {
      const defaultParse = () => 'baz'
      const options = {
        name: 'foo',
        prefix: 'bar',
        defaultParse,
      }

      expect(action(options)).toEqual({
        name: 'foo',
        defaultParse,
        parseResponse: defaultParse,
        path: '/foo',
        prefix: '@foo/bar',
      })
    })
  })
})
