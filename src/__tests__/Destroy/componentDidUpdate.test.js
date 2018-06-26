import React from 'react'
import renderer from 'react-test-renderer'

import Destroy from '../../Destroy'

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

describe('when not destroyed', () => {
  it('does not reset destroyed', () => {
    const props = { render, actions }
    const rendered = renderer.create(<Destroy {...props} />)

    actions.resetDestroyed.mockClear()
    rendered.update(<Destroy {...props} foo="bar" />)
    expect(actions.resetDestroyed).not.toHaveBeenCalled()
  })
})

describe('when destroyed with different ids', () => {
  it('does not reset destroyed', () => {
    const props = { render, actions, id: 123 }
    const rendered = renderer.create(<Destroy {...props} />)

    actions.resetDestroyed.mockClear()
    rendered.update(<Destroy {...props} destroyed={{ id: 456 }} />)
    expect(actions.resetDestroyed).not.toHaveBeenCalled()
  })
})

describe('when destroyed with same id', () => {
  it('reset destroyed', () => {
    const props = { render, actions, id: 123 }
    const rendered = renderer.create(<Destroy {...props} />)

    actions.resetDestroyed.mockClear()
    rendered.update(<Destroy {...props} destroyed={{ id: 123 }} />)
    expect(actions.resetDestroyed).toHaveBeenCalledWith()
  })
})
