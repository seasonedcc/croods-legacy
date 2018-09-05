import fetchList from './actions/fetchList'
import fetchInfo from './actions/fetchInfo'
import setInfo from './actions/setInfo'
import setList from './actions/setList'
import create from './actions/create'
import resetCreated from './actions/resetCreated'
import resetCreateError from './actions/resetCreateError'
import update from './actions/update'
import resetUpdated from './actions/resetUpdated'
import destroy from './actions/destroy'
import resetDestroyed from './actions/resetDestroyed'

export default options => ({
  fetchList: fetchList(options),
  fetchInfo: fetchInfo(options),
  setInfo: setInfo(options),
  setList: setList(options),
  create: create(options),
  resetCreated: resetCreated(options),
  resetCreateError: resetCreateError(options),
  update: update(options),
  resetUpdated: resetUpdated(options),
  destroy: destroy(options),
  resetDestroyed: resetDestroyed(options),
})
