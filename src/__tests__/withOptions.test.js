import React from 'react'
import renderer from 'react-test-renderer'

import withOptions from '../withOptions'

jest.mock('../Context', () => ({
  Consumer: ({ children }) => (
    <div>Consumer - {children({ foo: 'bar', quu: 'foo' })}</div>
  ),
}))

it('renders Component with props and options', () => {
  const props = { foo: 'quu', bar: 'baz' }
  const Component = withOptions(props => <div {...props}>Foo</div>)
  const tree = renderer.create(<Component {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
