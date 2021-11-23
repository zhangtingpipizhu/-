const state = {
  baseDataSaveData: {}, // 页面保存数据
  keepAliveComponets: []
}
const getters = {
  getBaseDataSaveData (state:any) {
    return JSON.parse(JSON.stringify(state.baseDataSaveData))
  },
  getKeepAliveComponets (state:any) {
    return state.keepAliveComponets
  }
}

const mutations = {
  setBaseDataSaveData (state:any, obj:any) {
    state.baseDataSaveData = JSON.parse(JSON.stringify(obj))
  },
  setKeepAliveComponets (state:any, str:any) {
    // console.log(state, str)
    state.keepAliveComponets.push(str)
  }
}
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
