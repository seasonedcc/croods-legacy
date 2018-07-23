import fetchList from '../fetchList'

jest.mock('../action', () => props => props)

const path = '/foo'

describe('without a custom parse function', () => {
  it('returns the correct action', () => {
    const options = { foo: 'bar' }

    expect(fetchList(options)(path)).toEqual({
      foo: 'bar',
      customParse: undefined,
      defaultParse: expect.anything(),
      prefix: 'FETCH_LIST',
      requestAttributes: { path },
    })
  })
})

describe('with a custom parse function', () => {
  it('returns the correct action', () => {
    const parseListResponse = () => 'foo'
    const options = { foo: 'bar', parseListResponse }

    expect(fetchList(options)(path)).toEqual({
      foo: 'bar',
      customParse: parseListResponse,
      parseListResponse,
      defaultParse: expect.anything(),
      prefix: 'FETCH_LIST',
      requestAttributes: { path },
    })
  })
})

describe('defaultParse', () => {
  it('returns the created object', () => {
    const options = { foo: 'bar' }

    const listAction = fetchList(options)(path)
    expect(listAction.defaultParse({ foo: 'bar' })).toEqual({
      list: { foo: 'bar' },
    })
  })
})
