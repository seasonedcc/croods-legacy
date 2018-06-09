import find from 'lodash/find'

export default ({ id, info, list, actions }) => {
  const item = find(
    list || [],
    item => item && item.id.toString() === id.toString(),
  )

  if (item) {
    actions.setInfo(item)
  } else if (!info || info.id.toString() !== id.toString()) {
    actions.fetchInfo(id)
  }
}
