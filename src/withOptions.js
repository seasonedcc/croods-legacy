import React, { useContext } from 'react'
import Context from './Context'

export default Component => props => {
  const options = useOptions()
  return <Component {...options} {...props} />
}

export const useOptions = () => {
  const options = useContext(Context)
  return options
}
