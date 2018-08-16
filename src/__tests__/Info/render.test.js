import React from 'react'
import { connect } from 'react-redux'
import renderer from 'react-test-renderer'

import Info from '../../Info'
import mapStateToProps from '../../mapStateToProps'
import mapDispatchToProps from '../../mapDispatchToProps'
import setOrFetchInfo from '../../setOrFetchInfo'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

jest.mock('../../setOrFetchInfo', () => jest.fn())

const render = jest.fn((info, props) => (
  <div info={info} {...props}>
    Info
  </div>
))

beforeEach(() => {
  render.mockClear()
  setOrFetchInfo.mockClear()
})

it('renders correctly', () => {
  const props = { id: 1, name: 'colors', render }
  const tree = renderer.create(<Info {...props} />).toJSON()

  expect(tree).toMatchSnapshot()
  expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
  expect(setOrFetchInfo).toHaveBeenCalledWith(props)
})

describe('with renderError and without infoError', () => {
  it('renders Info', () => {
    const renderError = jest.fn(error => <div>Error: {error}</div>)
    const props = { render, renderError }
    const tree = renderer
      .create(<Info id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('with renderError and infoError', () => {
  it('renders error', () => {
    const renderError = jest.fn(error => <div>Error: {error}</div>)
    const props = { render, renderError, infoError: 'foo' }
    const tree = renderer
      .create(<Info id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('with renderLoading and fetchingInfo', () => {
  it('renders loading correctly', () => {
    const renderLoading = jest.fn(() => <div>Loading</div>)
    const props = { render, fetchingInfo: true, renderLoading }
    const tree = renderer
      .create(<Info id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).not.toHaveBeenCalled()
  })
})

describe('with renderLoading and info', () => {
  it('renders info correctly', () => {
    const renderLoading = jest.fn(() => <div>Loading</div>)
    const props = { render, renderLoading, info: { foo: 'bar' } }
    const tree = renderer
      .create(<Info id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('without renderLoading and with fetchingInfo', () => {
  it('renders info correctly', () => {
    const props = { render, fetchingInfo: true }
    const tree = renderer
      .create(<Info id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).toHaveBeenCalled()
  })
})

describe('with renderLoading, fetchingInfo and info', () => {
  it('renders loading', () => {
    const renderLoading = jest.fn(() => <div>Loading</div>)
    const props = {
      render,
      fetchingInfo: true,
      renderLoading,
      info: { foo: 'bar' },
    }

    const tree = renderer
      .create(<Info id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).not.toHaveBeenCalled()
  })
})
