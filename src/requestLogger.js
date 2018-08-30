import consoleGroup from './consoleGroup'

export default (url, fetchParams) => {
  const { method, ...params } = fetchParams
  consoleGroup('REQUEST: ', 'mediumpurple')(
    `${method.toUpperCase()}: ${url}`,
    params,
  )
}
