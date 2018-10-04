import fetchInfo from '../fetchInfo'

const options = {}

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    expect(fetchInfo(options)(state)).toEqual({ foo: 'bar' })
  })
})

describe('with unknown action type', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/FOO' }

    expect(fetchInfo(options)(state, action)).toEqual({ foo: 'bar' })
  })
})

describe('with REQUEST action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/REQUEST' }

    expect(fetchInfo(options)(state, action)).toEqual({
      foo: 'bar',
      fetchingInfo: true,
      infoError: null,
    })
  })
})

describe('with FAILURE action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/FAILURE', error: { message: 'fooError' } }

    expect(fetchInfo(options)(state, action)).toEqual({
      foo: 'bar',
      fetchingInfo: false,
      infoError: 'fooError',
    })
  })
})

describe('with SUCCESS action', () => {
  const state = { foo: 'bar' }
  const info = { id: 789 }
  const action = { type: '@bar/SUCCESS', info }
  it('returns the correct state', () => {
    expect(fetchInfo(options)(state, action)).toEqual({
      foo: 'bar',
      info,
      fetchingInfo: false,
    })
  })
})
