import find from 'lodash/find'
import map from 'lodash/map'
import { getInitialState } from './reducer/initialState'

export default reducer => (state, action = {}) => {
  const isCurrentBlock = ({ parentId }) => parentId === action.parentId
  const statePart = find(state, isCurrentBlock)
  const newState = statePart
    ? state
    : [...state, getInitialState(action.parentId)]
  return reducer
    ? map(
        newState,
        block =>
          isCurrentBlock(block)
            ? { ...block, state: reducer(block.state, action) }
            : block,
      )
    : newState
}
