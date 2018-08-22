import { name, path, url } from '../customPropTypes'

describe('name', () => {
  const input = ['name', 'Component']
  describe('with no name and not required', () => {
    it('returns null', () => {
      expect(name(...input)).toBe(null)
    })
  })
  describe('with no name and required', () => {
    it('returns error', () => {
      expect(name.isRequired(...input)).toMatchObject(Error())
    })
  })
  describe('with wrong name', () => {
    it('returns error', () => {
      const props = { name: 'foo_ _w' }
      expect(name.isRequired(props, ...input)).toMatchObject(Error())
    })
  })
  describe('with right name', () => {
    it('returns null', () => {
      const props = { name: 'foo.bar' }
      expect(name.isRequired(props, ...input)).toBe(null)
    })
  })
})

describe('path', () => {
  const input = ['path', 'Component']
  describe('with no path and not required', () => {
    it('returns null', () => {
      expect(path(...input)).toBe(null)
    })
  })
  describe('with no path and required', () => {
    it('returns error', () => {
      expect(path.isRequired(...input)).toMatchObject(Error())
    })
  })
  describe('with wrong path', () => {
    it('returns error', () => {
      const props = { path: 'fooo bar ' }
      expect(path.isRequired(props, ...input)).toMatchObject(Error())
    })
  })
  describe('with right path', () => {
    it('returns null', () => {
      const props = { path: '/foo/bar' }
      expect(path.isRequired(props, ...input)).toBe(null)
    })
  })
})

describe('url', () => {
  const input = ['url', 'Component']
  describe('with no url and not required', () => {
    it('returns null', () => {
      expect(url(...input)).toBe(null)
    })
  })
  describe('with no url and required', () => {
    it('returns error', () => {
      expect(url.isRequired(...input)).toMatchObject(Error())
    })
  })
  describe('with wrong url', () => {
    it('returns error', () => {
      const props = { url: 'www.foo.com/bar ' }
      expect(url.isRequired(props, ...input)).toMatchObject(Error())
    })
  })
  describe('with right url', () => {
    it('returns null', () => {
      const props = { url: 'http://foo.com/bar' }
      expect(url.isRequired(props, ...input)).toBe(null)
    })
  })
})
