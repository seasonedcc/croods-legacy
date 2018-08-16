import React from 'react'
import { connect } from 'react-redux'
import renderer from 'react-test-renderer'

import Update from '../../Update'
import mapStateToProps from '../../mapStateToProps'
import mapDispatchToProps from '../../mapDispatchToProps'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

const render = jest.fn((update, props) => {
  update && update()
  return (
    <div update={update} {...props}>
      Update
    </div>
  )
})

const actions = { update: jest.fn(), resetUpdated: jest.fn() }

beforeEach(() => {
  render.mockClear()
  actions.resetUpdated.mockClear()
})

it('renders correctly', () => {
  const props = { name: 'colors', attributes: {}, render, actions, id: 123 }
  const tree = renderer.create(<Update {...props} />).toJSON()

  expect(tree).toMatchSnapshot()
  expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
  expect(actions.resetUpdated).not.toHaveBeenCalled()
  expect(actions.update).toHaveBeenCalledWith({ id: 123 })
})

describe('when updated', () => {
  it('resets updated', () => {
    const updated = { id: 123 }
    const props = {
      name: 'colors',
      attributes: {},
      render,
      actions,
      id: 123,
      updated,
    }
    const tree = renderer.create(<Update {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
    expect(actions.resetUpdated).toHaveBeenCalledWith()
  })
})
