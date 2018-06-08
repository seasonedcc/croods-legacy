import React from 'react'
import { Consumer } from './Context'

export default Component => props => (
  <Consumer>{options => <Component {...props} options={options} />}</Consumer>
)
