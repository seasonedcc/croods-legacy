import capitalize from 'lodash/capitalize'

export default ({ props, prevProps, name }) => {
  const { id, actions } = props
  const current = props[name]
  const old = prevProps[name]

  if (current && !old && current.id.toString() === id.toString()) {
    const reset = actions[`reset${capitalize(name)}`]

    reset()
  }
}
