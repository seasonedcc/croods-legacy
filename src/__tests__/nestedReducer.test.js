import nestedReducer from '../nestedReducer'

let reducer, subject, initialState

describe('nestedReducer', () => {
  beforeAll(() => {
    reducer = (state, action) =>
      action.type === 'change' ? { ...state, foo: 'bar' } : state
    subject = nestedReducer(reducer)
    initialState = subject([], {})
  })

  it('returns initialState when a blank state is given', () => {
    const result = initialState[0]
    expect(result).toHaveProperty('parentId', undefined)
    expect(result).toHaveProperty('state.list', null)
  })

  it('returns an initialState even if no reducer is given', () => {
    const result = nestedReducer()([])[0]
    expect(result).toHaveProperty('parentId', undefined)
    expect(result).toHaveProperty('state.list', null)
  })

  it('changes the initialState if no parentId is given', () => {
    const result = subject(initialState, { type: 'change' })[0]
    expect(result).toHaveProperty('parentId', undefined)
    expect(result).toHaveProperty('state.foo', 'bar')
  })

  it('adds another initialState and reduces it if an unused parentId is given', () => {
    const result = subject(initialState, { type: 'change', parentId: 1234 })
    expect(result.length).toBe(2)
    expect(result[1]).toHaveProperty('parentId', 1234)
    expect(result[1]).toHaveProperty('state.foo', 'bar')
  })

  it('changes state of block based on parentId', () => {
    const state = subject(initialState, { parentId: 1234 })
    const result = subject(state, { parentId: 1234, type: 'change' })
    expect(state[1]).toHaveProperty('parentId', 1234)
    expect(state[1]).toHaveProperty('state.foo', undefined)
    expect(result[1]).toHaveProperty('parentId', 1234)
    expect(result[1]).toHaveProperty('state.foo', 'bar')
  })
})
