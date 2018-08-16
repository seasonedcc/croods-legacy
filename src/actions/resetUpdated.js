export default ({ name, parentId }) => () => ({
  type: `@${name}/RESET_UPDATED`,
  parentId,
})
