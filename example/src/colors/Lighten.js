import React from 'react'
import tinyColor from 'tinycolor2'

import Update from './Update'

export default ({ color, ...props }) => {
  const lightColor = tinyColor(color)
    .lighten()
    .toHexString()

  return (
    <Update
      {...props}
      color={lightColor}
      render={onClick => (
        <a href="#lighten" onClick={onClick}>
          Lighten
        </a>
      )}
    />
  )
}
