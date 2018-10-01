import update from '../update'

jest.mock('../action', () => props => props)

describe('without a custom parse function', () => {
  it('returns the correct action', () => {
    const options = { foo: 'bar' }
    const params = { bar: 'foo' }

    expect(update(options)({ id: 123, ...params })).toEqual({
      customParse: undefined,
      defaultParse: expect.anything(),
      id: 123,
      foo: 'bar',
      method: 'put',
      prefix: 'UPDATE',
      params,
      requestAttributes: {
        id: 123,
        params,
      },
    })
  })
})

describe('with a custom parse function', () => {
  it('returns the correct action', () => {
    const parseUpdateResponse = () => 'foo'
    const options = { foo: 'bar', parseUpdateResponse }
    const params = { bar: 'foo' }

    expect(update(options)({ id: 123, ...params })).toEqual({
      customParse: parseUpdateResponse,
      parseUpdateResponse,
      defaultParse: expect.anything(),
      id: 123,
      foo: 'bar',
      method: 'put',
      prefix: 'UPDATE',
      params,
      requestAttributes: {
        id: 123,
        params,
      },
    })
  })
})

describe('with params', () => {
  it('returns the correct action and omits flags from params', () => {
    const options = { foo: 'bar' }
    const params = {
      bar: 'foo',
      updating: true,
      updateError: 'foo',
      destroying: true,
      destroyError: 'bar',
    }

    expect(update(options)({ id: 123, ...params })).toEqual({
      customParse: undefined,
      defaultParse: expect.anything(),
      id: 123,
      foo: 'bar',
      method: 'put',
      prefix: 'UPDATE',
      params: { bar: 'foo' },
      requestAttributes: {
        id: 123,
        params: { bar: 'foo' },
      },
    })
  })
})

describe('defaultParse', () => {
  it('returns the created object', () => {
    const options = { foo: 'bar' }

    const updateAction = update(options)(123)
    expect(updateAction.defaultParse({ foo: 'bar' })).toEqual({
      updated: { foo: 'bar' },
    })
  })
})

describe('with a custom method', () => {
  it('returns the correct action', () => {
    const options = { method: 'post' }
    const params = { bar: 'foo' }

    expect(update(options)({ id: 123, ...params })).toEqual({
      customParse: undefined,
      defaultParse: expect.anything(),
      id: 123,
      method: 'post',
      prefix: 'UPDATE',
      params,
      requestAttributes: {
        id: 123,
        params,
      },
    })
  })
})
