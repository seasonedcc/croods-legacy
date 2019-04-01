import mapStateToProps from './mapStateToProps'

export default (...params) => {
  const croodsState = mapStateToProps(...params)
  return { croodsState }
}
