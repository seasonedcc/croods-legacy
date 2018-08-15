import map from 'lodash/map'

export default reducer => (state, action = {}) =>
  reducer ? map(state, block => block.parentId === action.parentId
    ? { ...block, state: reducer(block.state, action) }
    : block
  ) : state
