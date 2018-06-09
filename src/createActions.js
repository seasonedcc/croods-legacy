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
      defaultResponse: info => ({ info }),
    }),
  setInfo: info => ({ type: `@${options.name}/SET_INFO`, info }),
  new: () => ({ type: `@${options.name}/NEW` }),
  create: params =>
    action({
      ...options,
      params,
      method: 'post',
      prefix: 'CREATE',
      defaultResponse: created => ({ created }),
    }),
})
