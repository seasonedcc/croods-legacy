import find from 'lodash/find'

export default ({ id, info, list, actions, disableCache }) => {
  const item = find(
    list || [],
    item => item && item.id.toString() === id.toString(),
  )

  if (item && !disableCache) {
    actions.setInfo(item)
  } else if (!info || info.id.toString() !== id.toString() || disableCache) {
    actions.fetchInfo(id)
  }
}
