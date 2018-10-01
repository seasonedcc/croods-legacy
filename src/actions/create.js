import action from './action'

export default options => params =>
  action({
    method: 'post',
    ...options,
    params,
    prefix: 'CREATE',
    customParse: options.parseCreateResponse,
    defaultParse: created => ({ created }),
  })
