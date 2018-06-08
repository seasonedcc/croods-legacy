import apiAction from './apiAction'

export default ({ name, baseUrl, parseResponse }) => ({
  fetchList: () =>
    apiAction({
      baseUrl,
      prefix: `@${name}/LIST`,
      path: `/${name}`,
      parseResponse: parseResponse || (list => ({ list })),
    }),
  fetchInfo: id =>
    apiAction({
      baseUrl,
      prefix: `@${name}/INFO`,
      path: `/${name}/${id}`,
      parseResponse: parseResponse || (info => ({ info })),
    }),
  setInfo: info => ({ type: `@${name}/SET_INFO`, info }),
})
