import create from '../create'

const options = { addCreatedToTop: false }

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    expect(create(options)(state)).toEqual({ foo: 'bar' })
  })
})

describe('with unknown action type', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/FOO' }

    expect(create(options)(state, action)).toEqual({ foo: 'bar' })
  })
})

describe('with REQUEST action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/REQUEST' }

    expect(create(options)(state, action)).toEqual({
      ...state,
      creating: true,
      createError: null,
    })
  })
})

describe('with FAILURE action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: '@bar/FAILURE', error: { message: 'fooError' } }

    expect(create(options)(state, action)).toEqual({
      ...state,
      creating: false,
      createError: 'fooError',
    })
  })
})

describe('with SUCCESS action', () => {
  describe('without info or list', () => {
    it('returns the correct state', () => {
      const state = { foo: 'bar' }
      const created = { id: 789 }
      const action = { type: '@bar/SUCCESS', created }

      expect(create(options)(state, action)).toEqual({
        ...state,
        creating: false,
        created,
        info: created,
        list: null,
      })
    })
  })

  describe('with list', () => {
    const list = [{ id: 123 }, { id: 456 }]
    const state = { foo: 'bar', list }
    const created = { id: 789 }
    const action = { type: '@bar/SUCCESS', created }

    describe('with addCreatedToTop', () => {
      it('returns the correct state', () => {
        expect(create({ addCreatedToTop: true })(state, action)).toEqual({
          ...state,
          creating: false,
          created,
          info: created,
          list: [{ id: 789 }, { id: 123 }, { id: 456 }],
        })
      })
    })

    describe('without addCreatedToTop', () => {
      it('returns the correct state', () => {
        expect(create(options)(state, action)).toEqual({
          ...state,
          creating: false,
          created,
          info: created,
          list: [{ id: 123 }, { id: 456 }, { id: 789 }],
        })
      })
    })
  })
})
