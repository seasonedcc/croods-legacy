import React from 'react'
import renderer from 'react-test-renderer'

import List from '../List'

jest.mock('croods', () => ({
  List: props => (
    <div {...props}>
      List -{' '}
      {props.render([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'foobar' }])}
    </div>
  ),
}))

jest.mock('react-router-dom/Link', () => props => <div {...props}>Link - {props.children}</div>)

jest.mock('../ListItem', () => props => <div {...props}>ListItem - {props.children}</div>)

it('renders correctly', () => {
  const tree = renderer.create(<List />).toJSON()
  expect(tree).toMatchSnapshot()
})
