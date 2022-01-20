<template>
  <view class="search" :style="{'background-color':bgcolor}">
    <view class="sarch-box" :style="{'border-radius':radius + 'px'}" @click="navToSearch">
      <uni-icons type="search" size="17" ></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      }
    },
    props:{
      // 背景颜色
      bgcolor:{
        type:String,
        default(){
          return "rgb(245,245,245)"
        }
        
      },
      // 圆角尺寸
      radius:{
        type:Number,
        default:18
      }
    },
    methods:{
      navToSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.search{
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  .sarch-box{
    width: 100%;
    height: 36px;
    background-color: #fff;
    // border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
