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
        {list.map(({ id, name }) => (
          <h3 key={id}>
            <Link to={`/${id}`}>{name}</Link>
          </h3>
        ))}
      </Children>
    )}
  />
)
