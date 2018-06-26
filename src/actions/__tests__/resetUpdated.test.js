import resetUpdated from '../resetUpdated'

it('returns the correct action', () => {
  const options = { name: 'foo' }
  expect(resetUpdated(options)()).toEqual({
    type: '@foo/RESET_UPDATED',
  })
})
