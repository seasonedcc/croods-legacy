export const getInitialState = parentId => ({
  parentId,
  state: {
    listPath: null,
    list: null,
    fetchingList: false,
    listError: null,
    info: null,
    fetchingInfo: false,
    infoError: null,
    created: null,
    creating: false,
    createError: null,
    updated: null,
    updating: false,
    updateError: null,
    destroyed: null,
    destroying: false,
    destroyError: null,
  },
})

export default [getInitialState()]
