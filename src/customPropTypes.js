import PropTypes from 'prop-types'

const URL_REGEX = /^(https?):\/\/[^\s/$.?#].[^\s]*$/
const PATH_REGEX = /^\/\S*/
const NAME_REGEX = /^([a-zA-Z0-9]+\.)*[a-zA-Z0-9]*[^\.]$/

const regexValidator = (regex, required) => (
  props,
  propName,
  componentName,
) => {
  const value = props[propName]
  if (!required && value === undefined) {
    return null
  }
  return regex.test(value)
    ? null
    : new Error(
        `Invalid value: "${value}" of prop:"${propName}" supplied to ${componentName} component.`,
      )
}

const name = regexValidator(NAME_REGEX)
name.isRequired = regexValidator(NAME_REGEX, true)

const path = regexValidator(PATH_REGEX)
path.isRequired = regexValidator(PATH_REGEX, true)

const url = regexValidator(URL_REGEX)
url.isRequired = regexValidator(URL_REGEX, true)

const id = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default { id, name, path, url }
