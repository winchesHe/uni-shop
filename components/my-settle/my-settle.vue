<template>
  <view>
    <view class="settle-container">
      <label class="radio">
        <radio :checked="isCheck" color="#c00" @click="Allcheck"/><text>全选</text>
      </label>
      
      <view >合计: <text class="settle-price">￥{{totalPrice}}</text></view>
      
      <view class="settle-total" @click="settlement">结算({{checkedCount}})</view>
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations,mapState} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        // isCheck:"true"
      };
    },
    computed:{
      ...mapGetters("m_cart",['checkedCount','totalPrice','isCheck']),
      ...mapGetters("m_user",['addstr']),
      ...mapState("m_user",['token']),
      ...mapState("m_cart",['cart'])
    },
    methods:{
      ...mapMutations("m_cart",['AllChange']),
      Allcheck(){
        const state = this.isCheck
        this.AllChange(state)
      },
      // 结算功能
      settlement(){
        if(!this.token) return uni.$showMsg("请先登录!")
        if(!this.checkedCount) return uni.$showMsg("请选择要结算的商品")
        // 要判断用户是否选择了收货地址
        if(!this.addstr) return uni.$showMsg("请选择收货地址")
        
        // 4. 实现微信支付功能
          this.payOrder()
      },
      // 微信支付
      async payOrder() {
        // 1. 创建订单
        // 1.1 组织订单的信息对象
        const orderInfo = {
          // 开发期间，注释掉真实的订单价格，
          // order_price: this.checkedGoodsAmount,
          // 写死订单总价为 1 分钱
          order_price: 0.01,
          consignee_addr: this.addstr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
        }
        // 1.2 发起请求创建订单
        const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        // 1.3 得到服务器响应的“订单编号”
        const orderNumber = res.message.order_number}
    }
  }
</script>

<style lang="scss">
.settle-container{
  height: 50px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-left: 5px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .radio{
    display: flex;
    align-items: center;
  }
  .settle-price{
    color: #c00;
    font-weight: bold;
    margin-left: 5px;
    font-size: 16px;
  }
  .settle-total{
    background-color: #c00;
    padding: 0 10px;
    min-width: 100px;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }
}
</style>
