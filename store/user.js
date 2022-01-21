export default {
  // 开启命名空间
  namespaced:true,
  
  state:()=>({
    address:JSON.parse(uni.getStorageSync("address") || "{}")
  }),
  
  mutations:{
    updataAddress(state,address){
      state.address = address
      // 将用户地址保存到本地 通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
      this.commit('m_user/saveAddressToStorage')
    
    },
    saveAddressToStorage(state){
      uni.setStorageSync("address",JSON.stringify(state.address))
    }
  },
  getters:{
    addstr(state){
      if (!state.address.provinceName) return ''
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    },
  }
}