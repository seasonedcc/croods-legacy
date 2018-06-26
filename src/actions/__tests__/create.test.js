import create from '../create'

jest.mock('../action', () => props => props)

describe('without a custom parse function', () => {
  it('returns the correct action', () => {
    const options = { foo: 'bar' }
    const params = { baz: 'quu' }

    expect(create(options)(params)).toEqual({
      customParse: undefined,
      defaultParse: expect.anything(),
      foo: 'bar',
      method: 'post',
      prefix: 'CREATE',
      params,
    })
  })
})

describe('with a custom parse function', () => {
  it('returns the correct action', () => {
    const parseCreateResponse = () => 'foo'
    const options = { foo: 'bar', parseCreateResponse }
    const params = { baz: 'quu' }

    expect(create(options)(params)).toEqual({
      customParse: parseCreateResponse,
      parseCreateResponse,
      defaultParse: expect.anything(),
      foo: 'bar',
      method: 'post',
      prefix: 'CREATE',
      params,
    })
  })
})

describe('defaultParse', () => {
  it('returns the created object', () => {
    const options = { foo: 'bar' }
    const params = { baz: 'quu' }

    const createAction = create(options)(params)
    expect(createAction.defaultParse({ foo: 'bar' })).toEqual({
      created: { foo: 'bar' },
    })
  })
})
