import React from 'react'
import Link from 'react-router-dom/Link'
import { useCroodsEffect, connectCroods } from 'croods'

import ListItem from './ListItem'

const Index = props => {
  const { list } = props.croodsState
  useCroodsEffect('fetchList', { name: 'colors' })

  return list ? (
    <>
      <h1>Colors</h1>
      {list.map(item => (
        <ListItem item={item} {...props} key={item.id} />
      ))}
      <Link to="/new" style={{ display: 'block', marginTop: 20 }}>
        New
      </Link>
    </>
  ) : 'loading...'
}

export default connectCroods('colors')(Index)
