import React from 'react'
import { Destroy } from 'croods'

export default ({ id }) => (
  <Destroy
    id={id}
    name="colors"
    parseDestroyResponse={() => ({ destroyed: { id } })}
    render={destroy => {
      return (
        <a
          href="#destroy"
          onClick={event => {
            event.preventDefault()
            destroy()
          }}
        >
          Delete
        </a>
      )
    }}
  />
)
