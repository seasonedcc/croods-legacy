import apiReducer, {
  parseApiType,
  apiPrefix,
  apiSuffix,
  isApiAction,
} from '../apiReducer'

const ACTION_TYPE = '@colors/FETCH_INFO_SUCCESS'

describe('apiReducer', () => {
  it('returns initialState when nothing is given', () => {
    expect(apiReducer(null, () => 'foo')()).toBe('foo')
  })

  it('returns given state when no action is given', () => {
    expect(apiReducer(null, () => 'foo')('bar')).toBe('bar')
  })

  it('returns given state when no action is given', () => {
    expect(apiReducer(null, () => 'foo')('bar')).toBe('bar')
  })

  it('returns processed state from given reducer when action is not from api', () => {
    const reducer = (state, action) => ({ ...state, info: action.info })
    const initialState = { one: 1 }
    const action = { info: 'foo' }
    expect(apiReducer(null, reducer)(initialState, action)).toEqual({
      one: 1,
      info: 'foo',
    })
  })

  it('returns processed state from api when it is an apiAction', () => {
    const api = (state, action) => ({ ...state, info: action.info })
    const initialState = { one: 1 }
    const action = { type: ACTION_TYPE, info: 'foo' }
    expect(apiReducer(api)(initialState, action)).toEqual({
      one: 1,
      info: 'foo',
    })
  })
})

describe('helpers', () => {
  it('parseApiType', () => {
    const result = parseApiType(ACTION_TYPE)
    expect(result).toEqual(['FETCH_INFO', 'SUCCESS'])
  })

  it('apiPrefix', () => {
    const result = apiPrefix(ACTION_TYPE)
    expect(result).toBe('FETCH_INFO')
  })

  it('apiSuffix', () => {
    const result = apiSuffix(ACTION_TYPE)
    expect(result).toBe('SUCCESS')
  })

  it('isApiAction', () => {
    expect(isApiAction(ACTION_TYPE)).toBe(true)
    expect(isApiAction('@colors/FOO_REQUEST')).toBe(true)
    expect(isApiAction('@colors/FOO_FAILURE')).toBe(true)
    expect(isApiAction('@colors/FOO_BAR')).toBe(false)
  })
})
