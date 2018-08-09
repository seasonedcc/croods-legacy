import React, { Fragment } from 'react'
import Link from 'react-router-dom/Link'
import { Info } from 'croods'

export default ({ match }) => (
  <Info
    id={match.params.id}
    name="colors"
    render={({ name, color }) => (
      <Fragment>
        <h1 style={{ color }}>{name}</h1>
        <h2>{color}</h2>
        <Link to="/">Back</Link>
      </Fragment>
    )}
  />
)
