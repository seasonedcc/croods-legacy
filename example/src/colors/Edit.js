import React, { useEffect } from 'react'
import Link from 'react-router-dom/Link'
import { connectCroods, useCroods } from 'croods'

import Form from './Form'

const Edit = ({ match: { params }, croodsState }) => {
  const { id } = params
  console.log(croodsState)
  const { updating, info } = croodsState
  const { update, fetchInfo } = useCroods({ name: 'colors', id })
  useEffect(() => {
    (info && info.id === id) || fetchInfo(id)
  }, [])

  return info ? (
    <>
      <h1>{info.name}</h1>
      <Form
        onSubmit={() => update(id)}
        submitting={updating}
        initialValues={info}
      />
      <Link to="/">Back</Link>
    </>
  ) : 'Loading...'
}

export default connectCroods('colors')(Edit)
