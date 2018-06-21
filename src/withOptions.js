import React from 'react'
import { Consumer } from './Context'

export default Component => props => (
  <Consumer>{options => <Component {...options} {...props} />}</Consumer>
)
