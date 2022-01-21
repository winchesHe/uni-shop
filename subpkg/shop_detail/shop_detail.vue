<template>
  <!-- 加个v-if 判断goods.info.goods_name 存不存在来实现页面的加载 -->
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goods_info.pics" :key="i" @click="preview(i)">
        <image :src="item.pics_big" ></image>
      </swiper-item>
    </swiper>
    <!-- 商品详情信息 -->
    <view class="goods-info-box">
      <!-- 价格 -->
      <view class="goods-price">￥ {{goods_info.goods_price}}</view>
      <!-- 中间内容区 -->
      <view class="goods-mian">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏区 -->
        <view class="goods-icon">
          <uni-icons type="star" size="20" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 商品图片信息  rich-text富文本标签会将html标签的内容渲染为小程序页面结构-->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="cartClick" @buttonClick="btnClick" />
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  
  export default {
    computed:{
      // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
          // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
          ...mapState('m_cart', ['cart']),
          ...mapGetters('m_cart', ['total']),
    },
    watch:{
      // 定义 total 侦听器，指向一个配置对象
         total: {
            // handler 属性用来定义侦听器的 function 处理函数
            handler(newVal) {
               const findResult = this.options.find(x => x.text === '购物车')
               if (findResult) {
                  findResult.info = newVal
               }
            },
            // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
            immediate: true
         }
    },
    data() {
      return {
        // 商品详情对象
        goods_info:{},
        // 左侧按钮组的配置对象
            options: [{
              icon: 'shop',
              text: '店铺'
            }, {
              icon: 'cart',
              text: '购物车',
              info: 0
            }],
            // 右侧按钮组的配置对象
            buttonGroup: [{
                text: '加入购物车',
                backgroundColor: '#ff0000',
                color: '#fff'
              },
              {
                text: '立即购买',
                backgroundColor: '#ffa200',
                color: '#fff'
              }
            ]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      // 获取商品数据
      this.getGoodsDetail(goods_id)
    },
    methods:{
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
          ...mapMutations('m_cart', ['addToCart']),
      async getGoodsDetail(goods_id){
        const {data:res} = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
        if(res.meta.status !== 200) return uni.$showMsg()
        // 解决商品之间的空白，和ios上webp不兼容
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      // 轮播图预览
      preview(index){
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current: index,
          // 所有图片 url 地址的数组
          urls:this.goods_info.pics.map(x=>x.pics_big)
        })
      },
      // 加入购物车
      cartClick(e){
        if (e.content.text === '购物车') {
            // 切换到购物车页面
            uni.switchTab({
              url: '/pages/cart/cart'
            })}
      },
      // 右侧按钮
      btnClick(e){
        if(e.content.text === '加入购物车'){
      // 2. 组织一个商品的信息对象
          const goods = {
             goods_id: this.goods_info.goods_id,       // 商品的Id
             goods_name: this.goods_info.goods_name,   // 商品的名称
             goods_price: this.goods_info.goods_price, // 商品的价格
             goods_count: 1,                           // 商品的数量
             goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
             goods_state: true                         // 商品的勾选状态
          }
          this.addToCart(goods)      
        }
      },
    }
  }
</script>

<style lang="scss">
swiper{
  height: 750rpx;
  image{
    width: 100%;
    height: 100%;
  }
}
.goods-info-box{
  padding: 10px;
  padding-right: 0;
  .goods-price{
    font-size: 18px;
    color: #c00;
    margin: 10px 0;
  }
  .goods-mian{
    display: flex;
    justify-content: space-between;
    .goods-name{
      font-size: 14px;
    }
    .goods-icon{
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #efefef;
      color: gray;
      font-size: 12px;
    }
  }
  .yf{
    color: 12px;
    color: gray;
  }
}
.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}
.goods_nav{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
