import React from 'react'
import Link from 'react-router-dom/Link'

import Destroy from './Destroy'
import Lighten from './Lighten'
import Darken from './Darken'

export default ({ item }) => {
  const { id, name, color, updating, updateError, destroying } = item
  const { destroyError } = item
  const error = destroyError || updateError

  return (
    <div key={id}>
      <h2 style={{ display: 'inline-block' }}>
        <Link to={`/${id}`} style={{ color }}>
          {name}
        </Link>
      </h2>{' '}
      {updating ? (
        <span>Updating...</span>
      ) : destroying ? (
        <span>Deleting...</span>
      ) : error ? (
        <span style={{ color: 'red' }}>{error}</span>
      ) : (
        <>
          <Link to={`/${id}/edit`}>Edit</Link>
          {' | '}
          <Destroy id={id} />
          {' | '}
          <Lighten {...item} />
          {' | '}
          <Darken {...item} />
        </>
      )}
    </div>
  )
}
