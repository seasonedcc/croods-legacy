import { split, first, last, includes, initial, join } from 'lodash'
import { parseType } from './prefixedReducer'

export const parseApiType = type => {
  const [, actionSuffix] = parseType(type)
  const parsedType = split(actionSuffix, '_')
  const suffix = last(parsedType)
  const prefix = join(initial(parsedType), '_')
  return [prefix, suffix]
}

export const apiPrefix = type => first(parseApiType(type))
export const apiSuffix = type => last(parseApiType(type))

export const apiAction = type =>
  includes(['REQUEST', 'SUCCESS', 'FAILURE'], apiSuffix(type))

export default ({ api, reducer }) => (state, action) => {
  const computedState = state || reducer()

  if (!action) {
    return computedState
  }

  if (apiAction(action.type)) {
    return api(computedState, action)
  }

  return reducer(computedState, action)
}
