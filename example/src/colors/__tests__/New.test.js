import React from 'react'
import renderer from 'react-test-renderer'

import New from '../New'

jest.mock('croods', () => ({
  New: props => (
    <div {...props}>
      New -{' '}
      <div>
        render -{' '}
        {props.render({ create: Function, creating: Boolean, error: String })}
      </div>
      <div>renderCreated - {props.renderCreated({ id: 1 })}</div>
    </div>
  ),
}))

jest.mock('../Form', () => props => (
  <div {...props}>Form - {props.children}</div>
))
jest.mock('react-router-dom/Link', () => props => (
  <div {...props}>Link - {props.children}</div>
))
jest.mock('react-router-dom/Redirect', () => props => (
  <div {...props}>Redirect - {props.children}</div>
))

it('renders correctly', () => {
  const tree = renderer.create(<New />).toJSON()
  expect(tree).toMatchSnapshot()
})
