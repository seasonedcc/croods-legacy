export default (title, color) => (...log) => {
  console.group(`%c${title}`, `color: ${color};`)
  log.map(info => console.log(info))
  console.groupEnd()
}
