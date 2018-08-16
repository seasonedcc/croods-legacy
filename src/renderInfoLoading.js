export default ({ renderLoading, info, fetchingInfo }) => {
  if (renderLoading && (!info || fetchingInfo)) {
    return renderLoading({})
  }

  return null
}
