import React from 'react'
import Link from 'react-router-dom/Link'
import { List } from 'croods'

import Children from '../Children'
import Lighten from './Lighten'
import Darken from './Darken'

export default props => (
  <List
    name="colors"
    render={list => (
      <Children>
        <h1>Colors</h1>
        {list.map(item => {
          const { id, name, color, updating, updateError } = item

          return (
            <div key={id}>
              <h2 style={{ display: 'inline-block' }}>
                <Link to={`/${id}`} style={{ color }}>
                  {name}
                </Link>
              </h2>{' '}
              {updating ? (
                <span>Updating...</span>
              ) : updateError ? (
                <span style={{ color: 'red' }}>{updateError}</span>
              ) : (
                <Children>
                  <Link to={`/${id}/edit`}>Edit</Link> | <Lighten {...item} /> |{' '}
                  <Darken {...item} />
                </Children>
              )}
            </div>
          )
        })}
        <Link to="/new" style={{ display: 'block', marginTop: 20 }}>
          New
        </Link>
      </Children>
    )}
  />
)
