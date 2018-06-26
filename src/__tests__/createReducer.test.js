import createReducer from '../createReducer'

jest.mock('../prefixedReducer', () => props => props)
jest.mock('../apiReducer', () => props => props)
jest.mock('../reducer/api', () => props => props)

it('creates the correct reducer', () => {
  expect(createReducer('foo')).toEqual({
    prefix: '@foo',
    reducer: {
      api: expect.anything(),
      reducer: expect.anything(),
    },
  })
})
