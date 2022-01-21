<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 头部收货地址 -->
    <my-address></my-address>
    <view class="title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18" color="#c00"></uni-icons>
      <view class="cart-title-text">购物车</view>
    </view>
    
    <!-- 商品列表区 -->
    <uni-swipe-action>
      <block v-for="(item,i) in cart" :key="i">
      <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
        <my-goods :goods="item" :showRadio="true" :showNum="true" @radio-change="handleRadio" @num-change="handleNum"></my-goods>
      </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- my-settle -->
    <my-settle></my-settle>
  </view>
  
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import badgeMix from "@/mixins/tabbar-badge.js"
  import { mapState,mapMutations } from 'vuex'
  
  export default {
    computed:{
      ...mapState("m_cart",['cart'])
    },
    data() {
      return {
        options: [{
              text: '删除', // 显示的文本内容
              style: {
                backgroundColor: '#C00000' // 按钮的背景颜色
              }
            }]
      };
    },
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins:[badgeMix],
    methods:{
      ...mapMutations("m_cart",['upCartState','upCartCount','removeCart']),
      handleRadio(e){
        this.upCartState(e)
      },
      // 商品数量处理函数
      handleNum(e){
        this.upCartCount(e)
      },
      // 滑动点击函数
      swipeActionClickHandler(goods){
        this.removeCart(goods)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
.title{
  display: flex;
  height: 80rpx;
  align-items: center;
  margin-left: 10rpx;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  .cart-title-text{
    margin-left: 20rpx;
  }
}
.empty-cart{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 900rpx;
  .empty-img{
    width: 200rpx;
    height: 200rpx;
  }
  .tip-text{
    font-size: 16px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
