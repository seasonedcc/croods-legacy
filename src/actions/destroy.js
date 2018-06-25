import action from './action'

export default options => id => {
  return action({
    ...options,
    id,
    method: 'delete',
    prefix: 'DESTROY',
    requestAttributes: { id },
    customParse: options.parseDestroyResponse,
    defaultParse: destroyed => ({ destroyed }),
  })
}
