import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import { connectCroods, useCroods } from 'croods'

import Form from './Form'

const New = props => {
  const [color, setColor] = useState()
  const { create } = useCroods({ name: 'colors', debugRequests: true })
  const { creating, created } = props.croodsState
  useEffect(() => {
    created && setColor(created)
  }, [created])
  return color ? (
    <Redirect to={`/${color.id}`} />
  ) : (
    <>
      <h1>New color</h1>
      <Form onSubmit={create} submitting={creating} />
      <Link to="/">Back</Link>
    </>
  )
}

export default connectCroods('colors')(New)
