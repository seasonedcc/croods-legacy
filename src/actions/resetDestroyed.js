export default ({ name, parentId }) => () => ({
  type: `@${name}/RESET_DESTROYED`,
  parentId,
})
