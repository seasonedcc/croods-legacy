import resetCreated from '../resetCreated'

it('returns the correct action', () => {
  const options = { name: 'foo' }
  expect(resetCreated(options)()).toEqual({
    type: '@foo/RESET_CREATED',
  })
})
