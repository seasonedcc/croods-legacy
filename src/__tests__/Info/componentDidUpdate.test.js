import React from 'react'
import renderer from 'react-test-renderer'

import Info from '../../Info'
import setOrFetchInfo from '../../setOrFetchInfo'

jest.mock('../../withOptions', () => Component => Component)

jest.mock('react-redux', () => ({
  connect: jest.fn(() => Component => Component),
}))

jest.mock('../../setOrFetchInfo', () => jest.fn())

const render = jest.fn((info, props) => (
  <div info={info} {...props}>
    Info
  </div>
))

beforeEach(() => {
  render.mockClear()
  setOrFetchInfo.mockClear()
})

describe('when id is the same', () => {
  it('does not set or fetch info', () => {
    const props = { render, id: 123 }
    const rendered = renderer.create(<Info {...props} />)
    setOrFetchInfo.mockClear()
    rendered.update(<Info {...props} foo="bar" />)
    expect(setOrFetchInfo).not.toHaveBeenCalled()
  })
})

describe('when id is different', () => {
  it('sets or fetches info', () => {
    const props = { render, id: 123 }
    const rendered = renderer.create(<Info {...props} />)
    setOrFetchInfo.mockClear()
    rendered.update(<Info {...props} id="321" />)
    expect(setOrFetchInfo).toHaveBeenCalledWith({ ...props, id: '321' })
  })
})
