<template>
  <view>
    <!-- 请选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}' ">
      <button @click="choseAddress" type="primary" size="mini" class="btn-choose-address">请选择收货地址+</button>
    </view>
    
    <!-- 收货地址的信息 -->
    <view class="address-info-box" v-else @click="choseAddress">
      <view class="row1">
        <view class="username">收货人: {{address.userName}}</view>
        <view class="row1-right">
          <view class="phone">电话: {{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-address">收货地址:</view>
        <view class="row2-detail">{{addstr}}</view>
      </view>
    </view>
    
    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="address-iamge"></image>
  </view>
</template>

<script>
  import { mapState,mapMutations,mapGetters } from 'vuex'
  
  export default {
    name:"my-address",
    data() {
      return {
        // address:{}
      };
    },
    methods:{
      ...mapMutations('m_user',['updataAddress']),
      // 选择收货地址
      async choseAddress(){
        // 调用小程序提供的chooseAddress
       const [err,succ] = await uni.chooseAddress().catch(err=>err)
       // 用户成功选择了地址
       if(err == null && succ.errMsg == 'chooseAddress:ok'){
         this.updataAddress(succ)
       }
      }
    },
    computed:{
      ...mapState("m_user",['address']),
      ...mapGetters("m_user",['addstr'])
      // addstr(){
      //   if(!this.address.provinceName) return ''
      //   return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      // }
    }
  }
</script>

<style lang="scss">
.address-choose-box{
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-iamge{
  display: block;
  width: 100%;
  height: 5px;
}
.address-info-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8px;
  height: 90px;
  font-size: 12px;
  .row1{
    display: flex;
    justify-content: space-between;
    .row1-right{
      display: flex;
      align-items: center;
    }
  }
  .row2{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .row2-address{
      white-space: nowrap;
    }
  }
}
</style>
