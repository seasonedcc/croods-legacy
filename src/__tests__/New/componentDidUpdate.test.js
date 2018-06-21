import React from 'react'
import renderer from 'react-test-renderer'

import New from '../../New'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

const actions = { resetCreated: jest.fn() }

const render = jest.fn((newProps, props) => (
  <div {...newProps} {...props}>
    New
  </div>
))

beforeEach(() => {
  render.mockClear()
  actions.resetCreated.mockClear()
})

describe('when not created', () => {
  it('does not reset created', () => {
    const props = { render, actions }
    const rendered = renderer.create(<New {...props} />)

    actions.resetCreated.mockClear()
    rendered.update(<New {...props} foo="bar" />)
    expect(actions.resetCreated).not.toHaveBeenCalled()
  })
})

describe('when created', () => {
  it('resets created', () => {
    const props = { render, actions }
    const rendered = renderer.create(<New {...props} />)

    actions.resetCreated.mockClear()
    rendered.update(<New {...props} created={{ bar: 'foo' }} />)
    expect(actions.resetCreated).toHaveBeenCalledWith()
  })
})
