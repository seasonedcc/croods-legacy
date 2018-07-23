import action from './action'

export default options => path =>
  action({
    ...options,
    requestAttributes: { path },
    prefix: 'FETCH_LIST',
    customParse: options.parseListResponse,
    defaultParse: list => ({ list }),
  })
