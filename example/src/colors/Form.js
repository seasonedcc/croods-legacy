import React from 'react'
import { reduxForm } from 'redux-form'

import Field from './Field'

const Form = ({ handleSubmit, onSubmit, submitting }) => (
  <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
    <Field name="name" label="Name" autoFocus />
    <Field name="color" label="Color" />
    {submitting ? (
      <div>Submitting...</div>
    ) : (
      <button type="submit">Submit</button>
    )}
  </form>
)

export default reduxForm({ form: 'color' })(Form)
