import update from '../update'

const options = {}

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    expect(update(options)(state)).toEqual({ foo: 'bar' })
  })
})

describe('with unknown action type', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/FOO' }

    expect(update(options)(state, action)).toEqual({ foo: 'bar' })
  })
})

describe('with REQUEST action', () => {
  describe('without info or list', () => {
    it('returns the correct state', () => {
      const state = { foo: 'bar' }
      const action = { type: '@bar/REQUEST' }

      expect(update(options)(state, action)).toEqual({
        foo: 'bar',
        updateError: null,
        updating: true,
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

        expect(update(options)(state, action)).toEqual({
          updating: true,
          updateError: null,
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

        expect(update(options)(state, action)).toEqual({
          updating: true,
          updateError: null,
          foo: 'bar',
          info: { id: 123, updating: true },
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

      expect(update(options)(state, action)).toEqual({
        updating: true,
        updateError: null,
        foo: 'bar',
        info: null,
        list: [{ updating: true, id: 123 }, { id: 456 }, { id: 789 }],
      })
    })
  })
})

describe('with FAILURE action', () => {
  describe('without info or list', () => {
    it('returns the correct state', () => {
      const state = { foo: 'bar' }
      const action = { type: '@bar/FAILURE', error: { message: 'fooError' } }

      expect(update(options)(state, action)).toEqual({
        updateError: 'fooError',
        updating: false,
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

        expect(update(options)(state, action)).toEqual({
          updateError: 'fooError',
          updating: false,
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

        expect(update(options)(state, action)).toEqual({
          updateError: 'fooError',
          updating: false,
          foo: 'bar',
          info: { updateError: 'fooError', updating: false, id: 123 },
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

      expect(update(options)(state, action)).toEqual({
        updateError: 'fooError',
        updating: false,
        foo: 'bar',
        info: null,
        list: [
          { updateError: 'fooError', updating: false, id: 123 },
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
      const updated = { id: 789 }
      const action = { type: '@bar/SUCCESS', updated }

      expect(update(options)(state, action)).toEqual({
        updated: { id: 789 },
        updating: false,
        foo: 'bar',
        info: { id: 789 },
        list: null,
      })
    })
  })

  describe('with list', () => {
    it('returns the correct state', () => {
      const list = [
        { id: 123, foo: 'bar' },
        { id: 456, foo: 'bar' },
        { id: 789, foo: 'bar' },
      ]
      const state = { foo: 'bar', list }
      const updated = { id: 789, foo: 'foo' }
      const action = { type: '@bar/SUCCESS', updated }

      expect(update(options)(state, action)).toEqual({
        updated,
        updating: false,
        foo: 'bar',
        info: updated,
        list: [{ id: 123, foo: 'bar' }, { id: 456, foo: 'bar' }, updated],
      })
    })
  })
})
