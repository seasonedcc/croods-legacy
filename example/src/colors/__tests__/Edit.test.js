import React from 'react'
import renderer from 'react-test-renderer'

import Edit from '../Edit'

jest.mock('croods', () => ({
  Edit: props => (
    <div {...props}>
      Edit -{' '}
      <div>
        render -{' '}
        {props.render({
          info: Object,
          update: Function,
          updating: Boolean,
          error: String,
        })}
      </div>
      <div>renderUpdated - {props.renderUpdated({ id: 1 })}</div>
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
  const props = {
    match: {
      params: {
        id: 1,
      },
    },
  }
  const tree = renderer.create(<Edit {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
