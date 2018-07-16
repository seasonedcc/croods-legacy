import resetCreateError from '../resetCreateError'

it('returns the correct action', () => {
  const options = { name: 'foo' }
  expect(resetCreateError(options)()).toEqual({
    type: '@foo/RESET_CREATE_ERROR',
  })
})
