import action from './action'

export default options => id => {
  return action({
    method: 'delete',
    ...options,
    id,
    prefix: 'DESTROY',
    requestAttributes: { id },
    customParse: options.parseDestroyResponse,
    defaultParse: destroyed => ({ destroyed }),
  })
}
