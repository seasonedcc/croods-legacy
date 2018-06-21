import React from 'react'
import renderer from 'react-test-renderer'

import Update from '../../Update'

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

describe('when not updated', () => {
  it('does not reset updated', () => {
    const props = { render, actions }
    const rendered = renderer.create(<Update {...props} />)

    actions.resetUpdated.mockClear()
    rendered.update(<Update {...props} foo="bar" />)
    expect(actions.resetUpdated).not.toHaveBeenCalled()
  })
})

describe('when updated with different ids', () => {
  it('does not reset updated', () => {
    const props = { render, actions, id: 123 }
    const rendered = renderer.create(<Update {...props} />)

    actions.resetUpdated.mockClear()
    rendered.update(<Update {...props} updated={{ id: 456 }} />)
    expect(actions.resetUpdated).not.toHaveBeenCalled()
  })
})

describe('when updated with same id', () => {
  it('reset updated', () => {
    const props = { render, actions, id: 123 }
    const rendered = renderer.create(<Update {...props} />)

    actions.resetUpdated.mockClear()
    rendered.update(<Update {...props} updated={{ id: 123 }} />)
    expect(actions.resetUpdated).toHaveBeenCalledWith()
  })
})
