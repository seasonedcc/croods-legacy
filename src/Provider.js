import React from 'react'

import { Provider } from './Context'

export default ({ options, ...props }) => <Provider value={options} {...props} />
