import action from './action'

export default options => () =>
  action({
    ...options,
    prefix: 'FETCH_LIST',
    customParse: options.parseListResponse,
    defaultParse: list => ({ list }),
  })
