export default {
  //为当前模块开启命名空间
  namespaced : true,
  // state 数据
  state:()=>({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
        // 每个商品的信息对象，都包含如下 6 个属性：
        // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
        // 从本地存储信息读取cart
        cart:JSON.parse(uni.getStorageSync("cart") || '[]')
  }),
  mutations:{
    addToCart(state,goods){
      // 根据提交的商品的Id，查询购物车中是否存在这件商品
            // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
      let hasGoods = state.cart.find(x=>x.goods_id === goods.goods_id)
      
      if(!hasGoods){
        state.cart.push(goods)
      }else{
        hasGoods.goods_count++
      }
      // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法 
      this.commit('m_cart/saveToStorage')
    },
    // 将购物车的数据持久化保存本地
    saveToStorage(state){
      uni.setStorageSync("cart",JSON.stringify(state.cart))
    },
    upCartState(state,goods){
      // 根据商品id 查询对应商品
      const findResult = state.cart.find(x=> x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_state = goods.goods_state
        // 赋值完后重新更新本地存储信息
        this.commit('m_cart/saveToStorage')
      }
    },
    upCartCount(state,goods){
      const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    removeCart(state,goods){
      state.cart = state.cart.filter(x=>x.goods_id !== goods.goods_id)
      this.commit('m_cart/saveToStorage')
    },
    AllChange(state,goods){
      // 如果当前是全选转为全不选
      if(goods) {
        state.cart.forEach(x=>x.goods_state = false)
        this.commit('m_cart/saveToStorage')
      }else{
        state.cart.forEach(x=>x.goods_state = true)
        this.commit('m_cart/saveToStorage')
      }
      
    }
  },
  getters:{
    // 统计购物车中的商品总数量
    total(state){
      var sum = 0
      state.cart.forEach(x=> sum += x.goods_count)
      return sum
    },
    // 获取已选择的算量
    checkedCount(state){
      return state.cart.filter(x=>x.goods_state).reduce((total,item)=>{
        return total += item.goods_count
      },0)
    },
    totalPrice(state){
      // 先使用 filter 方法，从购物车中过滤器已勾选的商品
        // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
        // reduce() 的返回值就是已勾选的商品的总价
        // 最后调用 toFixed(2) 方法，保留两位小数
      return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total += item.goods_count * item.goods_price ,0).toFixed(2)
    },
    isCheck(state){
      return !state.cart.find(x=>x.goods_state == false)
    }
  }
}