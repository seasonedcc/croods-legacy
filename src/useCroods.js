import { useEffect } from 'react'
import { useOptions } from './withOptions'
import mapStateToProps from './mapStateToProps'
import connectStateToProps from './connectStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import { connect } from 'react-redux'
import uniqueId from 'lodash/uniqueId'

const useCroods = params => {
  const { store, ...options } = useOptions()
  const globalState = store.getState()
  const state = mapStateToProps(globalState, params)
  const { actions } = mapDispatchToProps(store.dispatch, { ...params, options })
  return actions
}

export const useCroodsEffect = (method, params) => {
  const actions = useCroods(params)
  useEffect(() => {
    actions[method] && actions[method](params.id)
  }, [])
}

export const connectCroods = (name, parentId) => connect(state => connectStateToProps(state, { name, parentId }))

export default useCroods
