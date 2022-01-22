<template>
  <view>
    <view class="my-userInfo-container">
      <!-- 头像区域 -->
      <view class="top-box" >
      <image :src="userInfo.avatarUrl" class="user-image"></image>
      <text class="username">{{userInfo.nickName}}</text>
      </view>
      <!-- 数据面板 -->
      <view class="panel-list">
        <!-- 第一个panel -->
        <view class="pane1">
          <view class="pane1-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view><view class="pane1-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view><view class="pane1-item">
            <text>18</text>
            <text>关注的商品</text>
          </view><view class="pane1-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
        
        <!-- 第二个panel -->
        <view class="panel2">
          <view class="panel2-title">我的订单</view>
          <view class="panel2-body">
            <view class="panel2-body-item">
              <image src="../../static/my-icons/icon1.png" class="icon"></image>
              <text>待付款</text>
            </view><view class="panel2-body-item">
              <image src="../../static/my-icons/icon2.png" class="icon"></image>
              <text>待收货</text>
            </view><view class="panel2-body-item">
              <image src="../../static/my-icons/icon3.png" class="icon"></image>
              <text>退款/退货</text>
            </view><view class="panel2-body-item">
              <image src="../../static/my-icons/icon4.png" class="icon"></image>
              <text>全部订单</text>
            </view>
          </view>
        </view>
        <!-- 第三个面板 -->
        <view class="panel3">
          <view class="panel3-item">
            <text>收货地址</text>
            <uni-icons type="arrowright" size="15"></uni-icons>
          </view><view class="panel3-item">
            <text>联系客服</text>
            <uni-icons type="arrowright" size="15"></uni-icons>
          </view><view class="panel3-item" @click="logout">
            <text >退出登录</text>
            <uni-icons type="arrowright" size="15"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <!-- plus会员 -->
    <view class="plus">
      PLUS 会员专享
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  
  export default {
    name:"my-userinfo",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState("m_user",['userInfo'])
    },
    methods:{
      ...mapMutations("m_user",['updataAddress','getUserInfo','upDateToken']),
      async logout(){
        // 询问用户是否退出登录，点击后弹框
        const [err,res] =  await uni.showModal({
          titel:"提示",
          content:"确认退出登录吗"
        }).catch(err=>err)
        // 判断用户有没有点击确认退出
        if(res && res.confirm){
          // 清空vuex中的用户数据
          this.updataAddress({})
          this.getUserInfo({})
          this.upDateToken("")
        }
      }
    }
  }
</script>

<style lang="scss">
.my-userInfo-container{
  height: 100%;
  background-color:#f4f4f4;
  .top-box{
    background-color: #c00;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400rpx;
    .user-image{
      height: 90px;
      width: 90px;
      border: 2px solid #fff;
      border-radius: 45px;
      box-shadow: 0 1px 5px black;
    }
    .username{
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
  }
}
.panel-list{
  margin: 0 10px;
  .pane1{
    background-color: #fff;
    position: relative;
    top: -10px;
    margin-bottom: 2rpx;
    display: flex;
    border-radius: 4px;
    .pane1-item{
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      font-size: 13px;
      padding: 10px 0;
    }
  }
  
  .panel2{
    background-color: #fff;
    .panel2-title{
      line-height: 45px;
      padding-left: 10px;
      font-size: 15px;
      border-bottom: 1px solid #f4f4f4;
    }
    .panel2-body{
      display: flex;
      .panel2-body-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        font-size: 13px;
        padding: 10px 0;
        .icon{
          width: 35px;
          height: 35px;
        }
      }
    }
  }
  
  .panel3{
    margin-top: 16rpx;
    background-color: #fff;
    .panel3-item{
      display: flex;
      justify-content: space-between;
      height: 45px;
      align-items: center;
      padding: 0 10px;
      font-size: 15px;
    }
  }
}
.plus{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 14rpx;
  height: 46rpx;
  border-radius: 50px;
  margin-left: 10%;
  background-color: rgb(9, 4, 45);
  color: rgb(254, 205, 30);
}

</style>
