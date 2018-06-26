import fetchInfo from '../fetchInfo'

jest.mock('../action', () => props => props)

describe('without a custom parse function', () => {
  it('returns the correct action', () => {
    const options = { foo: 'bar' }

    expect(fetchInfo(options)(123)).toEqual({
      foo: 'bar',
      customParse: undefined,
      id: 123,
      defaultParse: expect.anything(),
      prefix: 'FETCH_INFO',
    })
  })
})

describe('with a custom parse function', () => {
  it('returns the correct action', () => {
    const parseInfoResponse = () => 'foo'
    const options = { foo: 'bar', parseInfoResponse }

    expect(fetchInfo(options)(123)).toEqual({
      foo: 'bar',
      customParse: parseInfoResponse,
      parseInfoResponse,
      id: 123,
      defaultParse: expect.anything(),
      prefix: 'FETCH_INFO',
    })
  })
})

describe('defaultParse', () => {
  it('returns the created object', () => {
    const options = { foo: 'bar' }

    const infoAction = fetchInfo(options)(123)
    expect(infoAction.defaultParse({ foo: 'bar' })).toEqual({
      info: { foo: 'bar' },
    })
  })
})
