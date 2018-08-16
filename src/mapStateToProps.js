import find from 'lodash/find'
import get from 'lodash/get'

export default (state, { name, parentId }) => {
  const statePart = get(state, name)
  const currentState = find(statePart, block => block.parentId === parentId)
  return get(currentState, 'state') || {}
}
