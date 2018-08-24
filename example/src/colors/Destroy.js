import React from 'react'
import { Destroy } from 'croods'

export default ({ id }) =>
  <Destroy id={id} name="colors" parseResponse={() => ({ destroyed: { id } })}>
    {destroy => (
      <a
        href="#destroy"
        onClick={event => {
          event.preventDefault()
          destroy()
        }}
      >
        Delete
      </a>
    )}
  </Destroy>
