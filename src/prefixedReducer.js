import { split, last } from 'lodash'

export const parseType = type => split(type, '/')
export const suffix = type => last(parseType(type))

export default ({ prefix, reducer }) => (state, action) => {
  if (!action) {
    return state || reducer()
  }

  const [actionPrefix] = parseType(action.type)

  if (actionPrefix !== prefix) {
    return state || reducer()
  }

  return reducer(state, action)
}
