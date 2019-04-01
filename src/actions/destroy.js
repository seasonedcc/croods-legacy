import action from './action'

export default options => id => {
  const parse = () => ({ destroyed: { id } })
  return action({
    method: 'delete',
    ...options,
    id,
    prefix: 'DESTROY',
    requestAttributes: { id },
    customParse: options.parseDestroyResponse || parse,
    defaultParse: destroyed => ({ destroyed }),
  })
}
