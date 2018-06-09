import React from 'react'
import Link from 'react-router-dom/Link'
import { List } from 'croods'

import Children from '../Children'

export default props => (
  <List
    name="colors"
    parseResponse={({ data: list }) => ({ list })}
    render={list => (
      <Children>
        <h1>Colors</h1>
        {list.map(({ id, name, color }) => (
          <div key={id}>
            <h2 style={{ display: 'inline-block' }}>
              <Link to={`/${id}`} style={{ color }}>
                {name}
              </Link>
            </h2>{' '}
            <Link to={`/${id}/edit`}>Edit</Link>
          </div>
        ))}
        <Link to="/new" style={{ display: 'block', marginTop: 20 }}>
          New
        </Link>
      </Children>
    )}
  />
)
