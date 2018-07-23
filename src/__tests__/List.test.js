import React from 'react'
import { connect } from 'react-redux'
import renderer from 'react-test-renderer'

import List from '../List'
import mapStateToProps from '../mapStateToProps'
import mapDispatchToProps from '../mapDispatchToProps'

jest.mock('../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

const path = '/foo'

const render = jest.fn((list, props) => (
  <div list={list} {...props}>
    List
  </div>
))

const actions = { fetchList: jest.fn() }

beforeEach(() => {
  render.mockClear()
  actions.fetchList.mockClear()
})

it('renders correctly', () => {
  const props = { actions, render, path }
  const tree = renderer.create(<List {...props} />).toJSON()

  expect(tree).toMatchSnapshot()
  expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
  expect(actions.fetchList).toHaveBeenCalledWith(path)
})

it('renders correctly with a previous list', () => {
  const props = { actions, render, listPath: path, path, list: ['foo', 'bar'] }
  const tree = renderer.create(<List {...props} />).toJSON()

  expect(tree).toMatchSnapshot()
  expect(actions.fetchList).not.toHaveBeenCalled()
})

describe('with errors', () => {
  it('with renderError, renders error correctly', () => {
    const renderError = jest.fn(error => <div>Error: {error}</div>)
    const props = { actions, render, path, listError: 'foo', renderError }
    const tree = renderer.create(<List {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).not.toHaveBeenCalledWith()
  })

  it('without renderError, renders list', () => {
    const props = { actions, render, path, listError: 'foo' }
    const tree = renderer.create(<List {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).toHaveBeenCalled()
  })
})

describe('with renderLoading and fetchingList', () => {
  it('renders loading correctly', () => {
    const renderLoading = jest.fn(() => <div>Loading</div>)
    const props = { actions, render, path, fetchingList: true, renderLoading }
    const tree = renderer.create(<List {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).not.toHaveBeenCalled()
  })
})

describe('with renderLoading and list', () => {
  it('renders list correctly', () => {
    const renderLoading = jest.fn(() => <div>Loading</div>)
    const props = { actions, render, path, renderLoading, list: [1, 2, 3] }
    const tree = renderer.create(<List {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('without renderLoading and with fetchingList', () => {
  it('renders list correctly', () => {
    const props = { actions, render, path, fetchingList: true }
    const tree = renderer.create(<List {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).toHaveBeenCalled()
  })
})

describe('with renderLoading, fetchingList and list', () => {
  it('renders loading', () => {
    const renderLoading = jest.fn(() => <div>Loading</div>)
    const props = {
      actions,
      render,
      path,
      fetchingList: true,
      renderLoading,
      list: [1, 2, 3],
    }

    const tree = renderer.create(<List {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(render).not.toHaveBeenCalled()
  })
})
