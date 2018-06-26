import resetDestroyed from '../resetDestroyed'

it('returns the correct action', () => {
  const options = { name: 'foo' }
  expect(resetDestroyed(options)()).toEqual({
    type: '@foo/RESET_DESTROYED',
  })
})
