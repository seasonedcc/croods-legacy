import * as index from '../index'

it('exports modules', () => {
  expect(index.Provider).not.toBe(undefined)
  expect(index.createReducer).not.toBe(undefined)
  expect(index.List).not.toBe(undefined)
  expect(index.Info).not.toBe(undefined)
  expect(index.New).not.toBe(undefined)
  expect(index.Edit).not.toBe(undefined)
  expect(index.Update).not.toBe(undefined)
  expect(index.Destroy).not.toBe(undefined)
})
