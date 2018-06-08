import React from 'react'
import { List } from 'croods'

import Children from '../Children'

export default props => (
  <List
    name="colors"
    parseResponse={({ data: list }) => ({ list })}
    render={({ list }) => (
      <Children>
        <h1>Colors</h1>
        {list.map(({ id, name }) => <h3 key={id}>{name}</h3>)}
      </Children>
    )}
  />
)
