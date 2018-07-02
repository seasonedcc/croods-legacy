import createReducer from '../createReducer'

jest.mock('../prefixedReducer', () => ({ prefix, reducer }) => ({
  prefix,
  reducer,
}))

jest.mock('../apiReducer', () => (api, reducer) => state => state)
jest.mock('../reducer/api', () => options => state => state)

it('creates the correct reducer', () => {
  expect(createReducer('foo')).toEqual({
    prefix: '@foo',
    reducer: expect.anything(),
  })
})
