import React from 'react'
import renderer from 'react-test-renderer'

import List from '../../List'

jest.mock('../../withOptions', () => Component => Component)

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
const parentId = { toString: jest.fn(() => '1234') }

const props = { actions, render, listPath: path, path, list: ['foo', 'bar'] }

describe('when path changes', () => {
  it('calls fetchList with new path', () => {
    const tree = renderer.create(<List {...props} />)

    actions.fetchList.mockClear()
    const props2 = {
      actions,
      render,
      listPath: '/bar',
      path: '/bar',
      list: ['foo', 'bar'],
    }
    tree.update(<List {...props2} />)
    expect(actions.fetchList).toHaveBeenCalledWith('/bar')
  })
})

describe('when parentId changes', () => {
  it('call fetchList with path', () => {
    const tree = renderer.create(<List {...props} parentId={parentId} />)

    actions.fetchList.mockClear()
    const newParentId = { toString: jest.fn(() => '4321') }
    tree.update(<List {...props} parentId={newParentId} />)
    expect(actions.fetchList).toHaveBeenCalledWith('/foo')
  })
})

describe('when nothing changes', () => {
  it('does not call fetchList', () => {
    const tree = renderer.create(<List {...props} parentId={parentId} />)

    actions.fetchList.mockClear()
    tree.update(<List {...props} parentId={parentId} />)
    expect(actions.fetchList).not.toHaveBeenCalled()
  })
})
