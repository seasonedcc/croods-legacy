import React from 'react'
import renderer from 'react-test-renderer'

import New from '../../New'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

const actions = { resetCreateError: jest.fn() }

const render = jest.fn((newProps, props) => (
  <div {...newProps} {...props}>
    New
  </div>
))

beforeEach(() => {
  render.mockClear()
  actions.resetCreateError.mockClear()
})

describe('without createError', () => {
  it('does not reset create error', () => {
    const props = { render, actions }
    renderer.create(<New {...props} />)

    expect(actions.resetCreateError).not.toHaveBeenCalled()
  })
})

describe('with createError', () => {
  it('resets create error', () => {
    const props = { render, actions, createError: 'foo' }
    renderer.create(<New {...props} />)

    expect(actions.resetCreateError).toHaveBeenCalledWith()
  })
})
