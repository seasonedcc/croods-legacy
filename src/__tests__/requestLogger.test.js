import requestLogger from '../requestLogger'

it('calls console.group and logs the passed parameters', () => {
  global.console = { log: jest.fn(), group: jest.fn(), groupEnd: jest.fn() }

  requestLogger('http://foo.com', { method: 'get', foo: 'bar' })

  expect(console.group).toHaveBeenCalledWith('%cREQUEST: ', 'color: mediumpurple;')
  expect(console.log).toHaveBeenCalledTimes(2)
  expect(console.log).toHaveBeenCalledWith({'foo': 'bar'})
  expect(console.log).toHaveBeenCalledWith('GET: http://foo.com')
  expect(console.groupEnd).toHaveBeenCalledWith()
})
