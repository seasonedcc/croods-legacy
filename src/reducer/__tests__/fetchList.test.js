import fetchList from '../fetchList'

const options = {}

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    expect(fetchList(options)(state)).toEqual({ foo: 'bar' })
  })
})

describe('with unknown action type', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/FOO' }

    expect(fetchList(options)(state, action)).toEqual({ foo: 'bar' })
  })
})

describe('with REQUEST action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/REQUEST', path: '/lists/' }

    expect(fetchList(options)(state, action)).toEqual({
      foo: 'bar',
      listPath: action.path,
      fetchingList: true,
      listError: null,
    })
  })
})

describe('with FAILURE action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/FAILURE', error: { message: 'fooError' } }

    expect(fetchList(options)(state, action)).toEqual({
      foo: 'bar',
      fetchingList: false,
      listError: 'fooError',
    })
  })
})

describe('with SUCCESS action', () => {
  const list = [{ id: 1 }, { id: 2 }]
  const state = { foo: 'bar' }
  const action = { type: '@bar/SUCCESS', list }
  it('returns the correct state', () => {
    expect(fetchList(options)(state, action)).toEqual({
      foo: 'bar',
      list,
      fetchingList: false,
    })
  })
})
