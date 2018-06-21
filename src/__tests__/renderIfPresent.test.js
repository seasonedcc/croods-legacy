import renderIfPresent from '../renderIfPresent'

describe('with a function and content', () => {
  it('calls the function with content', () => {
    expect(renderIfPresent(props => props, 'foo')).toEqual('foo')
  })
})

describe('without a function with content', () => {
  it('returns null', () => {
    expect(renderIfPresent(null, 'foo')).toEqual(null)
    expect(renderIfPresent(undefined, 'foo')).toEqual(null)
  })
})

describe('with a function without content', () => {
  it('returns null', () => {
    expect(renderIfPresent(props => props, null)).toEqual(null)
    expect(renderIfPresent(props => props, undefined)).toEqual(null)
  })
})
