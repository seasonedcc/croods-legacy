import omit from 'lodash/omit'

import action from './action'

const flags = ['updating', 'updateError', 'destroying', 'destroyError']

export default options => ({ id, ...attributes }) => {
  const params = omit(attributes, flags)

  return action({
    method: 'put',
    ...options,
    id,
    params,
    prefix: 'UPDATE',
    requestAttributes: { id, params },
    customParse: options.parseUpdateResponse,
    defaultParse: updated => ({ updated }),
  })
}
