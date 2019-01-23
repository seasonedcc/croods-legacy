import React from 'react'
import renderer from 'react-test-renderer'

import Info from '../Info'

jest.mock('croods', () => ({
  Info: props => (
    <div {...props}>
      Info - {props.render({ id: 1, name: 'color name', color: 'color hexadecimal' })}
    </div>
  ),
}))

jest.mock('react-router-dom/Link', () => props => <div {...props}>Link - {props.children}</div>)

it('renders correctly', () => {
  const props = {
    match: {
      params: {
        id: 1,
      },
    },
  }
  const tree = renderer.create(<Info {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
