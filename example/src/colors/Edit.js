import React, { Fragment } from 'react'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import { Edit } from 'croods'

import Form from './Form'

export default ({ match: { params } }) => {
  const { id } = params

  return (
    <Edit
      id={id}
      name="colors"
      render={({ info, update, updating, error }) => {
        const { name } = info

        return (
          <Fragment>
            <h1>{name}</h1>
            <Form
              onSubmit={update}
              submitting={updating}
              initialValues={info}
            />
            <Link to="/">Back</Link>
          </Fragment>
        )
      }}
      renderUpdated={({ id }) => <Redirect to={`/${id}`} />}
    />
  )
}
