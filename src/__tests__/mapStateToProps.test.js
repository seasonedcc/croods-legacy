import curry from 'lodash/curry'
import mapStateToProps from '../mapStateToProps'

let state, subject

describe('mapStateToProps', () => {
  beforeAll(() => {
    state = {
      colors: [
        { state: { foo: 'bar', creating: true } },
        { parentId: 1234, state: { foo: 'baz', creating: false } },
      ],
      auth: {
        user: [
          { parentId: 1, state: { info: 'hey!' } },
          { state: { info: 'ho!' } },
        ],
      },
    }
    subject = curry(mapStateToProps)(state)
  })

  it('returns no props if an unknown path is given', () => {
    const result = subject({ name: 'flavours' })
    expect(result).toEqual({})
  })

  it('returns no props if an unknown parentId is given', () => {
    const result = subject({ name: 'colors', parentId: 4321 })
    expect(result).toEqual({})
  })

  it('returns the state of a known name as props with no parentId', () => {
    const result = subject({ name: 'colors' })
    expect(result).toEqual({ creating: true, foo: 'bar' })
  })

  it('returns the state of a known name as props with parentId', () => {
    const result = subject({ name: 'colors', parentId: 1234 })
    expect(result).toEqual({ creating: false, foo: 'baz' })
  })

  it('returns the state of a known name as props when passing a deep name', () => {
    const result = subject({ name: 'auth.user', parentId: 1 })
    expect(result).toEqual({ info: 'hey!' })
  })
})
