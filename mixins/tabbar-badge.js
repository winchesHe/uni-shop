import { mapGetters } from 'vuex'

export default {
  computed:{
    ...mapGetters('m_cart',['total']),
  },
  onShow() {
    // 在页面刚展示的时候，设置数字徽标
    this.setBadge()
  },
  watch:{
    // 监听total值的变化
    total(){
      // 变化时重新调用 setBadge 方法重新赋值
      this.setBadge()
    }
  },
  methods:{
    setBadge(){
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index:2,
        text:this.total + ''  // 注意：text 的值必须是字符串，不能是数字
      })
    }
  }
}