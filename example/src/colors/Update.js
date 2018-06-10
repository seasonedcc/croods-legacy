import React from 'react'
import { Update } from 'croods'

export default props => {
  const { id, render, ...attributes } = props

  return (
    <Update
      id={id}
      attributes={attributes}
      name="colors"
      render={update => {
        const onClick = event => {
          event.preventDefault()
          update()
        }

        return render(onClick)
      }}
    />
  )
}
