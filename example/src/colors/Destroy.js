import React from 'react'
import { useCroods } from 'croods'

export default ({ id }) => {
  const { destroy } = useCroods({ name: 'colors' })
  return (
    <a
      href="#destroy"
      onClick={async event => {
        event.preventDefault()
        await destroy(id)
      }}
    >
      Delete
    </a>
  )
}
