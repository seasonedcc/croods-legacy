import fetchList from '../fetchList'

jest.mock('../action', () => props => props)

describe('without a custom parse function', () => {
  it('returns the correct action', () => {
    const options = { foo: 'bar' }

    expect(fetchList(options)()).toEqual({
      foo: 'bar',
      customParse: undefined,
      defaultParse: expect.anything(),
      prefix: 'FETCH_LIST',
    })
  })
})

describe('with a custom parse function', () => {
  it('returns the correct action', () => {
    const parseListResponse = () => 'foo'
    const options = { foo: 'bar', parseListResponse }

    expect(fetchList(options)()).toEqual({
      foo: 'bar',
      customParse: parseListResponse,
      parseListResponse,
      defaultParse: expect.anything(),
      prefix: 'FETCH_LIST',
    })
  })
})

describe('defaultParse', () => {
  it('returns the created object', () => {
    const options = { foo: 'bar' }

    const listAction = fetchList(options)()
    expect(listAction.defaultParse({ foo: 'bar' })).toEqual({
      list: { foo: 'bar' },
    })
  })
})
