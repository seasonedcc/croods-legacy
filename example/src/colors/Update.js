import React from 'react'
import { Update } from 'croods'

export default props => {
  const { id, children, ...attributes } = props

  return (
    <Update id={id} attributes={attributes} name="colors">
      {update => {
        const onClick = event => {
          event.preventDefault()
          update()
        }

        return children(onClick)
      }}
    </Update>
  )
}
