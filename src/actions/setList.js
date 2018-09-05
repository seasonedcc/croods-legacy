export default ({ name, parentId }) => list => ({
  type: `@${name}/SET_LIST`,
  list,
  parentId,
})
