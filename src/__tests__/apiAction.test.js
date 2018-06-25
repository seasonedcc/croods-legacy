import apiAction from '../apiAction'

describe('with default GET method and successful JSON response', () => {
  it('dispatches the correct actions', async () => {
    const dispatch = jest.fn()

    const response = {
      ok: true,
      text: () => JSON.stringify({ foo: 'bar' }),
      headers: {
        get: () => 'application/json',
      },
    }

    global.fetch = jest.fn(() => new Promise(resolve => resolve(response)))

    const action = apiAction({
      prefix: '@foo/BAR',
      path: '/foo/bar',
      parseResponse: json => ({ json }),
    })

    await action(dispatch)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenCalledWith({ type: '@foo/BAR_REQUEST' })

    expect(dispatch).toHaveBeenCalledWith({
      json: { foo: 'bar' },
      type: '@foo/BAR_SUCCESS',
    })
  })
})

describe('with default GET method and successful text response', () => {
  it('dispatches the correct actions', async () => {
    const dispatch = jest.fn()

    const response = {
      ok: true,
      text: () => 'foo bar',
      headers: {
        get: () => 'text/html',
      },
    }

    global.fetch = jest.fn(() => new Promise(resolve => resolve(response)))

    const action = apiAction({
      prefix: '@foo/BAR',
      path: '/foo/bar',
      parseResponse: json => ({ json }),
    })

    await action(dispatch)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenCalledWith({ type: '@foo/BAR_REQUEST' })

    expect(dispatch).toHaveBeenCalledWith({
      json: { id: 'undefined', message: 'foo bar' },
      type: '@foo/BAR_SUCCESS',
    })
  })
})

describe('with default GET method and failed JSON response', () => {
  it('dispatches the correct actions', async () => {
    const dispatch = jest.fn()

    const response = {
      ok: false,
      text: () => JSON.stringify({ foo: 'bar' }),
      headers: {
        get: () => 'application/json',
      },
    }

    global.fetch = jest.fn(() => new Promise(resolve => resolve(response)))

    const action = apiAction({
      prefix: '@foo/BAR',
      path: '/foo/bar',
      parseResponse: json => ({ json }),
    })

    await action(dispatch)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenCalledWith({ type: '@foo/BAR_REQUEST' })

    expect(dispatch).toHaveBeenCalledWith({
      error: { id: 'unknownError', message: 'Ooops, there was an error.' },
      type: '@foo/BAR_FAILURE',
    })
  })
})

describe('with POST method and successful response', () => {
  it('dispatches the correct actions', async () => {
    const dispatch = jest.fn()

    const response = {
      ok: true,
      text: () => JSON.stringify({ foo: 'bar' }),
      headers: {
        get: () => 'application/json',
      },
    }

    global.fetch = jest.fn(() => new Promise(resolve => resolve(response)))

    const action = apiAction({
      prefix: '@foo/BAR',
      path: '/foo/bar',
      method: 'POST',
      params: { foo: 'bar' },
      parseResponse: json => ({ json }),
    })

    await action(dispatch)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenCalledWith({ type: '@foo/BAR_REQUEST' })

    expect(dispatch).toHaveBeenCalledWith({
      json: { foo: 'bar' },
      type: '@foo/BAR_SUCCESS',
    })
  })
})

describe('with POST method and with newtwork error', () => {
  it('dispatches the correct actions', async () => {
    const dispatch = jest.fn()

    const response = {
      ok: false,
      text: () => JSON.stringify({ foo: 'bar' }),
      headers: {
        get: () => 'application/json',
      },
    }

    global.fetch = jest.fn(
      () => new Promise((resolve, reject) => reject(response)),
    )

    const action = apiAction({
      prefix: '@foo/BAR',
      path: '/foo/bar',
      method: 'POST',
      params: { foo: 'bar' },
      processResponse: (response, json) => ({ response, json }),
    })

    await action(dispatch)

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenCalledWith({ type: '@foo/BAR_REQUEST' })

    expect(dispatch).toHaveBeenCalledWith({
      error: { id: 'unknownError', message: 'Ooops, there was an error.' },
      type: '@foo/BAR_FAILURE',
    })
  })
})

describe('with custom headers', () => {
  describe('whith an object', () => {
    it('merges custom and default headers', async () => {
      const dispatch = jest.fn()

      const response = {
        ok: true,
        text: () => JSON.stringify({ foo: 'bar' }),
        headers: {
          get: () => 'application/json',
        },
      }

      global.fetch = jest.fn(() => new Promise(resolve => resolve(response)))

      const action = apiAction({
        prefix: '@foo/BAR',
        baseUrl: 'foourl',
        path: '/foo/bar',
        method: 'POST',
        headers: { bar: 'foo' },
        parseResponse: json => ({ json }),
      })

      global.fetch.mockClear()
      await action(dispatch)

      expect(global.fetch).toHaveBeenCalledWith('foourl/foo/bar', {
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          bar: 'foo',
        },
        method: 'POST',
      })
    })

    it('overwrites default headers with custom ones', async () => {
      const dispatch = jest.fn()

      const response = {
        ok: true,
        text: () => JSON.stringify({ foo: 'bar' }),
        headers: {
          get: () => 'application/json',
        },
      }

      global.fetch = jest.fn(() => new Promise(resolve => resolve(response)))

      const action = apiAction({
        prefix: '@foo/BAR',
        baseUrl: 'foourl',
        path: '/foo/bar',
        method: 'POST',
        headers: { Accept: 'foo' },
        parseResponse: json => ({ json }),
      })

      global.fetch.mockClear()
      await action(dispatch)

      expect(global.fetch).toHaveBeenCalledWith('foourl/foo/bar', {
        credentials: undefined,
        headers: {
          Accept: 'foo',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    })
  })

  describe('whith a function', () => {
    it('calls the function with default headers as parameters', async () => {
      const dispatch = jest.fn()
      const headers = jest.fn(props => ({ ...props, foo: 'bar' }))

      const response = {
        ok: true,
        text: () => JSON.stringify({ foo: 'bar' }),
        headers: {
          get: () => 'application/json',
        },
      }

      global.fetch = jest.fn(() => new Promise(resolve => resolve(response)))

      const action = apiAction({
        prefix: '@foo/BAR',
        baseUrl: 'foourl',
        path: '/foo/bar',
        method: 'POST',
        headers,
        parseResponse: json => ({ json }),
      })

      global.fetch.mockClear()
      await action(dispatch)

      expect(headers).toHaveBeenCalledWith({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })

      expect(global.fetch).toHaveBeenCalledWith('foourl/foo/bar', {
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          foo: 'bar',
        },
        method: 'POST',
      })
    })
  })
})
