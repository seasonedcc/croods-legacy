import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import { reduxForm } from 'redux-form'
import { New as CroodsNew } from 'croods'

import Children from '../Children'
import Form from './Form'

class New extends Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <CroodsNew
        name="colors"
        render={({ create, creating, error }) => (
          <Children>
            <h1>New color</h1>
            <Form onSubmit={handleSubmit(create)} submitting={creating} />
            <Link to="/">Back</Link>
          </Children>
        )}
        renderCreated={({ id }) => <Redirect to={`/${id}`} />}
      />
    )
  }
}

export default reduxForm({ form: 'color' })(New)
