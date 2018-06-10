import apiAction from '../apiAction'

export default options => {
  const { name, prefix, id, parseResponse, defaultParse, customParse } = options
  const { path } = options

  return apiAction({
    ...options,
    prefix: `@${name}/${prefix}`,
    path: `${path || `/${name}`}${id ? `/${id}` : ''}`,
    parseResponse: customParse || parseResponse || defaultParse,
  })
}
