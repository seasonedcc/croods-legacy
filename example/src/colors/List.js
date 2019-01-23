import React, { Fragment } from 'react'
import Link from 'react-router-dom/Link'
import { List } from 'croods'

import ListItem from './ListItem'

export default props => (
  <List
    name="colors"
    render={list => (
      <Fragment>
        <h1>Colors</h1>
        {list.map(item => (
          <ListItem item={item} {...props} key={item.id} />
        ))}
        <Link to="/new" style={{ display: 'block', marginTop: 20 }}>
          New
        </Link>
      </Fragment>
    )}
  />
)
