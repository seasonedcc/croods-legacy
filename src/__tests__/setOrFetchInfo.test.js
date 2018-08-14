import setOrFetchInfo from '../setOrFetchInfo'

const toString = jest.fn(() => '1234')
const setInfo = jest.fn()
const fetchInfo = jest.fn()

describe('with item', () => {
  it('calls setInfo', () => {
    const props = {
      id: { toString },
      info: { id: { toString } },
      list: [{ id: { toString } }],
      actions: { setInfo, fetchInfo },
    }
    setOrFetchInfo(props)
    expect(setInfo).toHaveBeenCalledWith(props.list[0])
  })
})

describe('without an item and info different to id ', () => {
  it('calls fetchInfo', () => {
    const toString2 = jest.fn(() => '4321')
    const props = {
      id: { toString: toString2 },
      info: { id: { toString } },
      actions: { setInfo, fetchInfo },
    }
    fetchInfo.mockClear()

    setOrFetchInfo(props)
    expect(props.actions.fetchInfo).toHaveBeenCalledWith(props.id)
  })
})

describe('without an item and info same as id ', () => {
  it('calls fetchInfo', () => {
    const props = {
      id: { toString },
      info: { id: { toString } },
      actions: { setInfo, fetchInfo },
    }
    fetchInfo.mockClear()

    setOrFetchInfo(props)
    expect(props.actions.fetchInfo).not.toHaveBeenCalledWith(props.id)
  })
})
