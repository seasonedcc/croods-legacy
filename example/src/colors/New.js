import React from 'react'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import { New } from 'croods'

import Children from '../Children'
import Form from './Form'

export default props => (
  <New
    name="colors"
    render={({ create, creating, error }) => (
      <Children>
        <h1>New color</h1>
        <Form onSubmit={create} submitting={creating} />
        <Link to="/">Back</Link>
      </Children>
    )}
    renderCreated={({ id }) => <Redirect to={`/${id}`} />}
  />
)
