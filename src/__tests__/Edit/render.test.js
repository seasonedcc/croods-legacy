import React from 'react'
import { connect } from 'react-redux'
import renderer from 'react-test-renderer'

import Edit from '../../Edit'
import mapStateToProps from '../../mapStateToProps'
import mapDispatchToProps from '../../mapDispatchToProps'
import setOrFetchInfo from '../../setOrFetchInfo'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

jest.mock('../../setOrFetchInfo', () => jest.fn())

const render = jest.fn((editProps, props) => (
  <div {...editProps} {...props}>
    Edit
  </div>
))

const actions = { update: jest.fn() }

beforeEach(() => {
  render.mockClear()
  setOrFetchInfo.mockClear()
})

it('renders correctly', () => {
  const props = { id: 1, name: 'colors', render, actions }
  const tree = renderer.create(<Edit {...props} />).toJSON()

  expect(tree).toMatchSnapshot()
  expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
  expect(setOrFetchInfo).toHaveBeenCalledWith(props)
})

describe('with renderError and without infoError', () => {
  it('renders edit', () => {
    const renderError = jest.fn(error => <div>Error: {error}</div>)
    const props = { render, actions, renderError }
    const tree = renderer
      .create(<Edit id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('with renderError and infoError', () => {
  it('renders error', () => {
    const renderError = jest.fn(error => <div>Error: {error}</div>)
    const props = { render, actions, renderError, infoError: 'foo' }
    const tree = renderer
      .create(<Edit id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('with renderLoading and fetchingInfo', () => {
  it('renders loading correctly', () => {
    const renderLoading = jest.fn(() => <div>Loading</div>)
    const props = { render, actions, fetchingInfo: true, renderLoading }
    const tree = renderer
      .create(<Edit id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).not.toHaveBeenCalled()
  })
})

describe('with renderLoading and info', () => {
  it('renders edit correctly', () => {
    const renderLoading = jest.fn(() => <div>Loading</div>)
    const props = { render, actions, renderLoading, info: { foo: 'bar' } }
    const tree = renderer
      .create(<Edit id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('without renderLoading and with fetchingInfo', () => {
  it('renders edit correctly', () => {
    const props = { render, actions, fetchingInfo: true }
    const tree = renderer
      .create(<Edit id={1} name="colors" {...props} />)
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
      actions,
      fetchingInfo: true,
      renderLoading,
      info: { foo: 'bar' },
    }

    const tree = renderer
      .create(<Edit id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).not.toHaveBeenCalled()
  })
})

describe('with renderUpdated and updated', () => {
  it('renders updated', () => {
    const renderUpdated = jest.fn(updated => <div {...updated}>Updated</div>)
    const props = {
      render,
      actions,
      renderUpdated,
      updated: { foo: 'bar' },
    }

    const tree = renderer
      .create(<Edit id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).not.toHaveBeenCalled()
  })
})

describe('with renderUpdated and not updated', () => {
  it('renders edit', () => {
    const renderUpdated = jest.fn(updated => <div {...updated}>Updated</div>)
    const props = {
      render,
      actions,
      renderUpdated,
    }

    const tree = renderer
      .create(<Edit id={1} name="colors" {...props} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
