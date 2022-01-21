<template>
  <view>
    <!-- 搜索栏 -->
    <my-search ></my-search>
  <view class="scoll-view">
    <scroll-view scroll-y="true" :style="{height:wh + 'px'}" >
      <view class="cata-left-list" :class="{active:currentIndex == i1}" v-for="(item1,i1) in cateList" :key="i" @click="cateLeftClick(i1)">
        {{item1.cat_name}}
        </view>
    </scroll-view>
    <scroll-view scroll-y="true" :style="{height:wh + 'px'}" :scroll-top="scrollTop">
      <view class="cate-lv2-list">
        <!-- 循环渲染二级分类标题 -->
        <view class="" v-for="(item2,i2) in cataLevel" :key="i2">
          <view class="cate-lv2-title">
            {{item2.cat_name}}
          </view> 
          
          <!-- 循环渲染三级分类 -->
          <view class="cate-lv3-item">
            <view class="cata-lv3-img" v-for="(item3,i3) in item2.children" :key="i3" @click="navToGood(item3)">
              <image :src="item3.cat_icon" ></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
  </view>
</template>

<script>
  import badgeMix from "@/mixins/tabbar-badge.js"
  
  export default {
    mixins:[badgeMix],
    data() {
      return {
        // 窗口可用高度 = 屏幕高度 - navigationBar 高度 - tabbar 高度
        wh:0,
        cateList:[],
        currentIndex:0,
        cataLevel:[],
        // 滚动条距离顶部的距离
            scrollTop: 0
      };
    },
    onLoad() {
      // 获取当前手机信息
      const sysInfo = uni.getSystemInfoSync()
      // 为wh 设置可使用窗口高度
      // -50 因为顶部加了搜索框
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods:{
      // 获取分类信息
      async getCateList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !==200) return uni.$showMsg()
        this.cateList = res.message
        // 获取二级分类
        this.cataLevel = res.message[0].children
        // console.log(this.cataLevel)
      },
      // 左侧分类点击事件
      cateLeftClick(index){
        this.currentIndex = index
        this.cataLevel = this.cateList[index].children
        // 每次都重新赋值scrolltop
        this.scrollTop = 0.1 - this.scrollTop
      },
      navToGood(item){
        // 点击跳转到商品详情页
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      }
      
    }
  }
</script>

<style lang="scss">
.scoll-view{
  display: flex;
  >scroll-view:nth-child(1){
    width: 120px;
  }
  .cata-left-list{
    width: 120px;
    text-align: center;
    line-height: 120rpx;
    background-color: #f7f7f7;
    &.active{
      background-color: #fff;
      position: relative;
      
      &::before{
        content: "";
        display: block;
        width: 6rpx;
        height: 35px;
        background-color:#c00;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
    
  }
}
.cate-lv2-list{
  background-color: rgb(250,250,250);
}
.cate-lv2-title{
  font-size: 16px;
  font-weight: bold;
  padding: 15px 20px 0;
}
.cate-lv3-item{
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.05);
  margin-left: 10px;
  border-radius: 10px;
}
.cata-lv3-img{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  margin-bottom: 10px;
  
  image{
    width: 65px;
    height: 65px;
    margin-bottom: 5px;
  }
}
</style>
