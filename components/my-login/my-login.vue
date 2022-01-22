<template>
  <view>
    <view class=".login-container">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <button type="primary" class="login-btn" @click="getUserProfile">一键登录</button>
      <view class="text" @click="Token">登录后享受更多权益</view>
    </view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods:{
      ...mapMutations("m_user",['getUserInfo','upDateToken']),
      getUserProfile(e){
        // 获取用户资料的方法
        uni.getUserProfile({
          // 用于描述获取资料时的信息
          desc: '用于完善会员资料',
          success:(res) =>{
            // 将用户信息保存到本地
            this.getUserInfo(res.userInfo)
            // 获取用户token
            this.getToken(res.userInfo)
          },
          fail:(err)=>{
            uni.$showMsg("请重新授权登录！")
          }
        })
    },
    getToken(userInfo){
      const that = this
      // 获取用户token
      uni.login({
        success(res) {
          // 根据login返回的code 再次发起请求获取openid，session_key（token）
          const code = res.code
          // const appid = 'wx5c20fd2adfa72d32'
          // const secret = '077d217973345a27106bbbaede04697b'
            // uni.request({
            //   url:`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
            //   success(res2){
            //     console.log(res2)
            //     that.upDateToken(res2.data)
            //   },
            //   fail() {
            //     uni.$showMsg("登录失败！")
            //   }
            // })
            // 1、获取token的接口
            const appid = 'wx5c20fd2adfa72d32'
            const secret = '077d217973345a27106bbbaede04697b'
            uni.request({
              url:`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
              success(res2) {
                that.upDateToken(res2.data.access_token)
              }
            })
            // 2、获取token接口
            // uni.request({
            //   url:`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`,
            //   success(res2) {
            //     console.log(res2)
            //     that.upDateToken(res2.data.access_token)
            //   }
            // })
        },
        fail() {
          uni.$showMsg("获取用户授权失败")
        }
      })
    },
    Token(){
      // const appid = 'wx5c20fd2adfa72d32'
      // const secret = '077d217973345a27106bbbaede04697b'
      // uni.request({
      //   url:`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
      //   success(res) {
      //     console.log(res)
      //   }
      // })
    }
  },
  }
</script>

<style lang="scss">
.login-container{
  display: flex;
  flex-direction: column;
  height: 750rpx;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
  .login-btn{
    width: 90%;
    background-color: #c00;
    border-radius: 100px;
    margin: 15px 0;
  }
  .text{
    color: gray;
    font-size: 14px;
  }
  &::after{
    content: "";
    display: block;
    background-color: rgb(245, 245, 245);
    height: 90px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    transform:translateY(50%);
    border-radius: 100%;
    box-shadow: 0 -1px 4px rgba(0,0,0,.08);
  }
}
</style>
