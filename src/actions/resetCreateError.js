export default ({ name, parentId }) => () => ({
  type: `@${name}/RESET_CREATE_ERROR`,
  parentId,
})
