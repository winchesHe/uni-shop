<template>
  <view>
    <view class="good-item">
      <!-- 左侧图片 -->
      <view class="good-item-left">
        <image :src="goods.goods_small_logo || defaultPic" mode=""></image>
      </view>
      <!-- 右侧内容 -->
      <view class="good-item-right">
        <view class="goods-name">{{goods.goods_name}}</view>
        <view class="goods-price">￥ {{goods.goods_price | tiFixed}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    filters:{
      // 处理价格小数点
      tiFixed(num){
        return Number(num).toFixed(2)
      }
    },
    data() {
      return {
        // 默认的空图片
            defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style lang="scss">
.goods-list{
  .good-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    .good-item-left{
      margin-right:5px ;
      > image{
        height: 100px;
        width: 100px;
        display: block;
      }
    }
    .good-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-price{
        color: #c00;
        font-style: 16px;
      }
    }
  }
}
</style>
