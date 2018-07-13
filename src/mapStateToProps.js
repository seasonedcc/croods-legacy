import split from 'lodash/split'
import reduce from 'lodash/reduce'

export default (state, { name }) =>
  reduce(split(name, '.'), (object, key) => object[key], state)
