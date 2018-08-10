import React from 'react'
import renderer from 'react-test-renderer'

import Options from '../Options'

jest.mock('../Context', () => ({
  Consumer: ({ children }) => (
    <div>Consumer - {children({ foo: 'bar', quu: 'foo' })}</div>
  ),
}))


it('renders correctly', () => {
  const props = { foo: 'bar' }
  const render = props => <div {...props}>Render</div>
  const tree = renderer.create(<Options {...props} render={render} />).toJSON()
  expect(tree).toMatchSnapshot()
})
