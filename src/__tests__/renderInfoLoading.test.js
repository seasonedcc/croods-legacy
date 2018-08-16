import renderInfoLoading from '../renderInfoLoading'

describe('with a function with fetching', () => {
  const props = {
    renderLoading: jest.fn(() => 'loading'),
    fetchingInfo: true,
  }

  it('renders loading', () => {
    renderInfoLoading(props)
    expect(props.renderLoading).toHaveBeenCalledWith({})
  })
})

describe('with a function, without info', () => {
  const props = {
    renderLoading: jest.fn(() => 'loading'),
    info: undefined,
  }

  it('renders loading', () => {
    renderInfoLoading(props)
    expect(props.renderLoading).toHaveBeenCalledWith({})
  })
})

describe('with a function with info', () => {
  const props = {
    renderLoading: jest.fn(() => 'loading'),
    info: { foo: 'bar' },
  }

  it('renders loading', () => {
    renderInfoLoading(props)
    expect(props.renderLoading).not.toHaveBeenCalled()
  })
})

describe('without a function', () => {
  const props = {
    info: undefined,
    fetchingInfo: true,
  }

  it('returns null', () => {
    expect(renderInfoLoading(props)).toBe(null)
  })
})
