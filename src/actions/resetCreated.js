export default ({ name, parentId }) => () => ({
  type: `@${name}/RESET_CREATED`,
  parentId,
})
