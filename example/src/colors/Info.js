import React from 'react'
import Link from 'react-router-dom/Link'
import { useCroodsEffect, connectCroods } from 'croods'

const Info = ({ match, croodsState }) => {
  useCroodsEffect('fetchInfo', { name: 'colors', id: match.params.id })
  const { info } = croodsState

  return info ? (
      <>
        <h1 style={{ color: info.color }}>{info.name}</h1>
        <h2>{info.color}</h2>
        <Link to="/">Back</Link>
      </>
  ) : 'Loading...'
}

export default connectCroods('colors')(Info)
