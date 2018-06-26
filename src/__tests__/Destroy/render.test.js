import React from 'react'
import { connect } from 'react-redux'
import renderer from 'react-test-renderer'

import Destroy from '../../Destroy'
import mapStateToProps from '../../mapStateToProps'
import mapDispatchToProps from '../../mapDispatchToProps'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

const render = jest.fn((destroy, props) => {
  destroy && destroy()
  return (
    <div destroy={destroy} {...props}>
      Destroy
    </div>
  )
})

const actions = { destroy: jest.fn(), resetDestroyed: jest.fn() }

beforeEach(() => {
  render.mockClear()
  actions.resetDestroyed.mockClear()
})

it('renders correctly', () => {
  const props = { render, actions, id: 123 }
  const tree = renderer.create(<Destroy {...props} />).toJSON()

  expect(tree).toMatchSnapshot()
  expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
  expect(actions.resetDestroyed).not.toHaveBeenCalled()
  expect(actions.destroy).toHaveBeenCalledWith(123)
})

describe('when destroyed', () => {
  it('resets destroyed', () => {
    const destroyed = { id: 123 }
    const props = { render, actions, id: 123, destroyed }
    const tree = renderer.create(<Destroy {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
    expect(actions.resetDestroyed).toHaveBeenCalledWith()
  })
})
