import React from 'react'
import tinyColor from 'tinycolor2'

import Update from './Update'

export default ({ color, ...props }) => {
  const darkColor = tinyColor(color)
    .darken()
    .toHexString()

  return (
    <Update {...props} color={darkColor}>
      {onClick => (
        <a href="#darken" onClick={onClick}>
          Darken
        </a>
      )}
    </Update>
  )
}
