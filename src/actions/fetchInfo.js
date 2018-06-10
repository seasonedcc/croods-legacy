import action from './action'

export default options => id =>
  action({
    ...options,
    id,
    prefix: 'FETCH_INFO',
    customParse: options.parseInfoResponse,
    defaultParse: info => ({ info }),
  })
