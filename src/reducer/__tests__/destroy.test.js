import destroy from '../destroy'

const options = {}

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    expect(destroy(options)(state)).toEqual({ foo: 'bar' })
  })
})

describe('with unknown action type', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/FOO' }

    expect(destroy(options)(state, action)).toEqual({ foo: 'bar' })
  })
})

describe('with REQUEST action', () => {
  describe('without info or list', () => {
    it('returns the correct state', () => {
      const state = { foo: 'bar' }
      const action = { type: '@bar/REQUEST' }

      expect(destroy(options)(state, action)).toEqual({
        destroyError: null,
        destroying: true,
        foo: 'bar',
        info: null,
        list: null,
      })
    })
  })

  describe('with info', () => {
    describe('with a different id', () => {
      it('returns the correct state', () => {
        const state = { foo: 'bar', info: { id: 123 } }
        const action = { type: '@bar/REQUEST', id: 321 }

        expect(destroy(options)(state, action)).toEqual({
          destroyError: null,
          destroying: true,
          foo: 'bar',
          info: { id: 123 },
          list: null,
        })
      })
    })

    describe('with the same id', () => {
      it('returns the correct state', () => {
        const state = { foo: 'bar', info: { id: 123 } }
        const action = { type: '@bar/REQUEST', id: 123 }

        expect(destroy(options)(state, action)).toEqual({
          destroyError: null,
          destroying: true,
          foo: 'bar',
          info: { id: 123, destroying: true },
          list: null,
        })
      })
    })
  })

  describe('with list', () => {
    it('returns the correct state', () => {
      const list = [{ id: 123 }, { id: 456 }, { id: 789 }]
      const state = { foo: 'bar', list }
      const action = { type: '@bar/REQUEST', id: 123 }

      expect(destroy(options)(state, action)).toEqual({
        destroyError: null,
        destroying: true,
        foo: 'bar',
        info: null,
        list: [{ destroying: true, id: 123 }, { id: 456 }, { id: 789 }],
      })
    })
  })
})

describe('with FAILURE action', () => {
  describe('without info or list', () => {
    it('returns the correct state', () => {
      const state = { foo: 'bar' }
      const action = { type: '@bar/FAILURE', error: { message: 'fooError' } }

      expect(destroy(options)(state, action)).toEqual({
        destroyError: 'fooError',
        destroying: false,
        foo: 'bar',
        info: null,
        list: null,
      })
    })
  })

  describe('with info', () => {
    describe('with a different id', () => {
      it('returns the correct state', () => {
        const state = { foo: 'bar', info: { id: 123 } }
        const error = { message: 'fooError' }
        const action = { type: '@bar/FAILURE', id: 321, error }

        expect(destroy(options)(state, action)).toEqual({
          destroyError: 'fooError',
          destroying: false,
          foo: 'bar',
          info: { id: 123 },
          list: null,
        })
      })
    })

    describe('with the same id', () => {
      it('returns the correct state', () => {
        const state = { foo: 'bar', info: { id: 123 } }
        const error = { message: 'fooError' }
        const action = { type: '@bar/FAILURE', id: 123, error }

        expect(destroy(options)(state, action)).toEqual({
          destroyError: 'fooError',
          destroying: false,
          foo: 'bar',
          info: { destroyError: 'fooError', destroying: false, id: 123 },
          list: null,
        })
      })
    })
  })

  describe('with list', () => {
    it('returns the correct state', () => {
      const list = [{ id: 123 }, { id: 456 }, { id: 789 }]
      const state = { foo: 'bar', list }
      const error = { message: 'fooError' }
      const action = { type: '@bar/FAILURE', id: 123, error }

      expect(destroy(options)(state, action)).toEqual({
        destroyError: 'fooError',
        destroying: false,
        foo: 'bar',
        info: null,
        list: [
          { destroyError: 'fooError', destroying: false, id: 123 },
          { id: 456 },
          { id: 789 },
        ],
      })
    })
  })
})

describe('with SUCCESS action', () => {
  describe('without info or list', () => {
    it('returns the correct state', () => {
      const state = { foo: 'bar' }
      const destroyed = { id: 789 }
      const action = { type: '@bar/SUCCESS', destroyed }

      expect(destroy(options)(state, action)).toEqual({
        destroyed: { id: 789 },
        destroying: false,
        foo: 'bar',
        info: null,
        list: null,
      })
    })
  })

  describe('with list', () => {
    it('returns the correct state', () => {
      const list = [{ id: 123 }, { id: 456 }, { id: 789 }]
      const state = { foo: 'bar', list }
      const destroyed = { id: 789 }
      const action = { type: '@bar/SUCCESS', destroyed }

      expect(destroy(options)(state, action)).toEqual({
        destroyed: { id: 789 },
        destroying: false,
        foo: 'bar',
        info: null,
        list: [{ id: 123 }, { id: 456 }],
      })
    })
  })
})
