import React from 'react'
import renderer from 'react-test-renderer'

import Edit from '../../Edit'
import setOrFetchInfo from '../../setOrFetchInfo'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

jest.mock('../../setOrFetchInfo', () => jest.fn())

const actions = { update: jest.fn(), resetUpdated: jest.fn() }

const render = jest.fn((editProps, props) => (
  <div {...editProps} {...props}>
    Edit
  </div>
))

beforeEach(() => {
  render.mockClear()
  setOrFetchInfo.mockClear()
})

describe('when id is the same', () => {
  it('does not set or fetch info', () => {
    const props = { render, actions, id: 123 }
    const rendered = renderer.create(<Edit {...props} />)

    setOrFetchInfo.mockClear()
    rendered.update(<Edit {...props} foo="bar" />)
    expect(setOrFetchInfo).not.toHaveBeenCalled()
  })
})

describe('when id is different', () => {
  it('sets or fetches info', () => {
    const props = { render, actions, id: 123 }
    const rendered = renderer.create(<Edit {...props} />)

    setOrFetchInfo.mockClear()
    rendered.update(<Edit {...props} id="321" />)
    expect(setOrFetchInfo).toHaveBeenCalledWith({ ...props, id: '321' })
  })
})

describe('when not updated', () => {
  it('does not reset updated', () => {
    const props = { render, actions, id: 123 }
    const rendered = renderer.create(<Edit {...props} />)

    actions.resetUpdated.mockClear()
    rendered.update(<Edit {...props} foo="bar" />)
    expect(actions.resetUpdated).not.toHaveBeenCalled()
  })
})

describe('when updated', () => {
  it('resets updated', () => {
    const props = { render, actions, id: 123 }
    const rendered = renderer.create(<Edit {...props} />)

    actions.resetUpdated.mockClear()
    rendered.update(<Edit {...props} updated={{ bar: 'foo' }} />)
    expect(actions.resetUpdated).toHaveBeenCalledWith()
  })
})
