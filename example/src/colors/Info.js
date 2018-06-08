import React from 'react'
import Link from 'react-router-dom/Link'
import { Info } from 'croods'

import Children from '../Children'

export default ({
  match: {
    params: { id },
  },
}) => (
  <Info
    id={id}
    name="colors"
    parseResponse={({ data: info }) => ({ info })}
    render={({ name, color }) => (
      <Children>
        <h1>{name}</h1>
        <h2>{color}</h2>
        <Link to="/">Back</Link>
      </Children>
    )}
  />
)
