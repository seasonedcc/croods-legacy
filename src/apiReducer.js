import split from 'lodash/split'
import first from 'lodash/first'
import last from 'lodash/last'
import includes from 'lodash/includes'
import initial from 'lodash/initial'
import join from 'lodash/join'

export const parseApiType = type => {
  const [, actionSuffix] = split(type, '/')
  const parsedType = split(actionSuffix, '_')
  const suffix = last(parsedType)
  const prefix = join(initial(parsedType), '_')
  return [prefix, suffix]
}

export const apiPrefix = type => first(parseApiType(type))
export const apiSuffix = type => last(parseApiType(type))

export const isApiAction = type =>
  includes(['REQUEST', 'SUCCESS', 'FAILURE'], apiSuffix(type))

export default (api, reducer) => (state, action) => {
  const computedState = state || reducer()

  if (!action) {
    return computedState
  }

  if (isApiAction(action.type)) {
    return api(computedState, action)
  }

  return reducer(computedState, action)
}
