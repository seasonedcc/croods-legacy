import React from 'react'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import { Edit } from 'croods'

import Children from '../Children'
import Form from './Form'

export default ({ match: { params } }) => {
  const { id } = params

  return (
    <Edit
      id={id}
      name="colors"
      parseInfoResponse={({ data: info }) => ({ info })}
      parseUpdateResponse={updated => ({ updated: { id, ...updated } })}
      render={({ info, update, updating, error }) => {
        const { name } = info

        return (
          <Children>
            <h1>{name}</h1>
            <Form
              onSubmit={update}
              submitting={updating}
              initialValues={info}
            />
            <Link to="/">Back</Link>
          </Children>
        )
      }}
      renderUpdated={({ id }) => <Redirect to={`/${id}`} />}
    />
  )
}
