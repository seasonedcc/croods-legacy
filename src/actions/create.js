import action from './action'

export default options => params =>
  action({
    ...options,
    params,
    method: 'post',
    prefix: 'CREATE',
    customParse: options.parseCreateResponse,
    defaultParse: created => ({ created }),
  })
