import createActions from '../createActions'

import fetchList from '../actions/fetchList'
import fetchInfo from '../actions/fetchInfo'
import setInfo from '../actions/setInfo'
import create from '../actions/create'
import resetCreated from '../actions/resetCreated'
import update from '../actions/update'
import resetUpdated from '../actions/resetUpdated'
import destroy from '../actions/destroy'
import resetDestroyed from '../actions/resetDestroyed'

jest.mock('../actions/fetchList', () => jest.fn())
jest.mock('../actions/fetchInfo', () => jest.fn())
jest.mock('../actions/setInfo', () => jest.fn())
jest.mock('../actions/create', () => jest.fn())
jest.mock('../actions/resetCreated', () => jest.fn())
jest.mock('../actions/update', () => jest.fn())
jest.mock('../actions/resetUpdated', () => jest.fn())
jest.mock('../actions/destroy', () => jest.fn())
jest.mock('../actions/resetDestroyed', () => jest.fn())

it('returns action creators', () => {
  const options = { foo: 'bar' }
  createActions(options)

  expect(fetchList).toHaveBeenCalledWith(options)
  expect(fetchInfo).toHaveBeenCalledWith(options)
  expect(setInfo).toHaveBeenCalledWith(options)
  expect(create).toHaveBeenCalledWith(options)
  expect(resetCreated).toHaveBeenCalledWith(options)
  expect(update).toHaveBeenCalledWith(options)
  expect(resetUpdated).toHaveBeenCalledWith(options)
  expect(destroy).toHaveBeenCalledWith(options)
  expect(resetDestroyed).toHaveBeenCalledWith(options)
})
