<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioChange()"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" v-if="showNum" :value="goods.goods_count" @change="numChange"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    filters:{
      tofixed(e){
        return Number(e).toFixed(2)
      }
    },
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        defaul: {},
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      }
    },
    methods:{
      radioChange(goods){
        this.$emit("radio-change",{
          goods_id:this.goods.goods_id,
          // 商品的最新状态时是原来的取反
          goods_state:!this.goods.goods_state
        })
      },
      // 通过change监听uni-number事件拿到value
      numChange(val){
        this.$emit("num-change",{
          goods_id:this.goods.goods_id,
          goods_count:+val
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    // 让整个goods-list占满屏幕
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 5px;
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
      .goods-info-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>