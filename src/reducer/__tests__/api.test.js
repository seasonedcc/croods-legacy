import api from '../api'

jest.mock('../fetchList', () => (state, action) => ({
  name: 'fetchList',
  state,
  action,
}))
jest.mock('../fetchInfo', () => (state, action) => ({
  name: 'fetchInfo',
  state,
  action,
}))
jest.mock('../create', () => (state, action) => ({
  name: 'create',
  state,
  action,
}))
jest.mock('../update', () => (state, action) => ({
  name: 'update',
  state,
  action,
}))
jest.mock('../destroy', () => (state, action) => ({
  name: 'destroy',
  state,
  action,
}))

describe('without parameters', () => {
  it('returns undefined', () => {
    expect(api()).toEqual(undefined)
  })
})

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }

    expect(api(state)).toEqual(state)
  })
})

describe('with unknown action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@foo/BAR_BAZ' }

    expect(api(state, action)).toEqual(state)
  })
})

describe('with FETCH_LIST action', () => {
  it('returns fetchList reducer', () => {
    const state = { foo: 'bar' }
    const action = { type: '@foo/FETCH_LIST_FOO' }

    expect(api(state, action)).toEqual({
      action: { type: '@foo/FETCH_LIST_FOO' },
      name: 'fetchList',
      state: { foo: 'bar' },
    })
  })
})

describe('with FETCH_INFO action', () => {
  it('returns fetchInfo reducer', () => {
    const state = { foo: 'bar' }
    const action = { type: '@foo/FETCH_INFO_FOO' }

    expect(api(state, action)).toEqual({
      action: { type: '@foo/FETCH_INFO_FOO' },
      name: 'fetchInfo',
      state: { foo: 'bar' },
    })
  })
})

describe('with CREATE action', () => {
  it('returns create reducer', () => {
    const state = { foo: 'bar' }
    const action = { type: '@foo/CREATE_FOO' }

    expect(api(state, action)).toEqual({
      action: { type: '@foo/CREATE_FOO' },
      name: 'create',
      state: { foo: 'bar' },
    })
  })
})

describe('with UPDATE action', () => {
  it('returns update reducer', () => {
    const state = { foo: 'bar' }
    const action = { type: '@foo/UPDATE_FOO' }

    expect(api(state, action)).toEqual({
      action: { type: '@foo/UPDATE_FOO' },
      name: 'update',
      state: { foo: 'bar' },
    })
  })
})

describe('with DESTROY action', () => {
  it('returns destroy reducer', () => {
    const state = { foo: 'bar' }
    const action = { type: '@foo/DESTROY_FOO' }

    expect(api(state, action)).toEqual({
      action: { type: '@foo/DESTROY_FOO' },
      name: 'destroy',
      state: { foo: 'bar' },
    })
  })
})
