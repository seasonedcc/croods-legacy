import React, { Fragment } from 'react'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import { New } from 'croods'

import Form from './Form'

export default props => (
  <New name="colors" renderCreated={({ id }) => <Redirect to={`/${id}`} />}>
    {({ create, creating, error }) => (
      <Fragment>
        <h1>New color</h1>
        <Form onSubmit={create} submitting={creating} />
        <Link to="/">Back</Link>
      </Fragment>
    )}
  </New>
)
