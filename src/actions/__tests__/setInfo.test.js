import setInfo from '../setInfo'

it('returns the correct action', () => {
  const options = { name: 'foo' }
  const info = { bar: 'baz' }

  expect(setInfo(options)(info)).toEqual({
    type: '@foo/SET_INFO',
    info,
  })
})
