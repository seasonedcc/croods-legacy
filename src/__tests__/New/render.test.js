import React from 'react'
import { connect } from 'react-redux'
import renderer from 'react-test-renderer'

import New from '../../New'
import mapStateToProps from '../../mapStateToProps'
import mapDispatchToProps from '../../mapDispatchToProps'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

const render = jest.fn((newProps, props) => (
  <div {...newProps} {...props}>
    New
  </div>
))

const actions = { resetCreated: jest.fn() }

beforeEach(() => {
  render.mockClear()
  actions.resetCreated.mockClear()
})

it('renders correctly', () => {
  const props = { name: 'colors', render, actions }
  const tree = renderer.create(<New {...props} />).toJSON()

  expect(tree).toMatchSnapshot()
  expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
  expect(actions.resetCreated).not.toHaveBeenCalled()
})

describe('with renderCreated and without created', () => {
  it('renders new', () => {
    const renderCreated = jest.fn(created => <div>Created: {created}</div>)
    const props = { name: 'colors', render, actions, renderCreated }
    const tree = renderer.create(<New {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('with renderCreated and created', () => {
  it('renders both new and created', () => {
    const renderCreated = jest.fn(created => <div {...created}>Created </div>)
    const props = {
      name: 'colors',
      render,
      actions,
      renderCreated,
      created: { foo: 'bar' },
    }
    const tree = renderer.create(<New {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe('without renderCreated and with created', () => {
  it('renders new', () => {
    const props = { name: 'colors', render, actions, created: { foo: 'bar' } }
    const tree = renderer.create(<New {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
