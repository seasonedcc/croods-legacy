import apiAction from './apiAction'

export default ({ name, baseUrl, parseResponse }) => ({
  list: () =>
    apiAction({
      baseUrl,
      prefix: `@${name}/LIST`,
      path: `/${name}`,
      parseResponse: parseResponse || (list => ({ list })),
    }),
})
