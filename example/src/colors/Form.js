import React from 'react'

import Field from './Field'

export default ({ style, submitting, ...props }) => (
  <form {...props} style={{ marginBottom: 20, ...style }}>
    <Field name="name" label="Name" autoFocus />
    <Field name="color" label="Color" />
    {submitting ? (
      <div>Submitting...</div>
    ) : (
      <button type="submit">Submit</button>
    )}
  </form>
)
