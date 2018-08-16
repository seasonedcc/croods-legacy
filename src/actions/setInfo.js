export default ({ name, parentId }) => info => ({
  type: `@${name}/SET_INFO`,
  info,
  parentId,
})
