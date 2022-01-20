<template>
  <view>
    <!-- 搜索栏 -->
    <view class="home-search">
      <my-search></my-search>
    </view>
  <!-- 顶部轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator :url="'/subpkg/shop_detail/shop_detail?goods_id=' + item.goods_id"  class="swiper-item">
        <image :src="item.image_src" ></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navListClick(item)">
        <image :src="item.image_src" mode=""></image>
      </view>
    </view>
    <!-- 楼层视图 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" class="floor-title" mode=""></image>
        
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片 -->
          <navigator class="img-box-left" :url="item.product_list[0].url">
              <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧四个小图片 -->
          <view class="img-box-right" >
              <navigator class="box-right-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0" :url="item2.url">
                <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
              </navigator>
          </view>
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
          swiperList:[],
          navList:[],
          floorList:[]
      };
    },
    // 小程序页面加载时获取轮播图
    onLoad() { 
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      async getSwiperList(){//  uni 的实例对象的方法
          const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
          if(res.meta.status !==200) return uni.$showMsg()
          this.swiperList = res.message
          // console.log(this.swiperList)
      },
      async getNavList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status!==200) return uni.$showMsg()
        this.navList = res.message
      },
      // 导航栏的点击事件
      navListClick(item){
        if(item.name == "分类"){
          uni.switchTab({
            url:"/pages/cate/cate"
          })
        }
      },
      // 获取楼层数据
      async getFloorList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status !== 200) return uni.$showMsg()
        // 处理拿到的url数据
        res.message.forEach(item=>{
          item.product_list.forEach(prop=>{
            prop.url = "/subpkg/goods_list/goods_list?" + prop.navigator_url.split("?")[1]
          })
        })
        this.floorList = res.message
        console.log(this.floorList)
      },
    }
  }
</script>

<style lang="scss">
  .home-search{
    // position: fixed;
    position: sticky;
    z-index: 999;
    width: 100%;
    top: 0;
  }
swiper{
  height: 330rpx;
}
  
.swiper-item, image{
  width: 100%;
  height: 100%;
}
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;
  .nav-item image{
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title{
  height: 60rpx;
  width: 100%;
}
.floor-img-box{
  display: flex;
  margin-left: 10rpx;
  .img-box-right{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}

</style>
