import React from 'react'
import { Field } from 'redux-form'

export default ({ name, label, ...props }) => (
  <div style={{ marginBottom: 20 }}>
    <label htmlFor={name}>{label}</label>{' '}
    <Field name={name} component="input" type="text" {...props} />
  </div>
)
