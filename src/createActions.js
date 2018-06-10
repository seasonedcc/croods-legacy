import omit from 'lodash/omit'

import apiAction from './apiAction'

const action = options => {
  const { name, prefix, id, parseResponse, defaultResponse } = options

  return apiAction({
    ...options,
    prefix: `@${name}/${prefix}`,
    path: `/${name}${id ? `/${id}` : ''}`,
    parseResponse: parseResponse || defaultResponse,
  })
}

export default options => ({
  fetchList: () =>
    action({ ...options, prefix: 'LIST', defaultResponse: list => ({ list }) }),
  fetchInfo: id =>
    action({
      ...options,
      id,
      prefix: 'INFO',
      defaultResponse: options.parseInfoResponse || (info => ({ info })),
    }),
  setInfo: info => ({ type: `@${options.name}/SET_INFO`, info }),
  create: params =>
    action({
      ...options,
      params,
      method: 'post',
      prefix: 'CREATE',
      defaultResponse: created => ({ created }),
    }),
  resetCreated: () => ({ type: `@${options.name}/RESET_CREATED` }),
  update: ({ id, ...attributes }) => {
    const params = omit(attributes, ['updating', 'updateError'])

    return action({
      ...options,
      id,
      params,
      method: 'put',
      prefix: 'UPDATE',
      requestAttributes: { id, params },
      defaultResponse:
        options.parseUpdateResponse || (updated => ({ updated })),
    })
  },
  resetUpdated: () => ({ type: `@${options.name}/RESET_UPDATED` }),
})
