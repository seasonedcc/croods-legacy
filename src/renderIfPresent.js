export default (render, content) => {
  if (render && content) {
    return render(content)
  }
  return null
}
