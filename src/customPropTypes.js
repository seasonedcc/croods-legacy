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
  if (!regex.test(value)) {
    return new Error(
      `Invalid value:"${
        props[propName]
      }" of prop:"${propName}" supplied to ${componentName} component.`,
    )
  }

  return null
}

const name = regexValidator(NAME_REGEX)
name.isRequired = regexValidator(NAME_REGEX, true)

const path = regexValidator(PATH_REGEX)

const url = regexValidator(URL_REGEX)
url.isRequired = regexValidator(URL_REGEX, true)

const id = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default {
  id,
  name,
  path,
  url,
}
