import prefixedReducer, { suffix } from '../prefixedReducer'

describe('without action', () => {
  describe('with state', () => {
    it('returns the state', () => {
      const prefix = 'foo'
      const reducer = jest.fn()
      const state = { bar: 'baz' }
      const action = null

      expect(prefixedReducer({ prefix, reducer })(state, action)).toEqual(state)
    })
  })

  describe('without state', () => {
    it('returns the result of the reducer', () => {
      const prefix = 'foo'
      const reducer = jest.fn(() => 'quu')
      const state = null
      const action = null

      expect(prefixedReducer({ prefix, reducer })(state, action)).toEqual('quu')
      expect(reducer).toHaveBeenCalledWith()
    })
  })
})

describe('with a different prefix', () => {
  describe('with state', () => {
    it('returns the state', () => {
      const prefix = 'foo'
      const reducer = jest.fn()
      const state = { baz: 'quu' }
      const action = { type: 'bar' }

      expect(prefixedReducer({ prefix, reducer })(state, action)).toEqual(state)
    })
  })

  describe('without state', () => {
    it('returns the result of the reducer', () => {
      const prefix = 'foo'
      const reducer = jest.fn(() => 'quu')
      const state = null
      const action = { type: 'bar' }

      expect(prefixedReducer({ prefix, reducer })(state, action)).toEqual('quu')
      expect(reducer).toHaveBeenCalledWith()
    })
  })
})

describe('with the same prefix', () => {
  describe('with state', () => {
    it('calls reducer with state and action', () => {
      const prefix = 'foo'
      const reducer = jest.fn()
      const state = { baz: 'quu' }
      const action = { type: 'foo' }

      prefixedReducer({ prefix, reducer })(state, action)
      expect(reducer).toHaveBeenCalledWith(state, action)
    })
  })
})

describe('suffix', () => {
  it('returns the action suffix', () => {
    expect(suffix('@foo/BAR_REQUEST')).toBe('BAR_REQUEST')
  })
})
