import destroy from '../destroy'

jest.mock('../action', () => props => props)

describe('without a custom parse function', () => {
  it('returns the correct action', () => {
    const options = { foo: 'bar' }

    expect(destroy(options)(123)).toEqual({
      customParse: undefined,
      defaultParse: expect.anything(),
      id: 123,
      foo: 'bar',
      method: 'delete',
      prefix: 'DESTROY',
      requestAttributes: {
        id: 123,
      },
    })
  })
})

describe('with a custom parse function', () => {
  it('returns the correct action', () => {
    const parseDestroyResponse = () => 'foo'
    const options = { foo: 'bar', parseDestroyResponse }

    expect(destroy(options)(123)).toEqual({
      customParse: parseDestroyResponse,
      parseDestroyResponse,
      defaultParse: expect.anything(),
      id: 123,
      foo: 'bar',
      method: 'delete',
      prefix: 'DESTROY',
      requestAttributes: {
        id: 123,
      },
    })
  })
})

describe('defaultParse', () => {
  it('returns the created object', () => {
    const options = { foo: 'bar' }

    const destroyAction = destroy(options)(123)
    expect(destroyAction.defaultParse({ foo: 'bar' })).toEqual({
      destroyed: { foo: 'bar' },
    })
  })
})
